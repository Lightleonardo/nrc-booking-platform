/**
 * App-wide business constants: fares, thresholds and the bank list for USSD.
 */

// Flat booking service fee charged per booking (naira)
export const SERVICE_FEE = 500;
// Nigerian VAT applied on top of base fare + service fee
export const VAT_RATE = 0.075;
// Upper bound for total travellers per booking
export const MAX_PASSENGERS = 9;
export const MIN_ADULTS = 1;
export const MAX_ADULTS = 9;
export const MAX_CHILDREN = 8;
export const MAX_INFANTS = 8;

// Banks supported by the *737# USSD payment flow
export const NIGERIAN_BANKS = [
  { code: '058', name: 'GTBank' },
  { code: '044', name: 'Access Bank' },
  { code: '011', name: 'First Bank' },
  { code: '057', name: 'Zenith Bank' },
  { code: '032', name: 'Union Bank' },
  { code: '033', name: 'UBA' },
];