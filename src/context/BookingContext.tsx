/**
 * BookingContext — global state store for the booking flow.
 *
 * Exposes the booking state plus a dispatch function (as produced by
 * useReducer with bookingReducer). Components read state via useBooking()
 * and update it by dispatching BookingActions.
 */
import { createContext, useReducer, type ReactNode } from 'react';
import { bookingReducer, initialState } from './bookingReducer';
import type { BookingAction, BookingState } from '@/types/booking';

// The context itself defaults to null; useBooking() throws if a component
// accesses it outside of a BookingProvider.
export const BookingContext = createContext<{
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
} | null>(null);

// Wires the reducer + initial state into the context for the whole app
export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}