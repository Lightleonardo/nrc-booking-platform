/**
 * Header — sticky site header with the brand mark, primary navigation,
 * language switcher, theme toggle and auth links.
 */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold font-heading">
            N
          </div>
          <span className="font-heading text-xl font-semibold text-neutral-900 dark:text-white">
            NRC
          </span>
        </Link>

        {/* Primary navigation (desktop only) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted hover:text-foreground">
            {t('header.home')}
          </Link>
          <a href="#" className="text-sm font-medium text-muted hover:text-foreground">
            {t('header.timetable')}
          </a>
          <a href="#" className="text-sm font-medium text-muted hover:text-foreground">
            {t('header.faqs')}
          </a>
        </nav>

        {/* Utility controls: language, theme and auth links */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <a href="#" className="hidden sm:inline-block text-sm font-medium text-muted hover:text-foreground">
            {t('header.login')}
          </a>
          <a
            href="#"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {t('header.signup')}
          </a>
        </div>
      </div>
    </header>
  );
}