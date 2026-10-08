/**
 * Step2Trains — Step 2 of the booking wizard.
 *
 * Lists trains for the route chosen in Step 1. Picking a train and a seat
 * class dispatches SELECT_TRAIN / SELECT_CLASS and advances to passenger
 * details (Step 3).
 */
import { useMemo } from 'react';
import { useBooking } from '@/hooks/useBooking';
import { getTrainsForRoute } from '@/lib/mockData';
import { TrainCard } from '@/components/booking/TrainCard';
import { ArrowLeft } from 'lucide-react';
import type { SeatClass, Train } from '@/types/booking';

export function Step2Trains() {
  const { state, dispatch } = useBooking();
  // Look up trains matching the selected route; recomputed only when the
  // origin/destination stations change.
  const trains = useMemo(() => {
    if (!state.search.from || !state.search.to) return [];
    return getTrainsForRoute(state.search.from.code, state.search.to.code);
  }, [state.search.from, state.search.to]);

  // Persist the chosen train + seat class and move on to passenger details.
  const handleSelectTrain = (trainId: string, cls: SeatClass) => {
    const train = trains.find((t: Train) => t.id === trainId);
    if (train) {
      dispatch({ type: 'SELECT_TRAIN', payload: train });
      dispatch({ type: 'SELECT_CLASS', payload: cls });
      dispatch({ type: 'NEXT_STEP' });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white">Available Trains</h2>
        <button
          onClick={() => dispatch({ type: 'PREV_STEP' })}
          className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-secondary"
        >
          <ArrowLeft size={16} />
          Modify Search
        </button>
      </div>

      {/* Empty state when no services exist for the selected route */}
      {trains.length === 0 ? (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-12 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">No trains found for this route.</p>
        </div>
      ) : (
        /* Otherwise render one TrainCard per service */
        <div className="space-y-4">
          {trains.map((train: Train) => (
            <TrainCard
              key={train.id}
              train={train}
              onSelect={(cls: SeatClass) => handleSelectTrain(train.id, cls)}
            />
          ))}
        </div>
      )}
    </div>
  );
}