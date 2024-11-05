import { AccountTenure } from "./AccountTenure";
import { ConsumptionStatus } from "./ConsumptionStatus";
import { DeliveryStatus } from "./DeliveryStatus";
import { LifetimeDollarsPurchased } from "./LifetimeDollarsPurchased";
import { LifetimeDollarsRefunded } from "./LifetimeDollarsRefunded";
import { Platform } from "./Platform";
import { PlayTime } from "./PlayTime";
import { RefundPreference } from "./RefundPreference";
import { UserStatus } from "./UserStatus";
/**
 * The request body containing consumption information.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/consumptionrequest ConsumptionRequest}
 */
export interface ConsumptionRequest {
    /**
     * A Boolean value that indicates whether the customer consented to provide consumption data to the App Store.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/customerconsented customerConsented}
     **/
    customerConsented?: boolean;
    /**
     * A value that indicates the extent to which the customer consumed the in-app purchase.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/consumptionstatus consumptionStatus}
     **/
    consumptionStatus?: ConsumptionStatus | number;
    /**
     * A value that indicates the platform on which the customer consumed the in-app purchase.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/platform platform}
     **/
    platform?: Platform | number;
    /**
     * A Boolean value that indicates whether you provided, prior to its purchase, a free sample or trial of the content, or information about its functionality.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/samplecontentprovided sampleContentProvided}
     **/
    sampleContentProvided?: boolean;
    /**
     * A value that indicates whether the app successfully delivered an in-app purchase that works properly.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/deliverystatus deliveryStatus}
     **/
    deliveryStatus?: DeliveryStatus | number;
    /**
     * The UUID that an app optionally generates to map a customer’s in-app purchase with its resulting App Store transaction.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/appaccounttoken appAccountToken}
     **/
    appAccountToken?: string;
    /**
     * The age of the customer’s account.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/accounttenure accountTenure}
     **/
    accountTenure?: AccountTenure | number;
    /**
     * A value that indicates the amount of time that the customer used the app.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/consumptionrequest ConsumptionRequest}
     **/
    playTime?: PlayTime | number;
    /**
     * A value that indicates the total amount, in USD, of refunds the customer has received, in your app, across all platforms.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/lifetimedollarsrefunded lifetimeDollarsRefunded}
     **/
    lifetimeDollarsRefunded?: LifetimeDollarsRefunded | number;
    /**
     * A value that indicates the total amount, in USD, of in-app purchases the customer has made in your app, across all platforms.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/lifetimedollarspurchased lifetimeDollarsPurchased}
     **/
    lifetimeDollarsPurchased?: LifetimeDollarsPurchased | number;
    /**
     * The status of the customer’s account.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/userstatus userStatus}
     **/
    userStatus?: UserStatus | number;
    /**
     * A value that indicates your preference, based on your operational logic, as to whether Apple should grant the refund.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/refundpreference refundPreference}
     **/
    refundPreference?: RefundPreference | number;
}
