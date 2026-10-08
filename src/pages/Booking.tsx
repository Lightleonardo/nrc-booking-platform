/**
 * Booking — route component for /booking.
 * Renders the multi-step booking wizard (search → trains → passengers → pay).
 */
import { BookingWizard } from '@/components/booking/BookingWizard';

export default function Booking() {
  return <BookingWizard />;
}