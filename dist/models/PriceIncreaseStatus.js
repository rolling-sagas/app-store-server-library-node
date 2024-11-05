"use strict";
// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceIncreaseStatusValidator = exports.PriceIncreaseStatus = void 0;
const Validator_1 = require("./Validator");
/**
 * The status that indicates whether an auto-renewable subscription is subject to a price increase.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/priceincreasestatus priceIncreaseStatus}
 */
var PriceIncreaseStatus;
(function (PriceIncreaseStatus) {
    PriceIncreaseStatus[PriceIncreaseStatus["CUSTOMER_HAS_NOT_RESPONDED"] = 0] = "CUSTOMER_HAS_NOT_RESPONDED";
    PriceIncreaseStatus[PriceIncreaseStatus["CUSTOMER_CONSENTED_OR_WAS_NOTIFIED_WITHOUT_NEEDING_CONSENT"] = 1] = "CUSTOMER_CONSENTED_OR_WAS_NOTIFIED_WITHOUT_NEEDING_CONSENT";
})(PriceIncreaseStatus || (exports.PriceIncreaseStatus = PriceIncreaseStatus = {}));
class PriceIncreaseStatusValidator extends Validator_1.NumberValidator {
}
exports.PriceIncreaseStatusValidator = PriceIncreaseStatusValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpY2VJbmNyZWFzZVN0YXR1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy9QcmljZUluY3JlYXNlU3RhdHVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw0REFBNEQ7OztBQUU1RCwyQ0FBOEM7QUFFOUM7Ozs7R0FJRztBQUNILElBQVksbUJBR1g7QUFIRCxXQUFZLG1CQUFtQjtJQUMzQix5R0FBOEIsQ0FBQTtJQUM5Qix5S0FBOEQsQ0FBQTtBQUNsRSxDQUFDLEVBSFcsbUJBQW1CLG1DQUFuQixtQkFBbUIsUUFHOUI7QUFFRCxNQUFhLDRCQUE2QixTQUFRLDJCQUFlO0NBQUc7QUFBcEUsb0VBQW9FIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIzIEFwcGxlIEluYy4gTGljZW5zZWQgdW5kZXIgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IE51bWJlclZhbGlkYXRvciB9IGZyb20gXCIuL1ZhbGlkYXRvclwiO1xuXG4vKipcbiAqIFRoZSBzdGF0dXMgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciBhbiBhdXRvLXJlbmV3YWJsZSBzdWJzY3JpcHRpb24gaXMgc3ViamVjdCB0byBhIHByaWNlIGluY3JlYXNlLlxuICpcbiAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9wcmljZWluY3JlYXNlc3RhdHVzIHByaWNlSW5jcmVhc2VTdGF0dXN9XG4gKi9cbmV4cG9ydCBlbnVtIFByaWNlSW5jcmVhc2VTdGF0dXMge1xuICAgIENVU1RPTUVSX0hBU19OT1RfUkVTUE9OREVEID0gMCxcbiAgICBDVVNUT01FUl9DT05TRU5URURfT1JfV0FTX05PVElGSUVEX1dJVEhPVVRfTkVFRElOR19DT05TRU5UID0gMSxcbn1cblxuZXhwb3J0IGNsYXNzIFByaWNlSW5jcmVhc2VTdGF0dXNWYWxpZGF0b3IgZXh0ZW5kcyBOdW1iZXJWYWxpZGF0b3Ige30iXX0=