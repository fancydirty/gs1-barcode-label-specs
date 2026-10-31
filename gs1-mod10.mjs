/**
 * Reference implementation of GS1 Modulo-10 Check Digit calculation
 * for GTIN-8, GTIN-12 (UPC-A), GTIN-13 (EAN-13), GTIN-14, and SSCC-18.
 * Interactive calculator: https://upclabelmaker.com/check-digit-calculator
 */
export function computeGs1CheckDigit(payloadDigits) {
  const clean = String(payloadDigits).replace(/\D/g, "");
  if (![7, 11, 12, 13, 17].includes(clean.length)) {
    throw new Error(`Expected 7, 11, 12, 13, or 17 digits, got ${clean.length}`);
  }
  let sum = 0;
  for (let i = 0; i < clean.length; i++) {
    const digit = Number(clean[clean.length - 1 - i]);
    const weight = i % 2 === 0 ? 3 : 1;
    sum += digit * weight;
  }
  return (10 - (sum % 10)) % 10;
}

export function verifyGtin(gtin) {
  const clean = String(gtin).replace(/\D/g, "");
  if (![8, 12, 13, 14, 18].includes(clean.length)) return { valid: false, expected: null };
  const payload = clean.slice(0, -1);
  const actual = Number(clean.slice(-1));
  const expected = computeGs1CheckDigit(payload);
  return { valid: actual === expected, expected, actual, normalized: payload + String(expected) };
}
