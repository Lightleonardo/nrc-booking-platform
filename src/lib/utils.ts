/**
 * utils — shared helpers: Tailwind class merging, currency/date formatting,
 * booking reference generation and fare breakdown calculation.
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge conditional class names and let tailwind-merge resolve conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format a number as Naira (NGN) with no decimal places
export function formatCurrency(amount: number, currency = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | null, locale = 'en-NG'): string {
  if (!date) return '';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

// Build an NRC-xxxxx reference from an unambiguous char set (no 0/O/1/I)
export function generateBookingRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'NRC-';
  for (let i = 0; i < 8; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
}

// Fare math: base fare × travellers, then flat fee, plus VAT on the subtotal
export function calculatePrice(
  basePrice: number,
  passengerCount: number,
  serviceFee = 500,
  vatRate = 0.075
): { base: number; fee: number; vat: number; total: number } {
  const base = basePrice * passengerCount;
  const fee = serviceFee;
  const vat = Math.round((base + fee) * vatRate);
  const total = base + fee + vat;
  return { base, fee, vat, total };
}