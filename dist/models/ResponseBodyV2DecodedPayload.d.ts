import { Data, DataValidator } from "./Data";
import { DecodedSignedData } from "./DecodedSignedData";
import { ExternalPurchaseToken, ExternalPurchaseTokenValidator } from "./ExternalPurchaseToken";
import { NotificationTypeV2, NotificationTypeV2Validator } from "./NotificationTypeV2";
import { Subtype, SubtypeValidator } from "./Subtype";
import { Summary, SummaryValidator } from "./Summary";
import { Validator } from "./Validator";
/**
 * A decoded payload containing the version 2 notification data.
 *
 * {@link https://developer.apple.com/documentation/appstoreservernotifications/responsebodyv2decodedpayload ResponseBodyV2DecodedPayload}
 */
export interface ResponseBodyV2DecodedPayload extends DecodedSignedData {
    /**
     * The in-app purchase event for which the App Store sends this version 2 notification.
     *
     * {@link https://developer.apple.com/documentation/appstoreservernotifications/notificationtype notificationType}
     **/
    notificationType?: NotificationTypeV2 | string;
    /**
     * Additional information that identifies the notification event. The subtype field is present only for specific version 2 notifications.
     *
     * {@link https://developer.apple.com/documentation/appstoreservernotifications/subtype subtype}
     **/
    subtype?: Subtype | string;
    /**
     * A unique identifier for the notification.
     *
     * {@link https://developer.apple.com/documentation/appstoreservernotifications/notificationuuid notificationUUID}
     **/
    notificationUUID?: string;
    /**
     * The object that contains the app metadata and signed renewal and transaction information.
     * The data, summary, and externalPurchaseToken fields are mutually exclusive. The payload contains only one of these fields.
     *
     * {@link https://developer.apple.com/documentation/appstoreservernotifications/data data}
     **/
    data?: Data;
    /**
     * A string that indicates the notification’s App Store Server Notifications version number.
     *
     * {@link https://developer.apple.com/documentation/appstoreservernotifications/version version}
     **/
    version?: string;
    /**
     * The UNIX time, in milliseconds, that the App Store signed the JSON Web Signature data.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/signeddate signedDate}
     **/
    signedDate?: number;
    /**
     * The summary data that appears when the App Store server completes your request to extend a subscription renewal date for eligible subscribers.
     * The data, summary, and externalPurchaseToken fields are mutually exclusive. The payload contains only one of these fields.
     *
     * {@link https://developer.apple.com/documentation/appstoreservernotifications/summary summary}
     **/
    summary?: Summary;
    /**
     * This field appears when the notificationType is EXTERNAL_PURCHASE_TOKEN.
     * The data, summary, and externalPurchaseToken fields are mutually exclusive. The payload contains only one of these fields.
     *
     * {@link https://developer.apple.com/documentation/appstoreservernotifications/externalpurchasetoken externalPurchaseToken}
     **/
    externalPurchaseToken?: ExternalPurchaseToken;
}
export declare class ResponseBodyV2DecodedPayloadValidator implements Validator<ResponseBodyV2DecodedPayload> {
    static readonly notificationTypeValidator: NotificationTypeV2Validator;
    static readonly subtypeValidator: SubtypeValidator;
    static readonly dataValidator: DataValidator;
    static readonly summaryValidator: SummaryValidator;
    static readonly externalPurchaseTokenValidator: ExternalPurchaseTokenValidator;
    validate(obj: any): obj is ResponseBodyV2DecodedPayload;
}
