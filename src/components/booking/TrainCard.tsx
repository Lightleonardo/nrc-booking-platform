/**
 * TrainCard — single search result for a train service.
 *
 * Shows departure/arrival times, duration, amenities and per-class pricing.
 * Each class is a button; it is disabled when the class is sold out.
 */
import { Clock, Wifi, Coffee, Plug, Tv } from 'lucide-react';
import type { Train, SeatClass } from '@/types/booking';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

// Maps amenity names to an appropriate Lucide icon (Coffee used as AC fallback)
const amenityIcons: Record<string, typeof Wifi> = {
  WiFi: Wifi,
  AC: Coffee,
  'Power Outlet': Plug,
  Meal: Coffee,
  Entertainment: Tv,
  Lounge: Coffee,
};

// Seat classes offered on every service, in display order
const classes: SeatClass[] = ['economy', 'business', 'first'];

export function TrainCard({ train, onSelect }: { train: Train; onSelect: (cls: SeatClass) => void }) {
  return (
    <article className="bg-surface border border-border rounded-2xl p-6 shadow-nrc-md hover:shadow-nrc-lg transition-shadow border border-border">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-heading text-lg font-semibold text-neutral-900 dark:text-white">{train.name}</h3>
            <span className="text-xs text-neutral-500 font-mono">{train.number}</span>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">{train.departureTime}</p>
              <p className="text-xs text-neutral-500">Departure</p>
            </div>
            <div className="flex flex-col items-center flex-1">
              <Clock size={16} className="text-neutral-400 mb-1" />
              <div className="w-full h-0.5 bg-neutral-200 dark:bg-neutral-700" />
              <p className="text-xs text-neutral-500 mt-1">{train.duration}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">{train.arrivalTime}</p>
              <p className="text-xs text-neutral-500">Arrival</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {train.amenities.map((a: string) => {
              const Icon = amenityIcons[a] ?? Coffee;
              return (
                <span key={a} className="inline-flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400">
                  <Icon size={14} />
                  {a}
                </span>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 lg:flex lg:flex-col lg:w-48">
          {/* One selectable price block per seat class */}
          {classes.map((cls) => {
            const c = train.classes[cls];
            // A class with zero seats left cannot be selected
            const disabled = c.available === 0;
            return (
              <button
                key={cls}
                onClick={() => onSelect(cls)}
                disabled={disabled}
                className={cn(
                  'px-3 py-2 rounded-md border text-left transition-colors',
                  disabled
                    ? 'opacity-50 cursor-not-allowed border-neutral-200 dark:border-neutral-700'
                    : 'border-neutral-300 dark:border-neutral-600 hover:border-secondary hover:bg-nrc-green-50 dark:hover:bg-secondary/20'
                )}
              >
                <p className="text-xs capitalize text-neutral-500">{cls}</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">
                  {formatCurrency(c.price)}
                </p>
                <p className="text-xs text-neutral-500">
                  {disabled ? 'Sold out' : `${c.available} left`}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
}