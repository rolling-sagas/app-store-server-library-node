"use strict";
// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBodyV2Validator = void 0;
class ResponseBodyV2Validator {
    validate(obj) {
        if ((typeof obj['signedPayload'] !== 'undefined') && !(typeof obj['signedPayload'] === "string" || obj['signedPayload'] instanceof String)) {
            return false;
        }
        return true;
    }
}
exports.ResponseBodyV2Validator = ResponseBodyV2Validator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzcG9uc2VCb2R5VjIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9tb2RlbHMvUmVzcG9uc2VCb2R5VjIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDREQUE0RDs7O0FBb0I1RCxNQUFhLHVCQUF1QjtJQUNoQyxRQUFRLENBQUMsR0FBUTtRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUssUUFBUSxJQUFJLEdBQUcsQ0FBQyxlQUFlLENBQUMsWUFBWSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3pJLE9BQU8sS0FBSyxDQUFBO1FBQ2hCLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7Q0FDSjtBQVBELDBEQU9DIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIzIEFwcGxlIEluYy4gTGljZW5zZWQgdW5kZXIgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuL1ZhbGlkYXRvclwiXG5cbi8qKlxuICogVGhlIHJlc3BvbnNlIGJvZHkgdGhlIEFwcCBTdG9yZSBzZW5kcyBpbiBhIHZlcnNpb24gMiBzZXJ2ZXIgbm90aWZpY2F0aW9uLlxuICpcbiAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9hcHBzdG9yZXNlcnZlcm5vdGlmaWNhdGlvbnMvcmVzcG9uc2Vib2R5djIgUmVzcG9uc2VCb2R5VjJ9XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVzcG9uc2VCb2R5VjIge1xuICAgICBcbiAgICAvKipcbiAgICAgKiBBIGNyeXB0b2dyYXBoaWNhbGx5IHNpZ25lZCBwYXlsb2FkLCBpbiBKU09OIFdlYiBTaWduYXR1cmUgKEpXUykgZm9ybWF0LCBjb250YWluaW5nIHRoZSByZXNwb25zZSBib2R5IGZvciBhIHZlcnNpb24gMiBub3RpZmljYXRpb24uXG4gICAgICpcbiAgICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vYXBwc3RvcmVzZXJ2ZXJub3RpZmljYXRpb25zL3NpZ25lZHBheWxvYWQgc2lnbmVkUGF5bG9hZH1cbiAgICAgKiovXG4gICAgc2lnbmVkUGF5bG9hZD86IHN0cmluZ1xufVxuXG5cbmV4cG9ydCBjbGFzcyBSZXNwb25zZUJvZHlWMlZhbGlkYXRvciBpbXBsZW1lbnRzIFZhbGlkYXRvcjxSZXNwb25zZUJvZHlWMj4ge1xuICAgIHZhbGlkYXRlKG9iajogYW55KTogb2JqIGlzIFJlc3BvbnNlQm9keVYyIHtcbiAgICAgICAgaWYgKCh0eXBlb2Ygb2JqWydzaWduZWRQYXlsb2FkJ10gIT09ICd1bmRlZmluZWQnKSAmJiAhKHR5cGVvZiBvYmpbJ3NpZ25lZFBheWxvYWQnXSA9PT0gXCJzdHJpbmdcIiB8fCBvYmpbJ3NpZ25lZFBheWxvYWQnXSBpbnN0YW5jZW9mIFN0cmluZykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxufVxuIl19