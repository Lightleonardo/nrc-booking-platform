import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, generateBookingRef, calculatePrice } from '@/lib/utils';

describe('formatCurrency', () => {
  it('formats NGN', () => {
    expect(formatCurrency(5500)).toContain('5,500');
  });
});

describe('formatDate', () => {
  it('returns empty for null', () => {
    expect(formatDate(null)).toBe('');
  });

  it('formats date', () => {
    const result = formatDate(new Date('2026-09-01'));
    expect(result).toContain('2026');
    expect(result).toContain('Sep');
  });
});

describe('generateBookingRef', () => {
  it('starts with NRC-', () => {
    expect(generateBookingRef().startsWith('NRC-')).toBe(true);
  });

  it('has 12 characters total', () => {
    expect(generateBookingRef()).toHaveLength(12);
  });
});

describe('calculatePrice', () => {
  it('computes breakdown for 2 passengers', () => {
    const result = calculatePrice(5500, 2);
    expect(result.base).toBe(11000);
    expect(result.fee).toBe(500);
    expect(result.vat).toBe(863);
    expect(result.total).toBe(12363);
  });

  it('handles single passenger', () => {
    const result = calculatePrice(1500, 1);
    expect(result.base).toBe(1500);
    expect(result.total).toBe(2150);
  });
});