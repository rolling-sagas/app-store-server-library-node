"use strict";
// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTransactionHistoryVersion = exports.APIError = exports.APIException = exports.AppStoreServerAPIClient = exports.PromotionalOfferSignatureCreator = exports.UserStatus = exports.Type = exports.TransactionReason = exports.ProductType = exports.Order = exports.Subtype = exports.Status = exports.RevocationReason = exports.PriceIncreaseStatus = exports.PlayTime = exports.Platform = exports.OrderLookupStatus = exports.OfferDiscountType = exports.OfferType = exports.NotificationTypeV2 = exports.LifetimeDollarsRefunded = exports.LifetimeDollarsPurchased = exports.InAppOwnershipType = exports.SendAttemptResult = exports.ExtendReasonCode = exports.ExpirationIntent = exports.Environment = exports.DeliveryStatus = exports.ConsumptionStatus = exports.AutoRenewStatus = exports.AccountTenure = exports.ReceiptUtility = exports.SignedDataVerifier = void 0;
const node_fetch_1 = require("node-fetch");
const CheckTestNotificationResponse_1 = require("./models/CheckTestNotificationResponse");
const Environment_1 = require("./models/Environment");
const ExtendRenewalDateResponse_1 = require("./models/ExtendRenewalDateResponse");
const HistoryResponse_1 = require("./models/HistoryResponse");
const MassExtendRenewalDateResponse_1 = require("./models/MassExtendRenewalDateResponse");
const MassExtendRenewalDateStatusResponse_1 = require("./models/MassExtendRenewalDateStatusResponse");
const OrderLookupResponse_1 = require("./models/OrderLookupResponse");
const RefundHistoryResponse_1 = require("./models/RefundHistoryResponse");
const SendTestNotificationResponse_1 = require("./models/SendTestNotificationResponse");
const StatusResponse_1 = require("./models/StatusResponse");
const TransactionInfoResponse_1 = require("./models/TransactionInfoResponse");
var jws_verification_1 = require("./jws_verification");
Object.defineProperty(exports, "SignedDataVerifier", { enumerable: true, get: function () { return jws_verification_1.SignedDataVerifier; } });
var receipt_utility_1 = require("./receipt_utility");
Object.defineProperty(exports, "ReceiptUtility", { enumerable: true, get: function () { return receipt_utility_1.ReceiptUtility; } });
var AccountTenure_1 = require("./models/AccountTenure");
Object.defineProperty(exports, "AccountTenure", { enumerable: true, get: function () { return AccountTenure_1.AccountTenure; } });
var AutoRenewStatus_1 = require("./models/AutoRenewStatus");
Object.defineProperty(exports, "AutoRenewStatus", { enumerable: true, get: function () { return AutoRenewStatus_1.AutoRenewStatus; } });
var ConsumptionStatus_1 = require("./models/ConsumptionStatus");
Object.defineProperty(exports, "ConsumptionStatus", { enumerable: true, get: function () { return ConsumptionStatus_1.ConsumptionStatus; } });
var DeliveryStatus_1 = require("./models/DeliveryStatus");
Object.defineProperty(exports, "DeliveryStatus", { enumerable: true, get: function () { return DeliveryStatus_1.DeliveryStatus; } });
var Environment_2 = require("./models/Environment");
Object.defineProperty(exports, "Environment", { enumerable: true, get: function () { return Environment_2.Environment; } });
var ExpirationIntent_1 = require("./models/ExpirationIntent");
Object.defineProperty(exports, "ExpirationIntent", { enumerable: true, get: function () { return ExpirationIntent_1.ExpirationIntent; } });
var ExtendReasonCode_1 = require("./models/ExtendReasonCode");
Object.defineProperty(exports, "ExtendReasonCode", { enumerable: true, get: function () { return ExtendReasonCode_1.ExtendReasonCode; } });
var SendAttemptResult_1 = require("./models/SendAttemptResult");
Object.defineProperty(exports, "SendAttemptResult", { enumerable: true, get: function () { return SendAttemptResult_1.SendAttemptResult; } });
var InAppOwnershipType_1 = require("./models/InAppOwnershipType");
Object.defineProperty(exports, "InAppOwnershipType", { enumerable: true, get: function () { return InAppOwnershipType_1.InAppOwnershipType; } });
var LifetimeDollarsPurchased_1 = require("./models/LifetimeDollarsPurchased");
Object.defineProperty(exports, "LifetimeDollarsPurchased", { enumerable: true, get: function () { return LifetimeDollarsPurchased_1.LifetimeDollarsPurchased; } });
var LifetimeDollarsRefunded_1 = require("./models/LifetimeDollarsRefunded");
Object.defineProperty(exports, "LifetimeDollarsRefunded", { enumerable: true, get: function () { return LifetimeDollarsRefunded_1.LifetimeDollarsRefunded; } });
var NotificationTypeV2_1 = require("./models/NotificationTypeV2");
Object.defineProperty(exports, "NotificationTypeV2", { enumerable: true, get: function () { return NotificationTypeV2_1.NotificationTypeV2; } });
var OfferType_1 = require("./models/OfferType");
Object.defineProperty(exports, "OfferType", { enumerable: true, get: function () { return OfferType_1.OfferType; } });
var OfferDiscountType_1 = require("./models/OfferDiscountType");
Object.defineProperty(exports, "OfferDiscountType", { enumerable: true, get: function () { return OfferDiscountType_1.OfferDiscountType; } });
var OrderLookupStatus_1 = require("./models/OrderLookupStatus");
Object.defineProperty(exports, "OrderLookupStatus", { enumerable: true, get: function () { return OrderLookupStatus_1.OrderLookupStatus; } });
var Platform_1 = require("./models/Platform");
Object.defineProperty(exports, "Platform", { enumerable: true, get: function () { return Platform_1.Platform; } });
var PlayTime_1 = require("./models/PlayTime");
Object.defineProperty(exports, "PlayTime", { enumerable: true, get: function () { return PlayTime_1.PlayTime; } });
var PriceIncreaseStatus_1 = require("./models/PriceIncreaseStatus");
Object.defineProperty(exports, "PriceIncreaseStatus", { enumerable: true, get: function () { return PriceIncreaseStatus_1.PriceIncreaseStatus; } });
var RevocationReason_1 = require("./models/RevocationReason");
Object.defineProperty(exports, "RevocationReason", { enumerable: true, get: function () { return RevocationReason_1.RevocationReason; } });
var Status_1 = require("./models/Status");
Object.defineProperty(exports, "Status", { enumerable: true, get: function () { return Status_1.Status; } });
var Subtype_1 = require("./models/Subtype");
Object.defineProperty(exports, "Subtype", { enumerable: true, get: function () { return Subtype_1.Subtype; } });
var TransactionHistoryRequest_1 = require("./models/TransactionHistoryRequest");
Object.defineProperty(exports, "Order", { enumerable: true, get: function () { return TransactionHistoryRequest_1.Order; } });
Object.defineProperty(exports, "ProductType", { enumerable: true, get: function () { return TransactionHistoryRequest_1.ProductType; } });
var TransactionReason_1 = require("./models/TransactionReason");
Object.defineProperty(exports, "TransactionReason", { enumerable: true, get: function () { return TransactionReason_1.TransactionReason; } });
var Type_1 = require("./models/Type");
Object.defineProperty(exports, "Type", { enumerable: true, get: function () { return Type_1.Type; } });
var UserStatus_1 = require("./models/UserStatus");
Object.defineProperty(exports, "UserStatus", { enumerable: true, get: function () { return UserStatus_1.UserStatus; } });
var promotional_offer_1 = require("./promotional_offer");
Object.defineProperty(exports, "PromotionalOfferSignatureCreator", { enumerable: true, get: function () { return promotional_offer_1.PromotionalOfferSignatureCreator; } });
const jwt = require("@tsndr/cloudflare-worker-jwt");
const NotificationHistoryResponse_1 = require("./models/NotificationHistoryResponse");
const url_1 = require("url");
class AppStoreServerAPIClient {
    /**
     * Create an App Store Server API client
     * @param signingKey Your private key downloaded from App Store Connect
     * @param keyId Your private key ID from App Store Connect
     * @param issuerId Your issuer ID from the Keys page in App Store Connect
     * @param bundleId Your app’s bundle ID
     * @param environment The environment to target
     */
    constructor(signingKey, keyId, issuerId, bundleId, environment) {
        this.issuerId = issuerId;
        this.keyId = keyId;
        this.bundleId = bundleId;
        this.signingKey = signingKey;
        switch (environment) {
            case Environment_1.Environment.XCODE:
                throw new Error("Xcode is not a supported environment for an AppStoreServerAPIClient");
            case Environment_1.Environment.PRODUCTION:
                this.urlBase = AppStoreServerAPIClient.PRODUCTION_URL;
                break;
            case Environment_1.Environment.LOCAL_TESTING:
                this.urlBase = AppStoreServerAPIClient.LOCAL_TESTING_URL;
                break;
            case Environment_1.Environment.SANDBOX:
                this.urlBase = AppStoreServerAPIClient.SANDBOX_URL;
                break;
        }
    }
    async makeRequest(path, method, queryParameters, body, validator) {
        const token = await this.createBearerToken();
        const headers = {
            'User-Agent': AppStoreServerAPIClient.USER_AGENT,
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
        };
        const parsedQueryParameters = new url_1.URLSearchParams();
        for (const queryParam in queryParameters) {
            for (const queryVal of queryParameters[queryParam]) {
                parsedQueryParameters.append(queryParam, queryVal);
            }
        }
        let stringBody = undefined;
        if (body != null) {
            stringBody = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
        }
        const response = await this.makeFetchRequest(path, parsedQueryParameters, method, stringBody, headers);
        if (response.ok) {
            // Success
            if (validator == null) {
                return null;
            }
            const responseBody = await response.json();
            if (!validator.validate(responseBody)) {
                throw new Error("Unexpected response body format");
            }
            return responseBody;
        }
        try {
            const responseBody = await response.json();
            const errorCode = responseBody['errorCode'];
            const errorMessage = responseBody['errorMessage'];
            if (errorCode) {
                throw new APIException(response.status, errorCode, errorMessage);
            }
            throw new APIException(response.status);
        }
        catch (e) {
            if (e instanceof APIException) {
                throw e;
            }
            throw new APIException(response.status);
        }
    }
    async makeFetchRequest(path, parsedQueryParameters, method, stringBody, headers) {
        return await (0, node_fetch_1.default)(this.urlBase + path + '?' + parsedQueryParameters, {
            method: method,
            body: stringBody,
            headers: headers
        });
    }
    /**
     * Uses a subscription’s product identifier to extend the renewal date for all of its eligible active subscribers.
     *
     * @param massExtendRenewalDateRequest The request body for extending a subscription renewal date for all of its active subscribers.
     * @return A response that indicates the server successfully received the subscription-renewal-date extension request.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/extend_subscription_renewal_dates_for_all_active_subscribers Extend Subscription Renewal Dates for All Active Subscribers}
     */
    async extendRenewalDateForAllActiveSubscribers(massExtendRenewalDateRequest) {
        return await this.makeRequest("/inApps/v1/subscriptions/extend/mass", "POST", {}, massExtendRenewalDateRequest, new MassExtendRenewalDateResponse_1.MassExtendRenewalDateResponseValidator());
    }
    /**
     * Extends the renewal date of a customer’s active subscription using the original transaction identifier.
     *
     * @param originalTransactionId    The original transaction identifier of the subscription receiving a renewal date extension.
     * @param extendRenewalDateRequest The request body containing subscription-renewal-extension data.
     * @return A response that indicates whether an individual renewal-date extension succeeded, and related details.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/extend_a_subscription_renewal_date Extend a Subscription Renewal Date}
     */
    async extendSubscriptionRenewalDate(originalTransactionId, extendRenewalDateRequest) {
        return await this.makeRequest("/inApps/v1/subscriptions/extend/" + originalTransactionId, "PUT", {}, extendRenewalDateRequest, new ExtendRenewalDateResponse_1.ExtendRenewalDateResponseValidator());
    }
    /**
     * Get the statuses for all of a customer’s auto-renewable subscriptions in your app.
     *
     * @param transactionId The identifier of a transaction that belongs to the customer, and which may be an original transaction identifier.
     * @param status An optional filter that indicates the status of subscriptions to include in the response. Your query may specify more than one status query parameter.
     * @return A response that contains status information for all of a customer’s auto-renewable subscriptions in your app.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/get_all_subscription_statuses Get All Subscription Statuses}
     */
    async getAllSubscriptionStatuses(transactionId, status = undefined) {
        const queryParameters = {};
        if (status != null) {
            queryParameters["status"] = status.map(s => s.toString());
        }
        return await this.makeRequest("/inApps/v1/subscriptions/" + transactionId, "GET", queryParameters, null, new StatusResponse_1.StatusResponseValidator());
    }
    /**
     * Get a paginated list of all of a customer’s refunded in-app purchases for your app.
     *
     * @param transactionId The identifier of a transaction that belongs to the customer, and which may be an original transaction identifier.
     * @param revision              A token you provide to get the next set of up to 20 transactions. All responses include a revision token. Use the revision token from the previous RefundHistoryResponse.
     * @return A response that contains status information for all of a customer’s auto-renewable subscriptions in your app.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/get_refund_history Get Refund History}
     */
    async getRefundHistory(transactionId, revision) {
        const queryParameters = {};
        if (revision !== null) {
            queryParameters["revision"] = [revision];
        }
        return await this.makeRequest("/inApps/v2/refund/lookup/" + transactionId, "GET", queryParameters, null, new RefundHistoryResponse_1.RefundHistoryResponseValidator());
    }
    /**
     * Checks whether a renewal date extension request completed, and provides the final count of successful or failed extensions.
     *
     * @param requestIdentifier The UUID that represents your request to the Extend Subscription Renewal Dates for All Active Subscribers endpoint.
     * @param productId         The product identifier of the auto-renewable subscription that you request a renewal-date extension for.
     * @return A response that indicates the current status of a request to extend the subscription renewal date to all eligible subscribers.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/get_status_of_subscription_renewal_date_extensions Get Status of Subscription Renewal Date Extensions}
     */
    async getStatusOfSubscriptionRenewalDateExtensions(requestIdentifier, productId) {
        return await this.makeRequest("/inApps/v1/subscriptions/extend/mass/" + productId + "/" + requestIdentifier, "GET", {}, null, new MassExtendRenewalDateStatusResponse_1.MassExtendRenewalDateStatusResponseValidator());
    }
    /**
     * Check the status of the test App Store server notification sent to your server.
     *
     * @param testNotificationToken The test notification token received from the Request a Test Notification endpoint
     * @return A response that contains the contents of the test notification sent by the App Store server and the result from your server.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/get_test_notification_status Get Test Notification Status}
     */
    async getTestNotificationStatus(testNotificationToken) {
        return await this.makeRequest("/inApps/v1/notifications/test/" + testNotificationToken, "GET", {}, null, new CheckTestNotificationResponse_1.CheckTestNotificationResponseValidator());
    }
    /**
     * Get a list of notifications that the App Store server attempted to send to your server.
     *
     * @param paginationToken An optional token you use to get the next set of up to 20 notification history records. All responses that have more records available include a paginationToken. Omit this parameter the first time you call this endpoint.
     * @param notificationHistoryRequest The request body that includes the start and end dates, and optional query constraints.
     * @return A response that contains the App Store Server Notifications history for your app.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/get_notification_history Get Notification History}
     */
    async getNotificationHistory(paginationToken, notificationHistoryRequest) {
        const queryParameters = {};
        if (paginationToken != null) {
            queryParameters["paginationToken"] = [paginationToken];
        }
        return await this.makeRequest("/inApps/v1/notifications/history", "POST", queryParameters, notificationHistoryRequest, new NotificationHistoryResponse_1.NotificationHistoryResponseValidator());
    }
    /**
     * Get a customer’s in-app purchase transaction history for your app.
     *
     * @param transactionId The identifier of a transaction that belongs to the customer, and which may be an original transaction identifier.
     * @param revision              A token you provide to get the next set of up to 20 transactions. All responses include a revision token. Note: For requests that use the revision token, include the same query parameters from the initial request. Use the revision token from the previous HistoryResponse.
     * @param version The version of the Get Transaction History endpoint to use. V2 is recommended.
     * @return A response that contains the customer’s transaction history for an app.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/get_transaction_history Get Transaction History}
     */
    async getTransactionHistory(transactionId, revision, transactionHistoryRequest, version = GetTransactionHistoryVersion.V1) {
        const queryParameters = {};
        if (revision != null) {
            queryParameters["revision"] = [revision];
        }
        if (transactionHistoryRequest.startDate) {
            queryParameters["startDate"] = [transactionHistoryRequest.startDate.toString()];
        }
        if (transactionHistoryRequest.endDate) {
            queryParameters["endDate"] = [transactionHistoryRequest.endDate.toString()];
        }
        if (transactionHistoryRequest.productIds) {
            queryParameters["productId"] = transactionHistoryRequest.productIds;
        }
        if (transactionHistoryRequest.productTypes) {
            queryParameters["productType"] = transactionHistoryRequest.productTypes;
        }
        if (transactionHistoryRequest.sort) {
            queryParameters["sort"] = [transactionHistoryRequest.sort];
        }
        if (transactionHistoryRequest.subscriptionGroupIdentifiers) {
            queryParameters["subscriptionGroupIdentifier"] = transactionHistoryRequest.subscriptionGroupIdentifiers;
        }
        if (transactionHistoryRequest.inAppOwnershipType) {
            queryParameters["inAppOwnershipType"] = [transactionHistoryRequest.inAppOwnershipType];
        }
        if (transactionHistoryRequest.revoked !== undefined) {
            queryParameters["revoked"] = [transactionHistoryRequest.revoked.toString()];
        }
        return await this.makeRequest("/inApps/" + version + "/history/" + transactionId, "GET", queryParameters, null, new HistoryResponse_1.HistoryResponseValidator());
    }
    /**
     * Get information about a single transaction for your app.
     *
     * @param transactionId The identifier of a transaction that belongs to the customer, and which may be an original transaction identifier.
     * @return A response that contains signed transaction information for a single transaction.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/get_transaction_info Get Transaction Info}
     */
    async getTransactionInfo(transactionId) {
        return await this.makeRequest("/inApps/v1/transactions/" + transactionId, "GET", {}, null, new TransactionInfoResponse_1.TransactionInfoResponseValidator());
    }
    /**
     * Get a customer’s in-app purchases from a receipt using the order ID.
     *
     * @param orderId The order ID for in-app purchases that belong to the customer.
     * @return A response that includes the order lookup status and an array of signed transactions for the in-app purchases in the order.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/look_up_order_id Look Up Order ID}
     */
    async lookUpOrderId(orderId) {
        return await this.makeRequest("/inApps/v1/lookup/" + orderId, "GET", {}, null, new OrderLookupResponse_1.OrderLookupResponseValidator());
    }
    /**
     * Ask App Store Server Notifications to send a test notification to your server.
     *
     * @return A response that contains the test notification token.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/request_a_test_notification Request a Test Notification}
     */
    async requestTestNotification() {
        return await this.makeRequest("/inApps/v1/notifications/test", "POST", {}, null, new SendTestNotificationResponse_1.SendTestNotificationResponseValidator());
    }
    /**
     * Send consumption information about a consumable in-app purchase to the App Store after your server receives a consumption request notification.
     *
     * @param transactionId The transaction identifier for which you’re providing consumption information. You receive this identifier in the CONSUMPTION_REQUEST notification the App Store sends to your server.
     * @param consumptionRequest    The request body containing consumption information.
     * @throws APIException If a response was returned indicating the request could not be processed
     * {@link https://developer.apple.com/documentation/appstoreserverapi/send_consumption_information Send Consumption Information}
     */
    async sendConsumptionData(transactionId, consumptionRequest) {
        await this.makeRequest("/inApps/v1/transactions/consumption/" + transactionId, "PUT", {}, consumptionRequest, null);
    }
    async createBearerToken() {
        const payload = {
            bid: this.bundleId
        };
        const res = await jwt.sign(payload, this.signingKey, { algorithm: 'ES256', header: { keyId: this.keyId, issuer: this.issuerId, audience: 'appstoreconnect-v1', expiresIn: '5m' } });
        return res;
    }
}
exports.AppStoreServerAPIClient = AppStoreServerAPIClient;
AppStoreServerAPIClient.PRODUCTION_URL = "https://api.storekit.itunes.apple.com";
AppStoreServerAPIClient.SANDBOX_URL = "https://api.storekit-sandbox.itunes.apple.com";
AppStoreServerAPIClient.LOCAL_TESTING_URL = "https://local-testing-base-url";
AppStoreServerAPIClient.USER_AGENT = "app-store-server-library/node/1.4.0";
class APIException extends Error {
    constructor(httpStatusCode, apiError = null, errorMessage = null) {
        super();
        this.httpStatusCode = httpStatusCode;
        this.apiError = apiError;
        this.errorMessage = errorMessage;
    }
}
exports.APIException = APIException;
/**
 * Error codes that App Store Server API responses return.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/error_codes Error codes}
 */
var APIError;
(function (APIError) {
    /**
     * An error that indicates an invalid request.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/generalbadrequesterror GeneralBadRequestError}
     */
    APIError[APIError["GENERAL_BAD_REQUEST"] = 4000000] = "GENERAL_BAD_REQUEST";
    /**
     * An error that indicates an invalid app identifier.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidappidentifiererror InvalidAppIdentifierError}
     */
    APIError[APIError["INVALID_APP_IDENTIFIER"] = 4000002] = "INVALID_APP_IDENTIFIER";
    /**
     * An error that indicates an invalid request revision.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidrequestrevisionerror InvalidRequestRevisionError}
     */
    APIError[APIError["INVALID_REQUEST_REVISION"] = 4000005] = "INVALID_REQUEST_REVISION";
    /**
     * An error that indicates an invalid transaction identifier.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidtransactioniderror InvalidTransactionIdError}
     */
    APIError[APIError["INVALID_TRANSACTION_ID"] = 4000006] = "INVALID_TRANSACTION_ID";
    /**
     * An error that indicates an invalid original transaction identifier.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidoriginaltransactioniderror InvalidOriginalTransactionIdError}
     */
    APIError[APIError["INVALID_ORIGINAL_TRANSACTION_ID"] = 4000008] = "INVALID_ORIGINAL_TRANSACTION_ID";
    /**
     * An error that indicates an invalid extend-by-days value.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidextendbydayserror InvalidExtendByDaysError}
     */
    APIError[APIError["INVALID_EXTEND_BY_DAYS"] = 4000009] = "INVALID_EXTEND_BY_DAYS";
    /**
     * An error that indicates an invalid reason code.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidextendreasoncodeerror InvalidExtendReasonCodeError}
     */
    APIError[APIError["INVALID_EXTEND_REASON_CODE"] = 4000010] = "INVALID_EXTEND_REASON_CODE";
    /**
     * An error that indicates an invalid request identifier.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidrequestidentifiererror InvalidRequestIdentifierError}
     */
    APIError[APIError["INVALID_REQUEST_IDENTIFIER"] = 4000011] = "INVALID_REQUEST_IDENTIFIER";
    /**
     * An error that indicates that the start date is earlier than the earliest allowed date.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/startdatetoofarinpasterror StartDateTooFarInPastError}
     */
    APIError[APIError["START_DATE_TOO_FAR_IN_PAST"] = 4000012] = "START_DATE_TOO_FAR_IN_PAST";
    /**
     * An error that indicates that the end date precedes the start date, or the two dates are equal.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/startdateafterenddateerror StartDateAfterEndDateError}
     */
    APIError[APIError["START_DATE_AFTER_END_DATE"] = 4000013] = "START_DATE_AFTER_END_DATE";
    /**
     * An error that indicates the pagination token is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidpaginationtokenerror InvalidPaginationTokenError}
     */
    APIError[APIError["INVALID_PAGINATION_TOKEN"] = 4000014] = "INVALID_PAGINATION_TOKEN";
    /**
     * An error that indicates the start date is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidstartdateerror InvalidStartDateError}
     */
    APIError[APIError["INVALID_START_DATE"] = 4000015] = "INVALID_START_DATE";
    /**
     * An error that indicates the end date is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidenddateerror InvalidEndDateError}
     */
    APIError[APIError["INVALID_END_DATE"] = 4000016] = "INVALID_END_DATE";
    /**
     * An error that indicates the pagination token expired.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/paginationtokenexpirederror PaginationTokenExpiredError}
     */
    APIError[APIError["PAGINATION_TOKEN_EXPIRED"] = 4000017] = "PAGINATION_TOKEN_EXPIRED";
    /**
     * An error that indicates the notification type or subtype is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidnotificationtypeerror InvalidNotificationTypeError}
     */
    APIError[APIError["INVALID_NOTIFICATION_TYPE"] = 4000018] = "INVALID_NOTIFICATION_TYPE";
    /**
     * An error that indicates the request is invalid because it has too many constraints applied.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/multiplefilterssuppliederror MultipleFiltersSuppliedError}
     */
    APIError[APIError["MULTIPLE_FILTERS_SUPPLIED"] = 4000019] = "MULTIPLE_FILTERS_SUPPLIED";
    /**
     * An error that indicates the test notification token is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidtestnotificationtokenerror InvalidTestNotificationTokenError}
     */
    APIError[APIError["INVALID_TEST_NOTIFICATION_TOKEN"] = 4000020] = "INVALID_TEST_NOTIFICATION_TOKEN";
    /**
     * An error that indicates an invalid sort parameter.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidsorterror InvalidSortError}
     */
    APIError[APIError["INVALID_SORT"] = 4000021] = "INVALID_SORT";
    /**
     * An error that indicates an invalid product type parameter.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidproducttypeerror InvalidProductTypeError}
     */
    APIError[APIError["INVALID_PRODUCT_TYPE"] = 4000022] = "INVALID_PRODUCT_TYPE";
    /**
     * An error that indicates the product ID parameter is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidproductiderror InvalidProductIdError}
     */
    APIError[APIError["INVALID_PRODUCT_ID"] = 4000023] = "INVALID_PRODUCT_ID";
    /**
     * An error that indicates an invalid subscription group identifier.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidsubscriptiongroupidentifiererror InvalidSubscriptionGroupIdentifierError}
     */
    APIError[APIError["INVALID_SUBSCRIPTION_GROUP_IDENTIFIER"] = 4000024] = "INVALID_SUBSCRIPTION_GROUP_IDENTIFIER";
    /**
     * An error that indicates the query parameter exclude-revoked is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidexcluderevokederror InvalidExcludeRevokedError}
     *
     * @deprecated
     */
    APIError[APIError["INVALID_EXCLUDE_REVOKED"] = 4000025] = "INVALID_EXCLUDE_REVOKED";
    /**
     * An error that indicates an invalid in-app ownership type parameter.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidinappownershiptypeerror InvalidInAppOwnershipTypeError}
     */
    APIError[APIError["INVALID_IN_APP_OWNERSHIP_TYPE"] = 4000026] = "INVALID_IN_APP_OWNERSHIP_TYPE";
    /**
     * An error that indicates a required storefront country code is empty.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidemptystorefrontcountrycodelisterror InvalidEmptyStorefrontCountryCodeListError}
     */
    APIError[APIError["INVALID_EMPTY_STOREFRONT_COUNTRY_CODE_LIST"] = 4000027] = "INVALID_EMPTY_STOREFRONT_COUNTRY_CODE_LIST";
    /**
     * An error that indicates a storefront code is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidstorefrontcountrycodeerror InvalidStorefrontCountryCodeError}
     */
    APIError[APIError["INVALID_STOREFRONT_COUNTRY_CODE"] = 4000028] = "INVALID_STOREFRONT_COUNTRY_CODE";
    /**
     * An error that indicates the revoked parameter contains an invalid value.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidrevokederror InvalidRevokedError}
     */
    APIError[APIError["INVALID_REVOKED"] = 4000030] = "INVALID_REVOKED";
    /**
     * An error that indicates the status parameter is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidstatuserror InvalidStatusError}
     */
    APIError[APIError["INVALID_STATUS"] = 4000031] = "INVALID_STATUS";
    /**
     * An error that indicates the value of the account tenure field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidaccounttenureerror InvalidAccountTenureError}
     */
    APIError[APIError["INVALID_ACCOUNT_TENURE"] = 4000032] = "INVALID_ACCOUNT_TENURE";
    /**
     * An error that indicates the value of the app account token field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidappaccounttokenerror InvalidAppAccountTokenError}
     */
    APIError[APIError["INVALID_APP_ACCOUNT_TOKEN"] = 4000033] = "INVALID_APP_ACCOUNT_TOKEN";
    /**
     * An error that indicates the value of the consumption status field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidconsumptionstatuserror InvalidConsumptionStatusError}
     */
    APIError[APIError["INVALID_CONSUMPTION_STATUS"] = 4000034] = "INVALID_CONSUMPTION_STATUS";
    /**
     * An error that indicates the customer consented field is invalid or doesn’t indicate that the customer consented.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidcustomerconsentederror InvalidCustomerConsentedError}
     */
    APIError[APIError["INVALID_CUSTOMER_CONSENTED"] = 4000035] = "INVALID_CUSTOMER_CONSENTED";
    /**
     * An error that indicates the value in the delivery status field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invaliddeliverystatuserror InvalidDeliveryStatusError}
     */
    APIError[APIError["INVALID_DELIVERY_STATUS"] = 4000036] = "INVALID_DELIVERY_STATUS";
    /**
     * An error that indicates the value in the lifetime dollars purchased field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidlifetimedollarspurchasederror InvalidLifetimeDollarsPurchasedError}
     */
    APIError[APIError["INVALID_LIFETIME_DOLLARS_PURCHASED"] = 4000037] = "INVALID_LIFETIME_DOLLARS_PURCHASED";
    /**
     * An error that indicates the value in the lifetime dollars refunded field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidlifetimedollarsrefundederror InvalidLifetimeDollarsRefundedError}
     */
    APIError[APIError["INVALID_LIFETIME_DOLLARS_REFUNDED"] = 4000038] = "INVALID_LIFETIME_DOLLARS_REFUNDED";
    /**
     * An error that indicates the value in the platform field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidplatformerror InvalidPlatformError}
     */
    APIError[APIError["INVALID_PLATFORM"] = 4000039] = "INVALID_PLATFORM";
    /**
     * An error that indicates the value in the playtime field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidplaytimeerror InvalidPlayTimeError}
     */
    APIError[APIError["INVALID_PLAY_TIME"] = 4000040] = "INVALID_PLAY_TIME";
    /**
     * An error that indicates the value in the sample content provided field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidsamplecontentprovidederror InvalidSampleContentProvidedError}
     */
    APIError[APIError["INVALID_SAMPLE_CONTENT_PROVIDED"] = 4000041] = "INVALID_SAMPLE_CONTENT_PROVIDED";
    /**
     * An error that indicates the value in the user status field is invalid.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invaliduserstatuserror InvalidUserStatusError}
     */
    APIError[APIError["INVALID_USER_STATUS"] = 4000042] = "INVALID_USER_STATUS";
    /**
     * An error that indicates the transaction identifier doesn’t represent a consumable in-app purchase.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidtransactionnotconsumableerror InvalidTransactionNotConsumableError}
     *
     * @deprecated
     */
    APIError[APIError["INVALID_TRANSACTION_NOT_CONSUMABLE"] = 4000043] = "INVALID_TRANSACTION_NOT_CONSUMABLE";
    /**
     * An error that indicates the transaction identifier represents an unsupported in-app purchase type.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/invalidtransactiontypenotsupportederror InvalidTransactionTypeNotSupportedError}
     */
    APIError[APIError["INVALID_TRANSACTION_TYPE_NOT_SUPPORTED"] = 4000047] = "INVALID_TRANSACTION_TYPE_NOT_SUPPORTED";
    /**
     * An error that indicates the subscription doesn't qualify for a renewal-date extension due to its subscription state.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/subscriptionextensionineligibleerror SubscriptionExtensionIneligibleError}
     */
    APIError[APIError["SUBSCRIPTION_EXTENSION_INELIGIBLE"] = 4030004] = "SUBSCRIPTION_EXTENSION_INELIGIBLE";
    /**
     * An error that indicates the subscription doesn’t qualify for a renewal-date extension because it has already received the maximum extensions.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/subscriptionmaxextensionerror SubscriptionMaxExtensionError}
     */
    APIError[APIError["SUBSCRIPTION_MAX_EXTENSION"] = 4030005] = "SUBSCRIPTION_MAX_EXTENSION";
    /**
     * An error that indicates a subscription isn't directly eligible for a renewal date extension because the user obtained it through Family Sharing.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/familysharedsubscriptionextensionineligibleerror FamilySharedSubscriptionExtensionIneligibleError}
     */
    APIError[APIError["FAMILY_SHARED_SUBSCRIPTION_EXTENSION_INELIGIBLE"] = 4030007] = "FAMILY_SHARED_SUBSCRIPTION_EXTENSION_INELIGIBLE";
    /**
     * An error that indicates the App Store account wasn’t found.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/accountnotfounderror AccountNotFoundError}
     */
    APIError[APIError["ACCOUNT_NOT_FOUND"] = 4040001] = "ACCOUNT_NOT_FOUND";
    /**
     * An error response that indicates the App Store account wasn’t found, but you can try again.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/accountnotfoundretryableerror AccountNotFoundRetryableError}
     */
    APIError[APIError["ACCOUNT_NOT_FOUND_RETRYABLE"] = 4040002] = "ACCOUNT_NOT_FOUND_RETRYABLE";
    /**
     * An error that indicates the app wasn’t found.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/appnotfounderror AppNotFoundError}
     */
    APIError[APIError["APP_NOT_FOUND"] = 4040003] = "APP_NOT_FOUND";
    /**
     * An error response that indicates the app wasn’t found, but you can try again.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/appnotfoundretryableerror AppNotFoundRetryableError}
     */
    APIError[APIError["APP_NOT_FOUND_RETRYABLE"] = 4040004] = "APP_NOT_FOUND_RETRYABLE";
    /**
     * An error that indicates an original transaction identifier wasn't found.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/originaltransactionidnotfounderror OriginalTransactionIdNotFoundError}
     */
    APIError[APIError["ORIGINAL_TRANSACTION_ID_NOT_FOUND"] = 4040005] = "ORIGINAL_TRANSACTION_ID_NOT_FOUND";
    /**
     * An error response that indicates the original transaction identifier wasn’t found, but you can try again.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/originaltransactionidnotfoundretryableerror OriginalTransactionIdNotFoundRetryableError}
     */
    APIError[APIError["ORIGINAL_TRANSACTION_ID_NOT_FOUND_RETRYABLE"] = 4040006] = "ORIGINAL_TRANSACTION_ID_NOT_FOUND_RETRYABLE";
    /**
     * An error that indicates that the App Store server couldn’t find a notifications URL for your app in this environment.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/servernotificationurlnotfounderror ServerNotificationUrlNotFoundError}
     */
    APIError[APIError["SERVER_NOTIFICATION_URL_NOT_FOUND"] = 4040007] = "SERVER_NOTIFICATION_URL_NOT_FOUND";
    /**
     * An error that indicates that the test notification token is expired or the test notification status isn’t available.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/testnotificationnotfounderror TestNotificationNotFoundError}
     */
    APIError[APIError["TEST_NOTIFICATION_NOT_FOUND"] = 4040008] = "TEST_NOTIFICATION_NOT_FOUND";
    /**
     * An error that indicates the server didn't find a subscription-renewal-date extension request for the request identifier and product identifier you provided.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/statusrequestnotfounderror StatusRequestNotFoundError}
     */
    APIError[APIError["STATUS_REQUEST_NOT_FOUND"] = 4040009] = "STATUS_REQUEST_NOT_FOUND";
    /**
     * An error that indicates a transaction identifier wasn't found.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/transactionidnotfounderror TransactionIdNotFoundError}
     */
    APIError[APIError["TRANSACTION_ID_NOT_FOUND"] = 4040010] = "TRANSACTION_ID_NOT_FOUND";
    /**
     * An error that indicates that the request exceeded the rate limit.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/ratelimitexceedederror RateLimitExceededError}
     */
    APIError[APIError["RATE_LIMIT_EXCEEDED"] = 4290000] = "RATE_LIMIT_EXCEEDED";
    /**
     * An error that indicates a general internal error.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/generalinternalerror GeneralInternalError}
     */
    APIError[APIError["GENERAL_INTERNAL"] = 5000000] = "GENERAL_INTERNAL";
    /**
     * An error response that indicates an unknown error occurred, but you can try again.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/generalinternalretryableerror GeneralInternalRetryableError}
     */
    APIError[APIError["GENERAL_INTERNAL_RETRYABLE"] = 5000001] = "GENERAL_INTERNAL_RETRYABLE";
})(APIError || (exports.APIError = APIError = {}));
var GetTransactionHistoryVersion;
(function (GetTransactionHistoryVersion) {
    /**
     * @deprecated
     */
    GetTransactionHistoryVersion["V1"] = "v1";
    GetTransactionHistoryVersion["V2"] = "v2";
})(GetTransactionHistoryVersion || (exports.GetTransactionHistoryVersion = GetTransactionHistoryVersion = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNERBQTREOzs7QUFFNUQsMkNBQStCO0FBQy9CLDBGQUErSDtBQUUvSCxzREFBbUQ7QUFFbkQsa0ZBQW1IO0FBQ25ILDhEQUFxRjtBQUVyRiwwRkFBK0g7QUFDL0gsc0dBQWlKO0FBQ2pKLHNFQUFpRztBQUNqRywwRUFBdUc7QUFDdkcsd0ZBQTRIO0FBQzVILDREQUFrRjtBQUVsRiw4RUFBNkc7QUFHN0csdURBQXVEO0FBQTlDLHNIQUFBLGtCQUFrQixPQUFBO0FBQzNCLHFEQUFrRDtBQUF6QyxpSEFBQSxjQUFjLE9BQUE7QUFDdkIsd0RBQXNEO0FBQTdDLDhHQUFBLGFBQWEsT0FBQTtBQUN0Qiw0REFBMEQ7QUFBakQsa0hBQUEsZUFBZSxPQUFBO0FBR3hCLGdFQUE4RDtBQUFyRCxzSEFBQSxpQkFBaUIsT0FBQTtBQUUxQiwwREFBd0Q7QUFBL0MsZ0hBQUEsY0FBYyxPQUFBO0FBQ3ZCLG9EQUFrRDtBQUF6QywwR0FBQSxXQUFXLE9BQUE7QUFDcEIsOERBQTREO0FBQW5ELG9IQUFBLGdCQUFnQixPQUFBO0FBQ3pCLDhEQUE0RDtBQUFuRCxvSEFBQSxnQkFBZ0IsT0FBQTtBQUd6QixnRUFBOEQ7QUFBckQsc0hBQUEsaUJBQWlCLE9BQUE7QUFHMUIsa0VBQWdFO0FBQXZELHdIQUFBLGtCQUFrQixPQUFBO0FBSTNCLDhFQUE0RTtBQUFuRSxvSUFBQSx3QkFBd0IsT0FBQTtBQUNqQyw0RUFBMEU7QUFBakUsa0lBQUEsdUJBQXVCLE9BQUE7QUFPaEMsa0VBQWdFO0FBQXZELHdIQUFBLGtCQUFrQixPQUFBO0FBQzNCLGdEQUE4QztBQUFyQyxzR0FBQSxTQUFTLE9BQUE7QUFDbEIsZ0VBQThEO0FBQXJELHNIQUFBLGlCQUFpQixPQUFBO0FBRTFCLGdFQUE4RDtBQUFyRCxzSEFBQSxpQkFBaUIsT0FBQTtBQUMxQiw4Q0FBNEM7QUFB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RztJQUNILHFFQUEwQixDQUFBO0lBRTFCOzs7O09BSUc7SUFDSCx5RkFBb0MsQ0FBQTtBQUN0QyxDQUFDLEVBNVlXLFFBQVEsd0JBQVIsUUFBUSxRQTRZbkI7QUFFRCxJQUFZLDRCQU1YO0FBTkQsV0FBWSw0QkFBNEI7SUFDdEM7O09BRUc7SUFDSCx5Q0FBUyxDQUFBO0lBQ1QseUNBQVMsQ0FBQTtBQUNYLENBQUMsRUFOVyw0QkFBNEIsNENBQTVCLDRCQUE0QixRQU12QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMyBBcHBsZSBJbmMuIExpY2Vuc2VkIHVuZGVyIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgZmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCc7XG5pbXBvcnQgeyBDaGVja1Rlc3ROb3RpZmljYXRpb25SZXNwb25zZSwgQ2hlY2tUZXN0Tm90aWZpY2F0aW9uUmVzcG9uc2VWYWxpZGF0b3IgfSBmcm9tICcuL21vZGVscy9DaGVja1Rlc3ROb3RpZmljYXRpb25SZXNwb25zZSc7XG5pbXBvcnQgeyBDb25zdW1wdGlvblJlcXVlc3QgfSBmcm9tICcuL21vZGVscy9Db25zdW1wdGlvblJlcXVlc3QnO1xuaW1wb3J0IHsgRW52aXJvbm1lbnQgfSBmcm9tICcuL21vZGVscy9FbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBFeHRlbmRSZW5ld2FsRGF0ZVJlcXVlc3QgfSBmcm9tICcuL21vZGVscy9FeHRlbmRSZW5ld2FsRGF0ZVJlcXVlc3QnO1xuaW1wb3J0IHsgRXh0ZW5kUmVuZXdhbERhdGVSZXNwb25zZSwgRXh0ZW5kUmVuZXdhbERhdGVSZXNwb25zZVZhbGlkYXRvciB9IGZyb20gJy4vbW9kZWxzL0V4dGVuZFJlbmV3YWxEYXRlUmVzcG9uc2UnO1xuaW1wb3J0IHsgSGlzdG9yeVJlc3BvbnNlLCBIaXN0b3J5UmVzcG9uc2VWYWxpZGF0b3IgfSBmcm9tICcuL21vZGVscy9IaXN0b3J5UmVzcG9uc2UnO1xuaW1wb3J0IHsgTWFzc0V4dGVuZFJlbmV3YWxEYXRlUmVxdWVzdCB9IGZyb20gJy4vbW9kZWxzL01hc3NFeHRlbmRSZW5ld2FsRGF0ZVJlcXVlc3QnO1xuaW1wb3J0IHsgTWFzc0V4dGVuZFJlbmV3YWxEYXRlUmVzcG9uc2UsIE1hc3NFeHRlbmRSZW5ld2FsRGF0ZVJlc3BvbnNlVmFsaWRhdG9yIH0gZnJvbSAnLi9tb2RlbHMvTWFzc0V4dGVuZFJlbmV3YWxEYXRlUmVzcG9uc2UnO1xuaW1wb3J0IHsgTWFzc0V4dGVuZFJlbmV3YWxEYXRlU3RhdHVzUmVzcG9uc2UsIE1hc3NFeHRlbmRSZW5ld2FsRGF0ZVN0YXR1c1Jlc3BvbnNlVmFsaWRhdG9yIH0gZnJvbSAnLi9tb2RlbHMvTWFzc0V4dGVuZFJlbmV3YWxEYXRlU3RhdHVzUmVzcG9uc2UnO1xuaW1wb3J0IHsgT3JkZXJMb29rdXBSZXNwb25zZSwgT3JkZXJMb29rdXBSZXNwb25zZVZhbGlkYXRvciB9IGZyb20gJy4vbW9kZWxzL09yZGVyTG9va3VwUmVzcG9uc2UnO1xuaW1wb3J0IHsgUmVmdW5kSGlzdG9yeVJlc3BvbnNlLCBSZWZ1bmRIaXN0b3J5UmVzcG9uc2VWYWxpZGF0b3IgfSBmcm9tICcuL21vZGVscy9SZWZ1bmRIaXN0b3J5UmVzcG9uc2UnO1xuaW1wb3J0IHsgU2VuZFRlc3ROb3RpZmljYXRpb25SZXNwb25zZSwgU2VuZFRlc3ROb3RpZmljYXRpb25SZXNwb25zZVZhbGlkYXRvciB9IGZyb20gJy4vbW9kZWxzL1NlbmRUZXN0Tm90aWZpY2F0aW9uUmVzcG9uc2UnO1xuaW1wb3J0IHsgU3RhdHVzUmVzcG9uc2UsIFN0YXR1c1Jlc3BvbnNlVmFsaWRhdG9yIH0gZnJvbSAnLi9tb2RlbHMvU3RhdHVzUmVzcG9uc2UnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25IaXN0b3J5UmVxdWVzdCB9IGZyb20gJy4vbW9kZWxzL1RyYW5zYWN0aW9uSGlzdG9yeVJlcXVlc3QnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25JbmZvUmVzcG9uc2UsIFRyYW5zYWN0aW9uSW5mb1Jlc3BvbnNlVmFsaWRhdG9yIH0gZnJvbSAnLi9tb2RlbHMvVHJhbnNhY3Rpb25JbmZvUmVzcG9uc2UnO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnLi9tb2RlbHMvVmFsaWRhdG9yJztcbmltcG9ydCB7IFN0YXR1cyB9IGZyb20gJy4vbW9kZWxzL1N0YXR1cyc7XG5leHBvcnQgeyBTaWduZWREYXRhVmVyaWZpZXIgfSBmcm9tICcuL2p3c192ZXJpZmljYXRpb24nXG5leHBvcnQgeyBSZWNlaXB0VXRpbGl0eSB9IGZyb20gJy4vcmVjZWlwdF91dGlsaXR5J1xuZXhwb3J0IHsgQWNjb3VudFRlbnVyZSB9IGZyb20gXCIuL21vZGVscy9BY2NvdW50VGVudXJlXCJcbmV4cG9ydCB7IEF1dG9SZW5ld1N0YXR1cyB9IGZyb20gJy4vbW9kZWxzL0F1dG9SZW5ld1N0YXR1cydcbmV4cG9ydCB7IENoZWNrVGVzdE5vdGlmaWNhdGlvblJlc3BvbnNlIH0gZnJvbSAnLi9tb2RlbHMvQ2hlY2tUZXN0Tm90aWZpY2F0aW9uUmVzcG9uc2UnXG5leHBvcnQgeyBDb25zdW1wdGlvblJlcXVlc3QgfSBmcm9tICcuL21vZGVscy9Db25zdW1wdGlvblJlcXVlc3QnXG5leHBvcnQgeyBDb25zdW1wdGlvblN0YXR1cyB9IGZyb20gJy4vbW9kZWxzL0NvbnN1bXB0aW9uU3RhdHVzJ1xuZXhwb3J0IHsgRGF0YSB9IGZyb20gJy4vbW9kZWxzL0RhdGEnXG5leHBvcnQgeyBEZWxpdmVyeVN0YXR1cyB9IGZyb20gJy4vbW9kZWxzL0RlbGl2ZXJ5U3RhdHVzJ1xuZXhwb3J0IHsgRW52aXJvbm1lbnQgfSBmcm9tICcuL21vZGVscy9FbnZpcm9ubWVudCdcbmV4cG9ydCB7IEV4cGlyYXRpb25JbnRlbnQgfSBmcm9tICcuL21vZGVscy9FeHBpcmF0aW9uSW50ZW50J1xuZXhwb3J0IHsgRXh0ZW5kUmVhc29uQ29kZSB9IGZyb20gJy4vbW9kZWxzL0V4dGVuZFJlYXNvbkNvZGUnXG5leHBvcnQgeyBFeHRlbmRSZW5ld2FsRGF0ZVJlcXVlc3QgfSBmcm9tICcuL21vZGVscy9FeHRlbmRSZW5ld2FsRGF0ZVJlcXVlc3QnXG5leHBvcnQgeyBFeHRlbmRSZW5ld2FsRGF0ZVJlc3BvbnNlIH0gZnJvbSAnLi9tb2RlbHMvRXh0ZW5kUmVuZXdhbERhdGVSZXNwb25zZSdcbmV4cG9ydCB7IFNlbmRBdHRlbXB0UmVzdWx0IH0gZnJvbSAnLi9tb2RlbHMvU2VuZEF0dGVtcHRSZXN1bHQnXG5leHBvcnQgeyBTZW5kQXR0ZW1wdEl0ZW0gfSBmcm9tICcuL21vZGVscy9TZW5kQXR0ZW1wdEl0ZW0nXG5leHBvcnQgeyBIaXN0b3J5UmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9IaXN0b3J5UmVzcG9uc2UnXG5leHBvcnQgeyBJbkFwcE93bmVyc2hpcFR5cGUgfSBmcm9tICcuL21vZGVscy9JbkFwcE93bmVyc2hpcFR5cGUnXG5leHBvcnQgeyBKV1NSZW5ld2FsSW5mb0RlY29kZWRQYXlsb2FkIH0gZnJvbSAnLi9tb2RlbHMvSldTUmVuZXdhbEluZm9EZWNvZGVkUGF5bG9hZCdcbmV4cG9ydCB7IEpXU1RyYW5zYWN0aW9uRGVjb2RlZFBheWxvYWQgfSBmcm9tICcuL21vZGVscy9KV1NUcmFuc2FjdGlvbkRlY29kZWRQYXlsb2FkJ1xuZXhwb3J0IHsgTGFzdFRyYW5zYWN0aW9uc0l0ZW0gfSBmcm9tICcuL21vZGVscy9MYXN0VHJhbnNhY3Rpb25zSXRlbSdcbmV4cG9ydCB7IExpZmV0aW1lRG9sbGFyc1B1cmNoYXNlZCB9IGZyb20gJy4vbW9kZWxzL0xpZmV0aW1lRG9sbGFyc1B1cmNoYXNlZCdcbmV4cG9ydCB7IExpZmV0aW1lRG9sbGFyc1JlZnVuZGVkIH0gZnJvbSAnLi9tb2RlbHMvTGlmZXRpbWVEb2xsYXJzUmVmdW5kZWQnXG5leHBvcnQgeyBNYXNzRXh0ZW5kUmVuZXdhbERhdGVSZXF1ZXN0IH0gZnJvbSAnLi9tb2RlbHMvTWFzc0V4dGVuZFJlbmV3YWxEYXRlUmVxdWVzdCdcbmV4cG9ydCB7IE1hc3NFeHRlbmRSZW5ld2FsRGF0ZVJlc3BvbnNlIH0gZnJvbSAnLi9tb2RlbHMvTWFzc0V4dGVuZFJlbmV3YWxEYXRlUmVzcG9uc2UnXG5leHBvcnQgeyBNYXNzRXh0ZW5kUmVuZXdhbERhdGVTdGF0dXNSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL01hc3NFeHRlbmRSZW5ld2FsRGF0ZVN0YXR1c1Jlc3BvbnNlJ1xuZXhwb3J0IHsgTm90aWZpY2F0aW9uSGlzdG9yeVJlcXVlc3QgfSBmcm9tICcuL21vZGVscy9Ob3RpZmljYXRpb25IaXN0b3J5UmVxdWVzdCdcbmV4cG9ydCB7IE5vdGlmaWNhdGlvbkhpc3RvcnlSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL05vdGlmaWNhdGlvbkhpc3RvcnlSZXNwb25zZSdcbmV4cG9ydCB7IE5vdGlmaWNhdGlvbkhpc3RvcnlSZXNwb25zZUl0ZW0gfSBmcm9tICcuL21vZGVscy9Ob3RpZmljYXRpb25IaXN0b3J5UmVzcG9uc2VJdGVtJ1xuZXhwb3J0IHsgTm90aWZpY2F0aW9uVHlwZVYyIH0gZnJvbSAnLi9tb2RlbHMvTm90aWZpY2F0aW9uVHlwZVYyJ1xuZXhwb3J0IHsgT2ZmZXJUeXBlIH0gZnJvbSAnLi9tb2RlbHMvT2ZmZXJUeXBlJ1xuZXhwb3J0IHsgT2ZmZXJEaXNjb3VudFR5cGUgfSBmcm9tICcuL21vZGVscy9PZmZlckRpc2NvdW50VHlwZSdcbmV4cG9ydCB7IE9yZGVyTG9va3VwUmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9PcmRlckxvb2t1cFJlc3BvbnNlJ1xuZXhwb3J0IHsgT3JkZXJMb29rdXBTdGF0dXMgfSBmcm9tICcuL21vZGVscy9PcmRlckxvb2t1cFN0YXR1cydcbmV4cG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9tb2RlbHMvUGxhdGZvcm0nXG5leHBvcnQgeyBQbGF5VGltZSB9IGZyb20gJy4vbW9kZWxzL1BsYXlUaW1lJ1xuZXhwb3J0IHsgUHJpY2VJbmNyZWFzZVN0YXR1cyB9IGZyb20gJy4vbW9kZWxzL1ByaWNlSW5jcmVhc2VTdGF0dXMnXG5leHBvcnQgeyBSZWZ1bmRIaXN0b3J5UmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9SZWZ1bmRIaXN0b3J5UmVzcG9uc2UnXG5leHBvcnQgeyBSZXNwb25zZUJvZHlWMiB9IGZyb20gJy4vbW9kZWxzL1Jlc3BvbnNlQm9keVYyJ1xuZXhwb3J0IHsgUmVzcG9uc2VCb2R5VjJEZWNvZGVkUGF5bG9hZCB9IGZyb20gJy4vbW9kZWxzL1Jlc3BvbnNlQm9keVYyRGVjb2RlZFBheWxvYWQnXG5leHBvcnQgeyBSZXZvY2F0aW9uUmVhc29uIH0gZnJvbSAnLi9tb2RlbHMvUmV2b2NhdGlvblJlYXNvbidcbmV4cG9ydCB7IFNlbmRUZXN0Tm90aWZpY2F0aW9uUmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9TZW5kVGVzdE5vdGlmaWNhdGlvblJlc3BvbnNlJ1xuZXhwb3J0IHsgU3RhdHVzIH0gZnJvbSAnLi9tb2RlbHMvU3RhdHVzJ1xuZXhwb3J0IHsgU3RhdHVzUmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9TdGF0dXNSZXNwb25zZSdcbmV4cG9ydCB7IFN1YnNjcmlwdGlvbkdyb3VwSWRlbnRpZmllckl0ZW0gfSBmcm9tICcuL21vZGVscy9TdWJzY3JpcHRpb25Hcm91cElkZW50aWZpZXJJdGVtJ1xuZXhwb3J0IHsgU3VidHlwZSB9IGZyb20gJy4vbW9kZWxzL1N1YnR5cGUnXG5leHBvcnQgeyBTdW1tYXJ5IH0gZnJvbSAnLi9tb2RlbHMvU3VtbWFyeSdcbmV4cG9ydCB7IFRyYW5zYWN0aW9uSGlzdG9yeVJlcXVlc3QsIE9yZGVyLCBQcm9kdWN0VHlwZSB9IGZyb20gJy4vbW9kZWxzL1RyYW5zYWN0aW9uSGlzdG9yeVJlcXVlc3QnXG5leHBvcnQgeyBUcmFuc2FjdGlvbkluZm9SZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL1RyYW5zYWN0aW9uSW5mb1Jlc3BvbnNlJ1xuZXhwb3J0IHsgVHJhbnNhY3Rpb25SZWFzb24gfSBmcm9tICcuL21vZGVscy9UcmFuc2FjdGlvblJlYXNvbidcbmV4cG9ydCB7IFR5cGUgfSBmcm9tICcuL21vZGVscy9UeXBlJ1xuZXhwb3J0IHsgVXNlclN0YXR1cyB9IGZyb20gJy4vbW9kZWxzL1VzZXJTdGF0dXMnXG5leHBvcnQgeyBQcm9tb3Rpb25hbE9mZmVyU2lnbmF0dXJlQ3JlYXRvciB9IGZyb20gJy4vcHJvbW90aW9uYWxfb2ZmZXInXG5leHBvcnQgeyBEZWNvZGVkU2lnbmVkRGF0YSB9IGZyb20gJy4vbW9kZWxzL0RlY29kZWRTaWduZWREYXRhJ1xuZXhwb3J0IHsgQXBwVHJhbnNhY3Rpb24gfSBmcm9tICcuL21vZGVscy9BcHBUcmFuc2FjdGlvbidcblxuaW1wb3J0IGpzb253ZWJ0b2tlbiA9IHJlcXVpcmUoJ2pzb253ZWJ0b2tlbicpO1xuaW1wb3J0IGp3dCA9IHJlcXVpcmUoXCJAdHNuZHIvY2xvdWRmbGFyZS13b3JrZXItand0XCIpXG5pbXBvcnQgeyBOb3RpZmljYXRpb25IaXN0b3J5UmVxdWVzdCB9IGZyb20gJy4vbW9kZWxzL05vdGlmaWNhdGlvbkhpc3RvcnlSZXF1ZXN0JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkhpc3RvcnlSZXNwb25zZSwgTm90aWZpY2F0aW9uSGlzdG9yeVJlc3BvbnNlVmFsaWRhdG9yIH0gZnJvbSAnLi9tb2RlbHMvTm90aWZpY2F0aW9uSGlzdG9yeVJlc3BvbnNlJztcbmltcG9ydCB7IFVSTFNlYXJjaFBhcmFtcyB9IGZyb20gJ3VybCc7XG5cbmV4cG9ydCBjbGFzcyBBcHBTdG9yZVNlcnZlckFQSUNsaWVudCB7XG4gIHByaXZhdGUgc3RhdGljIFBST0RVQ1RJT05fVVJMID0gXCJodHRwczovL2FwaS5zdG9yZWtpdC5pdHVuZXMuYXBwbGUuY29tXCI7XG4gIHByaXZhdGUgc3RhdGljIFNBTkRCT1hfVVJMID0gXCJodHRwczovL2FwaS5zdG9yZWtpdC1zYW5kYm94Lml0dW5lcy5hcHBsZS5jb21cIjtcbiAgcHJpdmF0ZSBzdGF0aWMgTE9DQUxfVEVTVElOR19VUkwgPSBcImh0dHBzOi8vbG9jYWwtdGVzdGluZy1iYXNlLXVybFwiO1xuICBwcml2YXRlIHN0YXRpYyBVU0VSX0FHRU5UID0gXCJhcHAtc3RvcmUtc2VydmVyLWxpYnJhcnkvbm9kZS8xLjQuMFwiO1xuXG4gIHByaXZhdGUgaXNzdWVySWQ6IHN0cmluZ1xuICBwcml2YXRlIGtleUlkOiBzdHJpbmdcbiAgcHJpdmF0ZSBzaWduaW5nS2V5OiBzdHJpbmdcbiAgcHJpdmF0ZSBidW5kbGVJZDogc3RyaW5nXG4gIHByaXZhdGUgdXJsQmFzZTogc3RyaW5nXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBBcHAgU3RvcmUgU2VydmVyIEFQSSBjbGllbnRcbiAgICogQHBhcmFtIHNpZ25pbmdLZXkgWW91ciBwcml2YXRlIGtleSBkb3dubG9hZGVkIGZyb20gQXBwIFN0b3JlIENvbm5lY3RcbiAgICogQHBhcmFtIGtleUlkIFlvdXIgcHJpdmF0ZSBrZXkgSUQgZnJvbSBBcHAgU3RvcmUgQ29ubmVjdFxuICAgKiBAcGFyYW0gaXNzdWVySWQgWW91ciBpc3N1ZXIgSUQgZnJvbSB0aGUgS2V5cyBwYWdlIGluIEFwcCBTdG9yZSBDb25uZWN0XG4gICAqIEBwYXJhbSBidW5kbGVJZCBZb3VyIGFwcOKAmXMgYnVuZGxlIElEXG4gICAqIEBwYXJhbSBlbnZpcm9ubWVudCBUaGUgZW52aXJvbm1lbnQgdG8gdGFyZ2V0XG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3Ioc2lnbmluZ0tleTogc3RyaW5nLCBrZXlJZDogc3RyaW5nLCBpc3N1ZXJJZDogc3RyaW5nLCBidW5kbGVJZDogc3RyaW5nLCBlbnZpcm9ubWVudDogRW52aXJvbm1lbnQpIHtcbiAgICB0aGlzLmlzc3VlcklkID0gaXNzdWVySWRcbiAgICB0aGlzLmtleUlkID0ga2V5SWRcbiAgICB0aGlzLmJ1bmRsZUlkID0gYnVuZGxlSWRcbiAgICB0aGlzLnNpZ25pbmdLZXkgPSBzaWduaW5nS2V5XG4gICAgc3dpdGNoIChlbnZpcm9ubWVudCkge1xuICAgICAgY2FzZSBFbnZpcm9ubWVudC5YQ09ERTpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWGNvZGUgaXMgbm90IGEgc3VwcG9ydGVkIGVudmlyb25tZW50IGZvciBhbiBBcHBTdG9yZVNlcnZlckFQSUNsaWVudFwiKVxuICAgICAgY2FzZSBFbnZpcm9ubWVudC5QUk9EVUNUSU9OOlxuICAgICAgICB0aGlzLnVybEJhc2UgPSBBcHBTdG9yZVNlcnZlckFQSUNsaWVudC5QUk9EVUNUSU9OX1VSTFxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBFbnZpcm9ubWVudC5MT0NBTF9URVNUSU5HOlxuICAgICAgICB0aGlzLnVybEJhc2UgPSBBcHBTdG9yZVNlcnZlckFQSUNsaWVudC5MT0NBTF9URVNUSU5HX1VSTFxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBFbnZpcm9ubWVudC5TQU5EQk9YOlxuICAgICAgICB0aGlzLnVybEJhc2UgPSBBcHBTdG9yZVNlcnZlckFQSUNsaWVudC5TQU5EQk9YX1VSTFxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBtYWtlUmVxdWVzdDxUPihwYXRoOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBxdWVyeVBhcmFtZXRlcnM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSwgYm9keTogb2JqZWN0IHwgbnVsbCwgdmFsaWRhdG9yOiBWYWxpZGF0b3I8VD4gfCBudWxsKTogUHJvbWlzZTxUPiB7XG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLmNyZWF0ZUJlYXJlclRva2VuKClcbiAgICBjb25zdCBoZWFkZXJzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgICAgJ1VzZXItQWdlbnQnOiBBcHBTdG9yZVNlcnZlckFQSUNsaWVudC5VU0VSX0FHRU5ULFxuICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlbixcbiAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfVxuICAgIGNvbnN0IHBhcnNlZFF1ZXJ5UGFyYW1ldGVycyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKVxuICAgIGZvciAoY29uc3QgcXVlcnlQYXJhbSBpbiBxdWVyeVBhcmFtZXRlcnMpIHtcbiAgICAgIGZvciAoY29uc3QgcXVlcnlWYWwgb2YgcXVlcnlQYXJhbWV0ZXJzW3F1ZXJ5UGFyYW1dKSB7XG4gICAgICAgIHBhcnNlZFF1ZXJ5UGFyYW1ldGVycy5hcHBlbmQocXVlcnlQYXJhbSwgcXVlcnlWYWwpXG4gICAgICB9XG4gICAgfVxuICAgIGxldCBzdHJpbmdCb2R5ID0gdW5kZWZpbmVkXG4gICAgaWYgKGJvZHkgIT0gbnVsbCkge1xuICAgICAgc3RyaW5nQm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpXG4gICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5tYWtlRmV0Y2hSZXF1ZXN0KHBhdGgsIHBhcnNlZFF1ZXJ5UGFyYW1ldGVycywgbWV0aG9kLCBzdHJpbmdCb2R5LCBoZWFkZXJzKVxuXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAvLyBTdWNjZXNzXG4gICAgICBpZiAodmFsaWRhdG9yID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGwgYXMgVFxuICAgICAgfVxuXG4gICAgICBjb25zdCByZXNwb25zZUJvZHkgPSBhd2FpdCByZXNwb25zZS5qc29uKClcblxuICAgICAgaWYgKCF2YWxpZGF0b3IudmFsaWRhdGUocmVzcG9uc2VCb2R5KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIHJlc3BvbnNlIGJvZHkgZm9ybWF0XCIpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXNwb25zZUJvZHlcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2VCb2R5ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBjb25zdCBlcnJvckNvZGUgPSByZXNwb25zZUJvZHlbJ2Vycm9yQ29kZSddXG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSByZXNwb25zZUJvZHlbJ2Vycm9yTWVzc2FnZSddXG5cbiAgICAgIGlmIChlcnJvckNvZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEFQSUV4Y2VwdGlvbihyZXNwb25zZS5zdGF0dXMsIGVycm9yQ29kZSwgZXJyb3JNZXNzYWdlKVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgQVBJRXhjZXB0aW9uKHJlc3BvbnNlLnN0YXR1cylcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEFQSUV4Y2VwdGlvbikge1xuICAgICAgICB0aHJvdyBlXG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBBUElFeGNlcHRpb24ocmVzcG9uc2Uuc3RhdHVzKVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBtYWtlRmV0Y2hSZXF1ZXN0KHBhdGg6IHN0cmluZywgcGFyc2VkUXVlcnlQYXJhbWV0ZXJzOiBVUkxTZWFyY2hQYXJhbXMsIG1ldGhvZDogc3RyaW5nLCBzdHJpbmdCb2R5OiBzdHJpbmcgfCB1bmRlZmluZWQsIGhlYWRlcnM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nOyB9KSB7XG4gICAgcmV0dXJuIGF3YWl0IGZldGNoKHRoaXMudXJsQmFzZSArIHBhdGggKyAnPycgKyBwYXJzZWRRdWVyeVBhcmFtZXRlcnMsIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgYm9keTogc3RyaW5nQm9keSxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VzIGEgc3Vic2NyaXB0aW9u4oCZcyBwcm9kdWN0IGlkZW50aWZpZXIgdG8gZXh0ZW5kIHRoZSByZW5ld2FsIGRhdGUgZm9yIGFsbCBvZiBpdHMgZWxpZ2libGUgYWN0aXZlIHN1YnNjcmliZXJzLlxuICAgKlxuICAgKiBAcGFyYW0gbWFzc0V4dGVuZFJlbmV3YWxEYXRlUmVxdWVzdCBUaGUgcmVxdWVzdCBib2R5IGZvciBleHRlbmRpbmcgYSBzdWJzY3JpcHRpb24gcmVuZXdhbCBkYXRlIGZvciBhbGwgb2YgaXRzIGFjdGl2ZSBzdWJzY3JpYmVycy5cbiAgICogQHJldHVybiBBIHJlc3BvbnNlIHRoYXQgaW5kaWNhdGVzIHRoZSBzZXJ2ZXIgc3VjY2Vzc2Z1bGx5IHJlY2VpdmVkIHRoZSBzdWJzY3JpcHRpb24tcmVuZXdhbC1kYXRlIGV4dGVuc2lvbiByZXF1ZXN0LlxuICAgKiBAdGhyb3dzIEFQSUV4Y2VwdGlvbiBJZiBhIHJlc3BvbnNlIHdhcyByZXR1cm5lZCBpbmRpY2F0aW5nIHRoZSByZXF1ZXN0IGNvdWxkIG5vdCBiZSBwcm9jZXNzZWRcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2V4dGVuZF9zdWJzY3JpcHRpb25fcmVuZXdhbF9kYXRlc19mb3JfYWxsX2FjdGl2ZV9zdWJzY3JpYmVycyBFeHRlbmQgU3Vic2NyaXB0aW9uIFJlbmV3YWwgRGF0ZXMgZm9yIEFsbCBBY3RpdmUgU3Vic2NyaWJlcnN9XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZXh0ZW5kUmVuZXdhbERhdGVGb3JBbGxBY3RpdmVTdWJzY3JpYmVycyhtYXNzRXh0ZW5kUmVuZXdhbERhdGVSZXF1ZXN0OiBNYXNzRXh0ZW5kUmVuZXdhbERhdGVSZXF1ZXN0KTogUHJvbWlzZTxNYXNzRXh0ZW5kUmVuZXdhbERhdGVSZXNwb25zZT4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLm1ha2VSZXF1ZXN0KFwiL2luQXBwcy92MS9zdWJzY3JpcHRpb25zL2V4dGVuZC9tYXNzXCIsIFwiUE9TVFwiLCB7fSwgbWFzc0V4dGVuZFJlbmV3YWxEYXRlUmVxdWVzdCwgbmV3IE1hc3NFeHRlbmRSZW5ld2FsRGF0ZVJlc3BvbnNlVmFsaWRhdG9yKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dGVuZHMgdGhlIHJlbmV3YWwgZGF0ZSBvZiBhIGN1c3RvbWVy4oCZcyBhY3RpdmUgc3Vic2NyaXB0aW9uIHVzaW5nIHRoZSBvcmlnaW5hbCB0cmFuc2FjdGlvbiBpZGVudGlmaWVyLlxuICAgKlxuICAgKiBAcGFyYW0gb3JpZ2luYWxUcmFuc2FjdGlvbklkICAgIFRoZSBvcmlnaW5hbCB0cmFuc2FjdGlvbiBpZGVudGlmaWVyIG9mIHRoZSBzdWJzY3JpcHRpb24gcmVjZWl2aW5nIGEgcmVuZXdhbCBkYXRlIGV4dGVuc2lvbi5cbiAgICogQHBhcmFtIGV4dGVuZFJlbmV3YWxEYXRlUmVxdWVzdCBUaGUgcmVxdWVzdCBib2R5IGNvbnRhaW5pbmcgc3Vic2NyaXB0aW9uLXJlbmV3YWwtZXh0ZW5zaW9uIGRhdGEuXG4gICAqIEByZXR1cm4gQSByZXNwb25zZSB0aGF0IGluZGljYXRlcyB3aGV0aGVyIGFuIGluZGl2aWR1YWwgcmVuZXdhbC1kYXRlIGV4dGVuc2lvbiBzdWNjZWVkZWQsIGFuZCByZWxhdGVkIGRldGFpbHMuXG4gICAqIEB0aHJvd3MgQVBJRXhjZXB0aW9uIElmIGEgcmVzcG9uc2Ugd2FzIHJldHVybmVkIGluZGljYXRpbmcgdGhlIHJlcXVlc3QgY291bGQgbm90IGJlIHByb2Nlc3NlZFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvZXh0ZW5kX2Ffc3Vic2NyaXB0aW9uX3JlbmV3YWxfZGF0ZSBFeHRlbmQgYSBTdWJzY3JpcHRpb24gUmVuZXdhbCBEYXRlfVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGV4dGVuZFN1YnNjcmlwdGlvblJlbmV3YWxEYXRlKG9yaWdpbmFsVHJhbnNhY3Rpb25JZDogc3RyaW5nLCBleHRlbmRSZW5ld2FsRGF0ZVJlcXVlc3Q6IEV4dGVuZFJlbmV3YWxEYXRlUmVxdWVzdCk6IFByb21pc2U8RXh0ZW5kUmVuZXdhbERhdGVSZXNwb25zZT4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLm1ha2VSZXF1ZXN0PEV4dGVuZFJlbmV3YWxEYXRlUmVzcG9uc2U+KFwiL2luQXBwcy92MS9zdWJzY3JpcHRpb25zL2V4dGVuZC9cIiArIG9yaWdpbmFsVHJhbnNhY3Rpb25JZCwgXCJQVVRcIiwge30sIGV4dGVuZFJlbmV3YWxEYXRlUmVxdWVzdCwgbmV3IEV4dGVuZFJlbmV3YWxEYXRlUmVzcG9uc2VWYWxpZGF0b3IoKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzdGF0dXNlcyBmb3IgYWxsIG9mIGEgY3VzdG9tZXLigJlzIGF1dG8tcmVuZXdhYmxlIHN1YnNjcmlwdGlvbnMgaW4geW91ciBhcHAuXG4gICAqXG4gICAqIEBwYXJhbSB0cmFuc2FjdGlvbklkIFRoZSBpZGVudGlmaWVyIG9mIGEgdHJhbnNhY3Rpb24gdGhhdCBiZWxvbmdzIHRvIHRoZSBjdXN0b21lciwgYW5kIHdoaWNoIG1heSBiZSBhbiBvcmlnaW5hbCB0cmFuc2FjdGlvbiBpZGVudGlmaWVyLlxuICAgKiBAcGFyYW0gc3RhdHVzIEFuIG9wdGlvbmFsIGZpbHRlciB0aGF0IGluZGljYXRlcyB0aGUgc3RhdHVzIG9mIHN1YnNjcmlwdGlvbnMgdG8gaW5jbHVkZSBpbiB0aGUgcmVzcG9uc2UuIFlvdXIgcXVlcnkgbWF5IHNwZWNpZnkgbW9yZSB0aGFuIG9uZSBzdGF0dXMgcXVlcnkgcGFyYW1ldGVyLlxuICAgKiBAcmV0dXJuIEEgcmVzcG9uc2UgdGhhdCBjb250YWlucyBzdGF0dXMgaW5mb3JtYXRpb24gZm9yIGFsbCBvZiBhIGN1c3RvbWVy4oCZcyBhdXRvLXJlbmV3YWJsZSBzdWJzY3JpcHRpb25zIGluIHlvdXIgYXBwLlxuICAgKiBAdGhyb3dzIEFQSUV4Y2VwdGlvbiBJZiBhIHJlc3BvbnNlIHdhcyByZXR1cm5lZCBpbmRpY2F0aW5nIHRoZSByZXF1ZXN0IGNvdWxkIG5vdCBiZSBwcm9jZXNzZWRcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2dldF9hbGxfc3Vic2NyaXB0aW9uX3N0YXR1c2VzIEdldCBBbGwgU3Vic2NyaXB0aW9uIFN0YXR1c2VzfVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEFsbFN1YnNjcmlwdGlvblN0YXR1c2VzKHRyYW5zYWN0aW9uSWQ6IHN0cmluZywgc3RhdHVzOiBTdGF0dXNbXSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCk6IFByb21pc2U8U3RhdHVzUmVzcG9uc2U+IHtcbiAgICBjb25zdCBxdWVyeVBhcmFtZXRlcnM6IHsgW2tleTogc3RyaW5nXTogW3N0cmluZ10gfSA9IHt9XG4gICAgaWYgKHN0YXR1cyAhPSBudWxsKSB7XG4gICAgICBxdWVyeVBhcmFtZXRlcnNbXCJzdGF0dXNcIl0gPSBzdGF0dXMubWFwKHMgPT4gcy50b1N0cmluZygpKSBhcyBbc3RyaW5nXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXdhaXQgdGhpcy5tYWtlUmVxdWVzdChcIi9pbkFwcHMvdjEvc3Vic2NyaXB0aW9ucy9cIiArIHRyYW5zYWN0aW9uSWQsIFwiR0VUXCIsIHF1ZXJ5UGFyYW1ldGVycywgbnVsbCwgbmV3IFN0YXR1c1Jlc3BvbnNlVmFsaWRhdG9yKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHBhZ2luYXRlZCBsaXN0IG9mIGFsbCBvZiBhIGN1c3RvbWVy4oCZcyByZWZ1bmRlZCBpbi1hcHAgcHVyY2hhc2VzIGZvciB5b3VyIGFwcC5cbiAgICpcbiAgICogQHBhcmFtIHRyYW5zYWN0aW9uSWQgVGhlIGlkZW50aWZpZXIgb2YgYSB0cmFuc2FjdGlvbiB0aGF0IGJlbG9uZ3MgdG8gdGhlIGN1c3RvbWVyLCBhbmQgd2hpY2ggbWF5IGJlIGFuIG9yaWdpbmFsIHRyYW5zYWN0aW9uIGlkZW50aWZpZXIuXG4gICAqIEBwYXJhbSByZXZpc2lvbiAgICAgICAgICAgICAgQSB0b2tlbiB5b3UgcHJvdmlkZSB0byBnZXQgdGhlIG5leHQgc2V0IG9mIHVwIHRvIDIwIHRyYW5zYWN0aW9ucy4gQWxsIHJlc3BvbnNlcyBpbmNsdWRlIGEgcmV2aXNpb24gdG9rZW4uIFVzZSB0aGUgcmV2aXNpb24gdG9rZW4gZnJvbSB0aGUgcHJldmlvdXMgUmVmdW5kSGlzdG9yeVJlc3BvbnNlLlxuICAgKiBAcmV0dXJuIEEgcmVzcG9uc2UgdGhhdCBjb250YWlucyBzdGF0dXMgaW5mb3JtYXRpb24gZm9yIGFsbCBvZiBhIGN1c3RvbWVy4oCZcyBhdXRvLXJlbmV3YWJsZSBzdWJzY3JpcHRpb25zIGluIHlvdXIgYXBwLlxuICAgKiBAdGhyb3dzIEFQSUV4Y2VwdGlvbiBJZiBhIHJlc3BvbnNlIHdhcyByZXR1cm5lZCBpbmRpY2F0aW5nIHRoZSByZXF1ZXN0IGNvdWxkIG5vdCBiZSBwcm9jZXNzZWRcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2dldF9yZWZ1bmRfaGlzdG9yeSBHZXQgUmVmdW5kIEhpc3Rvcnl9XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0UmVmdW5kSGlzdG9yeSh0cmFuc2FjdGlvbklkOiBzdHJpbmcsIHJldmlzaW9uOiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxSZWZ1bmRIaXN0b3J5UmVzcG9uc2U+IHtcbiAgICBjb25zdCBxdWVyeVBhcmFtZXRlcnM6IHsgW2tleTogc3RyaW5nXTogW3N0cmluZ10gfSA9IHt9XG4gICAgaWYgKHJldmlzaW9uICE9PSBudWxsKSB7XG4gICAgICBxdWVyeVBhcmFtZXRlcnNbXCJyZXZpc2lvblwiXSA9IFtyZXZpc2lvbl07XG4gICAgfVxuXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubWFrZVJlcXVlc3QoXCIvaW5BcHBzL3YyL3JlZnVuZC9sb29rdXAvXCIgKyB0cmFuc2FjdGlvbklkLCBcIkdFVFwiLCBxdWVyeVBhcmFtZXRlcnMsIG51bGwsIG5ldyBSZWZ1bmRIaXN0b3J5UmVzcG9uc2VWYWxpZGF0b3IoKSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgYSByZW5ld2FsIGRhdGUgZXh0ZW5zaW9uIHJlcXVlc3QgY29tcGxldGVkLCBhbmQgcHJvdmlkZXMgdGhlIGZpbmFsIGNvdW50IG9mIHN1Y2Nlc3NmdWwgb3IgZmFpbGVkIGV4dGVuc2lvbnMuXG4gICAqXG4gICAqIEBwYXJhbSByZXF1ZXN0SWRlbnRpZmllciBUaGUgVVVJRCB0aGF0IHJlcHJlc2VudHMgeW91ciByZXF1ZXN0IHRvIHRoZSBFeHRlbmQgU3Vic2NyaXB0aW9uIFJlbmV3YWwgRGF0ZXMgZm9yIEFsbCBBY3RpdmUgU3Vic2NyaWJlcnMgZW5kcG9pbnQuXG4gICAqIEBwYXJhbSBwcm9kdWN0SWQgICAgICAgICBUaGUgcHJvZHVjdCBpZGVudGlmaWVyIG9mIHRoZSBhdXRvLXJlbmV3YWJsZSBzdWJzY3JpcHRpb24gdGhhdCB5b3UgcmVxdWVzdCBhIHJlbmV3YWwtZGF0ZSBleHRlbnNpb24gZm9yLlxuICAgKiBAcmV0dXJuIEEgcmVzcG9uc2UgdGhhdCBpbmRpY2F0ZXMgdGhlIGN1cnJlbnQgc3RhdHVzIG9mIGEgcmVxdWVzdCB0byBleHRlbmQgdGhlIHN1YnNjcmlwdGlvbiByZW5ld2FsIGRhdGUgdG8gYWxsIGVsaWdpYmxlIHN1YnNjcmliZXJzLlxuICAgKiBAdGhyb3dzIEFQSUV4Y2VwdGlvbiBJZiBhIHJlc3BvbnNlIHdhcyByZXR1cm5lZCBpbmRpY2F0aW5nIHRoZSByZXF1ZXN0IGNvdWxkIG5vdCBiZSBwcm9jZXNzZWRcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2dldF9zdGF0dXNfb2Zfc3Vic2NyaXB0aW9uX3JlbmV3YWxfZGF0ZV9leHRlbnNpb25zIEdldCBTdGF0dXMgb2YgU3Vic2NyaXB0aW9uIFJlbmV3YWwgRGF0ZSBFeHRlbnNpb25zfVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFN0YXR1c09mU3Vic2NyaXB0aW9uUmVuZXdhbERhdGVFeHRlbnNpb25zKHJlcXVlc3RJZGVudGlmaWVyOiBzdHJpbmcsIHByb2R1Y3RJZDogc3RyaW5nKTogUHJvbWlzZTxNYXNzRXh0ZW5kUmVuZXdhbERhdGVTdGF0dXNSZXNwb25zZT4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLm1ha2VSZXF1ZXN0KFwiL2luQXBwcy92MS9zdWJzY3JpcHRpb25zL2V4dGVuZC9tYXNzL1wiICsgcHJvZHVjdElkICsgXCIvXCIgKyByZXF1ZXN0SWRlbnRpZmllciwgXCJHRVRcIiwge30sIG51bGwsIG5ldyBNYXNzRXh0ZW5kUmVuZXdhbERhdGVTdGF0dXNSZXNwb25zZVZhbGlkYXRvcigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB0aGUgc3RhdHVzIG9mIHRoZSB0ZXN0IEFwcCBTdG9yZSBzZXJ2ZXIgbm90aWZpY2F0aW9uIHNlbnQgdG8geW91ciBzZXJ2ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB0ZXN0Tm90aWZpY2F0aW9uVG9rZW4gVGhlIHRlc3Qgbm90aWZpY2F0aW9uIHRva2VuIHJlY2VpdmVkIGZyb20gdGhlIFJlcXVlc3QgYSBUZXN0IE5vdGlmaWNhdGlvbiBlbmRwb2ludFxuICAgKiBAcmV0dXJuIEEgcmVzcG9uc2UgdGhhdCBjb250YWlucyB0aGUgY29udGVudHMgb2YgdGhlIHRlc3Qgbm90aWZpY2F0aW9uIHNlbnQgYnkgdGhlIEFwcCBTdG9yZSBzZXJ2ZXIgYW5kIHRoZSByZXN1bHQgZnJvbSB5b3VyIHNlcnZlci5cbiAgICogQHRocm93cyBBUElFeGNlcHRpb24gSWYgYSByZXNwb25zZSB3YXMgcmV0dXJuZWQgaW5kaWNhdGluZyB0aGUgcmVxdWVzdCBjb3VsZCBub3QgYmUgcHJvY2Vzc2VkXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9nZXRfdGVzdF9ub3RpZmljYXRpb25fc3RhdHVzIEdldCBUZXN0IE5vdGlmaWNhdGlvbiBTdGF0dXN9XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0VGVzdE5vdGlmaWNhdGlvblN0YXR1cyh0ZXN0Tm90aWZpY2F0aW9uVG9rZW46IHN0cmluZyk6IFByb21pc2U8Q2hlY2tUZXN0Tm90aWZpY2F0aW9uUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5tYWtlUmVxdWVzdChcIi9pbkFwcHMvdjEvbm90aWZpY2F0aW9ucy90ZXN0L1wiICsgdGVzdE5vdGlmaWNhdGlvblRva2VuLCBcIkdFVFwiLCB7fSwgbnVsbCwgbmV3IENoZWNrVGVzdE5vdGlmaWNhdGlvblJlc3BvbnNlVmFsaWRhdG9yKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGxpc3Qgb2Ygbm90aWZpY2F0aW9ucyB0aGF0IHRoZSBBcHAgU3RvcmUgc2VydmVyIGF0dGVtcHRlZCB0byBzZW5kIHRvIHlvdXIgc2VydmVyLlxuICAgKlxuICAgKiBAcGFyYW0gcGFnaW5hdGlvblRva2VuIEFuIG9wdGlvbmFsIHRva2VuIHlvdSB1c2UgdG8gZ2V0IHRoZSBuZXh0IHNldCBvZiB1cCB0byAyMCBub3RpZmljYXRpb24gaGlzdG9yeSByZWNvcmRzLiBBbGwgcmVzcG9uc2VzIHRoYXQgaGF2ZSBtb3JlIHJlY29yZHMgYXZhaWxhYmxlIGluY2x1ZGUgYSBwYWdpbmF0aW9uVG9rZW4uIE9taXQgdGhpcyBwYXJhbWV0ZXIgdGhlIGZpcnN0IHRpbWUgeW91IGNhbGwgdGhpcyBlbmRwb2ludC5cbiAgICogQHBhcmFtIG5vdGlmaWNhdGlvbkhpc3RvcnlSZXF1ZXN0IFRoZSByZXF1ZXN0IGJvZHkgdGhhdCBpbmNsdWRlcyB0aGUgc3RhcnQgYW5kIGVuZCBkYXRlcywgYW5kIG9wdGlvbmFsIHF1ZXJ5IGNvbnN0cmFpbnRzLlxuICAgKiBAcmV0dXJuIEEgcmVzcG9uc2UgdGhhdCBjb250YWlucyB0aGUgQXBwIFN0b3JlIFNlcnZlciBOb3RpZmljYXRpb25zIGhpc3RvcnkgZm9yIHlvdXIgYXBwLlxuICAgKiBAdGhyb3dzIEFQSUV4Y2VwdGlvbiBJZiBhIHJlc3BvbnNlIHdhcyByZXR1cm5lZCBpbmRpY2F0aW5nIHRoZSByZXF1ZXN0IGNvdWxkIG5vdCBiZSBwcm9jZXNzZWRcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2dldF9ub3RpZmljYXRpb25faGlzdG9yeSBHZXQgTm90aWZpY2F0aW9uIEhpc3Rvcnl9XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0Tm90aWZpY2F0aW9uSGlzdG9yeShwYWdpbmF0aW9uVG9rZW46IHN0cmluZyB8IG51bGwsIG5vdGlmaWNhdGlvbkhpc3RvcnlSZXF1ZXN0OiBOb3RpZmljYXRpb25IaXN0b3J5UmVxdWVzdCk6IFByb21pc2U8Tm90aWZpY2F0aW9uSGlzdG9yeVJlc3BvbnNlPiB7XG4gICAgY29uc3QgcXVlcnlQYXJhbWV0ZXJzOiB7IFtrZXk6IHN0cmluZ106IFtzdHJpbmddIH0gPSB7fVxuICAgIGlmIChwYWdpbmF0aW9uVG9rZW4gIT0gbnVsbCkge1xuICAgICAgcXVlcnlQYXJhbWV0ZXJzW1wicGFnaW5hdGlvblRva2VuXCJdID0gW3BhZ2luYXRpb25Ub2tlbl07XG4gICAgfVxuICAgIHJldHVybiBhd2FpdCB0aGlzLm1ha2VSZXF1ZXN0KFwiL2luQXBwcy92MS9ub3RpZmljYXRpb25zL2hpc3RvcnlcIiwgXCJQT1NUXCIsIHF1ZXJ5UGFyYW1ldGVycywgbm90aWZpY2F0aW9uSGlzdG9yeVJlcXVlc3QsIG5ldyBOb3RpZmljYXRpb25IaXN0b3J5UmVzcG9uc2VWYWxpZGF0b3IoKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgY3VzdG9tZXLigJlzIGluLWFwcCBwdXJjaGFzZSB0cmFuc2FjdGlvbiBoaXN0b3J5IGZvciB5b3VyIGFwcC5cbiAgICpcbiAgICogQHBhcmFtIHRyYW5zYWN0aW9uSWQgVGhlIGlkZW50aWZpZXIgb2YgYSB0cmFuc2FjdGlvbiB0aGF0IGJlbG9uZ3MgdG8gdGhlIGN1c3RvbWVyLCBhbmQgd2hpY2ggbWF5IGJlIGFuIG9yaWdpbmFsIHRyYW5zYWN0aW9uIGlkZW50aWZpZXIuXG4gICAqIEBwYXJhbSByZXZpc2lvbiAgICAgICAgICAgICAgQSB0b2tlbiB5b3UgcHJvdmlkZSB0byBnZXQgdGhlIG5leHQgc2V0IG9mIHVwIHRvIDIwIHRyYW5zYWN0aW9ucy4gQWxsIHJlc3BvbnNlcyBpbmNsdWRlIGEgcmV2aXNpb24gdG9rZW4uIE5vdGU6IEZvciByZXF1ZXN0cyB0aGF0IHVzZSB0aGUgcmV2aXNpb24gdG9rZW4sIGluY2x1ZGUgdGhlIHNhbWUgcXVlcnkgcGFyYW1ldGVycyBmcm9tIHRoZSBpbml0aWFsIHJlcXVlc3QuIFVzZSB0aGUgcmV2aXNpb24gdG9rZW4gZnJvbSB0aGUgcHJldmlvdXMgSGlzdG9yeVJlc3BvbnNlLlxuICAgKiBAcGFyYW0gdmVyc2lvbiBUaGUgdmVyc2lvbiBvZiB0aGUgR2V0IFRyYW5zYWN0aW9uIEhpc3RvcnkgZW5kcG9pbnQgdG8gdXNlLiBWMiBpcyByZWNvbW1lbmRlZC5cbiAgICogQHJldHVybiBBIHJlc3BvbnNlIHRoYXQgY29udGFpbnMgdGhlIGN1c3RvbWVy4oCZcyB0cmFuc2FjdGlvbiBoaXN0b3J5IGZvciBhbiBhcHAuXG4gICAqIEB0aHJvd3MgQVBJRXhjZXB0aW9uIElmIGEgcmVzcG9uc2Ugd2FzIHJldHVybmVkIGluZGljYXRpbmcgdGhlIHJlcXVlc3QgY291bGQgbm90IGJlIHByb2Nlc3NlZFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvZ2V0X3RyYW5zYWN0aW9uX2hpc3RvcnkgR2V0IFRyYW5zYWN0aW9uIEhpc3Rvcnl9XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0VHJhbnNhY3Rpb25IaXN0b3J5KHRyYW5zYWN0aW9uSWQ6IHN0cmluZywgcmV2aXNpb246IHN0cmluZyB8IG51bGwsIHRyYW5zYWN0aW9uSGlzdG9yeVJlcXVlc3Q6IFRyYW5zYWN0aW9uSGlzdG9yeVJlcXVlc3QsIHZlcnNpb246IEdldFRyYW5zYWN0aW9uSGlzdG9yeVZlcnNpb24gPSBHZXRUcmFuc2FjdGlvbkhpc3RvcnlWZXJzaW9uLlYxKTogUHJvbWlzZTxIaXN0b3J5UmVzcG9uc2U+IHtcbiAgICBjb25zdCBxdWVyeVBhcmFtZXRlcnM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSA9IHt9XG4gICAgaWYgKHJldmlzaW9uICE9IG51bGwpIHtcbiAgICAgIHF1ZXJ5UGFyYW1ldGVyc1tcInJldmlzaW9uXCJdID0gW3JldmlzaW9uXTtcbiAgICB9XG4gICAgaWYgKHRyYW5zYWN0aW9uSGlzdG9yeVJlcXVlc3Quc3RhcnREYXRlKSB7XG4gICAgICBxdWVyeVBhcmFtZXRlcnNbXCJzdGFydERhdGVcIl0gPSBbdHJhbnNhY3Rpb25IaXN0b3J5UmVxdWVzdC5zdGFydERhdGUudG9TdHJpbmcoKV07XG4gICAgfVxuICAgIGlmICh0cmFuc2FjdGlvbkhpc3RvcnlSZXF1ZXN0LmVuZERhdGUpIHtcbiAgICAgIHF1ZXJ5UGFyYW1ldGVyc1tcImVuZERhdGVcIl0gPSBbdHJhbnNhY3Rpb25IaXN0b3J5UmVxdWVzdC5lbmREYXRlLnRvU3RyaW5nKCldO1xuICAgIH1cbiAgICBpZiAodHJhbnNhY3Rpb25IaXN0b3J5UmVxdWVzdC5wcm9kdWN0SWRzKSB7XG4gICAgICBxdWVyeVBhcmFtZXRlcnNbXCJwcm9kdWN0SWRcIl0gPSB0cmFuc2FjdGlvbkhpc3RvcnlSZXF1ZXN0LnByb2R1Y3RJZHM7XG4gICAgfVxuICAgIGlmICh0cmFuc2FjdGlvbkhpc3RvcnlSZXF1ZXN0LnByb2R1Y3RUeXBlcykge1xuICAgICAgcXVlcnlQYXJhbWV0ZXJzW1wicHJvZHVjdFR5cGVcIl0gPSB0cmFuc2FjdGlvbkhpc3RvcnlSZXF1ZXN0LnByb2R1Y3RUeXBlcztcbiAgICB9XG4gICAgaWYgKHRyYW5zYWN0aW9uSGlzdG9yeVJlcXVlc3Quc29ydCkge1xuICAgICAgcXVlcnlQYXJhbWV0ZXJzW1wic29ydFwiXSA9IFt0cmFuc2FjdGlvbkhpc3RvcnlSZXF1ZXN0LnNvcnRdO1xuICAgIH1cbiAgICBpZiAodHJhbnNhY3Rpb25IaXN0b3J5UmVxdWVzdC5zdWJzY3JpcHRpb25Hcm91cElkZW50aWZpZXJzKSB7XG4gICAgICBxdWVyeVBhcmFtZXRlcnNbXCJzdWJzY3JpcHRpb25Hcm91cElkZW50aWZpZXJcIl0gPSB0cmFuc2FjdGlvbkhpc3RvcnlSZXF1ZXN0LnN1YnNjcmlwdGlvbkdyb3VwSWRlbnRpZmllcnM7XG4gICAgfVxuICAgIGlmICh0cmFuc2FjdGlvbkhpc3RvcnlSZXF1ZXN0LmluQXBwT3duZXJzaGlwVHlwZSkge1xuICAgICAgcXVlcnlQYXJhbWV0ZXJzW1wiaW5BcHBPd25lcnNoaXBUeXBlXCJdID0gW3RyYW5zYWN0aW9uSGlzdG9yeVJlcXVlc3QuaW5BcHBPd25lcnNoaXBUeXBlXTtcbiAgICB9XG4gICAgaWYgKHRyYW5zYWN0aW9uSGlzdG9yeVJlcXVlc3QucmV2b2tlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBxdWVyeVBhcmFtZXRlcnNbXCJyZXZva2VkXCJdID0gW3RyYW5zYWN0aW9uSGlzdG9yeVJlcXVlc3QucmV2b2tlZC50b1N0cmluZygpXTtcbiAgICB9XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubWFrZVJlcXVlc3QoXCIvaW5BcHBzL1wiICsgdmVyc2lvbiArIFwiL2hpc3RvcnkvXCIgKyB0cmFuc2FjdGlvbklkLCBcIkdFVFwiLCBxdWVyeVBhcmFtZXRlcnMsIG51bGwsIG5ldyBIaXN0b3J5UmVzcG9uc2VWYWxpZGF0b3IoKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IGEgc2luZ2xlIHRyYW5zYWN0aW9uIGZvciB5b3VyIGFwcC5cbiAgICpcbiAgICogQHBhcmFtIHRyYW5zYWN0aW9uSWQgVGhlIGlkZW50aWZpZXIgb2YgYSB0cmFuc2FjdGlvbiB0aGF0IGJlbG9uZ3MgdG8gdGhlIGN1c3RvbWVyLCBhbmQgd2hpY2ggbWF5IGJlIGFuIG9yaWdpbmFsIHRyYW5zYWN0aW9uIGlkZW50aWZpZXIuXG4gICAqIEByZXR1cm4gQSByZXNwb25zZSB0aGF0IGNvbnRhaW5zIHNpZ25lZCB0cmFuc2FjdGlvbiBpbmZvcm1hdGlvbiBmb3IgYSBzaW5nbGUgdHJhbnNhY3Rpb24uXG4gICAqIEB0aHJvd3MgQVBJRXhjZXB0aW9uIElmIGEgcmVzcG9uc2Ugd2FzIHJldHVybmVkIGluZGljYXRpbmcgdGhlIHJlcXVlc3QgY291bGQgbm90IGJlIHByb2Nlc3NlZFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvZ2V0X3RyYW5zYWN0aW9uX2luZm8gR2V0IFRyYW5zYWN0aW9uIEluZm99XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0VHJhbnNhY3Rpb25JbmZvKHRyYW5zYWN0aW9uSWQ6IHN0cmluZyk6IFByb21pc2U8VHJhbnNhY3Rpb25JbmZvUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5tYWtlUmVxdWVzdChcIi9pbkFwcHMvdjEvdHJhbnNhY3Rpb25zL1wiICsgdHJhbnNhY3Rpb25JZCwgXCJHRVRcIiwge30sIG51bGwsIG5ldyBUcmFuc2FjdGlvbkluZm9SZXNwb25zZVZhbGlkYXRvcigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBjdXN0b21lcuKAmXMgaW4tYXBwIHB1cmNoYXNlcyBmcm9tIGEgcmVjZWlwdCB1c2luZyB0aGUgb3JkZXIgSUQuXG4gICAqXG4gICAqIEBwYXJhbSBvcmRlcklkIFRoZSBvcmRlciBJRCBmb3IgaW4tYXBwIHB1cmNoYXNlcyB0aGF0IGJlbG9uZyB0byB0aGUgY3VzdG9tZXIuXG4gICAqIEByZXR1cm4gQSByZXNwb25zZSB0aGF0IGluY2x1ZGVzIHRoZSBvcmRlciBsb29rdXAgc3RhdHVzIGFuZCBhbiBhcnJheSBvZiBzaWduZWQgdHJhbnNhY3Rpb25zIGZvciB0aGUgaW4tYXBwIHB1cmNoYXNlcyBpbiB0aGUgb3JkZXIuXG4gICAqIEB0aHJvd3MgQVBJRXhjZXB0aW9uIElmIGEgcmVzcG9uc2Ugd2FzIHJldHVybmVkIGluZGljYXRpbmcgdGhlIHJlcXVlc3QgY291bGQgbm90IGJlIHByb2Nlc3NlZFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvbG9va191cF9vcmRlcl9pZCBMb29rIFVwIE9yZGVyIElEfVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGxvb2tVcE9yZGVySWQob3JkZXJJZDogc3RyaW5nKTogUHJvbWlzZTxPcmRlckxvb2t1cFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubWFrZVJlcXVlc3QoXCIvaW5BcHBzL3YxL2xvb2t1cC9cIiArIG9yZGVySWQsIFwiR0VUXCIsIHt9LCBudWxsLCBuZXcgT3JkZXJMb29rdXBSZXNwb25zZVZhbGlkYXRvcigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc2sgQXBwIFN0b3JlIFNlcnZlciBOb3RpZmljYXRpb25zIHRvIHNlbmQgYSB0ZXN0IG5vdGlmaWNhdGlvbiB0byB5b3VyIHNlcnZlci5cbiAgICpcbiAgICogQHJldHVybiBBIHJlc3BvbnNlIHRoYXQgY29udGFpbnMgdGhlIHRlc3Qgbm90aWZpY2F0aW9uIHRva2VuLlxuICAgKiBAdGhyb3dzIEFQSUV4Y2VwdGlvbiBJZiBhIHJlc3BvbnNlIHdhcyByZXR1cm5lZCBpbmRpY2F0aW5nIHRoZSByZXF1ZXN0IGNvdWxkIG5vdCBiZSBwcm9jZXNzZWRcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL3JlcXVlc3RfYV90ZXN0X25vdGlmaWNhdGlvbiBSZXF1ZXN0IGEgVGVzdCBOb3RpZmljYXRpb259XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVxdWVzdFRlc3ROb3RpZmljYXRpb24oKTogUHJvbWlzZTxTZW5kVGVzdE5vdGlmaWNhdGlvblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubWFrZVJlcXVlc3QoXCIvaW5BcHBzL3YxL25vdGlmaWNhdGlvbnMvdGVzdFwiLCBcIlBPU1RcIiwge30sIG51bGwsIG5ldyBTZW5kVGVzdE5vdGlmaWNhdGlvblJlc3BvbnNlVmFsaWRhdG9yKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgY29uc3VtcHRpb24gaW5mb3JtYXRpb24gYWJvdXQgYSBjb25zdW1hYmxlIGluLWFwcCBwdXJjaGFzZSB0byB0aGUgQXBwIFN0b3JlIGFmdGVyIHlvdXIgc2VydmVyIHJlY2VpdmVzIGEgY29uc3VtcHRpb24gcmVxdWVzdCBub3RpZmljYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB0cmFuc2FjdGlvbklkIFRoZSB0cmFuc2FjdGlvbiBpZGVudGlmaWVyIGZvciB3aGljaCB5b3XigJlyZSBwcm92aWRpbmcgY29uc3VtcHRpb24gaW5mb3JtYXRpb24uIFlvdSByZWNlaXZlIHRoaXMgaWRlbnRpZmllciBpbiB0aGUgQ09OU1VNUFRJT05fUkVRVUVTVCBub3RpZmljYXRpb24gdGhlIEFwcCBTdG9yZSBzZW5kcyB0byB5b3VyIHNlcnZlci5cbiAgICogQHBhcmFtIGNvbnN1bXB0aW9uUmVxdWVzdCAgICBUaGUgcmVxdWVzdCBib2R5IGNvbnRhaW5pbmcgY29uc3VtcHRpb24gaW5mb3JtYXRpb24uXG4gICAqIEB0aHJvd3MgQVBJRXhjZXB0aW9uIElmIGEgcmVzcG9uc2Ugd2FzIHJldHVybmVkIGluZGljYXRpbmcgdGhlIHJlcXVlc3QgY291bGQgbm90IGJlIHByb2Nlc3NlZFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvc2VuZF9jb25zdW1wdGlvbl9pbmZvcm1hdGlvbiBTZW5kIENvbnN1bXB0aW9uIEluZm9ybWF0aW9ufVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmRDb25zdW1wdGlvbkRhdGEodHJhbnNhY3Rpb25JZDogc3RyaW5nLCBjb25zdW1wdGlvblJlcXVlc3Q6IENvbnN1bXB0aW9uUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubWFrZVJlcXVlc3QoXCIvaW5BcHBzL3YxL3RyYW5zYWN0aW9ucy9jb25zdW1wdGlvbi9cIiArIHRyYW5zYWN0aW9uSWQsIFwiUFVUXCIsIHt9LCBjb25zdW1wdGlvblJlcXVlc3QsIG51bGwpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjcmVhdGVCZWFyZXJUb2tlbigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICBiaWQ6IHRoaXMuYnVuZGxlSWRcbiAgICB9XG4gICAgY29uc3QgcmVzID0gYXdhaXQgand0LnNpZ24ocGF5bG9hZCwgdGhpcy5zaWduaW5nS2V5LCB7IGFsZ29yaXRobTogJ0VTMjU2JywgaGVhZGVyOiB7IGtleUlkOiB0aGlzLmtleUlkLCBpc3N1ZXI6IHRoaXMuaXNzdWVySWQsIGF1ZGllbmNlOiAnYXBwc3RvcmVjb25uZWN0LXYxJywgZXhwaXJlc0luOiAnNW0nIH0gfSk7XG4gICAgcmV0dXJuIHJlc1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEFQSUV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcbiAgcHVibGljIGh0dHBTdGF0dXNDb2RlOiBudW1iZXJcbiAgcHVibGljIGFwaUVycm9yOiBudW1iZXIgfCBBUElFcnJvciB8IG51bGxcbiAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nIHwgbnVsbFxuXG4gIGNvbnN0cnVjdG9yKGh0dHBTdGF0dXNDb2RlOiBudW1iZXIsIGFwaUVycm9yOiBudW1iZXIgfCBudWxsID0gbnVsbCwgZXJyb3JNZXNzYWdlOiBzdHJpbmcgfCBudWxsID0gbnVsbCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmh0dHBTdGF0dXNDb2RlID0gaHR0cFN0YXR1c0NvZGVcbiAgICB0aGlzLmFwaUVycm9yID0gYXBpRXJyb3JcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZVxuICB9XG59XG5cbi8qKlxuICogRXJyb3IgY29kZXMgdGhhdCBBcHAgU3RvcmUgU2VydmVyIEFQSSByZXNwb25zZXMgcmV0dXJuLlxuICogXG4gKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvZXJyb3JfY29kZXMgRXJyb3IgY29kZXN9XG4gKi9cbmV4cG9ydCBlbnVtIEFQSUVycm9yIHtcbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIGFuIGludmFsaWQgcmVxdWVzdC5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9nZW5lcmFsYmFkcmVxdWVzdGVycm9yIEdlbmVyYWxCYWRSZXF1ZXN0RXJyb3J9XG4gICAqL1xuICBHRU5FUkFMX0JBRF9SRVFVRVNUID0gNDAwMDAwMCxcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgYW4gaW52YWxpZCBhcHAgaWRlbnRpZmllci5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9pbnZhbGlkYXBwaWRlbnRpZmllcmVycm9yIEludmFsaWRBcHBJZGVudGlmaWVyRXJyb3J9XG4gICAqL1xuICBJTlZBTElEX0FQUF9JREVOVElGSUVSID0gNDAwMDAwMixcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgYW4gaW52YWxpZCByZXF1ZXN0IHJldmlzaW9uLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2ludmFsaWRyZXF1ZXN0cmV2aXNpb25lcnJvciBJbnZhbGlkUmVxdWVzdFJldmlzaW9uRXJyb3J9XG4gICAqL1xuICBJTlZBTElEX1JFUVVFU1RfUkVWSVNJT04gPSA0MDAwMDA1LFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyBhbiBpbnZhbGlkIHRyYW5zYWN0aW9uIGlkZW50aWZpZXIuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvaW52YWxpZHRyYW5zYWN0aW9uaWRlcnJvciBJbnZhbGlkVHJhbnNhY3Rpb25JZEVycm9yfVxuICAgKi9cbiAgSU5WQUxJRF9UUkFOU0FDVElPTl9JRCA9IDQwMDAwMDYsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIGFuIGludmFsaWQgb3JpZ2luYWwgdHJhbnNhY3Rpb24gaWRlbnRpZmllci5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9pbnZhbGlkb3JpZ2luYWx0cmFuc2FjdGlvbmlkZXJyb3IgSW52YWxpZE9yaWdpbmFsVHJhbnNhY3Rpb25JZEVycm9yfVxuICAgKi9cbiAgSU5WQUxJRF9PUklHSU5BTF9UUkFOU0FDVElPTl9JRCA9IDQwMDAwMDgsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIGFuIGludmFsaWQgZXh0ZW5kLWJ5LWRheXMgdmFsdWUuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvaW52YWxpZGV4dGVuZGJ5ZGF5c2Vycm9yIEludmFsaWRFeHRlbmRCeURheXNFcnJvcn1cbiAgICovXG4gIElOVkFMSURfRVhURU5EX0JZX0RBWVMgPSA0MDAwMDA5LFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyBhbiBpbnZhbGlkIHJlYXNvbiBjb2RlLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2ludmFsaWRleHRlbmRyZWFzb25jb2RlZXJyb3IgSW52YWxpZEV4dGVuZFJlYXNvbkNvZGVFcnJvcn1cbiAgICovXG4gIElOVkFMSURfRVhURU5EX1JFQVNPTl9DT0RFID0gNDAwMDAxMCxcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgYW4gaW52YWxpZCByZXF1ZXN0IGlkZW50aWZpZXIuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvaW52YWxpZHJlcXVlc3RpZGVudGlmaWVyZXJyb3IgSW52YWxpZFJlcXVlc3RJZGVudGlmaWVyRXJyb3J9XG4gICAqL1xuICBJTlZBTElEX1JFUVVFU1RfSURFTlRJRklFUiA9IDQwMDAwMTEsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIHRoYXQgdGhlIHN0YXJ0IGRhdGUgaXMgZWFybGllciB0aGFuIHRoZSBlYXJsaWVzdCBhbGxvd2VkIGRhdGUuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvc3RhcnRkYXRldG9vZmFyaW5wYXN0ZXJyb3IgU3RhcnREYXRlVG9vRmFySW5QYXN0RXJyb3J9XG4gICAqL1xuICBTVEFSVF9EQVRFX1RPT19GQVJfSU5fUEFTVCA9IDQwMDAwMTIsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIHRoYXQgdGhlIGVuZCBkYXRlIHByZWNlZGVzIHRoZSBzdGFydCBkYXRlLCBvciB0aGUgdHdvIGRhdGVzIGFyZSBlcXVhbC5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9zdGFydGRhdGVhZnRlcmVuZGRhdGVlcnJvciBTdGFydERhdGVBZnRlckVuZERhdGVFcnJvcn1cbiAgICovXG4gIFNUQVJUX0RBVEVfQUZURVJfRU5EX0RBVEUgPSA0MDAwMDEzLFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyB0aGUgcGFnaW5hdGlvbiB0b2tlbiBpcyBpbnZhbGlkLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2ludmFsaWRwYWdpbmF0aW9udG9rZW5lcnJvciBJbnZhbGlkUGFnaW5hdGlvblRva2VuRXJyb3J9XG4gICAqL1xuICBJTlZBTElEX1BBR0lOQVRJT05fVE9LRU4gPSA0MDAwMDE0LFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyB0aGUgc3RhcnQgZGF0ZSBpcyBpbnZhbGlkLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2ludmFsaWRzdGFydGRhdGVlcnJvciBJbnZhbGlkU3RhcnREYXRlRXJyb3J9XG4gICAqL1xuICBJTlZBTElEX1NUQVJUX0RBVEUgPSA0MDAwMDE1LFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyB0aGUgZW5kIGRhdGUgaXMgaW52YWxpZC5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9pbnZhbGlkZW5kZGF0ZWVycm9yIEludmFsaWRFbmREYXRlRXJyb3J9XG4gICAqL1xuICBJTlZBTElEX0VORF9EQVRFID0gNDAwMDAxNixcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgdGhlIHBhZ2luYXRpb24gdG9rZW4gZXhwaXJlZC5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9wYWdpbmF0aW9udG9rZW5leHBpcmVkZXJyb3IgUGFnaW5hdGlvblRva2VuRXhwaXJlZEVycm9yfVxuICAgKi9cbiAgUEFHSU5BVElPTl9UT0tFTl9FWFBJUkVEID0gNDAwMDAxNyxcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgdGhlIG5vdGlmaWNhdGlvbiB0eXBlIG9yIHN1YnR5cGUgaXMgaW52YWxpZC5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9pbnZhbGlkbm90aWZpY2F0aW9udHlwZWVycm9yIEludmFsaWROb3RpZmljYXRpb25UeXBlRXJyb3J9XG4gICAqL1xuICBJTlZBTElEX05PVElGSUNBVElPTl9UWVBFID0gNDAwMDAxOCxcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgdGhlIHJlcXVlc3QgaXMgaW52YWxpZCBiZWNhdXNlIGl0IGhhcyB0b28gbWFueSBjb25zdHJhaW50cyBhcHBsaWVkLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL211bHRpcGxlZmlsdGVyc3N1cHBsaWVkZXJyb3IgTXVsdGlwbGVGaWx0ZXJzU3VwcGxpZWRFcnJvcn1cbiAgICovXG4gIE1VTFRJUExFX0ZJTFRFUlNfU1VQUExJRUQgPSA0MDAwMDE5LFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyB0aGUgdGVzdCBub3RpZmljYXRpb24gdG9rZW4gaXMgaW52YWxpZC5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9pbnZhbGlkdGVzdG5vdGlmaWNhdGlvbnRva2VuZXJyb3IgSW52YWxpZFRlc3ROb3RpZmljYXRpb25Ub2tlbkVycm9yfVxuICAgKi9cbiAgSU5WQUxJRF9URVNUX05PVElGSUNBVElPTl9UT0tFTiA9IDQwMDAwMjAsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIGFuIGludmFsaWQgc29ydCBwYXJhbWV0ZXIuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvaW52YWxpZHNvcnRlcnJvciBJbnZhbGlkU29ydEVycm9yfVxuICAgKi9cbiAgSU5WQUxJRF9TT1JUID0gNDAwMDAyMSxcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgYW4gaW52YWxpZCBwcm9kdWN0IHR5cGUgcGFyYW1ldGVyLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2ludmFsaWRwcm9kdWN0dHlwZWVycm9yIEludmFsaWRQcm9kdWN0VHlwZUVycm9yfVxuICAgKi9cbiAgSU5WQUxJRF9QUk9EVUNUX1RZUEUgPSA0MDAwMDIyLFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyB0aGUgcHJvZHVjdCBJRCBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9pbnZhbGlkcHJvZHVjdGlkZXJyb3IgSW52YWxpZFByb2R1Y3RJZEVycm9yfVxuICAgKi9cbiAgSU5WQUxJRF9QUk9EVUNUX0lEID0gNDAwMDAyMyxcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgYW4gaW52YWxpZCBzdWJzY3JpcHRpb24gZ3JvdXAgaWRlbnRpZmllci5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9pbnZhbGlkc3Vic2NyaXB0aW9uZ3JvdXBpZGVudGlmaWVyZXJyb3IgSW52YWxpZFN1YnNjcmlwdGlvbkdyb3VwSWRlbnRpZmllckVycm9yfVxuICAgKi9cbiAgSU5WQUxJRF9TVUJTQ1JJUFRJT05fR1JPVVBfSURFTlRJRklFUiA9IDQwMDAwMjQsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIHRoZSBxdWVyeSBwYXJhbWV0ZXIgZXhjbHVkZS1yZXZva2VkIGlzIGludmFsaWQuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvaW52YWxpZGV4Y2x1ZGVyZXZva2VkZXJyb3IgSW52YWxpZEV4Y2x1ZGVSZXZva2VkRXJyb3J9XG4gICAqIFxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgSU5WQUxJRF9FWENMVURFX1JFVk9LRUQgPSA0MDAwMDI1LFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyBhbiBpbnZhbGlkIGluLWFwcCBvd25lcnNoaXAgdHlwZSBwYXJhbWV0ZXIuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvaW52YWxpZGluYXBwb3duZXJzaGlwdHlwZWVycm9yIEludmFsaWRJbkFwcE93bmVyc2hpcFR5cGVFcnJvcn1cbiAgICovXG4gIElOVkFMSURfSU5fQVBQX09XTkVSU0hJUF9UWVBFID0gNDAwMDAyNixcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgYSByZXF1aXJlZCBzdG9yZWZyb250IGNvdW50cnkgY29kZSBpcyBlbXB0eS5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9pbnZhbGlkZW1wdHlzdG9yZWZyb250Y291bnRyeWNvZGVsaXN0ZXJyb3IgSW52YWxpZEVtcHR5U3RvcmVmcm9udENvdW50cnlDb2RlTGlzdEVycm9yfVxuICAgKi9cbiAgSU5WQUxJRF9FTVBUWV9TVE9SRUZST05UX0NPVU5UUllfQ09ERV9MSVNUID0gNDAwMDAyNyxcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgYSBzdG9yZWZyb250IGNvZGUgaXMgaW52YWxpZC5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9pbnZhbGlkc3RvcmVmcm9udGNvdW50cnljb2RlZXJyb3IgSW52YWxpZFN0b3JlZnJvbnRDb3VudHJ5Q29kZUVycm9yfVxuICAgKi9cbiAgSU5WQUxJRF9TVE9SRUZST05UX0NPVU5UUllfQ09ERSA9IDQwMDAwMjgsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIHRoZSByZXZva2VkIHBhcmFtZXRlciBjb250YWlucyBhbiBpbnZhbGlkIHZhbHVlLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2ludmFsaWRyZXZva2VkZXJyb3IgSW52YWxpZFJldm9rZWRFcnJvcn1cbiAgICovXG4gIElOVkFMSURfUkVWT0tFRCA9IDQwMDAwMzAsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIHRoZSBzdGF0dXMgcGFyYW1ldGVyIGlzIGludmFsaWQuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvaW52YWxpZHN0YXR1c2Vycm9yIEludmFsaWRTdGF0dXNFcnJvcn1cbiAgICovXG4gIElOVkFMSURfU1RBVFVTID0gNDAwMDAzMSxcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgdGhlIHZhbHVlIG9mIHRoZSBhY2NvdW50IHRlbnVyZSBmaWVsZCBpcyBpbnZhbGlkLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2ludmFsaWRhY2NvdW50dGVudXJlZXJyb3IgSW52YWxpZEFjY291bnRUZW51cmVFcnJvcn1cbiAgICovXG4gIElOVkFMSURfQUNDT1VOVF9URU5VUkUgPSA0MDAwMDMyLFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyB0aGUgdmFsdWUgb2YgdGhlIGFwcCBhY2NvdW50IHRva2VuIGZpZWxkIGlzIGludmFsaWQuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvaW52YWxpZGFwcGFjY291bnR0b2tlbmVycm9yIEludmFsaWRBcHBBY2NvdW50VG9rZW5FcnJvcn1cbiAgICovXG4gIElOVkFMSURfQVBQX0FDQ09VTlRfVE9LRU4gPSA0MDAwMDMzLFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyB0aGUgdmFsdWUgb2YgdGhlIGNvbnN1bXB0aW9uIHN0YXR1cyBmaWVsZCBpcyBpbnZhbGlkLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2ludmFsaWRjb25zdW1wdGlvbnN0YXR1c2Vycm9yIEludmFsaWRDb25zdW1wdGlvblN0YXR1c0Vycm9yfVxuICAgKi9cbiAgSU5WQUxJRF9DT05TVU1QVElPTl9TVEFUVVMgPSA0MDAwMDM0LFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyB0aGUgY3VzdG9tZXIgY29uc2VudGVkIGZpZWxkIGlzIGludmFsaWQgb3IgZG9lc27igJl0IGluZGljYXRlIHRoYXQgdGhlIGN1c3RvbWVyIGNvbnNlbnRlZC5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9pbnZhbGlkY3VzdG9tZXJjb25zZW50ZWRlcnJvciBJbnZhbGlkQ3VzdG9tZXJDb25zZW50ZWRFcnJvcn1cbiAgICovXG4gIElOVkFMSURfQ1VTVE9NRVJfQ09OU0VOVEVEID0gNDAwMDAzNSxcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgdGhlIHZhbHVlIGluIHRoZSBkZWxpdmVyeSBzdGF0dXMgZmllbGQgaXMgaW52YWxpZC5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9pbnZhbGlkZGVsaXZlcnlzdGF0dXNlcnJvciBJbnZhbGlkRGVsaXZlcnlTdGF0dXNFcnJvcn1cbiAgICovXG4gIElOVkFMSURfREVMSVZFUllfU1RBVFVTID0gNDAwMDAzNixcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgdGhlIHZhbHVlIGluIHRoZSBsaWZldGltZSBkb2xsYXJzIHB1cmNoYXNlZCBmaWVsZCBpcyBpbnZhbGlkLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2ludmFsaWRsaWZldGltZWRvbGxhcnNwdXJjaGFzZWRlcnJvciBJbnZhbGlkTGlmZXRpbWVEb2xsYXJzUHVyY2hhc2VkRXJyb3J9XG4gICAqL1xuICBJTlZBTElEX0xJRkVUSU1FX0RPTExBUlNfUFVSQ0hBU0VEID0gNDAwMDAzNyxcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgdGhlIHZhbHVlIGluIHRoZSBsaWZldGltZSBkb2xsYXJzIHJlZnVuZGVkIGZpZWxkIGlzIGludmFsaWQuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvaW52YWxpZGxpZmV0aW1lZG9sbGFyc3JlZnVuZGVkZXJyb3IgSW52YWxpZExpZmV0aW1lRG9sbGFyc1JlZnVuZGVkRXJyb3J9XG4gICAqL1xuICBJTlZBTElEX0xJRkVUSU1FX0RPTExBUlNfUkVGVU5ERUQgPSA0MDAwMDM4LFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyB0aGUgdmFsdWUgaW4gdGhlIHBsYXRmb3JtIGZpZWxkIGlzIGludmFsaWQuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvaW52YWxpZHBsYXRmb3JtZXJyb3IgSW52YWxpZFBsYXRmb3JtRXJyb3J9XG4gICAqL1xuICBJTlZBTElEX1BMQVRGT1JNID0gNDAwMDAzOSxcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgdGhlIHZhbHVlIGluIHRoZSBwbGF5dGltZSBmaWVsZCBpcyBpbnZhbGlkLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2ludmFsaWRwbGF5dGltZWVycm9yIEludmFsaWRQbGF5VGltZUVycm9yfVxuICAgKi9cbiAgSU5WQUxJRF9QTEFZX1RJTUUgPSA0MDAwMDQwLFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyB0aGUgdmFsdWUgaW4gdGhlIHNhbXBsZSBjb250ZW50IHByb3ZpZGVkIGZpZWxkIGlzIGludmFsaWQuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvaW52YWxpZHNhbXBsZWNvbnRlbnRwcm92aWRlZGVycm9yIEludmFsaWRTYW1wbGVDb250ZW50UHJvdmlkZWRFcnJvcn1cbiAgICovXG4gIElOVkFMSURfU0FNUExFX0NPTlRFTlRfUFJPVklERUQgPSA0MDAwMDQxLFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyB0aGUgdmFsdWUgaW4gdGhlIHVzZXIgc3RhdHVzIGZpZWxkIGlzIGludmFsaWQuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvaW52YWxpZHVzZXJzdGF0dXNlcnJvciBJbnZhbGlkVXNlclN0YXR1c0Vycm9yfVxuICAgKi9cbiAgSU5WQUxJRF9VU0VSX1NUQVRVUyA9IDQwMDAwNDIsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIHRoZSB0cmFuc2FjdGlvbiBpZGVudGlmaWVyIGRvZXNu4oCZdCByZXByZXNlbnQgYSBjb25zdW1hYmxlIGluLWFwcCBwdXJjaGFzZS5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9pbnZhbGlkdHJhbnNhY3Rpb25ub3Rjb25zdW1hYmxlZXJyb3IgSW52YWxpZFRyYW5zYWN0aW9uTm90Q29uc3VtYWJsZUVycm9yfVxuICAgKiBcbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIElOVkFMSURfVFJBTlNBQ1RJT05fTk9UX0NPTlNVTUFCTEUgPSA0MDAwMDQzLFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyB0aGUgdHJhbnNhY3Rpb24gaWRlbnRpZmllciByZXByZXNlbnRzIGFuIHVuc3VwcG9ydGVkIGluLWFwcCBwdXJjaGFzZSB0eXBlLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2ludmFsaWR0cmFuc2FjdGlvbnR5cGVub3RzdXBwb3J0ZWRlcnJvciBJbnZhbGlkVHJhbnNhY3Rpb25UeXBlTm90U3VwcG9ydGVkRXJyb3J9XG4gICAqL1xuICBJTlZBTElEX1RSQU5TQUNUSU9OX1RZUEVfTk9UX1NVUFBPUlRFRCA9IDQwMDAwNDcsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIHRoZSBzdWJzY3JpcHRpb24gZG9lc24ndCBxdWFsaWZ5IGZvciBhIHJlbmV3YWwtZGF0ZSBleHRlbnNpb24gZHVlIHRvIGl0cyBzdWJzY3JpcHRpb24gc3RhdGUuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvc3Vic2NyaXB0aW9uZXh0ZW5zaW9uaW5lbGlnaWJsZWVycm9yIFN1YnNjcmlwdGlvbkV4dGVuc2lvbkluZWxpZ2libGVFcnJvcn1cbiAgICovXG4gIFNVQlNDUklQVElPTl9FWFRFTlNJT05fSU5FTElHSUJMRSA9IDQwMzAwMDQsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIHRoZSBzdWJzY3JpcHRpb24gZG9lc27igJl0IHF1YWxpZnkgZm9yIGEgcmVuZXdhbC1kYXRlIGV4dGVuc2lvbiBiZWNhdXNlIGl0IGhhcyBhbHJlYWR5IHJlY2VpdmVkIHRoZSBtYXhpbXVtIGV4dGVuc2lvbnMuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvc3Vic2NyaXB0aW9ubWF4ZXh0ZW5zaW9uZXJyb3IgU3Vic2NyaXB0aW9uTWF4RXh0ZW5zaW9uRXJyb3J9XG4gICAqL1xuICBTVUJTQ1JJUFRJT05fTUFYX0VYVEVOU0lPTiA9IDQwMzAwMDUsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIGEgc3Vic2NyaXB0aW9uIGlzbid0IGRpcmVjdGx5IGVsaWdpYmxlIGZvciBhIHJlbmV3YWwgZGF0ZSBleHRlbnNpb24gYmVjYXVzZSB0aGUgdXNlciBvYnRhaW5lZCBpdCB0aHJvdWdoIEZhbWlseSBTaGFyaW5nLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2ZhbWlseXNoYXJlZHN1YnNjcmlwdGlvbmV4dGVuc2lvbmluZWxpZ2libGVlcnJvciBGYW1pbHlTaGFyZWRTdWJzY3JpcHRpb25FeHRlbnNpb25JbmVsaWdpYmxlRXJyb3J9XG4gICAqL1xuICBGQU1JTFlfU0hBUkVEX1NVQlNDUklQVElPTl9FWFRFTlNJT05fSU5FTElHSUJMRSA9IDQwMzAwMDcsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIHRoZSBBcHAgU3RvcmUgYWNjb3VudCB3YXNu4oCZdCBmb3VuZC5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9hY2NvdW50bm90Zm91bmRlcnJvciBBY2NvdW50Tm90Rm91bmRFcnJvcn1cbiAgICovXG4gIEFDQ09VTlRfTk9UX0ZPVU5EID0gNDA0MDAwMSxcblxuICAvKipcbiAgICogQW4gZXJyb3IgcmVzcG9uc2UgdGhhdCBpbmRpY2F0ZXMgdGhlIEFwcCBTdG9yZSBhY2NvdW50IHdhc27igJl0IGZvdW5kLCBidXQgeW91IGNhbiB0cnkgYWdhaW4uXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvYWNjb3VudG5vdGZvdW5kcmV0cnlhYmxlZXJyb3IgQWNjb3VudE5vdEZvdW5kUmV0cnlhYmxlRXJyb3J9XG4gICAqL1xuICBBQ0NPVU5UX05PVF9GT1VORF9SRVRSWUFCTEUgPSA0MDQwMDAyLFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyB0aGUgYXBwIHdhc27igJl0IGZvdW5kLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2FwcG5vdGZvdW5kZXJyb3IgQXBwTm90Rm91bmRFcnJvcn1cbiAgICovXG4gIEFQUF9OT1RfRk9VTkQgPSA0MDQwMDAzLFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciByZXNwb25zZSB0aGF0IGluZGljYXRlcyB0aGUgYXBwIHdhc27igJl0IGZvdW5kLCBidXQgeW91IGNhbiB0cnkgYWdhaW4uXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvYXBwbm90Zm91bmRyZXRyeWFibGVlcnJvciBBcHBOb3RGb3VuZFJldHJ5YWJsZUVycm9yfVxuICAgKi9cbiAgQVBQX05PVF9GT1VORF9SRVRSWUFCTEUgPSA0MDQwMDA0LFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyBhbiBvcmlnaW5hbCB0cmFuc2FjdGlvbiBpZGVudGlmaWVyIHdhc24ndCBmb3VuZC5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9vcmlnaW5hbHRyYW5zYWN0aW9uaWRub3Rmb3VuZGVycm9yIE9yaWdpbmFsVHJhbnNhY3Rpb25JZE5vdEZvdW5kRXJyb3J9XG4gICAqL1xuICBPUklHSU5BTF9UUkFOU0FDVElPTl9JRF9OT1RfRk9VTkQgPSA0MDQwMDA1LFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciByZXNwb25zZSB0aGF0IGluZGljYXRlcyB0aGUgb3JpZ2luYWwgdHJhbnNhY3Rpb24gaWRlbnRpZmllciB3YXNu4oCZdCBmb3VuZCwgYnV0IHlvdSBjYW4gdHJ5IGFnYWluLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL29yaWdpbmFsdHJhbnNhY3Rpb25pZG5vdGZvdW5kcmV0cnlhYmxlZXJyb3IgT3JpZ2luYWxUcmFuc2FjdGlvbklkTm90Rm91bmRSZXRyeWFibGVFcnJvcn1cbiAgICovXG4gIE9SSUdJTkFMX1RSQU5TQUNUSU9OX0lEX05PVF9GT1VORF9SRVRSWUFCTEUgPSA0MDQwMDA2LFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciB0aGF0IGluZGljYXRlcyB0aGF0IHRoZSBBcHAgU3RvcmUgc2VydmVyIGNvdWxkbuKAmXQgZmluZCBhIG5vdGlmaWNhdGlvbnMgVVJMIGZvciB5b3VyIGFwcCBpbiB0aGlzIGVudmlyb25tZW50LlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL3NlcnZlcm5vdGlmaWNhdGlvbnVybG5vdGZvdW5kZXJyb3IgU2VydmVyTm90aWZpY2F0aW9uVXJsTm90Rm91bmRFcnJvcn1cbiAgICovXG4gIFNFUlZFUl9OT1RJRklDQVRJT05fVVJMX05PVF9GT1VORCA9IDQwNDAwMDcsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIHRoYXQgdGhlIHRlc3Qgbm90aWZpY2F0aW9uIHRva2VuIGlzIGV4cGlyZWQgb3IgdGhlIHRlc3Qgbm90aWZpY2F0aW9uIHN0YXR1cyBpc27igJl0IGF2YWlsYWJsZS5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS90ZXN0bm90aWZpY2F0aW9ubm90Zm91bmRlcnJvciBUZXN0Tm90aWZpY2F0aW9uTm90Rm91bmRFcnJvcn1cbiAgICovXG4gIFRFU1RfTk9USUZJQ0FUSU9OX05PVF9GT1VORCA9IDQwNDAwMDgsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIHRoZSBzZXJ2ZXIgZGlkbid0IGZpbmQgYSBzdWJzY3JpcHRpb24tcmVuZXdhbC1kYXRlIGV4dGVuc2lvbiByZXF1ZXN0IGZvciB0aGUgcmVxdWVzdCBpZGVudGlmaWVyIGFuZCBwcm9kdWN0IGlkZW50aWZpZXIgeW91IHByb3ZpZGVkLlxuICAgKiBcbiAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL3N0YXR1c3JlcXVlc3Rub3Rmb3VuZGVycm9yIFN0YXR1c1JlcXVlc3ROb3RGb3VuZEVycm9yfVxuICAgKi9cbiAgU1RBVFVTX1JFUVVFU1RfTk9UX0ZPVU5EID0gNDA0MDAwOSxcblxuICAvKipcbiAgICogQW4gZXJyb3IgdGhhdCBpbmRpY2F0ZXMgYSB0cmFuc2FjdGlvbiBpZGVudGlmaWVyIHdhc24ndCBmb3VuZC5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS90cmFuc2FjdGlvbmlkbm90Zm91bmRlcnJvciBUcmFuc2FjdGlvbklkTm90Rm91bmRFcnJvcn1cbiAgICovXG4gIFRSQU5TQUNUSU9OX0lEX05PVF9GT1VORCA9IDQwNDAwMTAsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIHRoYXQgdGhlIHJlcXVlc3QgZXhjZWVkZWQgdGhlIHJhdGUgbGltaXQuXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvcmF0ZWxpbWl0ZXhjZWVkZWRlcnJvciBSYXRlTGltaXRFeGNlZWRlZEVycm9yfVxuICAgKi9cbiAgUkFURV9MSU1JVF9FWENFRURFRCA9IDQyOTAwMDAsXG5cbiAgLyoqXG4gICAqIEFuIGVycm9yIHRoYXQgaW5kaWNhdGVzIGEgZ2VuZXJhbCBpbnRlcm5hbCBlcnJvci5cbiAgICogXG4gICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9nZW5lcmFsaW50ZXJuYWxlcnJvciBHZW5lcmFsSW50ZXJuYWxFcnJvcn1cbiAgICovXG4gIEdFTkVSQUxfSU5URVJOQUwgPSA1MDAwMDAwLFxuXG4gIC8qKlxuICAgKiBBbiBlcnJvciByZXNwb25zZSB0aGF0IGluZGljYXRlcyBhbiB1bmtub3duIGVycm9yIG9jY3VycmVkLCBidXQgeW91IGNhbiB0cnkgYWdhaW4uXG4gICAqIFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvZ2VuZXJhbGludGVybmFscmV0cnlhYmxlZXJyb3IgR2VuZXJhbEludGVybmFsUmV0cnlhYmxlRXJyb3J9XG4gICAqL1xuICBHRU5FUkFMX0lOVEVSTkFMX1JFVFJZQUJMRSA9IDUwMDAwMDEsXG59XG5cbmV4cG9ydCBlbnVtIEdldFRyYW5zYWN0aW9uSGlzdG9yeVZlcnNpb24ge1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIFYxID0gXCJ2MVwiLFxuICBWMiA9IFwidjJcIixcbn1cbiJdfQ==