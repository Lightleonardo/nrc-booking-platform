import { describe, it, expect } from 'vitest';
import { searchSchema, passengerSchema, paymentSchema } from '@/lib/validations';

describe('searchSchema', () => {
  const valid = {
    tripType: 'one-way' as const,
    from: 'EBM',
    to: 'IDU',
    departureDate: new Date('2026-09-01'),
    returnDate: undefined,
    passengers: { adults: 1, children: 0, infants: 0 },
  };

  it('passes valid input', () => {
    expect(searchSchema.safeParse(valid).success).toBe(true);
  });

  it('fails when from is missing', () => {
    const result = searchSchema.safeParse({ ...valid, from: '' });
    expect(result.success).toBe(false);
  });

  it('fails when from === to', () => {
    const result = searchSchema.safeParse({ ...valid, from: 'EBM', to: 'EBM' });
    expect(result.success).toBe(false);
  });

  it('fails when round-trip without return date', () => {
    const result = searchSchema.safeParse({ ...valid, tripType: 'round-trip', returnDate: undefined });
    expect(result.success).toBe(false);
  });

  it('fails when passenger count exceeds 9', () => {
    const result = searchSchema.safeParse({
      ...valid,
      passengers: { adults: 9, children: 1, infants: 0 },
    });
    expect(result.success).toBe(false);
  });
});

describe('passengerSchema', () => {
  const valid = {
    title: 'Mr' as const,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+2348012345678',
    idType: 'NIN' as const,
    idNumber: '12345678901',
    dateOfBirth: new Date('1990-01-01'),
    gender: 'Male' as const,
  };

  it('passes valid passenger', () => {
    expect(passengerSchema.safeParse(valid).success).toBe(true);
  });

  it('fails invalid email', () => {
    const result = passengerSchema.safeParse({ ...valid, email: 'bad' });
    expect(result.success).toBe(false);
  });

  it('fails invalid phone', () => {
    const result = passengerSchema.safeParse({ ...valid, phone: '123' });
    expect(result.success).toBe(false);
  });

  it('fails short ID number', () => {
    const result = passengerSchema.safeParse({ ...valid, idNumber: '123' });
    expect(result.success).toBe(false);
  });
});

describe('paymentSchema', () => {
  it('passes card payment', () => {
    const result = paymentSchema.safeParse({ method: 'card', cardLast4: '4242' });
    expect(result.success).toBe(true);
  });

  it('fails invalid card last4', () => {
    const result = paymentSchema.safeParse({ method: 'card', cardLast4: 'abc' });
    expect(result.success).toBe(false);
  });
});