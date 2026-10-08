/**
 * validations — Zod schemas guarding each step of the booking flow.
 * Errors produced here are surfaced on the forms in Steps 1, 3 and 4.
 */
import { z } from 'zod';

// Step 1: validate trip type, stations, dates and passenger counts together
export const searchSchema = z
  .object({
    tripType: z.enum(['one-way', 'round-trip', 'multi-city']),
    from: z.string().min(1, 'Select departure station'),
    to: z.string().min(1, 'Select arrival station'),
    departureDate: z.date({ message: 'Select departure date' }),
    returnDate: z.date().optional(),
    passengers: z
      .object({
        adults: z.number().min(1, 'At least 1 adult').max(9),
        children: z.number().min(0).max(8),
        infants: z.number().min(0).max(8),
      })
      // All travellers combined may not exceed the hard cap
      .refine((d) => d.adults + d.children + d.infants <= 9, {
        message: 'Maximum 9 passengers',
      }),
  })
  // Opposite endpoints and a return date (for round trips) are mandatory
  .refine((d) => d.from !== d.to, {
    message: 'Departure and arrival must differ',
    path: ['to'],
  })
  .refine((d) => d.tripType !== 'round-trip' || !!d.returnDate, {
    message: 'Return date required for round trip',
    path: ['returnDate'],
  });

export type SearchInput = z.infer<typeof searchSchema>;

// Step 3: validations for every passenger form (names, contact, ID, DOB)
export const passengerSchema = z.object({
  title: z.enum(['Mr', 'Mrs', 'Miss', 'Master']),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  // Optional phone matching Nigerian mobile format (e.g. +2348XXXXXXXXX)
  phone: z
    .string()
    .regex(/^(\+?234|0)[789]\d{9}$/, 'Invalid Nigerian phone')
    .optional()
    .or(z.literal('')),
  idType: z.enum(['NIN', 'Passport', 'Drivers License', 'Voters Card']),
  idNumber: z.string().min(6, 'Invalid ID number'),
  dateOfBirth: z.date({ message: 'Required' }),
  gender: z.enum(['Male', 'Female']),
});

// Step 4: validations for the chosen payment method payload
export const paymentSchema = z.object({
  method: z.enum(['card', 'ussd', 'bank-transfer', 'wallet']),
  bankCode: z.string().optional(),
  cardLast4: z
    .string()
    .regex(/^\d{4}$/, 'Invalid card number')
    .optional()
    .or(z.literal('')),
  walletId: z.string().optional(),
});