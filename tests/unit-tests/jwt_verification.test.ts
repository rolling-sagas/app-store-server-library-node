// Copyright (c) 2023 Apple Inc. Licensed under MIT License.

import assert = require("assert");
import { KeyObject, X509Certificate } from "crypto";
import { SignedDataVerifier, VerificationException, VerificationStatus } from "../../jwt_verification";
import { Environment } from "../../models/Environment";

const ROOT_CA_BASE64_ENCODED = "MIIBgjCCASmgAwIBAgIJALUc5ALiH5pbMAoGCCqGSM49BAMDMDYxCzAJBgNVBAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMRIwEAYDVQQHDAlDdXBlcnRpbm8wHhcNMjMwMTA1MjEzMDIyWhcNMzMwMTAyMjEzMDIyWjA2MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTESMBAGA1UEBwwJQ3VwZXJ0aW5vMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEc+/Bl+gospo6tf9Z7io5tdKdrlN1YdVnqEhEDXDShzdAJPQijamXIMHf8xWWTa1zgoYTxOKpbuJtDplz1XriTaMgMB4wDAYDVR0TBAUwAwEB/zAOBgNVHQ8BAf8EBAMCAQYwCgYIKoZIzj0EAwMDRwAwRAIgemWQXnMAdTad2JDJWng9U4uBBL5mA7WI05H7oH7c6iQCIHiRqMjNfzUAyiu9h6rOU/K+iTR0I/3Y/NSWsXHX+acc";
const INTERMEDIATE_CA_BASE64_ENCODED = "MIIBnzCCAUWgAwIBAgIBCzAKBggqhkjOPQQDAzA2MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTESMBAGA1UEBwwJQ3VwZXJ0aW5vMB4XDTIzMDEwNTIxMzEwNVoXDTMzMDEwMTIxMzEwNVowRTELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRIwEAYDVQQHDAlDdXBlcnRpbm8xFTATBgNVBAoMDEludGVybWVkaWF0ZTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABBUN5V9rKjfRiMAIojEA0Av5Mp0oF+O0cL4gzrTF178inUHugj7Et46NrkQ7hKgMVnjogq45Q1rMs+cMHVNILWqjNTAzMA8GA1UdEwQIMAYBAf8CAQAwDgYDVR0PAQH/BAQDAgEGMBAGCiqGSIb3Y2QGAgEEAgUAMAoGCCqGSM49BAMDA0gAMEUCIQCmsIKYs41ullssHX4rVveUT0Z7Is5/hLK1lFPTtun3hAIgc2+2RG5+gNcFVcs+XJeEl4GZ+ojl3ROOmll+ye7dynQ=";
const LEAF_CERT_BASE64_ENCODED = "MIIBoDCCAUagAwIBAgIBDDAKBggqhkjOPQQDAzBFMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExEjAQBgNVBAcMCUN1cGVydGlubzEVMBMGA1UECgwMSW50ZXJtZWRpYXRlMB4XDTIzMDEwNTIxMzEzNFoXDTMzMDEwMTIxMzEzNFowPTELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRIwEAYDVQQHDAlDdXBlcnRpbm8xDTALBgNVBAoMBExlYWYwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAATitYHEaYVuc8g9AjTOwErMvGyPykPa+puvTI8hJTHZZDLGas2qX1+ErxgQTJgVXv76nmLhhRJH+j25AiAI8iGsoy8wLTAJBgNVHRMEAjAAMA4GA1UdDwEB/wQEAwIHgDAQBgoqhkiG92NkBgsBBAIFADAKBggqhkjOPQQDAwNIADBFAiBX4c+T0Fp5nJ5QRClRfu5PSByRvNPtuaTsk0vPB3WAIAIhANgaauAj/YP9s0AkEhyJhxQO/6Q2zouZ+H1CIOehnMzQ";    

const INTERMEDIATE_CA_INVALID_OID_BASE64_ENCODED = "MIIBnjCCAUWgAwIBAgIBDTAKBggqhkjOPQQDAzA2MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTESMBAGA1UEBwwJQ3VwZXJ0aW5vMB4XDTIzMDEwNTIxMzYxNFoXDTMzMDEwMTIxMzYxNFowRTELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRIwEAYDVQQHDAlDdXBlcnRpbm8xFTATBgNVBAoMDEludGVybWVkaWF0ZTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABBUN5V9rKjfRiMAIojEA0Av5Mp0oF+O0cL4gzrTF178inUHugj7Et46NrkQ7hKgMVnjogq45Q1rMs+cMHVNILWqjNTAzMA8GA1UdEwQIMAYBAf8CAQAwDgYDVR0PAQH/BAQDAgEGMBAGCiqGSIb3Y2QGAgIEAgUAMAoGCCqGSM49BAMDA0cAMEQCIFROtTE+RQpKxNXETFsf7Mc0h+5IAsxxo/X6oCC/c33qAiAmC5rn5yCOOEjTY4R1H1QcQVh+eUwCl13NbQxWCuwxxA==";
const LEAF_CERT_FOR_INTERMEDIATE_CA_INVALID_OID_BASE64_ENCODED = "MIIBnzCCAUagAwIBAgIBDjAKBggqhkjOPQQDAzBFMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExEjAQBgNVBAcMCUN1cGVydGlubzEVMBMGA1UECgwMSW50ZXJtZWRpYXRlMB4XDTIzMDEwNTIxMzY1OFoXDTMzMDEwMTIxMzY1OFowPTELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRIwEAYDVQQHDAlDdXBlcnRpbm8xDTALBgNVBAoMBExlYWYwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAATitYHEaYVuc8g9AjTOwErMvGyPykPa+puvTI8hJTHZZDLGas2qX1+ErxgQTJgVXv76nmLhhRJH+j25AiAI8iGsoy8wLTAJBgNVHRMEAjAAMA4GA1UdDwEB/wQEAwIHgDAQBgoqhkiG92NkBgsBBAIFADAKBggqhkjOPQQDAwNHADBEAiAUAs+gzYOsEXDwQquvHYbcVymyNqDtGw9BnUFp2YLuuAIgXxQ3Ie9YU0cMqkeaFd+lyo0asv9eyzk6stwjeIeOtTU=";
const LEAF_CERT_INVALID_OID_BASE64_ENCODED = "MIIBoDCCAUagAwIBAgIBDzAKBggqhkjOPQQDAzBFMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExEjAQBgNVBAcMCUN1cGVydGlubzEVMBMGA1UECgwMSW50ZXJtZWRpYXRlMB4XDTIzMDEwNTIxMzczMVoXDTMzMDEwMTIxMzczMVowPTELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRIwEAYDVQQHDAlDdXBlcnRpbm8xDTALBgNVBAoMBExlYWYwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAATitYHEaYVuc8g9AjTOwErMvGyPykPa+puvTI8hJTHZZDLGas2qX1+ErxgQTJgVXv76nmLhhRJH+j25AiAI8iGsoy8wLTAJBgNVHRMEAjAAMA4GA1UdDwEB/wQEAwIHgDAQBgoqhkiG92NkBgsCBAIFADAKBggqhkjOPQQDAwNIADBFAiAb+7S3i//bSGy7skJY9+D4VgcQLKFeYfIMSrUCmdrFqwIhAIMVwzD1RrxPRtJyiOCXLyibIvwcY+VS73HYfk0O9lgz";

const LEAF_CERT_PUBLIC_KEY_BASE64_ENCODED = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE4rWBxGmFbnPIPQI0zsBKzLxsj8pD2vqbr0yPISUx2WQyxmrNql9fhK8YEEyYFV7++p5i4YUSR/o9uQIgCPIhrA==";

const REAL_APPLE_ROOT_BASE64_ENCODED = "MIICQzCCAcmgAwIBAgIILcX8iNLFS5UwCgYIKoZIzj0EAwMwZzEbMBkGA1UEAwwSQXBwbGUgUm9vdCBDQSAtIEczMSYwJAYDVQQLDB1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwHhcNMTQwNDMwMTgxOTA2WhcNMzkwNDMwMTgxOTA2WjBnMRswGQYDVQQDDBJBcHBsZSBSb290IENBIC0gRzMxJjAkBgNVBAsMHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzB2MBAGByqGSM49AgEGBSuBBAAiA2IABJjpLz1AcqTtkyJygRMc3RCV8cWjTnHcFBbZDuWmBSp3ZHtfTjjTuxxEtX/1H7YyYl3J6YRbTzBPEVoA/VhYDKX1DyxNB0cTddqXl5dvMVztK517IDvYuVTZXpmkOlEKMaNCMEAwHQYDVR0OBBYEFLuw3qFYM4iapIqZ3r6966/ayySrMA8GA1UdEwEB/wQFMAMBAf8wDgYDVR0PAQH/BAQDAgEGMAoGCCqGSM49BAMDA2gAMGUCMQCD6cHEFl4aXTQY2e3v9GwOAEZLuN+yRhHFD/3meoyhpmvOwgPUnPWTxnS4at+qIxUCMG1mihDK1A3UT82NQz60imOlM27jbdoXt2QfyFMm+YhidDkLF1vLUagM6BgD56KyKA==";
const REAL_APPLE_INTERMEDIATE_BASE64_ENCODED = "MIIDFjCCApygAwIBAgIUIsGhRwp0c2nvU4YSycafPTjzbNcwCgYIKoZIzj0EAwMwZzEbMBkGA1UEAwwSQXBwbGUgUm9vdCBDQSAtIEczMSYwJAYDVQQLDB1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwHhcNMjEwMzE3MjAzNzEwWhcNMzYwMzE5MDAwMDAwWjB1MUQwQgYDVQQDDDtBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9ucyBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTELMAkGA1UECwwCRzYxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEbsQKC94PrlWmZXnXgtxzdVJL8T0SGYngDRGpngn3N6PT8JMEb7FDi4bBmPhCnZ3/sq6PF/cGcKXWsL5vOteRhyJ45x3ASP7cOB+aao90fcpxSv/EZFbniAbNgZGhIhpIo4H6MIH3MBIGA1UdEwEB/wQIMAYBAf8CAQAwHwYDVR0jBBgwFoAUu7DeoVgziJqkipnevr3rr9rLJKswRgYIKwYBBQUHAQEEOjA4MDYGCCsGAQUFBzABhipodHRwOi8vb2NzcC5hcHBsZS5jb20vb2NzcDAzLWFwcGxlcm9vdGNhZzMwNwYDVR0fBDAwLjAsoCqgKIYmaHR0cDovL2NybC5hcHBsZS5jb20vYXBwbGVyb290Y2FnMy5jcmwwHQYDVR0OBBYEFD8vlCNR01DJmig97bB85c+lkGKZMA4GA1UdDwEB/wQEAwIBBjAQBgoqhkiG92NkBgIBBAIFADAKBggqhkjOPQQDAwNoADBlAjBAXhSq5IyKogMCPtw490BaB677CaEGJXufQB/EqZGd6CSjiCtOnuMTbXVXmxxcxfkCMQDTSPxarZXvNrkxU3TkUMI33yzvFVVRT4wxWJC994OsdcZ4+RGNsYDyR5gmdr0nDGg=";
const REAL_APPLE_SIGNING_CERTIFICATE_BASE64_ENCODED = "MIIEMDCCA7agAwIBAgIQaPoPldvpSoEH0lBrjDPv9jAKBggqhkjOPQQDAzB1MUQwQgYDVQQDDDtBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9ucyBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTELMAkGA1UECwwCRzYxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMB4XDTIxMDgyNTAyNTAzNFoXDTIzMDkyNDAyNTAzM1owgZIxQDA+BgNVBAMMN1Byb2QgRUNDIE1hYyBBcHAgU3RvcmUgYW5kIGlUdW5lcyBTdG9yZSBSZWNlaXB0IFNpZ25pbmcxLDAqBgNVBAsMI0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zMRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABOoTcaPcpeipNL9eQ06tCu7pUcwdCXdN8vGqaUjd58Z8tLxiUC0dBeA+euMYggh1/5iAk+FMxUFmA2a1r4aCZ8SjggIIMIICBDAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFD8vlCNR01DJmig97bB85c+lkGKZMHAGCCsGAQUFBwEBBGQwYjAtBggrBgEFBQcwAoYhaHR0cDovL2NlcnRzLmFwcGxlLmNvbS93d2RyZzYuZGVyMDEGCCsGAQUFBzABhiVodHRwOi8vb2NzcC5hcHBsZS5jb20vb2NzcDAzLXd3ZHJnNjAyMIIBHgYDVR0gBIIBFTCCAREwggENBgoqhkiG92NkBQYBMIH+MIHDBggrBgEFBQcCAjCBtgyBs1JlbGlhbmNlIG9uIHRoaXMgY2VydGlmaWNhdGUgYnkgYW55IHBhcnR5IGFzc3VtZXMgYWNjZXB0YW5jZSBvZiB0aGUgdGhlbiBhcHBsaWNhYmxlIHN0YW5kYXJkIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHVzZSwgY2VydGlmaWNhdGUgcG9saWN5IGFuZCBjZXJ0aWZpY2F0aW9uIHByYWN0aWNlIHN0YXRlbWVudHMuMDYGCCsGAQUFBwIBFipodHRwOi8vd3d3LmFwcGxlLmNvbS9jZXJ0aWZpY2F0ZWF1dGhvcml0eS8wHQYDVR0OBBYEFCOCmMBq//1L5imvVmqX1oCYeqrMMA4GA1UdDwEB/wQEAwIHgDAQBgoqhkiG92NkBgsBBAIFADAKBggqhkjOPQQDAwNoADBlAjEAl4JB9GJHixP2nuibyU1k3wri5psGIxPME05sFKq7hQuzvbeyBu82FozzxmbzpogoAjBLSFl0dZWIYl2ejPV+Di5fBnKPu8mymBQtoE/H2bES0qAs8bNueU3CBjjh1lwnDsI=";

const EFFECTIVE_DATE = new Date(1681312846000); // April 2023
class SignedJWTVerifierTest extends SignedDataVerifier {
    effectiveDate = EFFECTIVE_DATE
    async testVerifyCertificateChain(trustedRoots: X509Certificate[], leaf: string, intermediate: string): Promise<KeyObject> {
        return await this.verifyCertificateChain(trustedRoots, new X509Certificate(Buffer.from(leaf, 'base64')), new X509Certificate(Buffer.from(intermediate, 'base64')), this.effectiveDate)
    }

    getRootCertificates() {
        return this.rootCertificates
    } 
}

describe("Chain Verification Checks", () => {
    it('should validate a chain without OCSP', async () => {
        const verifier = new SignedJWTVerifierTest([Buffer.from(ROOT_CA_BASE64_ENCODED, 'base64')], false, Environment.PRODUCTION, "com.example");
        const publicKey = await verifier.testVerifyCertificateChain(verifier.getRootCertificates(), LEAF_CERT_BASE64_ENCODED, INTERMEDIATE_CA_BASE64_ENCODED)
        expect(Buffer.from(LEAF_CERT_PUBLIC_KEY_BASE64_ENCODED, 'base64')).toMatchObject(publicKey.export({
            type: 'spki',
            format: 'der'
        }))
    })

    it('should fail to validate a chain with an invalid intermediate OID', async () => {
        const verifier = new SignedJWTVerifierTest([Buffer.from(ROOT_CA_BASE64_ENCODED, 'base64')], false, Environment.PRODUCTION, "com.example");
        try {
            await verifier.testVerifyCertificateChain(verifier.getRootCertificates(), LEAF_CERT_FOR_INTERMEDIATE_CA_INVALID_OID_BASE64_ENCODED, INTERMEDIATE_CA_INVALID_OID_BASE64_ENCODED)
            assert(false)
        } catch (e) {
            expect(e).toBeInstanceOf(VerificationException)
            expect((e as VerificationException).status).toEqual(VerificationStatus.VERIFICATION_FAILURE)
        }
    })

    it('should fail to validate a chain with an invalid leaf OID', async () => {
        const verifier = new SignedJWTVerifierTest([Buffer.from(ROOT_CA_BASE64_ENCODED, 'base64')], false, Environment.PRODUCTION, "com.example");
        try {
            await verifier.testVerifyCertificateChain(verifier.getRootCertificates(), LEAF_CERT_INVALID_OID_BASE64_ENCODED, INTERMEDIATE_CA_BASE64_ENCODED)
            assert(false)
        } catch (e) {
            expect(e).toBeInstanceOf(VerificationException)
            expect((e as VerificationException).status).toEqual(VerificationStatus.VERIFICATION_FAILURE)
        }
    })

    it('should fail to validate a chain with empty root certificate array', async () => {
        const verifier = new SignedJWTVerifierTest([], false, Environment.PRODUCTION, "com.example");
        try {
            await verifier.testVerifyCertificateChain(verifier.getRootCertificates(), LEAF_CERT_BASE64_ENCODED, INTERMEDIATE_CA_BASE64_ENCODED)
            assert(false)
        } catch (e) {
            expect(e).toBeInstanceOf(VerificationException)
            expect((e as VerificationException).status).toEqual(VerificationStatus.VERIFICATION_FAILURE)
        }
    })

    it('should fail to validate a chain with an expired chain', async () => {
        const verifier = new SignedJWTVerifierTest([Buffer.from(ROOT_CA_BASE64_ENCODED, 'base64')], false, Environment.PRODUCTION, "com.example");
        verifier.effectiveDate = new Date(2280946846000)
        try {
            await verifier.testVerifyCertificateChain(verifier.getRootCertificates(), LEAF_CERT_BASE64_ENCODED, INTERMEDIATE_CA_BASE64_ENCODED)
            assert(false)
        } catch (e) {
            expect(e).toBeInstanceOf(VerificationException)
            expect((e as VerificationException).status).toEqual(VerificationStatus.INVALID_CERTIFICATE)
        }
    })

    it('should validate a real chain with OCSP', async () => {
        const verifier = new SignedJWTVerifierTest([Buffer.from(REAL_APPLE_ROOT_BASE64_ENCODED, 'base64')], true, Environment.PRODUCTION, "com.example");
        await verifier.testVerifyCertificateChain(verifier.getRootCertificates(), REAL_APPLE_SIGNING_CERTIFICATE_BASE64_ENCODED, REAL_APPLE_INTERMEDIATE_BASE64_ENCODED)
    })

    it('should fail to validate a chain with mismatched root certificates', async () => {
        const verifier = new SignedJWTVerifierTest([Buffer.from(REAL_APPLE_ROOT_BASE64_ENCODED, 'base64')], false, Environment.PRODUCTION, "com.example");
        try {
            await verifier.testVerifyCertificateChain(verifier.getRootCertificates(), LEAF_CERT_BASE64_ENCODED, INTERMEDIATE_CA_BASE64_ENCODED)
            assert(false)
        } catch (e) {
            expect(e).toBeInstanceOf(VerificationException)
            expect((e as VerificationException).status).toEqual(VerificationStatus.VERIFICATION_FAILURE)
            return
        }
    })

    it('should fail to validate a chain with invalid root certificates', async () => {
        try {
            const verifier = new SignedJWTVerifierTest([Buffer.from("abc", "utf-8")], false, Environment.PRODUCTION, "com.example");
            await verifier.testVerifyCertificateChain(verifier.getRootCertificates(), LEAF_CERT_BASE64_ENCODED, INTERMEDIATE_CA_BASE64_ENCODED)
        } catch (e) {
            return
        }
        assert(false)
    })
})


const TEST_NOTIFICATION = "eyJ4NWMiOlsiTUlJQm9EQ0NBVWFnQXdJQkFnSUJDekFLQmdncWhrak9QUVFEQWpCTk1Rc3dDUVlEVlFRR0V3SlZVekVUTUJFR0ExVUVDQXdLUTJGc2FXWnZjbTVwWVRFU01CQUdBMVVFQnd3SlEzVndaWEowYVc1dk1SVXdFd1lEVlFRS0RBeEpiblJsY20xbFpHbGhkR1V3SGhjTk1qTXdNVEEwTVRZek56TXhXaGNOTXpJeE1qTXhNVFl6TnpNeFdqQkZNUXN3Q1FZRFZRUUdFd0pWVXpFVE1CRUdBMVVFQ0F3S1EyRnNhV1p2Y201cFlURVNNQkFHQTFVRUJ3d0pRM1Z3WlhKMGFXNXZNUTB3Q3dZRFZRUUtEQVJNWldGbU1Ga3dFd1lIS29aSXpqMENBUVlJS29aSXpqMERBUWNEUWdBRTRyV0J4R21GYm5QSVBRSTB6c0JLekx4c2o4cEQydnFicjB5UElTVXgyV1F5eG1yTnFsOWZoSzhZRUV5WUZWNysrcDVpNFlVU1Ivbzl1UUlnQ1BJaHJLTWZNQjB3Q1FZRFZSMFRCQUl3QURBUUJnb3Foa2lHOTJOa0Jnc0JCQUlUQURBS0JnZ3Foa2pPUFFRREFnTklBREJGQWlFQWtpRVprb0ZNa2o0Z1huK1E5alhRWk1qWjJnbmpaM2FNOE5ZcmdmVFVpdlFDSURKWVowRmFMZTduU0lVMkxXTFRrNXRYVENjNEU4R0pTWWYvc1lSeEVGaWUiLCJNSUlCbHpDQ0FUMmdBd0lCQWdJQkJqQUtCZ2dxaGtqT1BRUURBakEyTVFzd0NRWURWUVFHRXdKVlV6RVRNQkVHQTFVRUNBd0tRMkZzYVdadmNtNXBZVEVTTUJBR0ExVUVCd3dKUTNWd1pYSjBhVzV2TUI0WERUSXpNREV3TkRFMk1qWXdNVm9YRFRNeU1USXpNVEUyTWpZd01Wb3dUVEVMTUFrR0ExVUVCaE1DVlZNeEV6QVJCZ05WQkFnTUNrTmhiR2xtYjNKdWFXRXhFakFRQmdOVkJBY01DVU4xY0dWeWRHbHViekVWTUJNR0ExVUVDZ3dNU1c1MFpYSnRaV1JwWVhSbE1Ga3dFd1lIS29aSXpqMENBUVlJS29aSXpqMERBUWNEUWdBRUZRM2xYMnNxTjlHSXdBaWlNUURRQy9reW5TZ1g0N1J3dmlET3RNWFh2eUtkUWU2Q1BzUzNqbzJ1UkR1RXFBeFdlT2lDcmpsRFdzeXo1d3dkVTBndGFxTWxNQ013RHdZRFZSMFRCQWd3QmdFQi93SUJBREFRQmdvcWhraUc5Mk5rQmdJQkJBSVRBREFLQmdncWhrak9QUVFEQWdOSUFEQkZBaUVBdm56TWNWMjY4Y1JiMS9GcHlWMUVoVDNXRnZPenJCVVdQNi9Ub1RoRmF2TUNJRmJhNXQ2WUt5MFIySkR0eHF0T2pKeTY2bDZWN2QvUHJBRE5wa21JUFcraSIsIk1JSUJYRENDQVFJQ0NRQ2ZqVFVHTERuUjlqQUtCZ2dxaGtqT1BRUURBekEyTVFzd0NRWURWUVFHRXdKVlV6RVRNQkVHQTFVRUNBd0tRMkZzYVdadmNtNXBZVEVTTUJBR0ExVUVCd3dKUTNWd1pYSjBhVzV2TUI0WERUSXpNREV3TkRFMk1qQXpNbG9YRFRNek1ERXdNVEUyTWpBek1sb3dOakVMTUFrR0ExVUVCaE1DVlZNeEV6QVJCZ05WQkFnTUNrTmhiR2xtYjNKdWFXRXhFakFRQmdOVkJBY01DVU4xY0dWeWRHbHViekJaTUJNR0J5cUdTTTQ5QWdFR0NDcUdTTTQ5QXdFSEEwSUFCSFB2d1pmb0tMS2FPclgvV2U0cU9iWFNuYTVUZFdIVlo2aElSQTF3MG9jM1FDVDBJbzJwbHlEQjMvTVZsazJ0YzRLR0U4VGlxVzdpYlE2WmM5VjY0azB3Q2dZSUtvWkl6ajBFQXdNRFNBQXdSUUloQU1USGhXdGJBUU4waFN4SVhjUDRDS3JEQ0gvZ3N4V3B4NmpUWkxUZVorRlBBaUIzNW53azVxMHpjSXBlZnZZSjBNVS95R0dIU1dlejBicTBwRFlVTy9ubUR3PT0iXSwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJkYXRhIjp7ImFwcEFwcGxlSWQiOjEyMzQsImVudmlyb25tZW50IjoiU2FuZGJveCIsImJ1bmRsZUlkIjoiY29tLmV4YW1wbGUifSwibm90aWZpY2F0aW9uVVVJRCI6IjlhZDU2YmQyLTBiYzYtNDJlMC1hZjI0LWZkOTk2ZDg3YTFlNiIsInNpZ25lZERhdGUiOjE2ODEzMTQzMjQwMDAsIm5vdGlmaWNhdGlvblR5cGUiOiJURVNUIn0.VVXYwuNm2Y3XsOUva-BozqatRCsDuykA7xIe_CCRw6aIAAxJ1nb2sw871jfZ6dcgNhUuhoZ93hfbc1v_5zB7Og";
const MISSING_X5C_HEADER_CLAIM = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsIng1Y3dyb25nIjpbIk1JSUJvRENDQVVhZ0F3SUJBZ0lCRERBS0JnZ3Foa2pPUFFRREF6QkZNUXN3Q1FZRFZRUUdFd0pWVXpFTE1Ba0dBMVVFQ0F3Q1EwRXhFakFRQmdOVkJBY01DVU4xY0dWeWRHbHViekVWTUJNR0ExVUVDZ3dNU1c1MFpYSnRaV1JwWVhSbE1CNFhEVEl6TURFd05USXhNekV6TkZvWERUTXpNREV3TVRJeE16RXpORm93UFRFTE1Ba0dBMVVFQmhNQ1ZWTXhDekFKQmdOVkJBZ01Ba05CTVJJd0VBWURWUVFIREFsRGRYQmxjblJwYm04eERUQUxCZ05WQkFvTUJFeGxZV1l3V1RBVEJnY3Foa2pPUFFJQkJnZ3Foa2pPUFFNQkJ3TkNBQVRpdFlIRWFZVnVjOGc5QWpUT3dFck12R3lQeWtQYStwdXZUSThoSlRIWlpETEdhczJxWDErRXJ4Z1FUSmdWWHY3Nm5tTGhoUkpIK2oyNUFpQUk4aUdzb3k4d0xUQUpCZ05WSFJNRUFqQUFNQTRHQTFVZER3RUIvd1FFQXdJSGdEQVFCZ29xaGtpRzkyTmtCZ3NCQkFJRkFEQUtCZ2dxaGtqT1BRUURBd05JQURCRkFpQlg0YytUMEZwNW5KNVFSQ2xSZnU1UFNCeVJ2TlB0dWFUc2swdlBCM1dBSUFJaEFOZ2FhdUFqL1lQOXMwQWtFaHlKaHhRTy82UTJ6b3VaK0gxQ0lPZWhuTXpRIiwiTUlJQm56Q0NBVVdnQXdJQkFnSUJDekFLQmdncWhrak9QUVFEQXpBMk1Rc3dDUVlEVlFRR0V3SlZVekVUTUJFR0ExVUVDQXdLUTJGc2FXWnZjbTVwWVRFU01CQUdBMVVFQnd3SlEzVndaWEowYVc1dk1CNFhEVEl6TURFd05USXhNekV3TlZvWERUTXpNREV3TVRJeE16RXdOVm93UlRFTE1Ba0dBMVVFQmhNQ1ZWTXhDekFKQmdOVkJBZ01Ba05CTVJJd0VBWURWUVFIREFsRGRYQmxjblJwYm04eEZUQVRCZ05WQkFvTURFbHVkR1Z5YldWa2FXRjBaVEJaTUJNR0J5cUdTTTQ5QWdFR0NDcUdTTTQ5QXdFSEEwSUFCQlVONVY5cktqZlJpTUFJb2pFQTBBdjVNcDBvRitPMGNMNGd6clRGMTc4aW5VSHVnajdFdDQ2TnJrUTdoS2dNVm5qb2dxNDVRMXJNcytjTUhWTklMV3FqTlRBek1BOEdBMVVkRXdRSU1BWUJBZjhDQVFBd0RnWURWUjBQQVFIL0JBUURBZ0VHTUJBR0NpcUdTSWIzWTJRR0FnRUVBZ1VBTUFvR0NDcUdTTTQ5QkFNREEwZ0FNRVVDSVFDbXNJS1lzNDF1bGxzc0hYNHJWdmVVVDBaN0lzNS9oTEsxbEZQVHR1bjNoQUlnYzIrMlJHNStnTmNGVmNzK1hKZUVsNEdaK29qbDNST09tbGwreWU3ZHluUT0iLCJNSUlCZ2pDQ0FTbWdBd0lCQWdJSkFMVWM1QUxpSDVwYk1Bb0dDQ3FHU000OUJBTURNRFl4Q3pBSkJnTlZCQVlUQWxWVE1STXdFUVlEVlFRSURBcERZV3hwWm05eWJtbGhNUkl3RUFZRFZRUUhEQWxEZFhCbGNuUnBibTh3SGhjTk1qTXdNVEExTWpFek1ESXlXaGNOTXpNd01UQXlNakV6TURJeVdqQTJNUXN3Q1FZRFZRUUdFd0pWVXpFVE1CRUdBMVVFQ0F3S1EyRnNhV1p2Y201cFlURVNNQkFHQTFVRUJ3d0pRM1Z3WlhKMGFXNXZNRmt3RXdZSEtvWkl6ajBDQVFZSUtvWkl6ajBEQVFjRFFnQUVjKy9CbCtnb3NwbzZ0ZjlaN2lvNXRkS2RybE4xWWRWbnFFaEVEWERTaHpkQUpQUWlqYW1YSU1IZjh4V1dUYTF6Z29ZVHhPS3BidUp0RHBsejFYcmlUYU1nTUI0d0RBWURWUjBUQkFVd0F3RUIvekFPQmdOVkhROEJBZjhFQkFNQ0FRWXdDZ1lJS29aSXpqMEVBd01EUndBd1JBSWdlbVdRWG5NQWRUYWQySkRKV25nOVU0dUJCTDVtQTdXSTA1SDdvSDdjNmlRQ0lIaVJxTWpOZnpVQXlpdTloNnJPVS9LK2lUUjBJLzNZL05TV3NYSFgrYWNjIl19.eyJkYXRhIjp7ImJ1bmRsZUlkIjoiY29tLmV4YW1wbGUifSwibm90aWZpY2F0aW9uVVVJRCI6IjlhZDU2YmQyLTBiYzYtNDJlMC1hZjI0LWZkOTk2ZDg3YTFlNiIsIm5vdGlmaWNhdGlvblR5cGUiOiJURVNUIn0.1TFhjDR4WwQJNgizVGYXz3WE3ajxTdH1wKLQQ71MtrkadSxxOo3yPo_6L9Z03unIU7YK-NRNzSIb5bh5WqTprQ";
const WRONG_BUNDLE_ID = "eyJ4NWMiOlsiTUlJQm9EQ0NBVWFnQXdJQkFnSUJEREFLQmdncWhrak9QUVFEQXpCRk1Rc3dDUVlEVlFRR0V3SlZVekVMTUFrR0ExVUVDQXdDUTBFeEVqQVFCZ05WQkFjTUNVTjFjR1Z5ZEdsdWJ6RVZNQk1HQTFVRUNnd01TVzUwWlhKdFpXUnBZWFJsTUI0WERUSXpNREV3TlRJeE16RXpORm9YRFRNek1ERXdNVEl4TXpFek5Gb3dQVEVMTUFrR0ExVUVCaE1DVlZNeEN6QUpCZ05WQkFnTUFrTkJNUkl3RUFZRFZRUUhEQWxEZFhCbGNuUnBibTh4RFRBTEJnTlZCQW9NQkV4bFlXWXdXVEFUQmdjcWhrak9QUUlCQmdncWhrak9QUU1CQndOQ0FBVGl0WUhFYVlWdWM4ZzlBalRPd0VyTXZHeVB5a1BhK3B1dlRJOGhKVEhaWkRMR2FzMnFYMStFcnhnUVRKZ1ZYdjc2bm1MaGhSSkgrajI1QWlBSThpR3NveTh3TFRBSkJnTlZIUk1FQWpBQU1BNEdBMVVkRHdFQi93UUVBd0lIZ0RBUUJnb3Foa2lHOTJOa0Jnc0JCQUlGQURBS0JnZ3Foa2pPUFFRREF3TklBREJGQWlCWDRjK1QwRnA1bko1UVJDbFJmdTVQU0J5UnZOUHR1YVRzazB2UEIzV0FJQUloQU5nYWF1QWovWVA5czBBa0VoeUpoeFFPLzZRMnpvdVorSDFDSU9laG5NelEiLCJNSUlCbnpDQ0FVV2dBd0lCQWdJQkN6QUtCZ2dxaGtqT1BRUURBekEyTVFzd0NRWURWUVFHRXdKVlV6RVRNQkVHQTFVRUNBd0tRMkZzYVdadmNtNXBZVEVTTUJBR0ExVUVCd3dKUTNWd1pYSjBhVzV2TUI0WERUSXpNREV3TlRJeE16RXdOVm9YRFRNek1ERXdNVEl4TXpFd05Wb3dSVEVMTUFrR0ExVUVCaE1DVlZNeEN6QUpCZ05WQkFnTUFrTkJNUkl3RUFZRFZRUUhEQWxEZFhCbGNuUnBibTh4RlRBVEJnTlZCQW9NREVsdWRHVnliV1ZrYVdGMFpUQlpNQk1HQnlxR1NNNDlBZ0VHQ0NxR1NNNDlBd0VIQTBJQUJCVU41VjlyS2pmUmlNQUlvakVBMEF2NU1wMG9GK08wY0w0Z3pyVEYxNzhpblVIdWdqN0V0NDZOcmtRN2hLZ01WbmpvZ3E0NVExck1zK2NNSFZOSUxXcWpOVEF6TUE4R0ExVWRFd1FJTUFZQkFmOENBUUF3RGdZRFZSMFBBUUgvQkFRREFnRUdNQkFHQ2lxR1NJYjNZMlFHQWdFRUFnVUFNQW9HQ0NxR1NNNDlCQU1EQTBnQU1FVUNJUUNtc0lLWXM0MXVsbHNzSFg0clZ2ZVVUMFo3SXM1L2hMSzFsRlBUdHVuM2hBSWdjMisyUkc1K2dOY0ZWY3MrWEplRWw0R1orb2psM1JPT21sbCt5ZTdkeW5RPSIsIk1JSUJnakNDQVNtZ0F3SUJBZ0lKQUxVYzVBTGlINXBiTUFvR0NDcUdTTTQ5QkFNRE1EWXhDekFKQmdOVkJBWVRBbFZUTVJNd0VRWURWUVFJREFwRFlXeHBabTl5Ym1saE1SSXdFQVlEVlFRSERBbERkWEJsY25ScGJtOHdIaGNOTWpNd01UQTFNakV6TURJeVdoY05Nek13TVRBeU1qRXpNREl5V2pBMk1Rc3dDUVlEVlFRR0V3SlZVekVUTUJFR0ExVUVDQXdLUTJGc2FXWnZjbTVwWVRFU01CQUdBMVVFQnd3SlEzVndaWEowYVc1dk1Ga3dFd1lIS29aSXpqMENBUVlJS29aSXpqMERBUWNEUWdBRWMrL0JsK2dvc3BvNnRmOVo3aW81dGRLZHJsTjFZZFZucUVoRURYRFNoemRBSlBRaWphbVhJTUhmOHhXV1RhMXpnb1lUeE9LcGJ1SnREcGx6MVhyaVRhTWdNQjR3REFZRFZSMFRCQVV3QXdFQi96QU9CZ05WSFE4QkFmOEVCQU1DQVFZd0NnWUlLb1pJemowRUF3TURSd0F3UkFJZ2VtV1FYbk1BZFRhZDJKREpXbmc5VTR1QkJMNW1BN1dJMDVIN29IN2M2aVFDSUhpUnFNak5melVBeWl1OWg2ck9VL0sraVRSMEkvM1kvTlNXc1hIWCthY2MiXSwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJkYXRhIjp7ImJ1bmRsZUlkIjoiY29tLmV4YW1wbGUud3JvbmcifSwibm90aWZpY2F0aW9uVVVJRCI6IjlhZDU2YmQyLTBiYzYtNDJlMC1hZjI0LWZkOTk2ZDg3YTFlNiIsIm5vdGlmaWNhdGlvblR5cGUiOiJURVNUIn0.WWE31hTB_mcv2O_lf-xI-MNY3d8txc0MzpqFx4QnYDfFIxB95Lo2Fm3r46YSjLLdL7xCWdEJrJP5bHgRCejAGg";
const RENEWAL_INFO = "eyJ4NWMiOlsiTUlJQm9EQ0NBVWFnQXdJQkFnSUJEREFLQmdncWhrak9QUVFEQXpCRk1Rc3dDUVlEVlFRR0V3SlZVekVMTUFrR0ExVUVDQXdDUTBFeEVqQVFCZ05WQkFjTUNVTjFjR1Z5ZEdsdWJ6RVZNQk1HQTFVRUNnd01TVzUwWlhKdFpXUnBZWFJsTUI0WERUSXpNREV3TlRJeE16RXpORm9YRFRNek1ERXdNVEl4TXpFek5Gb3dQVEVMTUFrR0ExVUVCaE1DVlZNeEN6QUpCZ05WQkFnTUFrTkJNUkl3RUFZRFZRUUhEQWxEZFhCbGNuUnBibTh4RFRBTEJnTlZCQW9NQkV4bFlXWXdXVEFUQmdjcWhrak9QUUlCQmdncWhrak9QUU1CQndOQ0FBVGl0WUhFYVlWdWM4ZzlBalRPd0VyTXZHeVB5a1BhK3B1dlRJOGhKVEhaWkRMR2FzMnFYMStFcnhnUVRKZ1ZYdjc2bm1MaGhSSkgrajI1QWlBSThpR3NveTh3TFRBSkJnTlZIUk1FQWpBQU1BNEdBMVVkRHdFQi93UUVBd0lIZ0RBUUJnb3Foa2lHOTJOa0Jnc0JCQUlGQURBS0JnZ3Foa2pPUFFRREF3TklBREJGQWlCWDRjK1QwRnA1bko1UVJDbFJmdTVQU0J5UnZOUHR1YVRzazB2UEIzV0FJQUloQU5nYWF1QWovWVA5czBBa0VoeUpoeFFPLzZRMnpvdVorSDFDSU9laG5NelEiLCJNSUlCbnpDQ0FVV2dBd0lCQWdJQkN6QUtCZ2dxaGtqT1BRUURBekEyTVFzd0NRWURWUVFHRXdKVlV6RVRNQkVHQTFVRUNBd0tRMkZzYVdadmNtNXBZVEVTTUJBR0ExVUVCd3dKUTNWd1pYSjBhVzV2TUI0WERUSXpNREV3TlRJeE16RXdOVm9YRFRNek1ERXdNVEl4TXpFd05Wb3dSVEVMTUFrR0ExVUVCaE1DVlZNeEN6QUpCZ05WQkFnTUFrTkJNUkl3RUFZRFZRUUhEQWxEZFhCbGNuUnBibTh4RlRBVEJnTlZCQW9NREVsdWRHVnliV1ZrYVdGMFpUQlpNQk1HQnlxR1NNNDlBZ0VHQ0NxR1NNNDlBd0VIQTBJQUJCVU41VjlyS2pmUmlNQUlvakVBMEF2NU1wMG9GK08wY0w0Z3pyVEYxNzhpblVIdWdqN0V0NDZOcmtRN2hLZ01WbmpvZ3E0NVExck1zK2NNSFZOSUxXcWpOVEF6TUE4R0ExVWRFd1FJTUFZQkFmOENBUUF3RGdZRFZSMFBBUUgvQkFRREFnRUdNQkFHQ2lxR1NJYjNZMlFHQWdFRUFnVUFNQW9HQ0NxR1NNNDlCQU1EQTBnQU1FVUNJUUNtc0lLWXM0MXVsbHNzSFg0clZ2ZVVUMFo3SXM1L2hMSzFsRlBUdHVuM2hBSWdjMisyUkc1K2dOY0ZWY3MrWEplRWw0R1orb2psM1JPT21sbCt5ZTdkeW5RPSIsIk1JSUJnakNDQVNtZ0F3SUJBZ0lKQUxVYzVBTGlINXBiTUFvR0NDcUdTTTQ5QkFNRE1EWXhDekFKQmdOVkJBWVRBbFZUTVJNd0VRWURWUVFJREFwRFlXeHBabTl5Ym1saE1SSXdFQVlEVlFRSERBbERkWEJsY25ScGJtOHdIaGNOTWpNd01UQTFNakV6TURJeVdoY05Nek13TVRBeU1qRXpNREl5V2pBMk1Rc3dDUVlEVlFRR0V3SlZVekVUTUJFR0ExVUVDQXdLUTJGc2FXWnZjbTVwWVRFU01CQUdBMVVFQnd3SlEzVndaWEowYVc1dk1Ga3dFd1lIS29aSXpqMENBUVlJS29aSXpqMERBUWNEUWdBRWMrL0JsK2dvc3BvNnRmOVo3aW81dGRLZHJsTjFZZFZucUVoRURYRFNoemRBSlBRaWphbVhJTUhmOHhXV1RhMXpnb1lUeE9LcGJ1SnREcGx6MVhyaVRhTWdNQjR3REFZRFZSMFRCQVV3QXdFQi96QU9CZ05WSFE4QkFmOEVCQU1DQVFZd0NnWUlLb1pJemowRUF3TURSd0F3UkFJZ2VtV1FYbk1BZFRhZDJKREpXbmc5VTR1QkJMNW1BN1dJMDVIN29IN2M2aVFDSUhpUnFNak5melVBeWl1OWg2ck9VL0sraVRSMEkvM1kvTlNXc1hIWCthY2MiXSwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJlbnZpcm9ubWVudCI6IlNhbmRib3giLCJzaWduZWREYXRlIjoxNjcyOTU2MTU0MDAwfQ.FbK2OL-t6l4892W7fzWyus_g9mIl2CzWLbVt7Kgcnt6zzVulF8bzovgpe0v_y490blROGixy8KDoe2dSU53-Xw";
const TRANSACTION_INFO = "eyJ4NWMiOlsiTUlJQm9EQ0NBVWFnQXdJQkFnSUJDekFLQmdncWhrak9QUVFEQWpCTk1Rc3dDUVlEVlFRR0V3SlZVekVUTUJFR0ExVUVDQXdLUTJGc2FXWnZjbTVwWVRFU01CQUdBMVVFQnd3SlEzVndaWEowYVc1dk1SVXdFd1lEVlFRS0RBeEpiblJsY20xbFpHbGhkR1V3SGhjTk1qTXdNVEEwTVRZek56TXhXaGNOTXpJeE1qTXhNVFl6TnpNeFdqQkZNUXN3Q1FZRFZRUUdFd0pWVXpFVE1CRUdBMVVFQ0F3S1EyRnNhV1p2Y201cFlURVNNQkFHQTFVRUJ3d0pRM1Z3WlhKMGFXNXZNUTB3Q3dZRFZRUUtEQVJNWldGbU1Ga3dFd1lIS29aSXpqMENBUVlJS29aSXpqMERBUWNEUWdBRTRyV0J4R21GYm5QSVBRSTB6c0JLekx4c2o4cEQydnFicjB5UElTVXgyV1F5eG1yTnFsOWZoSzhZRUV5WUZWNysrcDVpNFlVU1Ivbzl1UUlnQ1BJaHJLTWZNQjB3Q1FZRFZSMFRCQUl3QURBUUJnb3Foa2lHOTJOa0Jnc0JCQUlUQURBS0JnZ3Foa2pPUFFRREFnTklBREJGQWlFQWtpRVprb0ZNa2o0Z1huK1E5alhRWk1qWjJnbmpaM2FNOE5ZcmdmVFVpdlFDSURKWVowRmFMZTduU0lVMkxXTFRrNXRYVENjNEU4R0pTWWYvc1lSeEVGaWUiLCJNSUlCbHpDQ0FUMmdBd0lCQWdJQkJqQUtCZ2dxaGtqT1BRUURBakEyTVFzd0NRWURWUVFHRXdKVlV6RVRNQkVHQTFVRUNBd0tRMkZzYVdadmNtNXBZVEVTTUJBR0ExVUVCd3dKUTNWd1pYSjBhVzV2TUI0WERUSXpNREV3TkRFMk1qWXdNVm9YRFRNeU1USXpNVEUyTWpZd01Wb3dUVEVMTUFrR0ExVUVCaE1DVlZNeEV6QVJCZ05WQkFnTUNrTmhiR2xtYjNKdWFXRXhFakFRQmdOVkJBY01DVU4xY0dWeWRHbHViekVWTUJNR0ExVUVDZ3dNU1c1MFpYSnRaV1JwWVhSbE1Ga3dFd1lIS29aSXpqMENBUVlJS29aSXpqMERBUWNEUWdBRUZRM2xYMnNxTjlHSXdBaWlNUURRQy9reW5TZ1g0N1J3dmlET3RNWFh2eUtkUWU2Q1BzUzNqbzJ1UkR1RXFBeFdlT2lDcmpsRFdzeXo1d3dkVTBndGFxTWxNQ013RHdZRFZSMFRCQWd3QmdFQi93SUJBREFRQmdvcWhraUc5Mk5rQmdJQkJBSVRBREFLQmdncWhrak9QUVFEQWdOSUFEQkZBaUVBdm56TWNWMjY4Y1JiMS9GcHlWMUVoVDNXRnZPenJCVVdQNi9Ub1RoRmF2TUNJRmJhNXQ2WUt5MFIySkR0eHF0T2pKeTY2bDZWN2QvUHJBRE5wa21JUFcraSIsIk1JSUJYRENDQVFJQ0NRQ2ZqVFVHTERuUjlqQUtCZ2dxaGtqT1BRUURBekEyTVFzd0NRWURWUVFHRXdKVlV6RVRNQkVHQTFVRUNBd0tRMkZzYVdadmNtNXBZVEVTTUJBR0ExVUVCd3dKUTNWd1pYSjBhVzV2TUI0WERUSXpNREV3TkRFMk1qQXpNbG9YRFRNek1ERXdNVEUyTWpBek1sb3dOakVMTUFrR0ExVUVCaE1DVlZNeEV6QVJCZ05WQkFnTUNrTmhiR2xtYjNKdWFXRXhFakFRQmdOVkJBY01DVU4xY0dWeWRHbHViekJaTUJNR0J5cUdTTTQ5QWdFR0NDcUdTTTQ5QXdFSEEwSUFCSFB2d1pmb0tMS2FPclgvV2U0cU9iWFNuYTVUZFdIVlo2aElSQTF3MG9jM1FDVDBJbzJwbHlEQjMvTVZsazJ0YzRLR0U4VGlxVzdpYlE2WmM5VjY0azB3Q2dZSUtvWkl6ajBFQXdNRFNBQXdSUUloQU1USGhXdGJBUU4waFN4SVhjUDRDS3JEQ0gvZ3N4V3B4NmpUWkxUZVorRlBBaUIzNW53azVxMHpjSXBlZnZZSjBNVS95R0dIU1dlejBicTBwRFlVTy9ubUR3PT0iXSwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJlbnZpcm9ubWVudCI6IlNhbmRib3giLCJidW5kbGVJZCI6ImNvbS5leGFtcGxlIiwic2lnbmVkRGF0ZSI6MTY3Mjk1NjE1NDAwMH0.PnHWpeIJZ8f2Q218NSGLo_aR0IBEJvC6PxmxKXh-qfYTrZccx2suGl223OSNAX78e4Ylf2yJCG2N-FfU-NIhZQ";

describe("Decoding checks", () => {
    it('should fail to verify with a missing x5c header', async () => {
        const verifier = new SignedJWTVerifierTest([Buffer.from(ROOT_CA_BASE64_ENCODED, 'base64')], false, Environment.PRODUCTION, "com.example");
        try {
            await verifier.verifyAndDecodeNotification(MISSING_X5C_HEADER_CLAIM)
            assert(false)
        } catch (e) {
            expect(e).toBeInstanceOf(VerificationException)
            expect((e as VerificationException).status).toEqual(VerificationStatus.INVALID_CERTIFICATE)
        }
    })

    it('should fail to verify with an invalid bundle id', async () => {
        const verifier = new SignedJWTVerifierTest([Buffer.from(ROOT_CA_BASE64_ENCODED, 'base64')], false, Environment.SANDBOX, "com.example");
        try {
            await verifier.verifyAndDecodeNotification(WRONG_BUNDLE_ID)
            assert(false)
        } catch (e) {
            expect(e).toBeInstanceOf(VerificationException)
            expect((e as VerificationException).status).toEqual(VerificationStatus.INVALID_APP_IDENTIFIER)
        }
    })

    it('should fail to verify with an invalid bundle id for transaction', async () => {
        const verifier = new SignedJWTVerifierTest([Buffer.from(ROOT_CA_BASE64_ENCODED, 'base64')], false, Environment.SANDBOX, "com.example.x");
        try {
            await verifier.verifyAndDecodeTransaction(TRANSACTION_INFO)
            assert(false)
        } catch (e) {
            expect(e).toBeInstanceOf(VerificationException)
            expect((e as VerificationException).status).toEqual(VerificationStatus.INVALID_APP_IDENTIFIER)
        }
    })

    it('should fail to verify with an invalid environment', async () => {
        const verifier = new SignedJWTVerifierTest([Buffer.from(ROOT_CA_BASE64_ENCODED, 'base64')], false, Environment.PRODUCTION, "com.example", 1234);
        try {
            await verifier.verifyAndDecodeNotification(TEST_NOTIFICATION)
            assert(false)
        } catch (e) {
            expect(e).toBeInstanceOf(VerificationException)
            expect((e as VerificationException).status).toEqual(VerificationStatus.INVALID_ENVIRONMENT)
        }
    })

    it('should fail to verify with a malformed JWT with too many parts', async () => {
        const verifier = new SignedJWTVerifierTest([Buffer.from(ROOT_CA_BASE64_ENCODED, 'base64')], false, Environment.SANDBOX, "com.example");
        try {
            await verifier.verifyAndDecodeNotification("a.b.c.d")
            assert(false)
        } catch (e) {
            expect(e).toBeInstanceOf(VerificationException)
            expect((e as VerificationException).status).toEqual(VerificationStatus.INVALID_CERTIFICATE)
        }
    })

    it('should fail to verify with a malformed JWT', async () => {
        const verifier = new SignedJWTVerifierTest([Buffer.from(ROOT_CA_BASE64_ENCODED, 'base64')], false, Environment.SANDBOX, "com.example");
        try {
            await verifier.verifyAndDecodeNotification("a.b.c")
            assert(false)
        } catch (e) {
            expect(e).toBeInstanceOf(VerificationException)
            expect((e as VerificationException).status).toEqual(VerificationStatus.INVALID_CERTIFICATE)
        }
    })

    it('should verify and decode a valid notification', async () => {
        const verifier = new SignedJWTVerifierTest([Buffer.from(ROOT_CA_BASE64_ENCODED, 'base64')], false, Environment.SANDBOX, "com.example");

        const notification = await verifier.verifyAndDecodeNotification(TEST_NOTIFICATION)
        expect(notification.notificationType).toEqual("TEST")
    })

    it('should verify and decode a valid renewal info', async () => {
        const verifier = new SignedJWTVerifierTest([Buffer.from(ROOT_CA_BASE64_ENCODED, 'base64')], false, Environment.SANDBOX, "com.example");

        const notification = await verifier.verifyAndDecodeRenewalInfo(RENEWAL_INFO)
        expect(notification.environment).toEqual(Environment.SANDBOX)
    })

    it('should verify and decode a valid transaction info', async () => {
        const verifier = new SignedJWTVerifierTest([Buffer.from(ROOT_CA_BASE64_ENCODED, 'base64')], false, Environment.SANDBOX, "com.example");

        const notification = await verifier.verifyAndDecodeRenewalInfo(TRANSACTION_INFO)
        expect(notification.environment).toEqual(Environment.SANDBOX)
    })
});