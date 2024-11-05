import { NumberValidator } from "./Validator";
/**
 * A value that indicates the amount of time that the customer used the app.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/playtime playTime}
 */
export declare enum PlayTime {
    UNDECLARED = 0,
    ZERO_TO_FIVE_MINUTES = 1,
    FIVE_TO_SIXTY_MINUTES = 2,
    ONE_TO_SIX_HOURS = 3,
    SIX_HOURS_TO_TWENTY_FOUR_HOURS = 4,
    ONE_DAY_TO_FOUR_DAYS = 5,
    FOUR_DAYS_TO_SIXTEEN_DAYS = 6,
    OVER_SIXTEEN_DAYS = 7
}
export declare class PlayTimeValidator extends NumberValidator {
}
