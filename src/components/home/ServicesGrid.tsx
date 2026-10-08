/**
 * ServicesGrid — homepage section listing the railway's key services.
 * Each card pairs a Lucide icon with translated title & description.
 */
import { useTranslation } from 'react-i18next';
import { Ticket, CreditCard, MapPin, Smartphone, Shield, Headphones } from 'lucide-react';

export function ServicesGrid() {
  const { t } = useTranslation();

  // The six services advertised, each with an icon + translated copy
  const services = [
    {
      icon: Ticket,
      title: t('services.onlineBooking.title'),
      description: t('services.onlineBooking.description'),
    },
    {
      icon: CreditCard,
      title: t('services.securePayment.title'),
      description: t('services.securePayment.description'),
    },
    {
      icon: MapPin,
      title: t('services.liveTracking.title'),
      description: t('services.liveTracking.description'),
    },
    {
      icon: Smartphone,
      title: t('services.mobileApp.title'),
      description: t('services.mobileApp.description'),
    },
    {
      icon: Shield,
      title: t('services.safety.title'),
      description: t('services.safety.description'),
    },
    {
      icon: Headphones,
      title: t('services.support.title'),
      description: t('services.support.description'),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('services.badge')}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="group bg-surface border border-border rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <service.icon size={28} className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}