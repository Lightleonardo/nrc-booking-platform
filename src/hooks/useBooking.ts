/**
 * useBooking — convenience hook for consuming the booking context.
 *
 * Throws a descriptive error when used outside <BookingProvider>, which
 * makes misuse fail fast instead of silently accessing a null context.
 */
import { useContext } from 'react';
import { BookingContext } from '@/context/BookingContext';

export function useBooking() {
  const ctx = useContext(BookingContext);
  // Guard against access outside the provider tree
  if (!ctx) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return ctx;
}