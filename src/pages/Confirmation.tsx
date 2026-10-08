import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Download, Home, Copy } from 'lucide-react';
import { useBooking } from '@/hooks/useBooking';
import { formatDate } from '@/lib/utils';

export default function Confirmation() {
  const { ref } = useParams();
  const { state, dispatch } = useBooking();
  const totalPax = state.search.passengers.adults + state.search.passengers.children;

  const handleCopy = () => {
    navigator.clipboard.writeText(ref ?? '');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-nrc-xl p-8 text-center">
        <CheckCircle2 size={64} className="text-secondary mx-auto mb-4" />
        <h1 className="font-heading text-3xl font-bold mb-2 text-neutral-900 dark:text-white">Booking Confirmed!</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
          Your ticket has been booked successfully.
        </p>

        <div className="bg-nrc-green-50 dark:bg-secondary/20 rounded-xl p-4 mb-8">
          <p className="text-xs text-neutral-500 mb-1">Booking Reference</p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-2xl font-mono font-bold text-secondary">{ref}</p>
            <button
              onClick={handleCopy}
              className="p-2 rounded-md hover:bg-secondary/20"
              aria-label="Copy reference"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        {state.search.from && state.search.to && (
          <div className="text-left space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Route</span>
              <span className="font-medium text-neutral-900 dark:text-white">
                {state.search.from.name} → {state.search.to.name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Date</span>
              <span className="font-medium text-neutral-900 dark:text-white">
                {state.search.departureDate ? formatDate(state.search.departureDate) : '—'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Train</span>
              <span className="font-medium text-neutral-900 dark:text-white">
                {state.selectedTrain?.name ?? '—'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Passengers</span>
              <span className="font-medium text-neutral-900 dark:text-white">{totalPax}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-secondary text-secondary hover:bg-nrc-green-50">
            <Download size={16} />
            Download Ticket
          </button>
          <Link
            to="/"
            onClick={() => dispatch({ type: 'RESET' })}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-secondary text-white hover:bg-secondary/90"
          >
            <Home size={16} />
            Book Another
          </Link>
        </div>
      </div>
    </div>
  );
}