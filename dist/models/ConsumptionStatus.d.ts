import { NumberValidator } from "./Validator";
/**
 * A value that indicates the extent to which the customer consumed the in-app purchase.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/consumptionstatus consumptionStatus}
 */
export declare enum ConsumptionStatus {
    UNDECLARED = 0,
    NOT_CONSUMED = 1,
    PARTIALLY_CONSUMED = 2,
    FULLY_CONSUMED = 3
}
export declare class ConsumptionStatusValidator extends NumberValidator {
}
