"use strict";
// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptUtility = void 0;
const jsrsasign_1 = require("jsrsasign");
const IN_APP_TYPE_ID = 17;
const TRANSACTION_IDENTIFIER_TYPE_ID = 1703;
const ORIGINAL_TRANSACTION_IDENTIFIER_TYPE_ID = 1705;
class ReceiptUtility {
    /**
     * Extracts a transaction id from an encoded App Receipt. Throws if the receipt does not match the expected format.
     * *NO validation* is performed on the receipt, and any data returned should only be used to call the App Store Server API.
     * @param appReceipt The unmodified app receipt
     * @returns A transaction id from the array of in-app purchases, null if the receipt contains no in-app purchases
     */
    extractTransactionIdFromAppReceipt(appReceipt) {
        // Xcode receipts use indefinite length encoding, not supported by all parsers
        // Indefinite length encoding is only entered, but never left during parsing for receipts
        // We therefore round up indefinite length encoding to be the remaining length
        const prevGetVblenFunction = jsrsasign_1.ASN1HEX.getVblen;
        jsrsasign_1.ASN1HEX.getVblen = function (s, idx) {
            const c = jsrsasign_1.ASN1HEX.getL(s, idx);
            const oldResult = prevGetVblenFunction(s, idx);
            // Round up to the remaining length in the string, measured in bytes (2 hex values per byte)
            if (oldResult === 0 && c === '80') {
                return (s.length - idx) / 2;
            }
            return oldResult;
        };
        const prevGetLblen = jsrsasign_1.ASN1HEX.getLblen;
        jsrsasign_1.ASN1HEX.getLblen = function (s, idx) {
            const oldResult = prevGetLblen(s, idx);
            // The length for the length byte for 80 00 is 1
            if (oldResult == -1) {
                return 1;
            }
            return oldResult;
        };
        try {
            let receiptInfo = jsrsasign_1.ASN1HEX.getVbyList(Buffer.from(appReceipt, 'base64').toString('hex'), 0, [1, 0, 2, 1, 0]);
            if (receiptInfo.length > 2 && receiptInfo.startsWith('04')) {
                // We are still in an Octet String, Xcode wraps with an extra Octet, decode it here
                receiptInfo = jsrsasign_1.ASN1HEX.getV(receiptInfo, 0);
            }
            let index = 0;
            while (jsrsasign_1.ASN1HEX.getVbyList(receiptInfo, 0, [index, 0])) {
                const val = jsrsasign_1.ASN1HEX.getVbyList(receiptInfo, 0, [index, 0]);
                if (IN_APP_TYPE_ID === parseInt(val, 16)) {
                    const inAppInfo = jsrsasign_1.ASN1HEX.getVbyList(receiptInfo, 0, [index, 2]);
                    let inAppIndex = 0;
                    while (jsrsasign_1.ASN1HEX.getVbyList(inAppInfo, 0, [inAppIndex, 0])) {
                        const val = jsrsasign_1.ASN1HEX.getVbyList(inAppInfo, 0, [inAppIndex, 0]);
                        if (TRANSACTION_IDENTIFIER_TYPE_ID === parseInt(val, 16) || ORIGINAL_TRANSACTION_IDENTIFIER_TYPE_ID === parseInt(val, 16)) {
                            const transactionIdUTF8String = jsrsasign_1.ASN1HEX.getVbyList(inAppInfo, 0, [inAppIndex, 2]);
                            const transactionId = jsrsasign_1.ASN1HEX.getVbyList(transactionIdUTF8String, 0, []);
                            return Buffer.from(transactionId, 'hex').toString();
                        }
                        inAppIndex = inAppIndex + 1;
                    }
                }
                index = index + 1;
            }
            return null;
        }
        finally {
            jsrsasign_1.ASN1HEX.getLblen = prevGetLblen;
            jsrsasign_1.ASN1HEX.getVblen = prevGetVblenFunction;
        }
    }
    /**
     * Extracts a transaction id from an encoded transactional receipt. Throws if the receipt does not match the expected format.
     * *NO validation* is performed on the receipt, and any data returned should only be used to call the App Store Server API.
     * @param transactionReceipt The unmodified transactionReceipt
     * @return A transaction id, or null if no transactionId is found in the receipt
     */
    extractTransactionIdFromTransactionReceipt(transactionReceipt) {
        const topLevel = Buffer.from(transactionReceipt, 'base64').toString();
        const topLevelRegex = /"purchase-info"\s+=\s+"([a-zA-Z0-9+/=]+)";/;
        const topLevelMatchResult = topLevel.match(topLevelRegex);
        if (!topLevelMatchResult || topLevelMatchResult?.length !== 2) {
            return null;
        }
        const purchaseInfo = Buffer.from(topLevelMatchResult[1], 'base64').toString();
        const purchaseInfoRegex = /"transaction-id"\s+=\s+"([a-zA-Z0-9+/=]+)";/;
        const purchaseInfoMatchResult = purchaseInfo.match(purchaseInfoRegex);
        if (!purchaseInfoMatchResult || purchaseInfoMatchResult?.length !== 2) {
            return null;
        }
        return purchaseInfoMatchResult[1];
    }
}
exports.ReceiptUtility = ReceiptUtility;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjZWlwdF91dGlsaXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vcmVjZWlwdF91dGlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw0REFBNEQ7OztBQUU1RCx5Q0FBb0M7QUFFcEMsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQzFCLE1BQU0sOEJBQThCLEdBQUcsSUFBSSxDQUFDO0FBQzVDLE1BQU0sdUNBQXVDLEdBQUcsSUFBSSxDQUFDO0FBRXJELE1BQWEsY0FBYztJQUV2Qjs7Ozs7T0FLRztJQUNILGtDQUFrQyxDQUFDLFVBQWtCO1FBQ2pELDhFQUE4RTtRQUM5RSx5RkFBeUY7UUFDekYsOEVBQThFO1FBQzlFLE1BQU0sb0JBQW9CLEdBQUcsbUJBQU8sQ0FBQyxRQUFRLENBQUE7UUFDN0MsbUJBQU8sQ0FBQyxRQUFRLEdBQUcsVUFBUyxDQUFDLEVBQUUsR0FBRztZQUM5QixNQUFNLENBQUMsR0FBRyxtQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDOUIsTUFBTSxTQUFTLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQzlDLDRGQUE0RjtZQUM1RixJQUFJLFNBQVMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO2dCQUNoQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDL0IsQ0FBQztZQUNELE9BQU8sU0FBUyxDQUFBO1FBQ3BCLENBQUMsQ0FBQTtRQUNELE1BQU0sWUFBWSxHQUFHLG1CQUFPLENBQUMsUUFBUSxDQUFBO1FBQ3JDLG1CQUFPLENBQUMsUUFBUSxHQUFHLFVBQVMsQ0FBQyxFQUFFLEdBQUc7WUFDOUIsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUN0QyxnREFBZ0Q7WUFDaEQsSUFBSSxTQUFT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Q0FBQTtRQUNyRSxNQUFNLGFBQWEsR0FBRyw0Q0FBNEMsQ0FBQTtRQUNsRSxNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDekQsSUFBSSxDQUFDLG1CQUFtQixJQUFJLG1CQUFtQixFQUFFLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxPQUFPLElBQUksQ0FBQTtRQUNmLENBQUM7UUFFRCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQzdFLE1BQU0saUJBQWlCLEdBQUcsNkNBQTZDLENBQUE7UUFDdkUsTUFBTSx1QkFBdUIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDckUsSUFBSSxDQUFDLHVCQUF1QixJQUFJLHVCQUF1QixFQUFFLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNwRSxPQUFPLElBQUksQ0FBQTtRQUNmLENBQUM7UUFDRCxPQUFPLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JDLENBQUM7Q0FDSjtBQXBGRCx3Q0FvRkMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjMgQXBwbGUgSW5jLiBMaWNlbnNlZCB1bmRlciBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgQVNOMUhFWCB9IGZyb20gJ2pzcnNhc2lnbic7XG5cbmNvbnN0IElOX0FQUF9UWVBFX0lEID0gMTc7XG5jb25zdCBUUkFOU0FDVElPTl9JREVOVElGSUVSX1RZUEVfSUQgPSAxNzAzO1xuY29uc3QgT1JJR0lOQUxfVFJBTlNBQ1RJT05fSURFTlRJRklFUl9UWVBFX0lEID0gMTcwNTtcblxuZXhwb3J0IGNsYXNzIFJlY2VpcHRVdGlsaXR5IHtcbiAgICBcbiAgICAvKipcbiAgICAgKiBFeHRyYWN0cyBhIHRyYW5zYWN0aW9uIGlkIGZyb20gYW4gZW5jb2RlZCBBcHAgUmVjZWlwdC4gVGhyb3dzIGlmIHRoZSByZWNlaXB0IGRvZXMgbm90IG1hdGNoIHRoZSBleHBlY3RlZCBmb3JtYXQuXG4gICAgICogKk5PIHZhbGlkYXRpb24qIGlzIHBlcmZvcm1lZCBvbiB0aGUgcmVjZWlwdCwgYW5kIGFueSBkYXRhIHJldHVybmVkIHNob3VsZCBvbmx5IGJlIHVzZWQgdG8gY2FsbCB0aGUgQXBwIFN0b3JlIFNlcnZlciBBUEkuXG4gICAgICogQHBhcmFtIGFwcFJlY2VpcHQgVGhlIHVubW9kaWZpZWQgYXBwIHJlY2VpcHRcbiAgICAgKiBAcmV0dXJucyBBIHRyYW5zYWN0aW9uIGlkIGZyb20gdGhlIGFycmF5IG9mIGluLWFwcCBwdXJjaGFzZXMsIG51bGwgaWYgdGhlIHJlY2VpcHQgY29udGFpbnMgbm8gaW4tYXBwIHB1cmNoYXNlc1xuICAgICAqL1xuICAgIGV4dHJhY3RUcmFuc2FjdGlvbklkRnJvbUFwcFJlY2VpcHQoYXBwUmVjZWlwdDogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIC8vIFhjb2RlIHJlY2VpcHRzIHVzZSBpbmRlZmluaXRlIGxlbmd0aCBlbmNvZGluZywgbm90IHN1cHBvcnRlZCBieSBhbGwgcGFyc2Vyc1xuICAgICAgICAvLyBJbmRlZmluaXRlIGxlbmd0aCBlbmNvZGluZyBpcyBvbmx5IGVudGVyZWQsIGJ1dCBuZXZlciBsZWZ0IGR1cmluZyBwYXJzaW5nIGZvciByZWNlaXB0c1xuICAgICAgICAvLyBXZSB0aGVyZWZvcmUgcm91bmQgdXAgaW5kZWZpbml0ZSBsZW5ndGggZW5jb2RpbmcgdG8gYmUgdGhlIHJlbWFpbmluZyBsZW5ndGhcbiAgICAgICAgY29uc3QgcHJldkdldFZibGVuRnVuY3Rpb24gPSBBU04xSEVYLmdldFZibGVuXG4gICAgICAgIEFTTjFIRVguZ2V0VmJsZW4gPSBmdW5jdGlvbihzLCBpZHgpIHtcbiAgICAgICAgICAgIGNvbnN0IGMgPSBBU04xSEVYLmdldEwocywgaWR4KVxuICAgICAgICAgICAgY29uc3Qgb2xkUmVzdWx0ID0gcHJldkdldFZibGVuRnVuY3Rpb24ocywgaWR4KVxuICAgICAgICAgICAgLy8gUm91bmQgdXAgdG8gdGhlIHJlbWFpbmluZyBsZW5ndGggaW4gdGhlIHN0cmluZywgbWVhc3VyZWQgaW4gYnl0ZXMgKDIgaGV4IHZhbHVlcyBwZXIgYnl0ZSlcbiAgICAgICAgICAgIGlmIChvbGRSZXN1bHQgPT09IDAgJiYgYyA9PT0gJzgwJykge1xuICAgICAgICAgICAgICAgIHJldHVybiAocy5sZW5ndGggLSBpZHgpIC8gMlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9sZFJlc3VsdFxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByZXZHZXRMYmxlbiA9IEFTTjFIRVguZ2V0TGJsZW5cbiAgICAgICAgQVNOMUhFWC5nZXRMYmxlbiA9IGZ1bmN0aW9uKHMsIGlkeCkge1xuICAgICAgICAgICAgY29uc3Qgb2xkUmVzdWx0ID0gcHJldkdldExibGVuKHMsIGlkeClcbiAgICAgICAgICAgIC8vIFRoZSBsZW5ndGggZm9yIHRoZSBsZW5ndGggYnl0ZSBmb3IgODAgMDAgaXMgMVxuICAgICAgICAgICAgaWYgKG9sZFJlc3VsdCA9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2xkUmVzdWx0XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZWNlaXB0SW5mbyA9IEFTTjFIRVguZ2V0VmJ5TGlzdChCdWZmZXIuZnJvbShhcHBSZWNlaXB0LCAnYmFzZTY0JykudG9TdHJpbmcoJ2hleCcpLCAwLCBbMSwgMCwgMiwgMSwgMF0pIGFzIHN0cmluZ1xuICAgICAgICAgICAgaWYgKHJlY2VpcHRJbmZvLmxlbmd0aCA+IDIgJiYgcmVjZWlwdEluZm8uc3RhcnRzV2l0aCgnMDQnKSkge1xuICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBzdGlsbCBpbiBhbiBPY3RldCBTdHJpbmcsIFhjb2RlIHdyYXBzIHdpdGggYW4gZXh0cmEgT2N0ZXQsIGRlY29kZSBpdCBoZXJlXG4gICAgICAgICAgICAgICAgcmVjZWlwdEluZm8gPSBBU04xSEVYLmdldFYocmVjZWlwdEluZm8sIDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgd2hpbGUoQVNOMUhFWC5nZXRWYnlMaXN0KHJlY2VpcHRJbmZvLCAwLCBbaW5kZXgsIDBdKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IEFTTjFIRVguZ2V0VmJ5TGlzdChyZWNlaXB0SW5mbywgMCwgW2luZGV4LCAwXSkgYXMgc3RyaW5nXG4gICAgICAgICAgICAgICAgaWYgKElOX0FQUF9UWVBFX0lEID09PSBwYXJzZUludCh2YWwsIDE2KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbkFwcEluZm8gPSBBU04xSEVYLmdldFZieUxpc3QocmVjZWlwdEluZm8sIDAsIFtpbmRleCwgMl0pIGFzIHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5BcHBJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKEFTTjFIRVguZ2V0VmJ5TGlzdChpbkFwcEluZm8sIDAsIFtpbkFwcEluZGV4LCAwXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IEFTTjFIRVguZ2V0VmJ5TGlzdChpbkFwcEluZm8sIDAsIFtpbkFwcEluZGV4LCAwXSkgYXMgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVFJBTlNBQ1RJT05fSURFTlRJRklFUl9UWVBFX0lEID09PSBwYXJzZUludCh2YWwsIDE2KSB8fCBPUklHSU5BTF9UUkFOU0FDVElPTl9JREVOVElGSUVSX1RZUEVfSUQgPT09IHBhcnNlSW50KHZhbCwgMTYpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhbnNhY3Rpb25JZFVURjhTdHJpbmcgPSBBU04xSEVYLmdldFZieUxpc3QoaW5BcHBJbmZvLCAwLCBbaW5BcHBJbmRleCwgMl0pIGFzIHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uSWQgPSBBU04xSEVYLmdldFZieUxpc3QodHJhbnNhY3Rpb25JZFVURjhTdHJpbmcsIDAsIFtdKSBhcyBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20odHJhbnNhY3Rpb25JZCwgJ2hleCcpLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGluQXBwSW5kZXggPSBpbkFwcEluZGV4ICsgMVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kZXggKyAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgQVNOMUhFWC5nZXRMYmxlbiA9IHByZXZHZXRMYmxlblxuICAgICAgICAgICAgQVNOMUhFWC5nZXRWYmxlbiA9IHByZXZHZXRWYmxlbkZ1bmN0aW9uXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHRyYWN0cyBhIHRyYW5zYWN0aW9uIGlkIGZyb20gYW4gZW5jb2RlZCB0cmFuc2FjdGlvbmFsIHJlY2VpcHQuIFRocm93cyBpZiB0aGUgcmVjZWlwdCBkb2VzIG5vdCBtYXRjaCB0aGUgZXhwZWN0ZWQgZm9ybWF0LlxuICAgICAqICpOTyB2YWxpZGF0aW9uKiBpcyBwZXJmb3JtZWQgb24gdGhlIHJlY2VpcHQsIGFuZCBhbnkgZGF0YSByZXR1cm5lZCBzaG91bGQgb25seSBiZSB1c2VkIHRvIGNhbGwgdGhlIEFwcCBTdG9yZSBTZXJ2ZXIgQVBJLlxuICAgICAqIEBwYXJhbSB0cmFuc2FjdGlvblJlY2VpcHQgVGhlIHVubW9kaWZpZWQgdHJhbnNhY3Rpb25SZWNlaXB0XG4gICAgICogQHJldHVybiBBIHRyYW5zYWN0aW9uIGlkLCBvciBudWxsIGlmIG5vIHRyYW5zYWN0aW9uSWQgaXMgZm91bmQgaW4gdGhlIHJlY2VpcHRcbiAgICAgKi9cbiAgICBleHRyYWN0VHJhbnNhY3Rpb25JZEZyb21UcmFuc2FjdGlvblJlY2VpcHQodHJhbnNhY3Rpb25SZWNlaXB0OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgY29uc3QgdG9wTGV2ZWwgPSBCdWZmZXIuZnJvbSh0cmFuc2FjdGlvblJlY2VpcHQsICdiYXNlNjQnKS50b1N0cmluZygpXG4gICAgICAgIGNvbnN0IHRvcExldmVsUmVnZXggPSAvXCJwdXJjaGFzZS1pbmZvXCJcXHMrPVxccytcIihbYS16QS1aMC05Ky89XSspXCI7L1xuICAgICAgICBjb25zdCB0b3BMZXZlbE1hdGNoUmVzdWx0ID0gdG9wTGV2ZWwubWF0Y2godG9wTGV2ZWxSZWdleCkgICAgICAgIFxuICAgICAgICBpZiAoIXRvcExldmVsTWF0Y2hSZXN1bHQgfHwgdG9wTGV2ZWxNYXRjaFJlc3VsdD8ubGVuZ3RoICE9PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwdXJjaGFzZUluZm8gPSBCdWZmZXIuZnJvbSh0b3BMZXZlbE1hdGNoUmVzdWx0WzFdLCAnYmFzZTY0JykudG9TdHJpbmcoKVxuICAgICAgICBjb25zdCBwdXJjaGFzZUluZm9SZWdleCA9IC9cInRyYW5zYWN0aW9uLWlkXCJcXHMrPVxccytcIihbYS16QS1aMC05Ky89XSspXCI7L1xuICAgICAgICBjb25zdCBwdXJjaGFzZUluZm9NYXRjaFJlc3VsdCA9IHB1cmNoYXNlSW5mby5tYXRjaChwdXJjaGFzZUluZm9SZWdleClcbiAgICAgICAgaWYgKCFwdXJjaGFzZUluZm9NYXRjaFJlc3VsdCB8fCBwdXJjaGFzZUluZm9NYXRjaFJlc3VsdD8ubGVuZ3RoICE9PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwdXJjaGFzZUluZm9NYXRjaFJlc3VsdFsxXVxuICAgIH1cbn1cbiJdfQ==