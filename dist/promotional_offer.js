"use strict";
// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionalOfferSignatureCreator = void 0;
const crypto_1 = require("crypto");
class PromotionalOfferSignatureCreator {
    constructor(signingKey, keyId, bundleId) {
        this.signingKey = (0, crypto_1.createPrivateKey)(signingKey);
        this.keyId = keyId;
        this.bundleId = bundleId;
    }
    /**
     * Create a promotional offer signature
     *
     * {@link https://developer.apple.com/documentation/storekit/in-app_purchase/original_api_for_in-app_purchase/subscriptions_and_offers/generating_a_signature_for_promotional_offers Generating a signature for promotional offers}
     * @param productIdentifier The subscription product identifier
     * @param subscriptionOfferID The subscription discount identifier
     * @param applicationUsername An optional string value that you define; may be an empty string
     * @param nonce A one-time UUID value that your server generates. Generate a new nonce for every signature.
     * @param timestamp A timestamp your server generates in UNIX time format, in milliseconds. The timestamp keeps the offer active for 24 hours.
     * @return The Base64 encoded signature
     */
    createSignature(productIdentifier, subscriptionOfferID, applicationUsername, nonce, timestamp) {
        const payload = this.bundleId + '\u2063' +
            this.keyId + '\u2063' +
            productIdentifier + '\u2063' +
            subscriptionOfferID + '\u2063' +
            applicationUsername.toLowerCase() + '\u2063' +
            nonce.toLowerCase() + '\u2063' +
            timestamp;
        const sign = (0, crypto_1.createSign)('SHA256');
        sign.update(payload);
        sign.end();
        return sign.sign(this.signingKey).toString('base64');
    }
}
exports.PromotionalOfferSignatureCreator = PromotionalOfferSignatureCreator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbW90aW9uYWxfb2ZmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcm9tb3Rpb25hbF9vZmZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNERBQTREOzs7QUFFNUQsbUNBQWlFO0FBRWpFLE1BQWEsZ0NBQWdDO0lBTXpDLFlBQW1CLFVBQWtCLEVBQUUsS0FBYSxFQUFFLFFBQWdCO1FBQ2xFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBQSx5QkFBZ0IsRUFBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNJLGVBQWUsQ0FBQyxpQkFBeUIsRUFBRSxtQkFBMkIsRUFBRSxtQkFBMkIsRUFBRSxLQUFhLEVBQUUsU0FBaUI7UUFDeEksTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRO1lBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUTtZQUNyQixpQkFBaUIsR0FBRyxRQUFRO1lBQzVCLG1CQUFtQixHQUFHLFFBQVE7WUFDOUIsbUJBQW1CLENBQUMsV0FBVyxFQUFFLEdBQUksUUFBUTtZQUM3QyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsUUFBUTtZQUM5QixTQUFTLENBQUM7UUFDZCxNQUFNLElBQUksR0FBRyxJQUFBLG1CQUFVLEVBQUMsUUFBUSxDQUFDLENBQUE7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNwQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0NBQ0o7QUFwQ0QsNEVBb0NDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIzIEFwcGxlIEluYy4gTGljZW5zZWQgdW5kZXIgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEtleU9iamVjdCwgY3JlYXRlUHJpdmF0ZUtleSwgY3JlYXRlU2lnbiB9IGZyb20gXCJjcnlwdG9cIjtcblxuZXhwb3J0IGNsYXNzIFByb21vdGlvbmFsT2ZmZXJTaWduYXR1cmVDcmVhdG9yIHtcblxuICAgIHByaXZhdGUgc2lnbmluZ0tleTogS2V5T2JqZWN0O1xuICAgIHByaXZhdGUga2V5SWQ6IHN0cmluZztcbiAgICBwcml2YXRlIGJ1bmRsZUlkOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3Ioc2lnbmluZ0tleTogc3RyaW5nLCBrZXlJZDogc3RyaW5nLCBidW5kbGVJZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2lnbmluZ0tleSA9IGNyZWF0ZVByaXZhdGVLZXkoc2lnbmluZ0tleSk7XG4gICAgICAgIHRoaXMua2V5SWQgPSBrZXlJZFxuICAgICAgICB0aGlzLmJ1bmRsZUlkID0gYnVuZGxlSWRcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcHJvbW90aW9uYWwgb2ZmZXIgc2lnbmF0dXJlXG4gICAgICpcbiAgICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vc3RvcmVraXQvaW4tYXBwX3B1cmNoYXNlL29yaWdpbmFsX2FwaV9mb3JfaW4tYXBwX3B1cmNoYXNlL3N1YnNjcmlwdGlvbnNfYW5kX29mZmVycy9nZW5lcmF0aW5nX2Ffc2lnbmF0dXJlX2Zvcl9wcm9tb3Rpb25hbF9vZmZlcnMgR2VuZXJhdGluZyBhIHNpZ25hdHVyZSBmb3IgcHJvbW90aW9uYWwgb2ZmZXJzfVxuICAgICAqIEBwYXJhbSBwcm9kdWN0SWRlbnRpZmllciBUaGUgc3Vic2NyaXB0aW9uIHByb2R1Y3QgaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSBzdWJzY3JpcHRpb25PZmZlcklEIFRoZSBzdWJzY3JpcHRpb24gZGlzY291bnQgaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSBhcHBsaWNhdGlvblVzZXJuYW1lIEFuIG9wdGlvbmFsIHN0cmluZyB2YWx1ZSB0aGF0IHlvdSBkZWZpbmU7IG1heSBiZSBhbiBlbXB0eSBzdHJpbmdcbiAgICAgKiBAcGFyYW0gbm9uY2UgQSBvbmUtdGltZSBVVUlEIHZhbHVlIHRoYXQgeW91ciBzZXJ2ZXIgZ2VuZXJhdGVzLiBHZW5lcmF0ZSBhIG5ldyBub25jZSBmb3IgZXZlcnkgc2lnbmF0dXJlLlxuICAgICAqIEBwYXJhbSB0aW1lc3RhbXAgQSB0aW1lc3RhbXAgeW91ciBzZXJ2ZXIgZ2VuZXJhdGVzIGluIFVOSVggdGltZSBmb3JtYXQsIGluIG1pbGxpc2Vjb25kcy4gVGhlIHRpbWVzdGFtcCBrZWVwcyB0aGUgb2ZmZXIgYWN0aXZlIGZvciAyNCBob3Vycy5cbiAgICAgKiBAcmV0dXJuIFRoZSBCYXNlNjQgZW5jb2RlZCBzaWduYXR1cmVcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlU2lnbmF0dXJlKHByb2R1Y3RJZGVudGlmaWVyOiBzdHJpbmcsIHN1YnNjcmlwdGlvbk9mZmVySUQ6IHN0cmluZywgYXBwbGljYXRpb25Vc2VybmFtZTogc3RyaW5nLCBub25jZTogc3RyaW5nLCB0aW1lc3RhbXA6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmJ1bmRsZUlkICsgJ1xcdTIwNjMnICtcbiAgICAgICAgICAgIHRoaXMua2V5SWQgKyAnXFx1MjA2MycgK1xuICAgICAgICAgICAgcHJvZHVjdElkZW50aWZpZXIgKyAnXFx1MjA2MycgK1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uT2ZmZXJJRCArICdcXHUyMDYzJyArXG4gICAgICAgICAgICBhcHBsaWNhdGlvblVzZXJuYW1lLnRvTG93ZXJDYXNlKCkgICsgJ1xcdTIwNjMnK1xuICAgICAgICAgICAgbm9uY2UudG9Mb3dlckNhc2UoKSArICdcXHUyMDYzJyArXG4gICAgICAgICAgICB0aW1lc3RhbXA7XG4gICAgICAgIGNvbnN0IHNpZ24gPSBjcmVhdGVTaWduKCdTSEEyNTYnKVxuICAgICAgICBzaWduLnVwZGF0ZShwYXlsb2FkKVxuICAgICAgICBzaWduLmVuZCgpXG4gICAgICAgIHJldHVybiBzaWduLnNpZ24odGhpcy5zaWduaW5nS2V5KS50b1N0cmluZygnYmFzZTY0JylcbiAgICB9XG59Il19