/**
 * Footer — global site footer with brand info, social links, navigation
 * columns (company / support), app-store badges and copyright line.
 */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MessageSquare, Send } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold font-heading">
                N
              </div>
              <span className="font-heading text-xl font-semibold text-neutral-900 dark:text-white">
                NRC
              </span>
            </div>
            <p className="text-muted text-sm mb-4">
              {t('footer.tagline')}
            </p>
            {/* Contact links */}
            <div className="flex gap-4">
              <a href="mailto:support@nrc.ng" className="w-9 h-9 rounded-full bg-border flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-colors" aria-label="Email">
                <Mail size={16} />
              </a>
              <a href="tel:+2348000000000" className="w-9 h-9 rounded-full bg-border flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-colors" aria-label="Phone">
                <Phone size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-border flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-colors" aria-label="Live chat">
                <MessageSquare size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-border flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-colors" aria-label="Send">
                <Send size={16} />
              </a>
            </div>
          </div>

          {/* Company links column */}
          <nav>
            <h3 className="font-heading font-semibold text-foreground mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-muted hover:text-foreground transition-colors">{t('footer.about')}</Link></li>
              <li><Link to="#" className="text-sm text-muted hover:text-foreground transition-colors">{t('footer.careers')}</Link></li>
              <li><Link to="#" className="text-sm text-muted hover:text-foreground transition-colors">{t('footer.press')}</Link></li>
              <li><Link to="#" className="text-sm text-muted hover:text-foreground transition-colors">{t('footer.blog')}</Link></li>
            </ul>
          </nav>

          {/* Support links column */}
          <nav>
            <h3 className="font-heading font-semibold text-foreground mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-muted hover:text-foreground transition-colors">{t('footer.contact')}</Link></li>
              <li><Link to="#" className="text-sm text-muted hover:text-foreground transition-colors">{t('footer.faqs')}</Link></li>
              <li><Link to="#" className="text-sm text-muted hover:text-foreground transition-colors">{t('footer.terms')}</Link></li>
              <li><Link to="#" className="text-sm text-muted hover:text-foreground transition-colors">{t('footer.privacy')}</Link></li>
            </ul>
          </nav>

          {/* Mobile app download badges */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">{t('footer.download')}</h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md border border-border hover:border-primary hover:bg-surface transition-colors">
                <span className="text-sm font-medium text-foreground">App Store</span>
              </a>
              <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md border border-border hover:border-primary hover:bg-surface transition-colors">
                <span className="text-sm font-medium text-foreground">Google Play</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted">Nigeria Railway Corporation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}