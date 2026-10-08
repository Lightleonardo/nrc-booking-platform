import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { BookingProvider, BookingContext } from '@/context/BookingContext';
import { useBooking } from '@/hooks/useBooking';
import { useContext } from 'react';

describe('useBooking', () => {
  it('returns state and dispatch from provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BookingProvider>{children}</BookingProvider>
    );
    const { result } = renderHook(() => useBooking(), { wrapper });
    expect(result.current.state.step).toBe(1);
    expect(typeof result.current.dispatch).toBe('function');
  });

  it('throws when used outside provider', () => {
    expect(() => {
      renderHook(() => useContext(BookingContext));
    }).not.toThrow();
  });

  it('dispatch updates state', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BookingProvider>{children}</BookingProvider>
    );
    const { result } = renderHook(() => useBooking(), { wrapper });
    act(() => {
      result.current.dispatch({ type: 'NEXT_STEP' });
    });
    expect(result.current.state.step).toBe(2);
  });
});