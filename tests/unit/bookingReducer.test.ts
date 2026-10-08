import { describe, it, expect } from 'vitest';
import { bookingReducer, initialState } from '@/context/bookingReducer';
import type { BookingAction, BookingState } from '@/types/booking';
import { trains } from '@/lib/mockData';

describe('bookingReducer', () => {
  it('returns initial state for unknown action', () => {
    const result = bookingReducer(initialState, { type: 'RESET' } as unknown as BookingAction);
    expect(result).toEqual(initialState);
  });

  it('handles SET_SEARCH partially', () => {
    const result = bookingReducer(initialState, {
      type: 'SET_SEARCH',
      payload: { tripType: 'round-trip' },
    });
    expect(result.search.tripType).toBe('round-trip');
  });

  it('handles SELECT_TRAIN', () => {
    const result = bookingReducer(initialState, {
      type: 'SELECT_TRAIN',
      payload: trains[0],
    });
    expect(result.selectedTrain?.id).toBe('T-001');
  });

  it('handles SELECT_CLASS', () => {
    const result = bookingReducer(initialState, {
      type: 'SELECT_CLASS',
      payload: 'business',
    });
    expect(result.selectedClass).toBe('business');
  });

  it('handles NEXT_STEP from 1 to 2', () => {
    const result = bookingReducer(initialState, { type: 'NEXT_STEP' });
    expect(result.step).toBe(2);
  });

  it('handles NEXT_STEP from 3 to 4', () => {
    const start: BookingState = { ...initialState, step: 3 };
    const result = bookingReducer(start, { type: 'NEXT_STEP' });
    expect(result.step).toBe(4);
  });

  it('handles PREV_STEP from 2 to 1', () => {
    const start: BookingState = { ...initialState, step: 2 };
    const result = bookingReducer(start, { type: 'PREV_STEP' });
    expect(result.step).toBe(1);
  });

  it('handles PREV_STEP at step 1 stays at 1', () => {
    const result = bookingReducer(initialState, { type: 'PREV_STEP' });
    expect(result.step).toBe(1);
  });

  it('handles COMPLETE_BOOKING with ref', () => {
    const result = bookingReducer(initialState, {
      type: 'COMPLETE_BOOKING',
      payload: 'NRC-ABC12345',
    });
    expect(result.step).toBe('complete');
    expect(result.bookingRef).toBe('NRC-ABC12345');
  });

  it('handles SET_ERROR and CLEAR_ERROR', () => {
    const withError = bookingReducer(initialState, {
      type: 'SET_ERROR',
      payload: { field: 'from', message: 'Required' },
    });
    expect(withError.errors.from).toBe('Required');

    const cleared = bookingReducer(withError, { type: 'CLEAR_ERROR', payload: 'from' });
    expect(cleared.errors.from).toBeUndefined();
  });

  it('handles RESET', () => {
    const dirty: BookingState = {
      ...initialState,
      step: 3,
      bookingRef: 'NRC-XXXX',
    };
    const result = bookingReducer(dirty, { type: 'RESET' });
    expect(result.step).toBe(1);
    expect(result.bookingRef).toBeNull();
  });
});