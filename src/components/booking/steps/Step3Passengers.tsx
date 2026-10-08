/**
 * Step3Passengers — Step 3 of the booking wizard.
 *
 * Renders one PassengerForm per traveller (adults + children). Validates all
 * forms with `passengerSchema` and stores the results in booking state before
 * advancing to payment.
 */
import { useState } from 'react';
import { useBooking } from '@/hooks/useBooking';
import { PassengerForm } from '@/components/booking/PassengerForm';
import { passengerSchema } from '@/lib/validations';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { PassengerFormData } from '@/types/booking';

// Returns a blank passenger record pre-filled with sane defaults
function createEmptyPassenger(): PassengerFormData {
  return {
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idType: 'NIN',
    idNumber: '',
    dateOfBirth: new Date('1990-01-01'),
    gender: 'Male',
  };
}

export function Step3Passengers() {
  const { state, dispatch } = useBooking();
  const totalNeeded = state.search.passengers.adults + state.search.passengers.children;
  // Create one empty form per traveller when the component first mounts
  const [passengers, setPassengers] = useState<PassengerFormData[]>(() =>
    Array.from({ length: totalNeeded }, () => createEmptyPassenger())
  );
  const [errors, setErrors] = useState<string[]>([]);

  const updatePassenger = (idx: number, data: PassengerFormData) => {
    const next = [...passengers];
    next[idx] = data;
    setPassengers(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // Validate every passenger; collect any errors with the passenger index
    const issues: string[] = [];
    passengers.forEach((p, idx) => {
      const result = passengerSchema.safeParse({
        ...p,
        dateOfBirth: p.dateOfBirth,
      });
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          issues.push(`Passenger ${idx + 1}: ${issue.message}`);
        });
      }
    });

    if (issues.length > 0) {
      setErrors(issues);
      return;
    }

    // All forms are valid: save passengers and continue to payment
    dispatch({ type: 'SET_PASSENGERS', payload: passengers });
    dispatch({ type: 'NEXT_STEP' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white">Passenger Details</h2>
        <button
          type="button"
          onClick={() => dispatch({ type: 'PREV_STEP' })}
          className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-secondary"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* Inline error summary shown when one or more forms are invalid */}
      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-accent/10 border border-accent rounded-md">
          <ul className="text-sm text-accent list-disc list-inside">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* One form card per passenger */}
      <div className="space-y-4 mb-6">
        {passengers.map((p, idx) => (
          <PassengerForm
            key={idx}
            index={idx}
            data={p}
            isPrimary={idx === 0}
            onChange={(d: PassengerFormData) => updatePassenger(idx, d)}
          />
        ))}
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors"
      >
        Continue to Payment
        <ArrowRight size={18} />
      </button>
    </form>
  );
}