/**
 * useTheme — small wrapper around next-themes.
 *
 * Tracks mounted state so the client theme doesn't visually flash on first
 * render; returns safe 'light' defaults before mount.
 */
import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  // Mark as mounted on the client once the effect runs
  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    theme: mounted ? theme : 'light',
    resolvedTheme: mounted ? resolvedTheme : 'light',
    setTheme,
    mounted,
  };
}