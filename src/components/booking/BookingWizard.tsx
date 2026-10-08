/**
 * BookingWizard — container for the 4-step booking flow.
 *
 * Renders the step progress indicator, the active step component (based on
 * `state.step`) on the left, and a sticky trip summary sidebar on the right.
 */
import { useBooking } from '@/hooks/useBooking';
import { ProgressSteps } from './ProgressSteps';
import { Step1Search } from './steps/Step1Search';
import { Step2Trains } from './steps/Step2Trains';
import { Step3Passengers } from './steps/Step3Passengers';
import { Step4Payment } from './steps/Step4Payment';
import { BookingSummary } from './BookingSummary';

export function BookingWizard() {
  const { state } = useBooking();

  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProgressSteps currentStep={state.step} />
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Render only the step matching the current wizard position */}
        <div className="lg:col-span-2">
          {state.step === 1 && <Step1Search />}
          {state.step === 2 && <Step2Trains />}
          {state.step === 3 && <Step3Passengers />}
          {state.step === 4 && <Step4Payment />}
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <BookingSummary />
        </aside>
      </div>
    </div>
  );
}