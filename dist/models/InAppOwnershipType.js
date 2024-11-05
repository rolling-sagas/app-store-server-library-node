"use strict";
// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.InAppOwnershipTypeValidator = exports.InAppOwnershipType = void 0;
const Validator_1 = require("./Validator");
/**
 * The relationship of the user with the family-shared purchase to which they have access.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/inappownershiptype inAppOwnershipType}
 */
var InAppOwnershipType;
(function (InAppOwnershipType) {
    InAppOwnershipType["FAMILY_SHARED"] = "FAMILY_SHARED";
    InAppOwnershipType["PURCHASED"] = "PURCHASED";
})(InAppOwnershipType || (exports.InAppOwnershipType = InAppOwnershipType = {}));
class InAppOwnershipTypeValidator extends Validator_1.StringValidator {
}
exports.InAppOwnershipTypeValidator = InAppOwnershipTypeValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5BcHBPd25lcnNoaXBUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbW9kZWxzL0luQXBwT3duZXJzaGlwVHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNERBQTREOzs7QUFFNUQsMkNBQThDO0FBRTlDOzs7O0dBSUc7QUFDSCxJQUFZLGtCQUdYO0FBSEQsV0FBWSxrQkFBa0I7SUFDMUIscURBQStCLENBQUE7SUFDL0IsNkNBQXVCLENBQUE7QUFDM0IsQ0FBQyxFQUhXLGtCQUFrQixrQ0FBbEIsa0JBQWtCLFFBRzdCO0FBRUQsTUFBYSwyQkFBNEIsU0FBUSwyQkFBZTtDQUFHO0FBQW5FLGtFQUFtRSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMyBBcHBsZSBJbmMuIExpY2Vuc2VkIHVuZGVyIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBTdHJpbmdWYWxpZGF0b3IgfSBmcm9tIFwiLi9WYWxpZGF0b3JcIjtcblxuLyoqXG4gKiBUaGUgcmVsYXRpb25zaGlwIG9mIHRoZSB1c2VyIHdpdGggdGhlIGZhbWlseS1zaGFyZWQgcHVyY2hhc2UgdG8gd2hpY2ggdGhleSBoYXZlIGFjY2Vzcy5cbiAqXG4gKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvaW5hcHBvd25lcnNoaXB0eXBlIGluQXBwT3duZXJzaGlwVHlwZX1cbiAqL1xuZXhwb3J0IGVudW0gSW5BcHBPd25lcnNoaXBUeXBlIHtcbiAgICBGQU1JTFlfU0hBUkVEID0gXCJGQU1JTFlfU0hBUkVEXCIsXG4gICAgUFVSQ0hBU0VEID0gXCJQVVJDSEFTRURcIixcbn1cblxuZXhwb3J0IGNsYXNzIEluQXBwT3duZXJzaGlwVHlwZVZhbGlkYXRvciBleHRlbmRzIFN0cmluZ1ZhbGlkYXRvciB7fSJdfQ==