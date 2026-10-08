/**
 * mockData — in-memory data used until a backend API is wired up.
 * Exports a list of railway stations, a few train services and helper
 * functions to query them by route / code.
 */
import type { Station, Train } from '@/types/booking';

// Nigerian railway stations served by the platform (with rough coords)
export const stations: Station[] = [
  { code: 'EBM', name: 'Ebute Meta', city: 'Lagos', state: 'Lagos', coords: [6.48, 3.38] },
  { code: 'RGS', name: 'Rigasa', city: 'Kaduna', state: 'Kaduna', coords: [10.52, 7.44] },
  { code: 'IDU', name: 'Idu', city: 'Abuja', state: 'FCT', coords: [9.08, 7.40] },
  { code: 'KNO', name: 'Kano', city: 'Kano', state: 'Kano', coords: [12.00, 8.52] },
  { code: 'PHG', name: 'Port Harcourt', city: 'Port Harcourt', state: 'Rivers', coords: [4.82, 7.01] },
  { code: 'IBA', name: 'Ibadan', city: 'Ibadan', state: 'Oyo', coords: [7.38, 3.90] },
  { code: 'BEN', name: 'Benin', city: 'Benin City', state: 'Edo', coords: [6.33, 5.62] },
  { code: 'ENU', name: 'Enugu', city: 'Enugu', state: 'Enugu', coords: [6.45, 7.50] },
  { code: 'ZAR', name: 'Zaria', city: 'Zaria', state: 'Kaduna', coords: [11.07, 7.70] },
  { code: 'JOS', name: 'Jos', city: 'Jos', state: 'Plateau', coords: [9.92, 8.89] },
  { code: 'MAI', name: 'Maiduguri', city: 'Maiduguri', state: 'Borno', coords: [11.83, 13.15] },
  { code: 'SOK', name: 'Sokoto', city: 'Sokoto', state: 'Sokoto', coords: [13.06, 5.24] },
  { code: 'ILR', name: 'Ilorin', city: 'Ilorin', state: 'Kwara', coords: [8.50, 4.55] },
  { code: 'ABA', name: 'Aba', city: 'Aba', state: 'Abia', coords: [5.12, 7.37] },
  { code: 'ONI', name: 'Onitsha', city: 'Onitsha', state: 'Anambra', coords: [6.17, 6.78] },
  { code: 'WAR', name: 'Warri', city: 'Warri', state: 'Delta', coords: [5.52, 5.75] },
  { code: 'AKR', name: 'Akure', city: 'Akure', state: 'Ondo', coords: [7.25, 5.20] },
  { code: 'BID', name: 'Bida', city: 'Bida', state: 'Niger', coords: [9.08, 6.01] },
  { code: 'MIN', name: 'Minna', city: 'Minna', state: 'Niger', coords: [9.61, 6.56] },
  { code: 'LUF', name: 'Lafia', city: 'Lafia', state: 'Nasarawa', coords: [8.49, 8.52] },
];

// Sample train services with per-class pricing/availability and amenities
export const trains: Train[] = [
  {
    id: 'T-001',
    name: 'NRC Express Lagos-Abuja',
    number: 'NG-101',
    departureTime: '06:30',
    arrivalTime: '10:45',
    duration: '4h 15m',
    days: [1, 2, 3, 4, 5, 6, 7],
    classes: {
      economy: { price: 5500, available: 42 },
      business: { price: 12500, available: 18 },
      first: { price: 22000, available: 6 },
    },
    amenities: ['WiFi', 'AC', 'Power Outlet', 'Meal'],
  },
  {
    id: 'T-002',
    name: 'NRC Premier Lagos-Abuja',
    number: 'NG-102',
    departureTime: '09:00',
    arrivalTime: '13:30',
    duration: '4h 30m',
    days: [1, 3, 5, 7],
    classes: {
      economy: { price: 6500, available: 38 },
      business: { price: 14000, available: 14 },
      first: { price: 25000, available: 4 },
    },
    amenities: ['WiFi', 'AC', 'Power Outlet', 'Meal', 'Entertainment'],
  },
  {
    id: 'T-003',
    name: 'NRC Express Lagos-Kaduna',
    number: 'NG-201',
    departureTime: '07:15',
    arrivalTime: '14:00',
    duration: '6h 45m',
    days: [2, 4, 6],
    classes: {
      economy: { price: 8500, available: 30 },
      business: { price: 18500, available: 12 },
      first: { price: 32000, available: 3 },
    },
    amenities: ['WiFi', 'AC', 'Power Outlet', 'Meal', 'Lounge'],
  },
  {
    id: 'T-004',
    name: 'NRC Connect Abuja-Kaduna',
    number: 'NG-301',
    departureTime: '08:00',
    arrivalTime: '11:30',
    duration: '3h 30m',
    days: [1, 2, 3, 4, 5, 6, 7],
    classes: {
      economy: { price: 3500, available: 50 },
      business: { price: 7500, available: 22 },
      first: { price: 12500, available: 8 },
    },
    amenities: ['AC', 'Power Outlet'],
  },
  {
    id: 'T-005',
    name: 'NRC Shuttle Lagos-Ibadan',
    number: 'NG-401',
    departureTime: '06:00',
    arrivalTime: '07:30',
    duration: '1h 30m',
    days: [1, 2, 3, 4, 5, 6, 7],
    classes: {
      economy: { price: 1500, available: 60 },
      business: { price: 3000, available: 20 },
      first: { price: 5000, available: 0 },
    },
    amenities: ['AC'],
  },
];

// Route lookup. Currently returns the same static list for any valid pair;
// this is the seam where real per-route filtering/API calls will live.
export function getTrainsForRoute(fromCode: string, toCode: string): Train[] {
  if (!fromCode || !toCode || fromCode === toCode) return [];
  return trains;
}

// Resolve a station object from its 3-letter station code
export function getStationByCode(code: string): Station | undefined {
  return stations.find((s) => s.code === code);
}