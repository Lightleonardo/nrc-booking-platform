/**
 * PassengerForm — reusable form card for a single passenger.
 *
 * Controlled component: every field change flows back up through `onChange`
 * with the complete updated `PassengerFormData`. Contact fields (email/phone)
 * are only collected for the primary passenger.
 */
import type { PassengerFormData } from '@/types/booking';

interface Props {
  index: number;
  data: PassengerFormData;
  onChange: (data: PassengerFormData) => void;
  isPrimary: boolean;
}

// Enumerated options rendered by the select dropdowns below
const titles = ['Mr', 'Mrs', 'Miss', 'Master'] as const;
const idTypes = ['NIN', 'Passport', 'Drivers License', 'Voters Card'] as const;
const genders = ['Male', 'Female'] as const;

export function PassengerForm({ index, data, onChange, isPrimary }: Props) {
  // Merge a single field change into the passenger record and notify the parent
  const update = <K extends keyof PassengerFormData>(key: K, value: PassengerFormData[K]) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-nrc-sm border border-border">
      <h3 className="font-heading text-lg font-semibold mb-4 text-foreground">
        Passenger {index + 1} {isPrimary && <span className="text-xs text-secondary ml-2">(Primary)</span>}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Title</label>
          <select
            value={data.title}
            onChange={(e) => update('title', e.target.value as PassengerFormData['title'])}
            className="w-full px-3 py-2 rounded-md border border-border bg-surface dark:bg-border text-sm"
          >
            {titles.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Gender</label>
          <select
            value={data.gender}
            onChange={(e) => update('gender', e.target.value as 'Male' | 'Female')}
            className="w-full px-3 py-2 rounded-md border border-border bg-surface dark:bg-border"
          >
            {genders.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">First Name</label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-border bg-surface dark:bg-border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Last Name</label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-border bg-surface dark:bg-border"
            required
          />
        </div>
        {/* Email & phone are only required from the primary (lead) passenger */}
        {isPrimary && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Email</label>
              <input
                type="email"
                value={data.email ?? ''}
                onChange={(e) => update('email', e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-surface dark:bg-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Phone</label>
              <input
                type="tel"
                value={data.phone ?? ''}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+234..."
                className="w-full px-3 py-2 rounded-md border border-border bg-surface dark:bg-border"
              />
            </div>
          </>
        )}
        <div>
          <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">ID Type</label>
          <select
            value={data.idType}
            onChange={(e) => update('idType', e.target.value as PassengerFormData['idType'])}
            className="w-full px-3 py-2 rounded-md border border-border bg-surface dark:bg-border"
          >
            {idTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">ID Number</label>
          <input
            type="text"
            value={data.idNumber}
            onChange={(e) => update('idNumber', e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-border bg-surface dark:bg-border"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Date of Birth</label>
          <input
            type="date"
            value={data.dateOfBirth.toISOString().split('T')[0]}
            onChange={(e) => update('dateOfBirth', new Date(e.target.value))}
            className="w-full px-3 py-2 rounded-md border border-border bg-surface dark:bg-border"
            required
          />
        </div>
      </div>
    </div>
  );
}