/**
 * Step1Search — Step 1 of the booking wizard.
 *
 * Lets the user choose a trip type (one-way / round-trip / multi-city),
 * pick departure and arrival stations, set travel dates and passenger
 * counts, then validates the input via `searchSchema` before dispatching
 * NEXT_STEP to advance to train selection.
 */
import { useState } from 'react';
import { useBooking } from '@/hooks/useBooking';
import { searchSchema } from '@/lib/validations';
import { StationSelect } from '@/components/booking/StationSelect';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import type { TripType, Station } from '@/types/booking';
import { cn } from '@/lib/utils';

// Trip type options shown as toggle pills at the top of the search form
const tripTypes: { value: TripType; label: string }[] = [
  { value: 'one-way', label: 'One Way' },
  { value: 'round-trip', label: 'Round Trip' },
  { value: 'multi-city', label: 'Multi City' },
];

export function Step1Search() {
  const { state, dispatch } = useBooking();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dateStr, setDateStr] = useState('');
  const [returnDateStr, setReturnDateStr] = useState('');

  // Increment/decrement a passenger count, clamped to the allowed range
  // (at least 1 adult; at most 9 adults / 8 children / 8 infants).
  const updatePassengers = (key: 'adults' | 'children' | 'infants', delta: number) => {
    const current = state.search.passengers[key];
    const min = key === 'adults' ? 1 : 0;
    const max = key === 'adults' ? 9 : 8;
    const next = Math.max(min, Math.min(max, current + delta));
    dispatch({
      type: 'SET_SEARCH',
      payload: { passengers: { ...state.search.passengers, [key]: next } },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const departureDate = dateStr ? new Date(dateStr) : null;
    const returnDate = returnDateStr ? new Date(returnDateStr) : null;

    // Validate form values with Zod; convert any field-level issues into an
    // errors map keyed by the failing field so they can be rendered inline.
    const result = searchSchema.safeParse({
      tripType: state.search.tripType,
      from: state.search.from?.code ?? '',
      to: state.search.to?.code ?? '',
      departureDate,
      returnDate: returnDate ?? undefined,
      passengers: state.search.passengers,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[String(issue.path[0] ?? '')] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Valid input: advance to train selection (Step 2).
    dispatch({ type: 'NEXT_STEP' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-nrc-md">
      <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">Search Trains</h2>

      {/* Trip type selector (One Way / Round Trip / Multi City) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tripTypes.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => dispatch({ type: 'SET_SEARCH', payload: { tripType: t.value } })}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              state.search.tripType === t.value
                ? 'bg-primary text-white'
                : 'bg-surface border border-border text-muted'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Origin & destination station pickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-muted">From</label>
          <StationSelect
            value={state.search.from}
            onChange={(s: Station) => dispatch({ type: 'SET_SEARCH', payload: { from: s } })}
            excludeCode={state.search.to?.code}
          />
          {errors.from && <p className="text-xs text-accent mt-1">{errors.from}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-muted">To</label>
          <StationSelect
            value={state.search.to}
            onChange={(s: Station) => dispatch({ type: 'SET_SEARCH', payload: { to: s } })}
            placeholder="Select arrival"
            disabled={!state.search.from}
            excludeCode={state.search.from?.code}
          />
          {errors.to && <p className="text-xs text-accent mt-1">{errors.to}</p>}
        </div>
      </div>

      {/* Travel dates — the return field is only shown for round trips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">Departure</label>
          <input
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          {errors.departureDate && <p className="text-xs text-accent mt-1">{errors.departureDate}</p>}
        </div>
        {state.search.tripType === 'round-trip' && (
          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">Return</label>
            <input
              type="date"
              value={returnDateStr}
              onChange={(e) => setReturnDateStr(e.target.value)}
              min={dateStr || new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            {errors.returnDate && <p className="text-xs text-accent mt-1">{errors.returnDate}</p>}
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">Passengers</label>
        <div className="grid grid-cols-3 gap-3">
          {/* One plus/minus stepper row per passenger type */}
          {(['adults', 'children', 'infants'] as const).map((key) => (
            <div key={key} className="flex items-center justify-between px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-md">
              <span className="text-sm capitalize">{key}</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updatePassengers(key, -1)}
                  className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-200"
                  aria-label={`Decrease ${key}`}
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-semibold w-6 text-center">{state.search.passengers[key]}</span>
                <button
                  type="button"
                  onClick={() => updatePassengers(key, 1)}
                  className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-200"
                  aria-label={`Increase ${key}`}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {errors.passengers && <p className="text-xs text-accent mt-1">{errors.passengers}</p>}
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors"
      >
        Search Trains
        <ArrowRight size={18} />
      </button>
    </form>
  );
}