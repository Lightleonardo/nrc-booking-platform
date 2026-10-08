/**
 * Destinations — homepage grid of featured stations.
 * Pulls the first six stations from mockData and shows them as cards
 * alongside a "view all" link.
 */
import { useTranslation } from 'react-i18next';
import { MapPin, ArrowRight } from 'lucide-react';
import { stations } from '@/lib/mockData';

export function Destinations() {
  const { t } = useTranslation();

  // Only spotlight the first six stations on the landing page
  const featuredStations = stations.slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t('destinations.badge')}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              {t('destinations.title')}
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline self-start"
          >
            {t('destinations.viewAll')}
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStations.map((station: { code: string; name: string; city: string; state: string; coords: [number, number] }) => (
            <article
              key={station.code}
              className="group bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-video bg-surface relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin size={32} className="text-muted" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted mb-2">
                  <MapPin size={14} />
                  <span>{station.state}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {station.name}
                </h3>
                <p className="text-muted text-sm mb-4">
                  {station.city}, {station.state}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:underline group-hover:gap-2 transition-all"
                >
                  {t('destinations.explore')}
                  <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}