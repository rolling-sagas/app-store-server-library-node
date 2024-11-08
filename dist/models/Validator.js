"use strict";
// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringValidator = exports.NumberValidator = void 0;
class NumberValidator {
    validate(obj) {
        return typeof obj === 'number';
    }
}
exports.NumberValidator = NumberValidator;
class StringValidator {
    validate(obj) {
        return typeof obj === "string" || obj instanceof String;
    }
}
exports.StringValidator = StringValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbW9kZWxzL1ZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNERBQTREOzs7QUFNNUQsTUFBYSxlQUFlO0lBQ3hCLFFBQVEsQ0FBQyxHQUFRO1FBQ1osT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUE7SUFDbEMsQ0FBQztDQUNKO0FBSkYsMENBSUU7QUFFRCxNQUFhLGVBQWU7SUFDekIsUUFBUSxDQUFDLEdBQVE7UUFDWixPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLFlBQVksTUFBTSxDQUFBO0lBQzNELENBQUM7Q0FDSjtBQUpELDBDQUlDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIzIEFwcGxlIEluYy4gTGljZW5zZWQgdW5kZXIgTUlUIExpY2Vuc2UuXG5cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdG9yPFQ+IHtcbiAgICB2YWxpZGF0ZShvYmo6IGFueSk6IG9iaiBpcyBUXG59XG5cbmV4cG9ydCBjbGFzcyBOdW1iZXJWYWxpZGF0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3I8bnVtYmVyPiB7XG4gICAgdmFsaWRhdGUob2JqOiBhbnkpOiBvYmogaXMgbnVtYmVyIHtcbiAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJ1xuICAgICB9XG4gfVxuIFxuIGV4cG9ydCBjbGFzcyBTdHJpbmdWYWxpZGF0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3I8c3RyaW5nPiB7XG4gICAgdmFsaWRhdGUob2JqOiBhbnkpOiBvYmogaXMgc3RyaW5nIHtcbiAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiIHx8IG9iaiBpbnN0YW5jZW9mIFN0cmluZ1xuICAgICB9XG4gfSJdfQ==