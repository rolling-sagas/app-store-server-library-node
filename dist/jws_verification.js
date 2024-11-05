"use strict";
// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationException = exports.VerificationStatus = exports.SignedDataVerifier = void 0;
const jsonwebtoken = require("jsonwebtoken");
const base64url_1 = require("base64url");
const crypto_1 = require("crypto");
const jsrsasign_1 = require("jsrsasign");
const node_fetch_1 = require("node-fetch");
const Environment_1 = require("./models/Environment");
const JWSTransactionDecodedPayload_1 = require("./models/JWSTransactionDecodedPayload");
const ResponseBodyV2DecodedPayload_1 = require("./models/ResponseBodyV2DecodedPayload");
const JWSRenewalInfoDecodedPayload_1 = require("./models/JWSRenewalInfoDecodedPayload");
const AppTransaction_1 = require("./models/AppTransaction");
const MAX_SKEW = 60000;
/**
 * A class providing utility methods for verifying and decoding App Store signed data.
 *
 * Example Usage:
 * ```ts
 * const verifier = new SignedDataVerifier([appleRoot, appleRoot2], true, Environment.SANDBOX, "com.example")
 *
 * try {
 *     const decodedNotification = verifier.verifyAndDecodeNotification("ey...")
 *     console.log(decodedNotification)
 * } catch (e) {
 *     console.error(e)
 * }
 * ```
 */
class SignedDataVerifier {
    /**
     *
     * @param appleRootCertificates A list of DER-encoded root certificates
     * @param enableOnlineChecks Whether to enable revocation checking and check expiration using the current date
     * @param environment The App Store environment to target for checks
     * @param bundleId The app's bundle identifier
     * @param appAppleId The app's identifier, ommitted in the sandbox environment
     */
    constructor(appleRootCertificates, enableOnlineChecks, environment, bundleId, appAppleId) {
        this.JWSRenewalInfoDecodedPayloadValidator = new JWSRenewalInfoDecodedPayload_1.JWSRenewalInfoDecodedPayloadValidator();
        this.JWSTransactionDecodedPayloadValidator = new JWSTransactionDecodedPayload_1.JWSTransactionDecodedPayloadValidator();
        this.responseBodyV2DecodedPayloadValidator = new ResponseBodyV2DecodedPayload_1.ResponseBodyV2DecodedPayloadValidator();
        this.appTransactionValidator = new AppTransaction_1.AppTransactionValidator();
        this.rootCertificates = appleRootCertificates.map(cert => new crypto_1.X509Certificate(cert));
        this.enableOnlineChecks = enableOnlineChecks;
        this.bundleId = bundleId;
        this.environment = environment;
        this.appAppleId = appAppleId;
        if (environment === Environment_1.Environment.PRODUCTION && appAppleId === undefined) {
            throw new Error("appAppleId is required when the environment is Production");
        }
    }
    /**
     * Verifies and decodes a signedTransaction obtained from the App Store Server API, an App Store Server Notification, or from a device
     * See {@link https://developer.apple.com/documentation/appstoreserverapi/jwstransaction JWSTransaction}
     *
     * @param signedTransaction The signedTransaction field
     * @return The decoded transaction info after verification
     * @throws VerificationException Thrown if the data could not be verified
     */
    async verifyAndDecodeTransaction(signedTransactionInfo) {
        const decodedJWT = await this.verifyJWT(signedTransactionInfo, this.JWSTransactionDecodedPayloadValidator, this.extractSignedDate);
        if (decodedJWT.bundleId !== this.bundleId) {
            throw new VerificationException(VerificationStatus.INVALID_APP_IDENTIFIER);
        }
        if (decodedJWT.environment !== this.environment) {
            throw new VerificationException(VerificationStatus.INVALID_ENVIRONMENT);
        }
        return decodedJWT;
    }
    /**
     * Verifies and decodes a signedRenewalInfo obtained from the App Store Server API, an App Store Server Notification, or from a device
     * See {@link https://developer.apple.com/documentation/appstoreserverapi/jwsrenewalinfo JWSRenewalInfo}
     *
     * @param signedRenewalInfo The signedRenewalInfo field
     * @return The decoded renewal info after verification
     * @throws VerificationException Thrown if the data could not be verified
     */
    async verifyAndDecodeRenewalInfo(signedRenewalInfo) {
        const decodedRenewalInfo = await this.verifyJWT(signedRenewalInfo, this.JWSRenewalInfoDecodedPayloadValidator, this.extractSignedDate);
        const environment = decodedRenewalInfo.environment;
        if (this.environment !== environment) {
            throw new VerificationException(VerificationStatus.INVALID_ENVIRONMENT);
        }
        return decodedRenewalInfo;
    }
    /**
     * Verifies and decodes an App Store Server Notification signedPayload
     * See {@link https://developer.apple.com/documentation/appstoreservernotifications/signedpayload signedPayload}
     *
     * @param signedPayload The payload received by your server
     * @return The decoded payload after verification
     * @throws VerificationException Thrown if the data could not be verified
     */
    async verifyAndDecodeNotification(signedPayload) {
        const decodedJWT = await this.verifyJWT(signedPayload, this.responseBodyV2DecodedPayloadValidator, this.extractSignedDate);
        let appAppleId;
        let bundleId;
        let environment;
        if (decodedJWT.data) {
            appAppleId = decodedJWT.data.appAppleId;
            bundleId = decodedJWT.data.bundleId;
            environment = decodedJWT.data.environment;
        }
        else if (decodedJWT.summary) {
            appAppleId = decodedJWT.summary.appAppleId;
            bundleId = decodedJWT.summary.bundleId;
            environment = decodedJWT.summary.environment;
        }
        else if (decodedJWT.externalPurchaseToken) {
            appAppleId = decodedJWT.externalPurchaseToken.appAppleId;
            bundleId = decodedJWT.externalPurchaseToken.bundleId;
            if (decodedJWT.externalPurchaseToken.externalPurchaseId && decodedJWT.externalPurchaseToken.externalPurchaseId.startsWith("SANDBOX")) {
                environment = Environment_1.Environment.SANDBOX;
            }
            else {
                environment = Environment_1.Environment.PRODUCTION;
            }
        }
        this.verifyNotification(bundleId, appAppleId, environment);
        return decodedJWT;
    }
    verifyNotification(bundleId, appAppleId, environment) {
        if (this.bundleId !== bundleId || (this.environment === Environment_1.Environment.PRODUCTION && this.appAppleId !== appAppleId)) {
            throw new VerificationException(VerificationStatus.INVALID_APP_IDENTIFIER);
        }
        if (this.environment !== environment) {
            throw new VerificationException(VerificationStatus.INVALID_ENVIRONMENT);
        }
    }
    /**
     * Verifies and decodes a signed AppTransaction
     * See {@link https://developer.apple.com/documentation/storekit/apptransaction AppTransaction}
     *
     * @param signedAppTransaction The signed AppTransaction
     * @returns The decoded AppTransaction after validation
     * @throws VerificationException Thrown if the data could not be verified
     */
    async verifyAndDecodeAppTransaction(signedAppTransaction) {
        const decodedAppTransaction = await this.verifyJWT(signedAppTransaction, this.appTransactionValidator, t => t.receiptCreationDate === undefined ? new Date() : new Date(t.receiptCreationDate));
        const environment = decodedAppTransaction.receiptType;
        if (this.bundleId !== decodedAppTransaction.bundleId || (this.environment === Environment_1.Environment.PRODUCTION && this.appAppleId !== decodedAppTransaction.appAppleId)) {
            throw new VerificationException(VerificationStatus.INVALID_APP_IDENTIFIER);
        }
        if (this.environment !== environment) {
            throw new VerificationException(VerificationStatus.INVALID_ENVIRONMENT);
        }
        return decodedAppTransaction;
    }
    async verifyJWT(jwt, validator, signedDateExtractor) {
        let certificateChain;
        let decodedJWT;
        try {
            decodedJWT = jsonwebtoken.decode(jwt);
            if (!validator.validate(decodedJWT)) {
                throw new VerificationException(VerificationStatus.FAILURE);
            }
            if (this.environment === Environment_1.Environment.XCODE || this.environment === Environment_1.Environment.LOCAL_TESTING) {
                // Data is not signed by the App Store, and verification should be skipped
                // The environment MUST be checked in the public method calling this
                return decodedJWT;
            }
            try {
                const header = jwt.split('.')[0];
                const decodedHeader = base64url_1.default.decode(header);
                const headerObj = JSON.parse(decodedHeader);
                const chain = headerObj['x5c'] ?? [];
                if (chain.length != 3) {
                    throw new VerificationException(VerificationStatus.INVALID_CHAIN_LENGTH);
                }
                certificateChain = chain.slice(0, 2).map(cert => new crypto_1.X509Certificate(Buffer.from(cert, 'base64')));
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new VerificationException(VerificationStatus.INVALID_CERTIFICATE, error);
                }
                throw new VerificationException(VerificationStatus.INVALID_CERTIFICATE);
            }
            const effectiveDate = this.enableOnlineChecks ? new Date() : signedDateExtractor(decodedJWT);
            const publicKey = await this.verifyCertificateChain(this.rootCertificates, certificateChain[0], certificateChain[1], effectiveDate);
            const encodedKey = publicKey.export({
                type: "spki",
                format: "pem"
            });
            jsonwebtoken.verify(jwt, encodedKey);
            return decodedJWT;
        }
        catch (error) {
            if (error instanceof VerificationException) {
                throw error;
            }
            else if (error instanceof Error) {
                throw new VerificationException(VerificationStatus.VERIFICATION_FAILURE, error);
            }
            throw new VerificationException(VerificationStatus.VERIFICATION_FAILURE);
        }
    }
    async verifyCertificateChain(trustedRoots, leaf, intermediate, effectiveDate) {
        let validity = false;
        let rootCert;
        for (const root of trustedRoots) {
            if (intermediate.verify(root.publicKey) && intermediate.issuer === root.subject) {
                validity = true;
                rootCert = root;
            }
        }
        validity = validity && leaf.verify(intermediate.publicKey) && leaf.issuer === intermediate.subject;
        validity = validity && intermediate.ca;
        const jsrsassignX509Leaf = new jsrsasign_1.X509();
        jsrsassignX509Leaf.readCertHex(leaf.raw.toString('hex'));
        const jsrassignX509Intermediate = new jsrsasign_1.X509();
        jsrassignX509Intermediate.readCertHex(intermediate.raw.toString('hex'));
        validity = validity && jsrsassignX509Leaf.getExtInfo("1.2.840.113635.100.6.11.1") !== undefined;
        validity = validity && jsrassignX509Intermediate.getExtInfo("1.2.840.113635.100.6.2.1") !== undefined;
        if (!validity) {
            throw new VerificationException(VerificationStatus.VERIFICATION_FAILURE);
        }
        rootCert = rootCert;
        this.checkDates(leaf, effectiveDate);
        this.checkDates(intermediate, effectiveDate);
        this.checkDates(rootCert, effectiveDate);
        if (this.enableOnlineChecks) {
            await Promise.all([this.checkOCSPStatus(leaf, intermediate), this.checkOCSPStatus(intermediate, rootCert)]);
        }
        return leaf.publicKey;
    }
    async checkOCSPStatus(cert, issuer) {
        const authorityRex = /^OCSP - URI:(.*)$/m;
        const matchResult = cert.infoAccess ? authorityRex.exec(cert.infoAccess) : "";
        if (matchResult === null || matchResult.length !== 2) {
            throw new VerificationException(VerificationStatus.INVALID_CERTIFICATE);
        }
        const request = new jsrsasign_1.KJUR.asn1.ocsp.OCSPRequest({ reqList: [{ issuerCert: issuer.toString(), subjectCert: cert.toString(), alg: "sha256" }] });
        const headers = new node_fetch_1.Headers();
        headers.append('Content-Type', 'application/ocsp-request');
        const response = await (0, node_fetch_1.default)(matchResult[1], {
            headers: headers,
            method: 'POST',
            body: Buffer.from(request.getEncodedHex(), 'hex')
        });
        const responseBuffer = await response.buffer();
        const parsedResponse = new jsrsasign_1.KJUR.asn1.ocsp.OCSPParser().getOCSPResponse(responseBuffer.toString('hex'));
        // The issuer could also be the signer
        const jsrassignX509Issuer = new jsrsasign_1.X509();
        jsrassignX509Issuer.readCertHex(issuer.raw.toString('hex'));
        const allCerts = [jsrassignX509Issuer];
        for (const certHex of parsedResponse.certs) {
            const cert = new jsrsasign_1.X509();
            cert.readCertHex(certHex);
            allCerts.push(cert);
        }
        let signingCert = null;
        if (parsedResponse.respid.key) {
            for (const cert of allCerts) {
                const shasum = (0, crypto_1.createHash)('sha1');
                shasum.update(Buffer.from(cert.getSPKIValue(), 'hex'));
                const spkiHash = shasum.digest('hex');
                if (spkiHash === parsedResponse.respid.key) {
                    signingCert = new crypto_1.X509Certificate(Buffer.from(cert.hex, 'hex'));
                }
            }
        }
        else if (parsedResponse.respid.name) {
            for (const cert of allCerts) {
                if (cert.getSubject().str === parsedResponse.respid.name.str) {
                    signingCert = new crypto_1.X509Certificate(Buffer.from(cert.hex, 'hex'));
                }
            }
        }
        if (signingCert == null) {
            throw new VerificationException(VerificationStatus.FAILURE);
        }
        // Verify Signing Cert is issued by issuer
        if (signingCert.publicKey === issuer.publicKey && signingCert.subject === issuer.subject) {
            // This is directly signed by the issuer
        }
        else if (signingCert.verify(issuer.publicKey)) {
            // This is issued by the issuer, let's check the dates and purpose
            const signingCertAsign = new jsrsasign_1.X509();
            signingCertAsign.readCertPEM(signingCert.toString());
            if (!signingCertAsign.getExtExtKeyUsage().array.includes("ocspSigning")) {
                throw new VerificationException(VerificationStatus.INVALID_CERTIFICATE);
            }
            this.checkDates(signingCert, new Date());
        }
        else {
            throw new VerificationException(VerificationStatus.INVALID_CERTIFICATE);
        }
        // Extract raw responseData
        const responseData = jsrsasign_1.ASN1HEX.getTLVbyList(responseBuffer.toString('hex'), 0, [1, 0, 1, 0, 0]);
        // Verify Payload signed by cert
        const shortAlg = parsedResponse.alg.substring(0, 6).toUpperCase();
        if (shortAlg !== "SHA256" && shortAlg !== "SHA384" && shortAlg !== "SHA512") {
            throw new VerificationException(VerificationStatus.FAILURE);
        }
        if (!(0, crypto_1.verify)(shortAlg, Buffer.from(responseData, 'hex'), signingCert.publicKey, Buffer.from(parsedResponse.sighex, 'hex'))) {
            throw new VerificationException(VerificationStatus.FAILURE);
        }
        for (const singleResponse of parsedResponse.array) {
            // Confirm entry is for this cert
            const certIdBuilder = new jsrsasign_1.KJUR.asn1.ocsp.CertID();
            const currentCertCertId = certIdBuilder.getParamByCerts(issuer.toString(), cert.toString(), 'sha256');
            if (!(currentCertCertId.alg === singleResponse.certid.alg && currentCertCertId.issname === singleResponse.certid.issname &&
                currentCertCertId.isskey === singleResponse.certid.isskey && currentCertCertId.sbjsn === singleResponse.certid.sbjsn)) {
                continue;
            }
            // Validate contents
            const issueDate = this.parseX509Date(singleResponse.thisupdate);
            const nextDate = this.parseX509Date(singleResponse.nextupdate);
            if (singleResponse.status.status !== 'good' || new Date().getTime() - MAX_SKEW < issueDate.getTime() || nextDate.getTime() < new Date().getTime() + MAX_SKEW) {
                throw new VerificationException(VerificationStatus.FAILURE);
            }
            // Success
            return;
        }
        throw new VerificationException(VerificationStatus.FAILURE);
    }
    checkDates(cert, effectiveDate) {
        if (new Date(cert.validFrom).getTime() > (effectiveDate.getTime() + MAX_SKEW) ||
            new Date(cert.validTo).getTime() < (effectiveDate.getTime() - MAX_SKEW)) {
            throw new VerificationException(VerificationStatus.INVALID_CERTIFICATE);
        }
    }
    parseX509Date(date) {
        return new Date(date.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$4:$5:$6 $2/$3/$1'));
    }
    extractSignedDate(decodedJWT) {
        return decodedJWT.signedDate === undefined ? new Date() : new Date(decodedJWT.signedDate);
    }
}
exports.SignedDataVerifier = SignedDataVerifier;
var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus[VerificationStatus["OK"] = 0] = "OK";
    VerificationStatus[VerificationStatus["VERIFICATION_FAILURE"] = 1] = "VERIFICATION_FAILURE";
    VerificationStatus[VerificationStatus["INVALID_APP_IDENTIFIER"] = 2] = "INVALID_APP_IDENTIFIER";
    VerificationStatus[VerificationStatus["INVALID_ENVIRONMENT"] = 3] = "INVALID_ENVIRONMENT";
    VerificationStatus[VerificationStatus["INVALID_CHAIN_LENGTH"] = 4] = "INVALID_CHAIN_LENGTH";
    VerificationStatus[VerificationStatus["INVALID_CERTIFICATE"] = 5] = "INVALID_CERTIFICATE";
    VerificationStatus[VerificationStatus["FAILURE"] = 6] = "FAILURE";
})(VerificationStatus || (exports.VerificationStatus = VerificationStatus = {}));
class VerificationException extends Error {
    constructor(status, cause) {
        super();
        this.status = status;
        this.cause = cause;
    }
}
exports.VerificationException = VerificationException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiandzX3ZlcmlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2p3c192ZXJpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDREQUE0RDs7O0FBRTVELDZDQUE4QztBQUU5Qyx5Q0FBa0M7QUFDbEMsbUNBQXdFO0FBQ3hFLHlDQUFnRDtBQUNoRCwyQ0FBNEM7QUFDNUMsc0RBQW1EO0FBQ25ELHdGQUE0SDtBQUM1SCx3RkFBNEg7QUFDNUgsd0ZBQTRIO0FBRzVILDREQUFrRjtBQUVsRixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUE7QUFFdEI7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFhLGtCQUFrQjtJQVkzQjs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxxQkFBK0IsRUFBRSxrQkFBMkIsRUFBRSxXQUF3QixFQUFFLFFBQWdCLEVBQUUsVUFBbUI7UUFuQmpJLDBDQUFxQyxHQUFHLElBQUksb0VBQXFDLEVBQUUsQ0FBQTtRQUNuRiwwQ0FBcUMsR0FBRyxJQUFJLG9FQUFxQyxFQUFFLENBQUE7UUFDbkYsMENBQXFDLEdBQUcsSUFBSSxvRUFBcUMsRUFBRSxDQUFBO1FBQ25GLDRCQUF1QixHQUFHLElBQUksd0NBQXVCLEVBQUUsQ0FBQTtRQWlCN0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksd0JBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQ3BGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQTtRQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQTtRQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtRQUM1QixJQUFJLFdBQVcsS0FBSyx5QkFBVyxDQUFDLFVBQVUsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFLENBQUM7WUFD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R0FBRyxLQUFLLENBQUE7SUFDcEIsQ0FBQztDQUNGO0FBVEQsc0RBU0MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjMgQXBwbGUgSW5jLiBMaWNlbnNlZCB1bmRlciBNSVQgTGljZW5zZS5cblxuaW1wb3J0IGpzb253ZWJ0b2tlbiA9IHJlcXVpcmUoJ2pzb253ZWJ0b2tlbicpO1xuXG5pbXBvcnQgYmFzZTY0dXJsIGZyb20gJ2Jhc2U2NHVybCc7XG5pbXBvcnQgeyBLZXlPYmplY3QsIFg1MDlDZXJ0aWZpY2F0ZSwgY3JlYXRlSGFzaCwgdmVyaWZ5IH0gZnJvbSAnY3J5cHRvJztcbmltcG9ydCB7IEtKVVIsIFg1MDksIEFTTjFIRVggfSBmcm9tICdqc3JzYXNpZ24nO1xuaW1wb3J0IGZldGNoLCB7IEhlYWRlcnMgfSBmcm9tICdub2RlLWZldGNoJztcbmltcG9ydCB7IEVudmlyb25tZW50IH0gZnJvbSAnLi9tb2RlbHMvRW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgSldTVHJhbnNhY3Rpb25EZWNvZGVkUGF5bG9hZCwgSldTVHJhbnNhY3Rpb25EZWNvZGVkUGF5bG9hZFZhbGlkYXRvciB9IGZyb20gJy4vbW9kZWxzL0pXU1RyYW5zYWN0aW9uRGVjb2RlZFBheWxvYWQnO1xuaW1wb3J0IHsgUmVzcG9uc2VCb2R5VjJEZWNvZGVkUGF5bG9hZCwgUmVzcG9uc2VCb2R5VjJEZWNvZGVkUGF5bG9hZFZhbGlkYXRvciB9IGZyb20gJy4vbW9kZWxzL1Jlc3BvbnNlQm9keVYyRGVjb2RlZFBheWxvYWQnO1xuaW1wb3J0IHsgSldTUmVuZXdhbEluZm9EZWNvZGVkUGF5bG9hZCwgSldTUmVuZXdhbEluZm9EZWNvZGVkUGF5bG9hZFZhbGlkYXRvciB9IGZyb20gJy4vbW9kZWxzL0pXU1JlbmV3YWxJbmZvRGVjb2RlZFBheWxvYWQnO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnLi9tb2RlbHMvVmFsaWRhdG9yJztcbmltcG9ydCB7IERlY29kZWRTaWduZWREYXRhIH0gZnJvbSAnLi9tb2RlbHMvRGVjb2RlZFNpZ25lZERhdGEnO1xuaW1wb3J0IHsgQXBwVHJhbnNhY3Rpb24sIEFwcFRyYW5zYWN0aW9uVmFsaWRhdG9yIH0gZnJvbSAnLi9tb2RlbHMvQXBwVHJhbnNhY3Rpb24nO1xuXG5jb25zdCBNQVhfU0tFVyA9IDYwMDAwXG5cbi8qKlxuICogQSBjbGFzcyBwcm92aWRpbmcgdXRpbGl0eSBtZXRob2RzIGZvciB2ZXJpZnlpbmcgYW5kIGRlY29kaW5nIEFwcCBTdG9yZSBzaWduZWQgZGF0YS5cbiAqIFxuICogRXhhbXBsZSBVc2FnZTpcbiAqIGBgYHRzXG4gKiBjb25zdCB2ZXJpZmllciA9IG5ldyBTaWduZWREYXRhVmVyaWZpZXIoW2FwcGxlUm9vdCwgYXBwbGVSb290Ml0sIHRydWUsIEVudmlyb25tZW50LlNBTkRCT1gsIFwiY29tLmV4YW1wbGVcIilcbiAqIFxuICogdHJ5IHtcbiAqICAgICBjb25zdCBkZWNvZGVkTm90aWZpY2F0aW9uID0gdmVyaWZpZXIudmVyaWZ5QW5kRGVjb2RlTm90aWZpY2F0aW9uKFwiZXkuLi5cIilcbiAqICAgICBjb25zb2xlLmxvZyhkZWNvZGVkTm90aWZpY2F0aW9uKVxuICogfSBjYXRjaCAoZSkge1xuICogICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgU2lnbmVkRGF0YVZlcmlmaWVyIHtcbiAgICBwcml2YXRlIEpXU1JlbmV3YWxJbmZvRGVjb2RlZFBheWxvYWRWYWxpZGF0b3IgPSBuZXcgSldTUmVuZXdhbEluZm9EZWNvZGVkUGF5bG9hZFZhbGlkYXRvcigpXG4gICAgcHJpdmF0ZSBKV1NUcmFuc2FjdGlvbkRlY29kZWRQYXlsb2FkVmFsaWRhdG9yID0gbmV3IEpXU1RyYW5zYWN0aW9uRGVjb2RlZFBheWxvYWRWYWxpZGF0b3IoKVxuICAgIHByaXZhdGUgcmVzcG9uc2VCb2R5VjJEZWNvZGVkUGF5bG9hZFZhbGlkYXRvciA9IG5ldyBSZXNwb25zZUJvZHlWMkRlY29kZWRQYXlsb2FkVmFsaWRhdG9yKClcbiAgICBwcml2YXRlIGFwcFRyYW5zYWN0aW9uVmFsaWRhdG9yID0gbmV3IEFwcFRyYW5zYWN0aW9uVmFsaWRhdG9yKClcblxuICAgIHByb3RlY3RlZCByb290Q2VydGlmaWNhdGVzOiBYNTA5Q2VydGlmaWNhdGVbXVxuICAgIHByb3RlY3RlZCBlbmFibGVPbmxpbmVDaGVja3M6IGJvb2xlYW5cbiAgICBwcm90ZWN0ZWQgYnVuZGxlSWQ6IHN0cmluZ1xuICAgIHByb3RlY3RlZCBhcHBBcHBsZUlkPzogbnVtYmVyXG4gICAgcHJvdGVjdGVkIGVudmlyb25tZW50OiBFbnZpcm9ubWVudFxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGFwcGxlUm9vdENlcnRpZmljYXRlcyBBIGxpc3Qgb2YgREVSLWVuY29kZWQgcm9vdCBjZXJ0aWZpY2F0ZXMgXG4gICAgICogQHBhcmFtIGVuYWJsZU9ubGluZUNoZWNrcyBXaGV0aGVyIHRvIGVuYWJsZSByZXZvY2F0aW9uIGNoZWNraW5nIGFuZCBjaGVjayBleHBpcmF0aW9uIHVzaW5nIHRoZSBjdXJyZW50IGRhdGVcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnQgVGhlIEFwcCBTdG9yZSBlbnZpcm9ubWVudCB0byB0YXJnZXQgZm9yIGNoZWNrc1xuICAgICAqIEBwYXJhbSBidW5kbGVJZCBUaGUgYXBwJ3MgYnVuZGxlIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0gYXBwQXBwbGVJZCBUaGUgYXBwJ3MgaWRlbnRpZmllciwgb21taXR0ZWQgaW4gdGhlIHNhbmRib3ggZW52aXJvbm1lbnRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihhcHBsZVJvb3RDZXJ0aWZpY2F0ZXM6IEJ1ZmZlcltdLCBlbmFibGVPbmxpbmVDaGVja3M6IGJvb2xlYW4sIGVudmlyb25tZW50OiBFbnZpcm9ubWVudCwgYnVuZGxlSWQ6IHN0cmluZywgYXBwQXBwbGVJZD86IG51bWJlcikge1xuICAgICAgdGhpcy5yb290Q2VydGlmaWNhdGVzID0gYXBwbGVSb290Q2VydGlmaWNhdGVzLm1hcChjZXJ0ID0+IG5ldyBYNTA5Q2VydGlmaWNhdGUoY2VydCkpXG4gICAgICB0aGlzLmVuYWJsZU9ubGluZUNoZWNrcyA9IGVuYWJsZU9ubGluZUNoZWNrc1xuICAgICAgdGhpcy5idW5kbGVJZCA9IGJ1bmRsZUlkO1xuICAgICAgdGhpcy5lbnZpcm9ubWVudCA9IGVudmlyb25tZW50XG4gICAgICB0aGlzLmFwcEFwcGxlSWQgPSBhcHBBcHBsZUlkXG4gICAgICBpZiAoZW52aXJvbm1lbnQgPT09IEVudmlyb25tZW50LlBST0RVQ1RJT04gJiYgYXBwQXBwbGVJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImFwcEFwcGxlSWQgaXMgcmVxdWlyZWQgd2hlbiB0aGUgZW52aXJvbm1lbnQgaXMgUHJvZHVjdGlvblwiKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGFuZCBkZWNvZGVzIGEgc2lnbmVkVHJhbnNhY3Rpb24gb2J0YWluZWQgZnJvbSB0aGUgQXBwIFN0b3JlIFNlcnZlciBBUEksIGFuIEFwcCBTdG9yZSBTZXJ2ZXIgTm90aWZpY2F0aW9uLCBvciBmcm9tIGEgZGV2aWNlXG4gICAgICogU2VlIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9qd3N0cmFuc2FjdGlvbiBKV1NUcmFuc2FjdGlvbn1cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzaWduZWRUcmFuc2FjdGlvbiBUaGUgc2lnbmVkVHJhbnNhY3Rpb24gZmllbGRcbiAgICAgKiBAcmV0dXJuIFRoZSBkZWNvZGVkIHRyYW5zYWN0aW9uIGluZm8gYWZ0ZXIgdmVyaWZpY2F0aW9uXG4gICAgICogQHRocm93cyBWZXJpZmljYXRpb25FeGNlcHRpb24gVGhyb3duIGlmIHRoZSBkYXRhIGNvdWxkIG5vdCBiZSB2ZXJpZmllZFxuICAgICAqL1xuICAgIGFzeW5jIHZlcmlmeUFuZERlY29kZVRyYW5zYWN0aW9uKHNpZ25lZFRyYW5zYWN0aW9uSW5mbzogc3RyaW5nKTogUHJvbWlzZTxKV1NUcmFuc2FjdGlvbkRlY29kZWRQYXlsb2FkPiB7XG4gICAgICBjb25zdCBkZWNvZGVkSldUOiBKV1NUcmFuc2FjdGlvbkRlY29kZWRQYXlsb2FkID0gYXdhaXQgdGhpcy52ZXJpZnlKV1Qoc2lnbmVkVHJhbnNhY3Rpb25JbmZvLCB0aGlzLkpXU1RyYW5zYWN0aW9uRGVjb2RlZFBheWxvYWRWYWxpZGF0b3IsIHRoaXMuZXh0cmFjdFNpZ25lZERhdGUpO1xuICAgICAgaWYgKGRlY29kZWRKV1QuYnVuZGxlSWQgIT09IHRoaXMuYnVuZGxlSWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFZlcmlmaWNhdGlvbkV4Y2VwdGlvbihWZXJpZmljYXRpb25TdGF0dXMuSU5WQUxJRF9BUFBfSURFTlRJRklFUilcbiAgICAgIH1cbiAgICAgIGlmIChkZWNvZGVkSldULmVudmlyb25tZW50ICE9PSB0aGlzLmVudmlyb25tZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBWZXJpZmljYXRpb25FeGNlcHRpb24oVmVyaWZpY2F0aW9uU3RhdHVzLklOVkFMSURfRU5WSVJPTk1FTlQpXG4gICAgICB9XG4gICAgICByZXR1cm4gZGVjb2RlZEpXVDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWZXJpZmllcyBhbmQgZGVjb2RlcyBhIHNpZ25lZFJlbmV3YWxJbmZvIG9idGFpbmVkIGZyb20gdGhlIEFwcCBTdG9yZSBTZXJ2ZXIgQVBJLCBhbiBBcHAgU3RvcmUgU2VydmVyIE5vdGlmaWNhdGlvbiwgb3IgZnJvbSBhIGRldmljZVxuICAgICAqIFNlZSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvandzcmVuZXdhbGluZm8gSldTUmVuZXdhbEluZm99XG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2lnbmVkUmVuZXdhbEluZm8gVGhlIHNpZ25lZFJlbmV3YWxJbmZvIGZpZWxkXG4gICAgICogQHJldHVybiBUaGUgZGVjb2RlZCByZW5ld2FsIGluZm8gYWZ0ZXIgdmVyaWZpY2F0aW9uXG4gICAgICogQHRocm93cyBWZXJpZmljYXRpb25FeGNlcHRpb24gVGhyb3duIGlmIHRoZSBkYXRhIGNvdWxkIG5vdCBiZSB2ZXJpZmllZFxuICAgICAqL1xuICAgIGFzeW5jIHZlcmlmeUFuZERlY29kZVJlbmV3YWxJbmZvKHNpZ25lZFJlbmV3YWxJbmZvOiBzdHJpbmcpOiBQcm9taXNlPEpXU1JlbmV3YWxJbmZvRGVjb2RlZFBheWxvYWQ+IHtcbiAgICAgIGNvbnN0IGRlY29kZWRSZW5ld2FsSW5mbzogSldTUmVuZXdhbEluZm9EZWNvZGVkUGF5bG9hZCA9IGF3YWl0IHRoaXMudmVyaWZ5SldUKHNpZ25lZFJlbmV3YWxJbmZvLCB0aGlzLkpXU1JlbmV3YWxJbmZvRGVjb2RlZFBheWxvYWRWYWxpZGF0b3IsIHRoaXMuZXh0cmFjdFNpZ25lZERhdGUpO1xuICAgICAgY29uc3QgZW52aXJvbm1lbnQgPSBkZWNvZGVkUmVuZXdhbEluZm8uZW52aXJvbm1lbnRcbiAgICAgIGlmICh0aGlzLmVudmlyb25tZW50ICE9PSBlbnZpcm9ubWVudCkge1xuICAgICAgICB0aHJvdyBuZXcgVmVyaWZpY2F0aW9uRXhjZXB0aW9uKFZlcmlmaWNhdGlvblN0YXR1cy5JTlZBTElEX0VOVklST05NRU5UKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGRlY29kZWRSZW5ld2FsSW5mb1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGFuZCBkZWNvZGVzIGFuIEFwcCBTdG9yZSBTZXJ2ZXIgTm90aWZpY2F0aW9uIHNpZ25lZFBheWxvYWRcbiAgICAgKiBTZWUge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVybm90aWZpY2F0aW9ucy9zaWduZWRwYXlsb2FkIHNpZ25lZFBheWxvYWR9XG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2lnbmVkUGF5bG9hZCBUaGUgcGF5bG9hZCByZWNlaXZlZCBieSB5b3VyIHNlcnZlclxuICAgICAqIEByZXR1cm4gVGhlIGRlY29kZWQgcGF5bG9hZCBhZnRlciB2ZXJpZmljYXRpb25cbiAgICAgKiBAdGhyb3dzIFZlcmlmaWNhdGlvbkV4Y2VwdGlvbiBUaHJvd24gaWYgdGhlIGRhdGEgY291bGQgbm90IGJlIHZlcmlmaWVkXG4gICAgICovXG4gICAgYXN5bmMgdmVyaWZ5QW5kRGVjb2RlTm90aWZpY2F0aW9uKHNpZ25lZFBheWxvYWQ6IHN0cmluZyk6IFByb21pc2U8UmVzcG9uc2VCb2R5VjJEZWNvZGVkUGF5bG9hZD4ge1xuICAgICAgY29uc3QgZGVjb2RlZEpXVDogUmVzcG9uc2VCb2R5VjJEZWNvZGVkUGF5bG9hZCA9IGF3YWl0IHRoaXMudmVyaWZ5SldUKHNpZ25lZFBheWxvYWQsIHRoaXMucmVzcG9uc2VCb2R5VjJEZWNvZGVkUGF5bG9hZFZhbGlkYXRvciwgdGhpcy5leHRyYWN0U2lnbmVkRGF0ZSk7XG4gICAgICBsZXQgYXBwQXBwbGVJZDogbnVtYmVyIHwgdW5kZWZpbmVkXG4gICAgICBsZXQgYnVuZGxlSWQ6IHN0cmluZyB8IHVuZGVmaW5lZFxuICAgICAgbGV0IGVudmlyb25tZW50OiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgICAgIGlmIChkZWNvZGVkSldULmRhdGEpIHtcbiAgICAgICAgYXBwQXBwbGVJZCA9IGRlY29kZWRKV1QuZGF0YS5hcHBBcHBsZUlkXG4gICAgICAgIGJ1bmRsZUlkID0gZGVjb2RlZEpXVC5kYXRhLmJ1bmRsZUlkXG4gICAgICAgIGVudmlyb25tZW50ID0gZGVjb2RlZEpXVC5kYXRhLmVudmlyb25tZW50XG4gICAgICB9IGVsc2UgaWYgKGRlY29kZWRKV1Quc3VtbWFyeSkge1xuICAgICAgICBhcHBBcHBsZUlkID0gZGVjb2RlZEpXVC5zdW1tYXJ5LmFwcEFwcGxlSWRcbiAgICAgICAgYnVuZGxlSWQgPSBkZWNvZGVkSldULnN1bW1hcnkuYnVuZGxlSWRcbiAgICAgICAgZW52aXJvbm1lbnQgPSBkZWNvZGVkSldULnN1bW1hcnkuZW52aXJvbm1lbnRcbiAgICAgIH0gZWxzZSBpZiAoZGVjb2RlZEpXVC5leHRlcm5hbFB1cmNoYXNlVG9rZW4pIHtcbiAgICAgICAgYXBwQXBwbGVJZCA9IGRlY29kZWRKV1QuZXh0ZXJuYWxQdXJjaGFzZVRva2VuLmFwcEFwcGxlSWRcbiAgICAgICAgYnVuZGxlSWQgPSBkZWNvZGVkSldULmV4dGVybmFsUHVyY2hhc2VUb2tlbi5idW5kbGVJZFxuICAgICAgICBpZiAoZGVjb2RlZEpXVC5leHRlcm5hbFB1cmNoYXNlVG9rZW4uZXh0ZXJuYWxQdXJjaGFzZUlkICYmIGRlY29kZWRKV1QuZXh0ZXJuYWxQdXJjaGFzZVRva2VuLmV4dGVybmFsUHVyY2hhc2VJZC5zdGFydHNXaXRoKFwiU0FOREJPWFwiKSkge1xuICAgICAgICAgIGVudmlyb25tZW50ID0gRW52aXJvbm1lbnQuU0FOREJPWFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVudmlyb25tZW50ID0gRW52aXJvbm1lbnQuUFJPRFVDVElPTlxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnZlcmlmeU5vdGlmaWNhdGlvbihidW5kbGVJZCwgYXBwQXBwbGVJZCwgZW52aXJvbm1lbnQpXG4gICAgICByZXR1cm4gZGVjb2RlZEpXVFxuICAgIH1cblxuICAgIHByb3RlY3RlZCB2ZXJpZnlOb3RpZmljYXRpb24oYnVuZGxlSWQ/OiBzdHJpbmcsIGFwcEFwcGxlSWQ/OiBudW1iZXIsIGVudmlyb25tZW50Pzogc3RyaW5nKSB7XG4gICAgICBpZiAodGhpcy5idW5kbGVJZCAhPT0gYnVuZGxlSWQgfHwgKHRoaXMuZW52aXJvbm1lbnQgPT09IEVudmlyb25tZW50LlBST0RVQ1RJT04gJiYgdGhpcy5hcHBBcHBsZUlkICE9PSBhcHBBcHBsZUlkKSkge1xuICAgICAgICB0aHJvdyBuZXcgVmVyaWZpY2F0aW9uRXhjZXB0aW9uKFZlcmlmaWNhdGlvblN0YXR1cy5JTlZBTElEX0FQUF9JREVOVElGSUVSKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZW52aXJvbm1lbnQgIT09IGVudmlyb25tZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBWZXJpZmljYXRpb25FeGNlcHRpb24oVmVyaWZpY2F0aW9uU3RhdHVzLklOVkFMSURfRU5WSVJPTk1FTlQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmVyaWZpZXMgYW5kIGRlY29kZXMgYSBzaWduZWQgQXBwVHJhbnNhY3Rpb25cbiAgICAgKiBTZWUge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL3N0b3Jla2l0L2FwcHRyYW5zYWN0aW9uIEFwcFRyYW5zYWN0aW9ufVxuICAgICAqXG4gICAgICogQHBhcmFtIHNpZ25lZEFwcFRyYW5zYWN0aW9uIFRoZSBzaWduZWQgQXBwVHJhbnNhY3Rpb25cbiAgICAgKiBAcmV0dXJucyBUaGUgZGVjb2RlZCBBcHBUcmFuc2FjdGlvbiBhZnRlciB2YWxpZGF0aW9uXG4gICAgICogQHRocm93cyBWZXJpZmljYXRpb25FeGNlcHRpb24gVGhyb3duIGlmIHRoZSBkYXRhIGNvdWxkIG5vdCBiZSB2ZXJpZmllZFxuICAgICAqL1xuICAgIGFzeW5jIHZlcmlmeUFuZERlY29kZUFwcFRyYW5zYWN0aW9uKHNpZ25lZEFwcFRyYW5zYWN0aW9uOiBzdHJpbmcpOiBQcm9taXNlPEFwcFRyYW5zYWN0aW9uPiB7XG4gICAgICBjb25zdCBkZWNvZGVkQXBwVHJhbnNhY3Rpb246IEFwcFRyYW5zYWN0aW9uID0gYXdhaXQgdGhpcy52ZXJpZnlKV1Qoc2lnbmVkQXBwVHJhbnNhY3Rpb24sIHRoaXMuYXBwVHJhbnNhY3Rpb25WYWxpZGF0b3IsIHQgPT4gdC5yZWNlaXB0Q3JlYXRpb25EYXRlID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSgpIDogbmV3IERhdGUodC5yZWNlaXB0Q3JlYXRpb25EYXRlKSk7XG4gICAgICBjb25zdCBlbnZpcm9ubWVudCA9IGRlY29kZWRBcHBUcmFuc2FjdGlvbi5yZWNlaXB0VHlwZVxuICAgICAgaWYgKHRoaXMuYnVuZGxlSWQgIT09IGRlY29kZWRBcHBUcmFuc2FjdGlvbi5idW5kbGVJZCB8fCAodGhpcy5lbnZpcm9ubWVudCA9PT0gRW52aXJvbm1lbnQuUFJPRFVDVElPTiAmJiB0aGlzLmFwcEFwcGxlSWQgIT09IGRlY29kZWRBcHBUcmFuc2FjdGlvbi5hcHBBcHBsZUlkKSkge1xuICAgICAgICB0aHJvdyBuZXcgVmVyaWZpY2F0aW9uRXhjZXB0aW9uKFZlcmlmaWNhdGlvblN0YXR1cy5JTlZBTElEX0FQUF9JREVOVElGSUVSKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZW52aXJvbm1lbnQgIT09IGVudmlyb25tZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBWZXJpZmljYXRpb25FeGNlcHRpb24oVmVyaWZpY2F0aW9uU3RhdHVzLklOVkFMSURfRU5WSVJPTk1FTlQpXG4gICAgICB9XG4gICAgICByZXR1cm4gZGVjb2RlZEFwcFRyYW5zYWN0aW9uXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIHZlcmlmeUpXVDxUPihqd3Q6IHN0cmluZywgdmFsaWRhdG9yOiBWYWxpZGF0b3I8VD4sIHNpZ25lZERhdGVFeHRyYWN0b3I6IChkZWNvZGVkSldUOiBUKSA9PiBEYXRlKTogUHJvbWlzZTxUPiB7XG4gICAgICBsZXQgY2VydGlmaWNhdGVDaGFpbjtcbiAgICAgIGxldCBkZWNvZGVkSldUXG4gICAgICB0cnkge1xuICAgICAgICBkZWNvZGVkSldUID0ganNvbndlYnRva2VuLmRlY29kZShqd3QpXG4gICAgICAgIGlmICghdmFsaWRhdG9yLnZhbGlkYXRlKGRlY29kZWRKV1QpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFZlcmlmaWNhdGlvbkV4Y2VwdGlvbihWZXJpZmljYXRpb25TdGF0dXMuRkFJTFVSRSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lbnZpcm9ubWVudCA9PT0gRW52aXJvbm1lbnQuWENPREUgfHwgdGhpcy5lbnZpcm9ubWVudCA9PT0gRW52aXJvbm1lbnQuTE9DQUxfVEVTVElORykge1xuICAgICAgICAgIC8vIERhdGEgaXMgbm90IHNpZ25lZCBieSB0aGUgQXBwIFN0b3JlLCBhbmQgdmVyaWZpY2F0aW9uIHNob3VsZCBiZSBza2lwcGVkXG4gICAgICAgICAgLy8gVGhlIGVudmlyb25tZW50IE1VU1QgYmUgY2hlY2tlZCBpbiB0aGUgcHVibGljIG1ldGhvZCBjYWxsaW5nIHRoaXNcbiAgICAgICAgICByZXR1cm4gZGVjb2RlZEpXVFxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgaGVhZGVyID0gand0LnNwbGl0KCcuJylbMF1cbiAgICAgICAgICBjb25zdCBkZWNvZGVkSGVhZGVyID0gYmFzZTY0dXJsLmRlY29kZShoZWFkZXIpXG4gICAgICAgICAgY29uc3QgaGVhZGVyT2JqID0gSlNPTi5wYXJzZShkZWNvZGVkSGVhZGVyKVxuICAgICAgICAgIGNvbnN0IGNoYWluOiBzdHJpbmdbXSA9IGhlYWRlck9ialsneDVjJ10gPz8gW11cbiAgICAgICAgICBpZiAoY2hhaW4ubGVuZ3RoICE9IDMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBWZXJpZmljYXRpb25FeGNlcHRpb24oVmVyaWZpY2F0aW9uU3RhdHVzLklOVkFMSURfQ0hBSU5fTEVOR1RIKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjZXJ0aWZpY2F0ZUNoYWluID0gY2hhaW4uc2xpY2UoMCwgMikubWFwKGNlcnQgPT4gbmV3IFg1MDlDZXJ0aWZpY2F0ZShCdWZmZXIuZnJvbShjZXJ0LCAnYmFzZTY0JykpKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVmVyaWZpY2F0aW9uRXhjZXB0aW9uKFZlcmlmaWNhdGlvblN0YXR1cy5JTlZBTElEX0NFUlRJRklDQVRFLCBlcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgbmV3IFZlcmlmaWNhdGlvbkV4Y2VwdGlvbihWZXJpZmljYXRpb25TdGF0dXMuSU5WQUxJRF9DRVJUSUZJQ0FURSlcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlZmZlY3RpdmVEYXRlID0gdGhpcy5lbmFibGVPbmxpbmVDaGVja3MgPyBuZXcgRGF0ZSgpIDogc2lnbmVkRGF0ZUV4dHJhY3RvcihkZWNvZGVkSldUKVxuICAgICAgICBjb25zdCBwdWJsaWNLZXkgPSBhd2FpdCB0aGlzLnZlcmlmeUNlcnRpZmljYXRlQ2hhaW4odGhpcy5yb290Q2VydGlmaWNhdGVzLCBjZXJ0aWZpY2F0ZUNoYWluWzBdLCBjZXJ0aWZpY2F0ZUNoYWluWzFdLCBlZmZlY3RpdmVEYXRlKTtcbiAgICAgICAgY29uc3QgZW5jb2RlZEtleSA9IHB1YmxpY0tleS5leHBvcnQoe1xuICAgICAgICAgIHR5cGU6IFwic3BraVwiLFxuICAgICAgICAgIGZvcm1hdDogXCJwZW1cIlxuICAgICAgICB9KTtcbiAgICAgICAganNvbndlYnRva2VuLnZlcmlmeShqd3QsIGVuY29kZWRLZXkpIGFzIFRcbiAgICAgICAgcmV0dXJuIGRlY29kZWRKV1RcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFZlcmlmaWNhdGlvbkV4Y2VwdGlvbikge1xuICAgICAgICAgIHRocm93IGVycm9yXG4gICAgICAgIH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHRocm93IG5ldyBWZXJpZmljYXRpb25FeGNlcHRpb24oVmVyaWZpY2F0aW9uU3RhdHVzLlZFUklGSUNBVElPTl9GQUlMVVJFLCBlcnJvcilcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgVmVyaWZpY2F0aW9uRXhjZXB0aW9uKFZlcmlmaWNhdGlvblN0YXR1cy5WRVJJRklDQVRJT05fRkFJTFVSRSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXN5bmMgdmVyaWZ5Q2VydGlmaWNhdGVDaGFpbih0cnVzdGVkUm9vdHM6IFg1MDlDZXJ0aWZpY2F0ZVtdLCBsZWFmOiBYNTA5Q2VydGlmaWNhdGUsIGludGVybWVkaWF0ZTogWDUwOUNlcnRpZmljYXRlLCBlZmZlY3RpdmVEYXRlOiBEYXRlKTogUHJvbWlzZTxLZXlPYmplY3Q+IHtcbiAgICAgIGxldCB2YWxpZGl0eSA9IGZhbHNlXG4gICAgICBsZXQgcm9vdENlcnRcbiAgICAgIGZvciAoY29uc3Qgcm9vdCBvZiB0cnVzdGVkUm9vdHMpIHtcbiAgICAgICAgaWYgKGludGVybWVkaWF0ZS52ZXJpZnkocm9vdC5wdWJsaWNLZXkpICYmIGludGVybWVkaWF0ZS5pc3N1ZXIgPT09IHJvb3Quc3ViamVjdCkge1xuICAgICAgICAgIHZhbGlkaXR5ID0gdHJ1ZVxuICAgICAgICAgIHJvb3RDZXJ0ID0gcm9vdFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YWxpZGl0eSA9IHZhbGlkaXR5ICYmIGxlYWYudmVyaWZ5KGludGVybWVkaWF0ZS5wdWJsaWNLZXkpICYmIGxlYWYuaXNzdWVyID09PSBpbnRlcm1lZGlhdGUuc3ViamVjdFxuICAgICAgdmFsaWRpdHkgPSB2YWxpZGl0eSAmJiBpbnRlcm1lZGlhdGUuY2FcbiAgICAgIGNvbnN0IGpzcnNhc3NpZ25YNTA5TGVhZiA9IG5ldyBYNTA5KClcbiAgICAgIGpzcnNhc3NpZ25YNTA5TGVhZi5yZWFkQ2VydEhleChsZWFmLnJhdy50b1N0cmluZygnaGV4JykpXG4gICAgICBjb25zdCBqc3Jhc3NpZ25YNTA5SW50ZXJtZWRpYXRlID0gbmV3IFg1MDkoKVxuICAgICAganNyYXNzaWduWDUwOUludGVybWVkaWF0ZS5yZWFkQ2VydEhleChpbnRlcm1lZGlhdGUucmF3LnRvU3RyaW5nKCdoZXgnKSlcbiAgICAgIHZhbGlkaXR5ID0gdmFsaWRpdHkgJiYganNyc2Fzc2lnblg1MDlMZWFmLmdldEV4dEluZm8oXCIxLjIuODQwLjExMzYzNS4xMDAuNi4xMS4xXCIpICE9PSB1bmRlZmluZWRcbiAgICAgIHZhbGlkaXR5ID0gdmFsaWRpdHkgJiYganNyYXNzaWduWDUwOUludGVybWVkaWF0ZS5nZXRFeHRJbmZvKFwiMS4yLjg0MC4xMTM2MzUuMTAwLjYuMi4xXCIpICE9PSB1bmRlZmluZWRcbiAgICAgIGlmICghdmFsaWRpdHkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFZlcmlmaWNhdGlvbkV4Y2VwdGlvbihWZXJpZmljYXRpb25TdGF0dXMuVkVSSUZJQ0FUSU9OX0ZBSUxVUkUpO1xuICAgICAgfVxuICAgICAgcm9vdENlcnQgPSByb290Q2VydCBhcyBYNTA5Q2VydGlmaWNhdGVcbiAgICAgIHRoaXMuY2hlY2tEYXRlcyhsZWFmLCBlZmZlY3RpdmVEYXRlKVxuICAgICAgdGhpcy5jaGVja0RhdGVzKGludGVybWVkaWF0ZSwgZWZmZWN0aXZlRGF0ZSlcbiAgICAgIHRoaXMuY2hlY2tEYXRlcyhyb290Q2VydCwgZWZmZWN0aXZlRGF0ZSlcbiAgICAgIGlmICh0aGlzLmVuYWJsZU9ubGluZUNoZWNrcykge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbdGhpcy5jaGVja09DU1BTdGF0dXMobGVhZiwgaW50ZXJtZWRpYXRlKSwgdGhpcy5jaGVja09DU1BTdGF0dXMoaW50ZXJtZWRpYXRlLCByb290Q2VydCldKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGxlYWYucHVibGljS2V5XG4gICAgfVxuICAgIHByb3RlY3RlZCBhc3luYyBjaGVja09DU1BTdGF0dXMoY2VydDogWDUwOUNlcnRpZmljYXRlLCBpc3N1ZXI6IFg1MDlDZXJ0aWZpY2F0ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgY29uc3QgYXV0aG9yaXR5UmV4ID0gL15PQ1NQIC0gVVJJOiguKikkL21cbiAgICAgIGNvbnN0IG1hdGNoUmVzdWx0ID0gY2VydC5pbmZvQWNjZXNzID8gYXV0aG9yaXR5UmV4LmV4ZWMoY2VydC5pbmZvQWNjZXNzKSA6IFwiXCJcbiAgICAgIGlmIChtYXRjaFJlc3VsdCA9PT0gbnVsbCB8fCBtYXRjaFJlc3VsdC5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFZlcmlmaWNhdGlvbkV4Y2VwdGlvbihWZXJpZmljYXRpb25TdGF0dXMuSU5WQUxJRF9DRVJUSUZJQ0FURSlcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgS0pVUi5hc24xLm9jc3AuT0NTUFJlcXVlc3Qoe3JlcUxpc3Q6IFt7aXNzdWVyQ2VydDogaXNzdWVyLnRvU3RyaW5nKCksIHN1YmplY3RDZXJ0OiBjZXJ0LnRvU3RyaW5nKCkgLCBhbGc6IFwic2hhMjU2XCJ9XX0pXG4gICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKVxuICAgICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9vY3NwLXJlcXVlc3QnKVxuICAgICAgXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKG1hdGNoUmVzdWx0WzFdLCB7XG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBCdWZmZXIuZnJvbShyZXF1ZXN0LmdldEVuY29kZWRIZXgoKSwgJ2hleCcpXG4gICAgICB9KVxuICAgICAgXG4gICAgICBjb25zdCByZXNwb25zZUJ1ZmZlciA9IGF3YWl0IHJlc3BvbnNlLmJ1ZmZlcigpXG4gICAgICBjb25zdCBwYXJzZWRSZXNwb25zZSA9IG5ldyAoS0pVUi5hc24xLm9jc3AgYXMgYW55KS5PQ1NQUGFyc2VyKCkuZ2V0T0NTUFJlc3BvbnNlKHJlc3BvbnNlQnVmZmVyLnRvU3RyaW5nKCdoZXgnKSlcbiAgICAgIC8vIFRoZSBpc3N1ZXIgY291bGQgYWxzbyBiZSB0aGUgc2lnbmVyXG4gICAgICBjb25zdCBqc3Jhc3NpZ25YNTA5SXNzdWVyID0gbmV3IFg1MDkoKVxuICAgICAganNyYXNzaWduWDUwOUlzc3Vlci5yZWFkQ2VydEhleChpc3N1ZXIucmF3LnRvU3RyaW5nKCdoZXgnKSlcbiAgICAgIGNvbnN0IGFsbENlcnRzOiBYNTA5W10gPSBbanNyYXNzaWduWDUwOUlzc3Vlcl1cbiAgICAgIGZvciAoY29uc3QgY2VydEhleCBvZiBwYXJzZWRSZXNwb25zZS5jZXJ0cykge1xuICAgICAgICBjb25zdCBjZXJ0ID0gbmV3IFg1MDkoKVxuICAgICAgICBjZXJ0LnJlYWRDZXJ0SGV4KGNlcnRIZXgpXG4gICAgICAgIGFsbENlcnRzLnB1c2goY2VydClcbiAgICAgIH1cbiAgICAgIGxldCBzaWduaW5nQ2VydDogWDUwOUNlcnRpZmljYXRlIHwgbnVsbCA9IG51bGxcbiAgICAgIGlmIChwYXJzZWRSZXNwb25zZS5yZXNwaWQua2V5KSB7XG4gICAgICAgIGZvciAoY29uc3QgY2VydCBvZiBhbGxDZXJ0cykge1xuICAgICAgICAgIGNvbnN0IHNoYXN1bSA9IGNyZWF0ZUhhc2goJ3NoYTEnKVxuICAgICAgICAgIHNoYXN1bS51cGRhdGUoQnVmZmVyLmZyb20oY2VydC5nZXRTUEtJVmFsdWUoKSwgJ2hleCcpKVxuICAgICAgICAgIGNvbnN0IHNwa2lIYXNoID0gc2hhc3VtLmRpZ2VzdCgnaGV4JylcbiAgICAgICAgICBpZiAoc3BraUhhc2ggPT09IHBhcnNlZFJlc3BvbnNlLnJlc3BpZC5rZXkpIHtcbiAgICAgICAgICAgIHNpZ25pbmdDZXJ0ID0gbmV3IFg1MDlDZXJ0aWZpY2F0ZShCdWZmZXIuZnJvbShjZXJ0LmhleCwgJ2hleCcpKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwYXJzZWRSZXNwb25zZS5yZXNwaWQubmFtZSkge1xuICAgICAgICBmb3IgKGNvbnN0IGNlcnQgb2YgYWxsQ2VydHMpIHtcbiAgICAgICAgICBpZiAoY2VydC5nZXRTdWJqZWN0KCkuc3RyID09PSBwYXJzZWRSZXNwb25zZS5yZXNwaWQubmFtZS5zdHIpIHtcbiAgICAgICAgICAgIHNpZ25pbmdDZXJ0ID0gbmV3IFg1MDlDZXJ0aWZpY2F0ZShCdWZmZXIuZnJvbShjZXJ0LmhleCwgJ2hleCcpKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNpZ25pbmdDZXJ0ID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFZlcmlmaWNhdGlvbkV4Y2VwdGlvbihWZXJpZmljYXRpb25TdGF0dXMuRkFJTFVSRSlcbiAgICAgIH1cbiAgICAgIC8vIFZlcmlmeSBTaWduaW5nIENlcnQgaXMgaXNzdWVkIGJ5IGlzc3VlclxuICAgICAgaWYgKHNpZ25pbmdDZXJ0LnB1YmxpY0tleSA9PT0gaXNzdWVyLnB1YmxpY0tleSAmJiBzaWduaW5nQ2VydC5zdWJqZWN0ID09PSBpc3N1ZXIuc3ViamVjdCkge1xuICAgICAgICAvLyBUaGlzIGlzIGRpcmVjdGx5IHNpZ25lZCBieSB0aGUgaXNzdWVyXG4gICAgICB9IGVsc2UgaWYgKHNpZ25pbmdDZXJ0LnZlcmlmeShpc3N1ZXIucHVibGljS2V5KSkge1xuICAgICAgICAvLyBUaGlzIGlzIGlzc3VlZCBieSB0aGUgaXNzdWVyLCBsZXQncyBjaGVjayB0aGUgZGF0ZXMgYW5kIHB1cnBvc2VcbiAgICAgICAgY29uc3Qgc2lnbmluZ0NlcnRBc2lnbiA9IG5ldyBYNTA5KClcbiAgICAgICAgc2lnbmluZ0NlcnRBc2lnbi5yZWFkQ2VydFBFTShzaWduaW5nQ2VydC50b1N0cmluZygpKVxuICAgICAgICBpZiAoIXNpZ25pbmdDZXJ0QXNpZ24uZ2V0RXh0RXh0S2V5VXNhZ2UoKS5hcnJheS5pbmNsdWRlcyhcIm9jc3BTaWduaW5nXCIpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFZlcmlmaWNhdGlvbkV4Y2VwdGlvbihWZXJpZmljYXRpb25TdGF0dXMuSU5WQUxJRF9DRVJUSUZJQ0FURSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrRGF0ZXMoc2lnbmluZ0NlcnQsIG5ldyBEYXRlKCkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVmVyaWZpY2F0aW9uRXhjZXB0aW9uKFZlcmlmaWNhdGlvblN0YXR1cy5JTlZBTElEX0NFUlRJRklDQVRFKVxuICAgICAgfVxuICAgIFxuICAgICAgLy8gRXh0cmFjdCByYXcgcmVzcG9uc2VEYXRhXG4gICAgICBjb25zdCByZXNwb25zZURhdGEgPSBBU04xSEVYLmdldFRMVmJ5TGlzdChyZXNwb25zZUJ1ZmZlci50b1N0cmluZygnaGV4JyksIDAsIFsxLCAwLCAxLCAwLCAwXSkgYXMgc3RyaW5nXG4gICAgICAvLyBWZXJpZnkgUGF5bG9hZCBzaWduZWQgYnkgY2VydFxuICAgICAgY29uc3Qgc2hvcnRBbGcgPSBwYXJzZWRSZXNwb25zZS5hbGcuc3Vic3RyaW5nKDAsIDYpLnRvVXBwZXJDYXNlKClcbiAgICAgIGlmIChzaG9ydEFsZyAhPT0gXCJTSEEyNTZcIiAmJiBzaG9ydEFsZyAhPT0gXCJTSEEzODRcIiAmJiBzaG9ydEFsZyAhPT0gXCJTSEE1MTJcIikge1xuICAgICAgICB0aHJvdyBuZXcgVmVyaWZpY2F0aW9uRXhjZXB0aW9uKFZlcmlmaWNhdGlvblN0YXR1cy5GQUlMVVJFKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXZlcmlmeShzaG9ydEFsZywgQnVmZmVyLmZyb20ocmVzcG9uc2VEYXRhLCAnaGV4JyksIHNpZ25pbmdDZXJ0LnB1YmxpY0tleSwgQnVmZmVyLmZyb20ocGFyc2VkUmVzcG9uc2Uuc2lnaGV4LCAnaGV4JykpKSB7XG4gICAgICAgIHRocm93IG5ldyBWZXJpZmljYXRpb25FeGNlcHRpb24oVmVyaWZpY2F0aW9uU3RhdHVzLkZBSUxVUkUpXG4gICAgICB9XG4gICAgICBcbiAgICAgIGZvciAoY29uc3Qgc2luZ2xlUmVzcG9uc2Ugb2YgcGFyc2VkUmVzcG9uc2UuYXJyYXkpIHtcbiAgICAgICAgLy8gQ29uZmlybSBlbnRyeSBpcyBmb3IgdGhpcyBjZXJ0XG4gICAgICAgIGNvbnN0IGNlcnRJZEJ1aWxkZXIgPSBuZXcgS0pVUi5hc24xLm9jc3AuQ2VydElEKCkgYXMgYW55XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDZXJ0Q2VydElkID0gY2VydElkQnVpbGRlci5nZXRQYXJhbUJ5Q2VydHMoaXNzdWVyLnRvU3RyaW5nKCksIGNlcnQudG9TdHJpbmcoKSwgJ3NoYTI1NicpXG4gICAgICAgIGlmICghKGN1cnJlbnRDZXJ0Q2VydElkLmFsZyA9PT0gc2luZ2xlUmVzcG9uc2UuY2VydGlkLmFsZyAmJiBjdXJyZW50Q2VydENlcnRJZC5pc3NuYW1lID09PSBzaW5nbGVSZXNwb25zZS5jZXJ0aWQuaXNzbmFtZSAmJlxuICAgICAgICAgICAgICBjdXJyZW50Q2VydENlcnRJZC5pc3NrZXkgPT09IHNpbmdsZVJlc3BvbnNlLmNlcnRpZC5pc3NrZXkgJiYgY3VycmVudENlcnRDZXJ0SWQuc2Jqc24gPT09IHNpbmdsZVJlc3BvbnNlLmNlcnRpZC5zYmpzbikpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIC8vIFZhbGlkYXRlIGNvbnRlbnRzXG4gICAgICAgIGNvbnN0IGlzc3VlRGF0ZSA9IHRoaXMucGFyc2VYNTA5RGF0ZShzaW5nbGVSZXNwb25zZS50aGlzdXBkYXRlKVxuICAgICAgICBjb25zdCBuZXh0RGF0ZSA9IHRoaXMucGFyc2VYNTA5RGF0ZShzaW5nbGVSZXNwb25zZS5uZXh0dXBkYXRlKVxuICAgICAgICBcbiAgICAgICAgaWYgKHNpbmdsZVJlc3BvbnNlLnN0YXR1cy5zdGF0dXMgIT09ICdnb29kJyB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIE1BWF9TS0VXIDwgaXNzdWVEYXRlLmdldFRpbWUoKSB8fCBuZXh0RGF0ZS5nZXRUaW1lKCkgPCBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIE1BWF9TS0VXKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFZlcmlmaWNhdGlvbkV4Y2VwdGlvbihWZXJpZmljYXRpb25TdGF0dXMuRkFJTFVSRSlcbiAgICAgICAgfVxuICAgICAgICAvLyBTdWNjZXNzXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IFZlcmlmaWNhdGlvbkV4Y2VwdGlvbihWZXJpZmljYXRpb25TdGF0dXMuRkFJTFVSRSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrRGF0ZXMoY2VydDogWDUwOUNlcnRpZmljYXRlLCBlZmZlY3RpdmVEYXRlOiBEYXRlKSB7XG4gICAgICBpZiAobmV3IERhdGUoY2VydC52YWxpZEZyb20pLmdldFRpbWUoKSA+IChlZmZlY3RpdmVEYXRlLmdldFRpbWUoKSArIE1BWF9TS0VXKXx8XG4gICAgICAgICAgbmV3IERhdGUoY2VydC52YWxpZFRvKS5nZXRUaW1lKCkgPCAoZWZmZWN0aXZlRGF0ZS5nZXRUaW1lKCkgLSBNQVhfU0tFVykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFZlcmlmaWNhdGlvbkV4Y2VwdGlvbihWZXJpZmljYXRpb25TdGF0dXMuSU5WQUxJRF9DRVJUSUZJQ0FURSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlWDUwOURhdGUoZGF0ZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZS5yZXBsYWNlKFxuICAgICAgICAvXihcXGR7NH0pKFxcZFxcZCkoXFxkXFxkKShcXGRcXGQpKFxcZFxcZCkoXFxkXFxkKSQvLFxuICAgICAgICAnJDQ6JDU6JDYgJDIvJDMvJDEnXG4gICAgICApKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGV4dHJhY3RTaWduZWREYXRlKGRlY29kZWRKV1Q6IERlY29kZWRTaWduZWREYXRhKTogRGF0ZSB7XG4gICAgICByZXR1cm4gZGVjb2RlZEpXVC5zaWduZWREYXRlID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSgpIDogbmV3IERhdGUoZGVjb2RlZEpXVC5zaWduZWREYXRlKVxuICAgIH1cbn1cblxuZXhwb3J0IGVudW0gVmVyaWZpY2F0aW9uU3RhdHVzIHtcbiAgT0ssXG4gIFZFUklGSUNBVElPTl9GQUlMVVJFLFxuICBJTlZBTElEX0FQUF9JREVOVElGSUVSLFxuICBJTlZBTElEX0VOVklST05NRU5ULFxuICBJTlZBTElEX0NIQUlOX0xFTkdUSCxcbiAgSU5WQUxJRF9DRVJUSUZJQ0FURSxcbiAgRkFJTFVSRVxufVxuXG5leHBvcnQgY2xhc3MgVmVyaWZpY2F0aW9uRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Ige1xuICBzdGF0dXM6IFZlcmlmaWNhdGlvblN0YXR1c1xuICBjYXVzZT86IEVycm9yXG5cbiAgY29uc3RydWN0b3Ioc3RhdHVzOiBWZXJpZmljYXRpb25TdGF0dXMsIGNhdXNlPzogRXJyb3IpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzXG4gICAgdGhpcy5jYXVzZSA9IGNhdXNlXG4gIH1cbn0iXX0=