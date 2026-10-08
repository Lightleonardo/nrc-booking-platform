/**
 * ProgressSteps — breadcrumb-style step indicator for the booking wizard.
 *
 * Visualises the current position (1..4) with numbered circles connected by
 * a line; completed steps are filled, the active step is ringed.
 */
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

// Ordered keys used to look up translated step labels
const stepKeys = ['search', 'train', 'passengers', 'payment'] as const;

export function ProgressSteps({ currentStep }: { currentStep: 1 | 2 | 3 | 4 | 'complete' }) {
  const { t } = useTranslation();
  // Treat the 'complete' state as the final step for display purposes
  const numeric = typeof currentStep === 'number' ? currentStep : 4;

  return (
    <div className="w-full">
      <ol className="flex items-center justify-between max-w-3xl mx-auto">
        {stepKeys.map((key, idx) => {
          const stepNum = idx + 1;
          // Steps before the current one are marked complete; the current step is active
          const isActive = stepNum === numeric;
          const isComplete = stepNum < numeric;

          return (
            <li key={key} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors',
                    isComplete && 'bg-primary text-white',
                    isActive && 'bg-primary text-white ring-4 ring-primary/20',
                    !isActive && !isComplete && 'bg-surface dark:bg-border text-muted-foreground'
                  )}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {stepNum}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs sm:text-sm font-medium whitespace-nowrap',
                    isActive ? 'text-secondary' : 'text-neutral-500'
                  )}
                >
                  {t(`booking.steps.${key}`)}
                </span>
              </div>
              {idx < stepKeys.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2 transition-colors',
                    isComplete ? 'bg-primary' : 'bg-surface dark:bg-border'
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}