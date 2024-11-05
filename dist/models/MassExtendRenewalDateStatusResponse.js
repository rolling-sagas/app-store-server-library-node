"use strict";
// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MassExtendRenewalDateStatusResponseValidator = void 0;
class MassExtendRenewalDateStatusResponseValidator {
    validate(obj) {
        if ((typeof obj['requestIdentifier'] !== 'undefined') && !(typeof obj['requestIdentifier'] === "string" || obj['requestIdentifier'] instanceof String)) {
            return false;
        }
        if ((typeof obj['completeDate'] !== 'undefined') && !(typeof obj['completeDate'] === "number")) {
            return false;
        }
        if ((typeof obj['complete'] !== 'undefined') && !(typeof obj['complete'] === "boolean" || obj['complete'] instanceof Boolean)) {
            return false;
        }
        if ((typeof obj['succeededCount'] !== 'undefined') && !(typeof obj['succeededCount'] === "number")) {
            return false;
        }
        if ((typeof obj['failedCount'] !== 'undefined') && !(typeof obj['failedCount'] === "number")) {
            return false;
        }
        return true;
    }
}
exports.MassExtendRenewalDateStatusResponseValidator = MassExtendRenewalDateStatusResponseValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFzc0V4dGVuZFJlbmV3YWxEYXRlU3RhdHVzUmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9tb2RlbHMvTWFzc0V4dGVuZFJlbmV3YWxEYXRlU3RhdHVzUmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDREQUE0RDs7O0FBZ0Q1RCxNQUFhLDRDQUE0QztJQUNyRCxRQUFRLENBQUMsR0FBUTtRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLFFBQVEsSUFBSSxHQUFHLENBQUMsbUJBQW1CLENBQUMsWUFBWSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3JKLE9BQU8sS0FBSyxDQUFBO1FBQ2hCLENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDN0YsT0FBTyxLQUFLLENBQUE7UUFDaEIsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssU0FBUyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQzVILE9BQU8sS0FBSyxDQUFBO1FBQ2hCLENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQ2pHLE9BQU8sS0FBSyxDQUFBO1FBQ2hCLENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDM0YsT0FBTyxLQUFLLENBQUE7UUFDaEIsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztDQUNKO0FBbkJELG9HQW1CQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMyBBcHBsZSBJbmMuIExpY2Vuc2VkIHVuZGVyIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi9WYWxpZGF0b3JcIlxuXG4vKipcbiAqIEEgcmVzcG9uc2UgdGhhdCBpbmRpY2F0ZXMgdGhlIGN1cnJlbnQgc3RhdHVzIG9mIGEgcmVxdWVzdCB0byBleHRlbmQgdGhlIHN1YnNjcmlwdGlvbiByZW5ld2FsIGRhdGUgdG8gYWxsIGVsaWdpYmxlIHN1YnNjcmliZXJzLlxuICpcbiAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9tYXNzZXh0ZW5kcmVuZXdhbGRhdGVzdGF0dXNyZXNwb25zZSBNYXNzRXh0ZW5kUmVuZXdhbERhdGVTdGF0dXNSZXNwb25zZX1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXNzRXh0ZW5kUmVuZXdhbERhdGVTdGF0dXNSZXNwb25zZSB7XG5cbiAgICAvKipcbiAgICAgKiBBIHN0cmluZyB0aGF0IGNvbnRhaW5zIGEgdW5pcXVlIGlkZW50aWZpZXIgeW91IHByb3ZpZGUgdG8gdHJhY2sgZWFjaCBzdWJzY3JpcHRpb24tcmVuZXdhbC1kYXRlIGV4dGVuc2lvbiByZXF1ZXN0LlxuICAgICAqXG4gICAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2FwcHN0b3Jlc2VydmVyYXBpL3JlcXVlc3RpZGVudGlmaWVyIHJlcXVlc3RJZGVudGlmaWVyfVxuICAgICAqKi9cbiAgICByZXF1ZXN0SWRlbnRpZmllcj86IHN0cmluZ1xuICAgICAgICBcbiAgICAvKipcbiAgICAgKiBBIEJvb2xlYW4gdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgQXBwIFN0b3JlIGNvbXBsZXRlZCB0aGUgcmVxdWVzdCB0byBleHRlbmQgYSBzdWJzY3JpcHRpb24gcmVuZXdhbCBkYXRlIHRvIGFjdGl2ZSBzdWJzY3JpYmVycy5cbiAgICAgKlxuICAgICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9jb21wbGV0ZSBjb21wbGV0ZX1cbiAgICAgKiovXG4gICAgY29tcGxldGU/OiBib29sZWFuXG4gICAgICAgIFxuICAgIC8qKlxuICAgICAqIFRoZSBVTklYIHRpbWUsIGluIG1pbGxpc2Vjb25kcywgdGhhdCB0aGUgQXBwIFN0b3JlIGNvbXBsZXRlcyBhIHJlcXVlc3QgdG8gZXh0ZW5kIGEgc3Vic2NyaXB0aW9uIHJlbmV3YWwgZGF0ZSBmb3IgZWxpZ2libGUgc3Vic2NyaWJlcnMuXG4gICAgICpcbiAgICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJhcGkvY29tcGxldGVkYXRlIGNvbXBsZXRlRGF0ZX1cbiAgICAgKiovXG4gICAgY29tcGxldGVEYXRlPzogbnVtYmVyXG4gICAgICAgIFxuICAgIC8qKlxuICAgICAqIFRoZSBjb3VudCBvZiBzdWJzY3JpcHRpb25zIHRoYXQgc3VjY2Vzc2Z1bGx5IHJlY2VpdmUgYSBzdWJzY3JpcHRpb24tcmVuZXdhbC1kYXRlIGV4dGVuc2lvbi5cbiAgICAgKlxuICAgICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9zdWNjZWVkZWRjb3VudCBzdWNjZWVkZWRDb3VudH1cbiAgICAgKiovXG4gICAgc3VjY2VlZGVkQ291bnQ/OiBudW1iZXJcbiAgICAgICAgXG4gICAgLyoqXG4gICAgICogVGhlIGNvdW50IG9mIHN1YnNjcmlwdGlvbnMgdGhhdCBmYWlsIHRvIHJlY2VpdmUgYSBzdWJzY3JpcHRpb24tcmVuZXdhbC1kYXRlIGV4dGVuc2lvbi5cbiAgICAgKlxuICAgICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcmFwaS9mYWlsZWRjb3VudCBmYWlsZWRDb3VudH1cbiAgICAgKiovXG4gICAgZmFpbGVkQ291bnQ/OiBudW1iZXJcbn1cblxuXG5leHBvcnQgY2xhc3MgTWFzc0V4dGVuZFJlbmV3YWxEYXRlU3RhdHVzUmVzcG9uc2VWYWxpZGF0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3I8TWFzc0V4dGVuZFJlbmV3YWxEYXRlU3RhdHVzUmVzcG9uc2U+IHtcbiAgICB2YWxpZGF0ZShvYmo6IGFueSk6IG9iaiBpcyBNYXNzRXh0ZW5kUmVuZXdhbERhdGVTdGF0dXNSZXNwb25zZSB7XG4gICAgICAgIGlmICgodHlwZW9mIG9ialsncmVxdWVzdElkZW50aWZpZXInXSAhPT0gJ3VuZGVmaW5lZCcpICYmICEodHlwZW9mIG9ialsncmVxdWVzdElkZW50aWZpZXInXSA9PT0gXCJzdHJpbmdcIiB8fCBvYmpbJ3JlcXVlc3RJZGVudGlmaWVyJ10gaW5zdGFuY2VvZiBTdHJpbmcpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHR5cGVvZiBvYmpbJ2NvbXBsZXRlRGF0ZSddICE9PSAndW5kZWZpbmVkJykgJiYgISh0eXBlb2Ygb2JqWydjb21wbGV0ZURhdGUnXSA9PT0gXCJudW1iZXJcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlmICgodHlwZW9mIG9ialsnY29tcGxldGUnXSAhPT0gJ3VuZGVmaW5lZCcpICYmICEodHlwZW9mIG9ialsnY29tcGxldGUnXSA9PT0gXCJib29sZWFuXCIgfHwgb2JqWydjb21wbGV0ZSddIGluc3RhbmNlb2YgQm9vbGVhbikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlmICgodHlwZW9mIG9ialsnc3VjY2VlZGVkQ291bnQnXSAhPT0gJ3VuZGVmaW5lZCcpICYmICEodHlwZW9mIG9ialsnc3VjY2VlZGVkQ291bnQnXSA9PT0gXCJudW1iZXJcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlmICgodHlwZW9mIG9ialsnZmFpbGVkQ291bnQnXSAhPT0gJ3VuZGVmaW5lZCcpICYmICEodHlwZW9mIG9ialsnZmFpbGVkQ291bnQnXSA9PT0gXCJudW1iZXJcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxufVxuIl19