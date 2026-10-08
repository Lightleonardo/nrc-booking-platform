/**
 * StationSelect — searchable station dropdown.
 *
 * Opens a popover with a search box that filters stations by name or city.
 * Supports excluding one code (e.g. the opposite endpoint of a route) and
 * closes on outside click.
 */
import { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { stations } from '@/lib/mockData';
import type { Station } from '@/types/booking';
import { cn } from '@/lib/utils';

interface Props {
  value: Station | null;
  onChange: (station: Station) => void;
  placeholder?: string;
  disabled?: boolean;
  excludeCode?: string;
}

export function StationSelect({ value, onChange, placeholder = 'Select station', disabled, excludeCode }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  // Close the popover whenever the user clicks outside of the component
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Hide the excluded station and filter remaining ones by the search query
  const filtered = stations.filter(
    (station: Station) =>
      station.code !== excludeCode &&
      (station.name.toLowerCase().includes(query.toLowerCase()) ||
        station.city.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          'w-full flex items-center gap-2 px-4 py-3 rounded-md border border-border bg-surface dark:bg-border text-left transition-colors',
          'border-border',
          'hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <MapPin size={18} className="text-secondary flex-shrink-0" />
        <span className={cn('text-sm', value ? 'text-neutral-900 dark:text-white' : 'text-neutral-500')}>
          {value ? `${value.name}, ${value.city}` : placeholder}
        </span>
      </button>

      {open && (
        <div className="absolute z-10 w-full mt-2 bg-surface dark:bg-border border border-border rounded-md shadow-nrc-xl max-h-80 overflow-hidden flex flex-col">
          {/* Search box to filter the station list */}
          <div className="p-3 border-b border-border">
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-surface dark:bg-border">
              <Search size={16} className="text-neutral-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search station..."
                className="flex-1 bg-transparent text-sm focus:outline-none"
                autoFocus
              />
            </div>
          </div>
          <ul role="listbox" className="overflow-y-auto flex-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-neutral-500">No stations found</li>
            )}
            {filtered.map((station: Station) => (
              <li
                key={station.code}
                role="option"
                aria-selected={value?.code === station.code}
                onClick={() => {
                  // Selecting a station commits it and resets the dropdown
                  onChange(station);
                  setOpen(false);
                  setQuery('');
                }}
                className="px-4 py-3 hover:bg-surface dark:hover:bg-border cursor-pointer text-sm"
              >
                <div className="font-medium text-foreground">{station.name}</div>
                <div className="text-xs text-muted">{station.city}, {station.state}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}