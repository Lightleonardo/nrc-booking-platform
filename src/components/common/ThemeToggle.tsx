/**
 * ThemeToggle — button that flips the site between light and dark mode.
 * Renders a placeholder until mounted to avoid a hydration/SSR flash.
 */
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();
  // Before mount we don't yet know the real theme — render an inert spacer
  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-surface dark:bg-border hover:bg-border/50 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}