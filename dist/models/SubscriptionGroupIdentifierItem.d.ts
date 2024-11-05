import { LastTransactionsItem } from "./LastTransactionsItem";
import { Validator } from "./Validator";
/**
 * Information for auto-renewable subscriptions, including signed transaction information and signed renewal information, for one subscription group.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/subscriptiongroupidentifieritem SubscriptionGroupIdentifierItem}
 */
export interface SubscriptionGroupIdentifierItem {
    /**
     * The identifier of the subscription group that the subscription belongs to.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/subscriptiongroupidentifier subscriptionGroupIdentifier}
     **/
    subscriptionGroupIdentifier?: string;
    /**
     * An array of the most recent App Store-signed transaction information and App Store-signed renewal information for all auto-renewable subscriptions in the subscription group.
     *
     * {@link https://developer.apple.com/documentation/appstoreserverapi/lasttransactionsitem lastTransactionsItem}
     **/
    lastTransactions?: LastTransactionsItem[];
}
export declare class SubscriptionGroupIdentifierItemValidator implements Validator<SubscriptionGroupIdentifierItem> {
    validate(obj: any): obj is SubscriptionGroupIdentifierItem;
}
