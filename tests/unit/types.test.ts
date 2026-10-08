import { describe, it, expect } from 'vitest';
import type { BookingState, BookingAction } from '@/types/booking';

describe('booking types', () => {
  it('BookingState is a valid type', () => {
    const state: BookingState = {
      step: 1,
      search: {
        tripType: 'one-way',
        from: null,
        to: null,
        departureDate: null,
        returnDate: null,
        passengers: { adults: 1, children: 0, infants: 0 },
      },
      selectedTrain: null,
      selectedClass: 'economy',
      passengers: [],
      payment: { method: 'card' },
      bookingRef: null,
      errors: {},
    };
    expect(state.step).toBe(1);
  });

  it('BookingAction variants are assignable', () => {
    const action: BookingAction = { type: 'NEXT_STEP' };
    expect(action.type).toBe('NEXT_STEP');
  });
});