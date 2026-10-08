/**
 * StepsProcess — homepage explainer of the 4-step booking journey
 * (search → select → passengers → payment).
 */
import { useTranslation } from 'react-i18next';
import { Search, Train, UserCheck, CreditCard } from 'lucide-react';

export function StepsProcess() {
  const { t } = useTranslation();

  // The four booking milestones in order, with their icons and copy
  const steps = [
    {
      number: '01',
      icon: Search,
      title: t('steps.search.title'),
      description: t('steps.search.description'),
    },
    {
      number: '02',
      icon: Train,
      title: t('steps.select.title'),
      description: t('steps.select.description'),
    },
    {
      number: '03',
      icon: UserCheck,
      title: t('steps.passengers.title'),
      description: t('steps.passengers.description'),
    },
    {
      number: '04',
      icon: CreditCard,
      title: t('steps.payment.title'),
      description: t('steps.payment.description'),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('steps.badge')}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('steps.title')}
          </h2>
          <p className="text-lg text-muted">
            {t('steps.subtitle')}
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-[calc(100%-2.5rem)] bg-surface dark:bg-border" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center text-center lg:text-left"
              >
                <div className="relative z-10 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto lg:mx-0">
                  <span className="font-heading text-2xl font-bold text-primary">
                    {step.number}
                  </span>
                </div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 mx-auto lg:mx-0">
                  <step.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}