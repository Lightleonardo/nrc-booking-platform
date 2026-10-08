 /**
 * Hero — marketing hero section for the landing page.
 * Showcases the headline, CTA links to booking and a grid of key stats
 * (number of trains, safety, punctuality, stations).
 */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Train, Shield, Clock, MapPin } from 'lucide-react';

export function Hero() {
  const { t } = useTranslation();

  // Brand stats displayed as cards under the headline
  const stats = [
    { icon: Train, label: t('hero.stats.trains'), value: '50+' },
    { icon: Shield, label: t('hero.stats.safe'), value: '99.9%' },
    { icon: Clock, label: t('hero.stats.ontime'), value: '95%' },
    { icon: MapPin, label: t('hero.stats.stations'), value: '120+' },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {t('hero.badge')}
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-muted mb-8 max-w-xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-secondary text-white font-medium text-base hover:bg-secondary/90 transition-colors"
              >
                {t('hero.cta.primary')}
                <ArrowRight size={18} />
              </Link>
              <a
                href="#"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-border text-muted font-medium text-base hover:border-primary hover:text-primary hover:bg-surface transition-colors"
              >
                {t('hero.cta.secondary')}
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-surface border border-border rounded-xl p-6 shadow-sm text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon size={24} className="text-primary" />
                  </div>
                  <div className="font-heading text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="aspect-video bg-surface rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="text-center p-8">
                <Train size={64} className="mx-auto mb-4 text-muted" />
                <p className="text-muted text-lg font-medium">
                  {t('hero.imageAlt')}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}