/**
 * Step4Payment — final step of the booking wizard.
 *
 * Lets the user choose a payment method (card / USSD / bank transfer /
 * wallet) and shows a live price breakdown. "Pay" simulates processing,
 * then dispatches COMPLETE_BOOKING and navigates to the confirmation page.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '@/hooks/useBooking';
import { PaymentMethodCard } from '@/components/booking/PaymentMethodCard';
import { calculatePrice, generateBookingRef, formatCurrency } from '@/lib/utils';
import { NIGERIAN_BANKS, SERVICE_FEE } from '@/lib/constants';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { PaymentDetails } from '@/types/booking';

export function Step4Payment() {
  const { state, dispatch } = useBooking();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [details, setDetails] = useState<PaymentDetails>(state.payment);

  // Derive the fare breakdown: passengers × base price, plus service fee & VAT
  const totalPax = state.search.passengers.adults + state.search.passengers.children;
  const pricePerTicket = state.selectedTrain?.classes[state.selectedClass]?.price ?? 0;
  const breakdown = calculatePrice(pricePerTicket, totalPax);

  // Simulate the payment gateway, finalize the booking with a generated
  // reference and redirect to the confirmation screen.
  const handlePay = async () => {
    setProcessing(true);
    await new Promise((res) => setTimeout(res, 1500));
    const ref = generateBookingRef();
    dispatch({ type: 'SET_PAYMENT', payload: details });
    dispatch({ type: 'COMPLETE_BOOKING', payload: ref });
    navigate(`/booking/complete/${ref}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white">Payment</h2>
        <button
          onClick={() => dispatch({ type: 'PREV_STEP' })}
          className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-secondary"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-nrc-md mb-4">
        <h3 className="font-heading text-lg font-semibold mb-4 text-neutral-900 dark:text-white">Payment Method</h3>
        <PaymentMethodCard
          value={details.method}
          onChange={(m: PaymentDetails['method']) => setDetails({ ...details, method: m })}
        />

        <div className="mt-6 space-y-4">
          {/* Card payment: collect card number (last 4 saved) & cardholder name */}
          {details.method === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Card Number</label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  onChange={(e) => setDetails({ ...details, cardLast4: e.target.value.slice(-4) })}
                  className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Cardholder Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                />
              </div>
            </div>
          )}

          {/* USSD: pick a bank and show the shortcode to dial */}
          {details.method === 'ussd' && (
            <div>
              <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Select Bank</label>
              <select
                value={details.bankCode ?? ''}
                onChange={(e) => setDetails({ ...details, bankCode: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
              >
                <option value="">Choose bank...</option>
                {NIGERIAN_BANKS.map((b: { code: string; name: string }) => (
                  <option key={b.code} value={b.code}>{b.name}</option>
                ))}
              </select>
              {details.bankCode && (
                <div className="mt-3 p-4 bg-nrc-green-50 dark:bg-secondary/20 rounded-md">
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    Dial <span className="font-mono font-bold text-secondary">*737*000*{breakdown.total}#</span> on your {NIGERIAN_BANKS.find((b: { code: string; name: string }) => b.code === details.bankCode)?.name} line.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Bank transfer: show static account details for manual payment */}
          {details.method === 'bank-transfer' && (
            <div className="p-4 bg-nrc-green-50 dark:bg-secondary/20 rounded-md">
              <p className="text-sm font-medium mb-2 text-neutral-900 dark:text-white">Transfer {formatCurrency(breakdown.total)} to:</p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">Account: <span className="font-mono">0123456789</span></p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">Bank: NRC E-Ticketing Ltd</p>
            </div>
          )}

          {/* Wallet: display the (hardcoded) available balance */}
          {details.method === 'wallet' && (
            <div className="p-4 bg-nrc-green-50 dark:bg-secondary/20 rounded-md">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">Wallet balance: <span className="font-bold text-secondary">{formatCurrency(50000)}</span></p>
            </div>
          )}
        </div>
      </div>

      {/* Itemised fare summary: base fare, service fee, VAT and total */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-nrc-md mb-4">
        <h3 className="font-heading text-lg font-semibold mb-4 text-neutral-900 dark:text-white">Price Breakdown</h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-neutral-500">Base fare ({totalPax} × {formatCurrency(pricePerTicket)})</dt>
            <dd className="font-medium">{formatCurrency(breakdown.base)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Service fee</dt>
            <dd className="font-medium">{formatCurrency(SERVICE_FEE)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">VAT (7.5%)</dt>
            <dd className="font-medium">{formatCurrency(breakdown.vat)}</dd>
          </div>
          <div className="pt-2 mt-2 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
            <dt className="font-semibold text-neutral-900 dark:text-white">Total</dt>
            <dd className="text-xl font-bold text-secondary">{formatCurrency(breakdown.total)}</dd>
          </div>
        </dl>
      </div>

      <button
        onClick={handlePay}
        disabled={processing}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-50"
      >
        {processing ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Processing...
          </>
        ) : (
          <>Pay {formatCurrency(breakdown.total)}</>
        )}
      </button>
    </div>
  );
}