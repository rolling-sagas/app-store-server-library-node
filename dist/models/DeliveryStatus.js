"use strict";
// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryStatusValidator = exports.DeliveryStatus = void 0;
const Validator_1 = require("./Validator");
/**
 * A value that indicates whether the app successfully delivered an in-app purchase that works properly.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/deliverystatus deliveryStatus}
 */
var DeliveryStatus;
(function (DeliveryStatus) {
    DeliveryStatus[DeliveryStatus["DELIVERED_AND_WORKING_PROPERLY"] = 0] = "DELIVERED_AND_WORKING_PROPERLY";
    DeliveryStatus[DeliveryStatus["DID_NOT_DELIVER_DUE_TO_QUALITY_ISSUE"] = 1] = "DID_NOT_DELIVER_DUE_TO_QUALITY_ISSUE";
    DeliveryStatus[DeliveryStatus["DELIVERED_WRONG_ITEM"] = 2] = "DELIVERED_WRONG_ITEM";
    DeliveryStatus[DeliveryStatus["DID_NOT_DELIVER_DUE_TO_SERVER_OUTAGE"] = 3] = "DID_NOT_DELIVER_DUE_TO_SERVER_OUTAGE";
    DeliveryStatus[DeliveryStatus["DID_NOT_DELIVER_DUE_TO_IN_GAME_CURRENCY_CHANGE"] = 4] = "DID_NOT_DELIVER_DUE_TO_IN_GAME_CURRENCY_CHANGE";
    DeliveryStatus[DeliveryStatus["DID_NOT_DELIVER_FOR_OTHER_REASON"] = 5] = "DID_NOT_DELIVER_FOR_OTHER_REASON";
})(DeliveryStatus || (exports.DeliveryStatus = DeliveryStatus = {}));
class DeliveryStatusValidator extends Validator_1.NumberValidator {
}
exports.DeliveryStatusValidator = DeliveryStatusValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVsaXZlcnlTdGF0dXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9tb2RlbHMvRGVsaXZlcnlTdGF0dXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDREQUE0RDs7O0FBRTVELDJDQUE4QztBQUU5Qzs7OztHQUlHO0FBQ0gsSUFBWSxjQU9YO0FBUEQsV0FBWSxjQUFjO0lBQ3RCLHVHQUFrQyxDQUFBO0lBQ2xDLG1IQUF3QyxDQUFBO0lBQ3hDLG1GQUF3QixDQUFBO0lBQ3hCLG1IQUF3QyxDQUFBO0lBQ3hDLHVJQUFrRCxDQUFBO0lBQ2xELDJHQUFvQyxDQUFBO0FBQ3hDLENBQUMsRUFQVyxjQUFjLDhCQUFkLGNBQWMsUUFPekI7QUFFRCxNQUFhLHVCQUF3QixTQUFRLDJCQUFlO0NBQUc7QUFBL0QsMERBQStEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIzIEFwcGxlIEluYy4gTGljZW5zZWQgdW5kZXIgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IE51bWJlclZhbGlkYXRvciB9IGZyb20gXCIuL1ZhbGlkYXRvclwiO1xuXG4vKipcbiAqIEEgdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgYXBwIHN1Y2Nlc3NmdWxseSBkZWxpdmVyZWQgYW4gaW4tYXBwIHB1cmNoYXNlIHRoYXQgd29ya3MgcHJvcGVybHkuXG4gKlxuICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL2RlbGl2ZXJ5c3RhdHVzIGRlbGl2ZXJ5U3RhdHVzfVxuICovXG5leHBvcnQgZW51bSBEZWxpdmVyeVN0YXR1cyB7XG4gICAgREVMSVZFUkVEX0FORF9XT1JLSU5HX1BST1BFUkxZID0gMCxcbiAgICBESURfTk9UX0RFTElWRVJfRFVFX1RPX1FVQUxJVFlfSVNTVUUgPSAxLFxuICAgIERFTElWRVJFRF9XUk9OR19JVEVNID0gMixcbiAgICBESURfTk9UX0RFTElWRVJfRFVFX1RPX1NFUlZFUl9PVVRBR0UgPSAzLFxuICAgIERJRF9OT1RfREVMSVZFUl9EVUVfVE9fSU5fR0FNRV9DVVJSRU5DWV9DSEFOR0UgPSA0LFxuICAgIERJRF9OT1RfREVMSVZFUl9GT1JfT1RIRVJfUkVBU09OID0gNSxcbn1cblxuZXhwb3J0IGNsYXNzIERlbGl2ZXJ5U3RhdHVzVmFsaWRhdG9yIGV4dGVuZHMgTnVtYmVyVmFsaWRhdG9yIHt9Il19