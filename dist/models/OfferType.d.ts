import { NumberValidator } from "./Validator";
/**
 * The type of subscription offer.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/offertype offerType}
 */
export declare enum OfferType {
    INTRODUCTORY_OFFER = 1,
    PROMOTIONAL_OFFER = 2,
    SUBSCRIPTION_OFFER_CODE = 3,
    WIN_BACK_OFFER = 4
}
export declare class OfferTypeValidator extends NumberValidator {
}
