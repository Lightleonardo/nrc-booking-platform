# NRC E-Ticketing Platform (ALt version)

A React + TypeScript replica of the Nigeria Railway Corporation (NRC) E-Ticketing platform with a complete 4-step booking flow.

## Tech Stack

- **Vite 8** + **React 18** + **TypeScript 5**
- **Tailwind CSS v4** (with `@tailwindcss/vite`) — flat design using CSS variables, no hardcoded color classes
- **React Router v6** — client-side routing
- **React Context + useReducer** — booking state management
- **Zod** — schema validation
- **react-i18next** — i18n (English, Yoruba, Hausa, Igbo)
- **next-themes** — dark mode with class-based toggling
- **lucide-react** — icons
- **Vitest** + **React Testing Library** — unit tests

## Design System

This project uses a complete design token system defined in `src/styles/variables.css`:

### Color Tokens

| Token | Light | Dark |
|-------|-------|------|
| `--background` | `#ffffff` | `#020617` |
| `--surface` | `#f8fafc` | `#0f172a` |
| `--border` | `#e2e8f0` | `#1e293b` |
| `--foreground` | `#0f172a` | `#f8fafc` |
| `--muted` | `#475569` | `#94a3b8` |
| `--primary` | `#007d53` (NRC green) | `#007d53` (kept same) |

### Key Design Decisions

- **Green hex**: `#007d53` — kept consistent in both light and dark modes
- **Tailwind v4**: Using CSS-first configuration with `@import "tailwindcss"` and `@theme inline` in `src/styles/globals.css`
- **No hardcoded color classes**: All `bg-gray-*`, `bg-slate-*`, `from-gray-*`, `to-gray-*`, `from-black`*` classes have been replaced with design tokens (`bg-background`, `bg-surface`, `text-foreground`, `text-muted`, etc.)
- **Dark mode**: Controlled via `darkMode: 'class'` in Tailwind config, with `.dark` class switching all tokens

## Features

- Multi-step booking wizard (search → train → passengers → payment)
- Zod-validated forms with inline error messages
- 4 payment methods: card, USSD, bank transfer, wallet
- Multi-language support with persistent preference (English, Yoruba, Hausa, Igbo)
- Flat light/dark theme with consistent primary color
- PWA-ready manifest + offline page
- Skip-to-content link and ARIA roles for accessibility
- Responsive design (mobile, tablet, desktop)

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm test` | Run unit tests with Vitest |
| `npm run lint` | Lint TypeScript / TSX files |

## Project Structure

```
src/
├── components/
│   ├── booking/         # Booking wizard, steps, forms
│   ├── common/          # ThemeToggle, LanguageSwitcher
│   ├── home/            # Hero, Services, Destinations, etc.
│   └── layout/          # Header, Footer, Layout
├── context/             # BookingContext + reducer
├── hooks/               # useBooking, useTheme
├── i18n/                # i18next config + locales
├── lib/                 # mockData, validations, utils, constants
├── pages/               # Index, Booking, Confirmation
├── styles/              # Tailwind globals + design tokens
└── types/               # Booking types
```

## Booking Flow

1. **Search** — choose from/to stations, date, and passengers
2. **Select Train** — compare trains, classes, and prices
3. **Passenger Details** — fill in primary + co-passenger info
4. **Payment** — pick a method and complete the booking
5. **Confirmation** — receive a generated booking reference (e.g. `NRC-AB12CD34`)

## Tests

```bash
npm test
```

Current coverage: 40 tests across 7 files (booking reducer, validations, utils, hooks).

## License

MIT