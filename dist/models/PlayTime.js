"use strict";
// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayTimeValidator = exports.PlayTime = void 0;
const Validator_1 = require("./Validator");
/**
 * A value that indicates the amount of time that the customer used the app.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/playtime playTime}
 */
var PlayTime;
(function (PlayTime) {
    PlayTime[PlayTime["UNDECLARED"] = 0] = "UNDECLARED";
    PlayTime[PlayTime["ZERO_TO_FIVE_MINUTES"] = 1] = "ZERO_TO_FIVE_MINUTES";
    PlayTime[PlayTime["FIVE_TO_SIXTY_MINUTES"] = 2] = "FIVE_TO_SIXTY_MINUTES";
    PlayTime[PlayTime["ONE_TO_SIX_HOURS"] = 3] = "ONE_TO_SIX_HOURS";
    PlayTime[PlayTime["SIX_HOURS_TO_TWENTY_FOUR_HOURS"] = 4] = "SIX_HOURS_TO_TWENTY_FOUR_HOURS";
    PlayTime[PlayTime["ONE_DAY_TO_FOUR_DAYS"] = 5] = "ONE_DAY_TO_FOUR_DAYS";
    PlayTime[PlayTime["FOUR_DAYS_TO_SIXTEEN_DAYS"] = 6] = "FOUR_DAYS_TO_SIXTEEN_DAYS";
    PlayTime[PlayTime["OVER_SIXTEEN_DAYS"] = 7] = "OVER_SIXTEEN_DAYS";
})(PlayTime || (exports.PlayTime = PlayTime = {}));
class PlayTimeValidator extends Validator_1.NumberValidator {
}
exports.PlayTimeValidator = PlayTimeValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheVRpbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9tb2RlbHMvUGxheVRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDREQUE0RDs7O0FBRTVELDJDQUE4QztBQUU5Qzs7OztHQUlHO0FBQ0gsSUFBWSxRQVNYO0FBVEQsV0FBWSxRQUFRO0lBQ2hCLG1EQUFjLENBQUE7SUFDZCx1RUFBd0IsQ0FBQTtJQUN4Qix5RUFBeUIsQ0FBQTtJQUN6QiwrREFBb0IsQ0FBQTtJQUNwQiwyRkFBa0MsQ0FBQTtJQUNsQyx1RUFBd0IsQ0FBQTtJQUN4QixpRkFBNkIsQ0FBQTtJQUM3QixpRUFBcUIsQ0FBQTtBQUN6QixDQUFDLEVBVFcsUUFBUSx3QkFBUixRQUFRLFFBU25CO0FBRUQsTUFBYSxpQkFBa0IsU0FBUSwyQkFBZTtDQUFHO0FBQXpELDhDQUF5RCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMyBBcHBsZSBJbmMuIExpY2Vuc2VkIHVuZGVyIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBOdW1iZXJWYWxpZGF0b3IgfSBmcm9tIFwiLi9WYWxpZGF0b3JcIjtcblxuLyoqXG4gKiBBIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHRoZSBhbW91bnQgb2YgdGltZSB0aGF0IHRoZSBjdXN0b21lciB1c2VkIHRoZSBhcHAuXG4gKlxuICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL3BsYXl0aW1lIHBsYXlUaW1lfVxuICovXG5leHBvcnQgZW51bSBQbGF5VGltZSB7XG4gICAgVU5ERUNMQVJFRCA9IDAsXG4gICAgWkVST19UT19GSVZFX01JTlVURVMgPSAxLFxuICAgIEZJVkVfVE9fU0lYVFlfTUlOVVRFUyA9IDIsXG4gICAgT05FX1RPX1NJWF9IT1VSUyA9IDMsXG4gICAgU0lYX0hPVVJTX1RPX1RXRU5UWV9GT1VSX0hPVVJTID0gNCxcbiAgICBPTkVfREFZX1RPX0ZPVVJfREFZUyA9IDUsXG4gICAgRk9VUl9EQVlTX1RPX1NJWFRFRU5fREFZUyA9IDYsXG4gICAgT1ZFUl9TSVhURUVOX0RBWVMgPSA3LFxufVxuXG5leHBvcnQgY2xhc3MgUGxheVRpbWVWYWxpZGF0b3IgZXh0ZW5kcyBOdW1iZXJWYWxpZGF0b3Ige31cbiJdfQ==