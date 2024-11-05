"use strict";
// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountTenureValidator = exports.AccountTenure = void 0;
const Validator_1 = require("./Validator");
/**
 * The age of the customer’s account.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/accounttenure accountTenure}
 */
var AccountTenure;
(function (AccountTenure) {
    AccountTenure[AccountTenure["UNDECLARED"] = 0] = "UNDECLARED";
    AccountTenure[AccountTenure["ZERO_TO_THREE_DAYS"] = 1] = "ZERO_TO_THREE_DAYS";
    AccountTenure[AccountTenure["THREE_DAYS_TO_TEN_DAYS"] = 2] = "THREE_DAYS_TO_TEN_DAYS";
    AccountTenure[AccountTenure["TEN_DAYS_TO_THIRTY_DAYS"] = 3] = "TEN_DAYS_TO_THIRTY_DAYS";
    AccountTenure[AccountTenure["THIRTY_DAYS_TO_NINETY_DAYS"] = 4] = "THIRTY_DAYS_TO_NINETY_DAYS";
    AccountTenure[AccountTenure["NINETY_DAYS_TO_ONE_HUNDRED_EIGHTY_DAYS"] = 5] = "NINETY_DAYS_TO_ONE_HUNDRED_EIGHTY_DAYS";
    AccountTenure[AccountTenure["ONE_HUNDRED_EIGHTY_DAYS_TO_THREE_HUNDRED_SIXTY_FIVE_DAYS"] = 6] = "ONE_HUNDRED_EIGHTY_DAYS_TO_THREE_HUNDRED_SIXTY_FIVE_DAYS";
    AccountTenure[AccountTenure["GREATER_THAN_THREE_HUNDRED_SIXTY_FIVE_DAYS"] = 7] = "GREATER_THAN_THREE_HUNDRED_SIXTY_FIVE_DAYS";
})(AccountTenure || (exports.AccountTenure = AccountTenure = {}));
class AccountTenureValidator extends Validator_1.NumberValidator {
}
exports.AccountTenureValidator = AccountTenureValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNjb3VudFRlbnVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy9BY2NvdW50VGVudXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw0REFBNEQ7OztBQUU1RCwyQ0FBOEM7QUFFOUM7Ozs7R0FJRztBQUNILElBQVksYUFTWDtBQVRELFdBQVksYUFBYTtJQUNyQiw2REFBYyxDQUFBO0lBQ2QsNkVBQXNCLENBQUE7SUFDdEIscUZBQTBCLENBQUE7SUFDMUIsdUZBQTJCLENBQUE7SUFDM0IsNkZBQThCLENBQUE7SUFDOUIscUhBQTBDLENBQUE7SUFDMUMseUpBQTRELENBQUE7SUFDNUQsNkhBQThDLENBQUE7QUFDbEQsQ0FBQyxFQVRXLGFBQWEsNkJBQWIsYUFBYSxRQVN4QjtBQUVELE1BQWEsc0JBQXVCLFNBQVEsMkJBQWU7Q0FBRztBQUE5RCx3REFBOEQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjMgQXBwbGUgSW5jLiBMaWNlbnNlZCB1bmRlciBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgTnVtYmVyVmFsaWRhdG9yIH0gZnJvbSBcIi4vVmFsaWRhdG9yXCI7XG5cbi8qKlxuICogVGhlIGFnZSBvZiB0aGUgY3VzdG9tZXLigJlzIGFjY291bnQuXG4gKlxuICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2FjY291bnR0ZW51cmUgYWNjb3VudFRlbnVyZX1cbiAqL1xuZXhwb3J0IGVudW0gQWNjb3VudFRlbnVyZSB7XG4gICAgVU5ERUNMQVJFRCA9IDAsXG4gICAgWkVST19UT19USFJFRV9EQVlTID0gMSxcbiAgICBUSFJFRV9EQVlTX1RPX1RFTl9EQVlTID0gMixcbiAgICBURU5fREFZU19UT19USElSVFlfREFZUyA9IDMsXG4gICAgVEhJUlRZX0RBWVNfVE9fTklORVRZX0RBWVMgPSA0LFxuICAgIE5JTkVUWV9EQVlTX1RPX09ORV9IVU5EUkVEX0VJR0hUWV9EQVlTID0gNSxcbiAgICBPTkVfSFVORFJFRF9FSUdIVFlfREFZU19UT19USFJFRV9IVU5EUkVEX1NJWFRZX0ZJVkVfREFZUyA9IDYsXG4gICAgR1JFQVRFUl9USEFOX1RIUkVFX0hVTkRSRURfU0lYVFlfRklWRV9EQVlTID0gNyxcbn1cblxuZXhwb3J0IGNsYXNzIEFjY291bnRUZW51cmVWYWxpZGF0b3IgZXh0ZW5kcyBOdW1iZXJWYWxpZGF0b3Ige31cbiJdfQ==