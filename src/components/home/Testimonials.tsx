/**
 * Testimonials — homepage customer reviews section.
 * Displays three translated reviews with star ratings.
 */
import { useTranslation } from 'react-i18next';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const { t } = useTranslation();

  // Three hardcoded reviews with 5-star ratings (content comes from i18n)
  const testimonials = [
    {
      quote: t('testimonials.items[0].quote'),
      author: t('testimonials.items[0].author'),
      role: t('testimonials.items[0].role'),
      rating: 5,
    },
    {
      quote: t('testimonials.items[1].quote'),
      author: t('testimonials.items[1].author'),
      role: t('testimonials.items[1].role'),
      rating: 5,
    },
    {
      quote: t('testimonials.items[2].quote'),
      author: t('testimonials.items[2].author'),
      role: t('testimonials.items[2].role'),
      rating: 5,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('testimonials.badge')}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-muted">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-surface border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <Quote size={32} className="text-primary/30 mb-4" />
              <p className="text-foreground leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="border-t border-border pt-4">
                <div className="font-medium text-foreground">
                  {testimonial.author}
                </div>
                <div className="text-sm text-muted">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}