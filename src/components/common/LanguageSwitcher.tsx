/**
 * LanguageSwitcher — dropdown for switching the app UI language.
 * Options mirror the locale JSON files registered in src/i18n.
 */
import { useTranslation } from 'react-i18next';

// Locales exposed in the UI (keyed by the i18n language code)
const languages = [
  { code: 'en', name: 'English' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'ha', name: 'Hausa' },
  { code: 'ig', name: 'Igbo' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="px-3 py-2 rounded-md border border-border bg-surface dark:bg-border text-sm"
      aria-label="Select language"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}