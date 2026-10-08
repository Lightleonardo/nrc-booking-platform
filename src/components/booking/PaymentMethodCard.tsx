/**
 * PaymentMethodCard — grid of selectable payment methods.
 *
 * A controlled component: `value` is the currently selected method and
 * `onChange` notifies the parent when the user taps another option.
 */
import type { PaymentMethod } from '@/types/booking';
import { CreditCard, Smartphone, Building2, Wallet, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Available payment options, each with a Lucide icon for the card tile
const methods = [
  { value: 'card' as const, label: 'Card Payment', icon: CreditCard },
  { value: 'ussd' as const, label: 'USSD', icon: Smartphone },
  { value: 'bank-transfer' as const, label: 'Bank Transfer', icon: Building2 },
  { value: 'wallet' as const, label: 'Wallet', icon: Wallet },
];

export function PaymentMethodCard({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (m: PaymentMethod) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {/* Render one selectable tile per payment method */}
      {methods.map((m) => {
        const Icon = m.icon;
        const selected = value === m.value;
        return (
          <button
            key={m.value}
            type="button"
            onClick={() => onChange(m.value)}
            className={cn(
              'relative p-4 rounded-xl border-2 transition-colors text-left',
              selected
                ? 'border-secondary bg-nrc-green-50 dark:bg-secondary/20'
                : 'border-neutral-200 dark:border-neutral-700 hover:border-secondary'
            )}
            aria-pressed={selected}
          >
            <Icon className={cn('mb-2', selected ? 'text-secondary' : 'text-neutral-500')} size={24} />
            <p className="text-sm font-medium text-neutral-900 dark:text-white">{m.label}</p>
            {selected && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}