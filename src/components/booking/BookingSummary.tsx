/**
 * BookingSummary — read-only trip summary sidebar shown alongside the
 * booking wizard. Reflects the current booking state (route, date, train,
 * class, passengers, booking reference).
 */
import { useBooking } from '@/hooks/useBooking';
import { formatDate } from '@/lib/utils';

export function BookingSummary() {
  const { state } = useBooking();
  const { from, to, departureDate, passengers } = state.search;
  // Sum every traveller including infants for the header count
  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-nrc-md">
      <h3 className="font-heading text-lg font-semibold mb-4 text-foreground">Trip Summary</h3>
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">From</dt>
          <dd className="font-medium text-foreground">{from?.name ?? '—'}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">To</dt>
          <dd className="font-medium text-foreground">{to?.name ?? '—'}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Date</dt>
          <dd className="font-medium text-foreground">
            {departureDate ? formatDate(departureDate) : '—'}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Passengers</dt>
          <dd className="font-medium text-foreground">{totalPassengers}</dd>
        </div>
        {/* Train & class only appear once a service has been chosen in Step 2 */}
        {state.selectedTrain && (
          <div className="pt-3 mt-3 border-t border-border">
            <div className="flex justify-between">
              <dt className="text-muted">Train</dt>
              <dd className="font-medium text-foreground">{state.selectedTrain.name}</dd>
            </div>
            <div className="flex justify-between mt-2">
              <dt className="text-muted">Class</dt>
              <dd className="font-medium capitalize text-foreground">{state.selectedClass}</dd>
            </div>
          </div>
        )}
        {/* Reference is surfaced once the booking has been completed */}
        {state.bookingRef && (
          <div className="pt-3 mt-3 border-t border-border">
            <div className="flex justify-between">
              <dt className="text-muted">Ref</dt>
              <dd className="font-mono font-medium text-primary">{state.bookingRef}</dd>
            </div>
          </div>
        )}
      </dl>
    </div>
  );
}