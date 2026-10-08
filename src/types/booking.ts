export type TripType = 'one-way' | 'round-trip' | 'multi-city';
export type SeatClass = 'economy' | 'business' | 'first';
export type PaymentMethod = 'card' | 'ussd' | 'bank-transfer' | 'wallet';

export interface Station {
  code: string;
  name: string;
  city: string;
  state: string;
  coords: [number, number];
}

export interface SearchParams {
  tripType: TripType;
  from: Station | null;
  to: Station | null;
  departureDate: Date | null;
  returnDate: Date | null;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
}

export interface TrainClass {
  price: number;
  available: number;
}

export interface Train {
  id: string;
  name: string;
  number: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  days: number[];
  classes: {
    economy: TrainClass;
    business: TrainClass;
    first: TrainClass;
  };
  amenities: string[];
}

export interface PassengerFormData {
  title: 'Mr' | 'Mrs' | 'Miss' | 'Master';
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  idType: 'NIN' | 'Passport' | 'Drivers License' | 'Voters Card';
  idNumber: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female';
}

export interface PaymentDetails {
  method: PaymentMethod;
  bankCode?: string;
  cardLast4?: string;
  walletId?: string;
}

export type BookingStep = 1 | 2 | 3 | 4 | 'complete';

export interface BookingState {
  step: BookingStep;
  search: SearchParams;
  selectedTrain: Train | null;
  selectedClass: SeatClass;
  passengers: PassengerFormData[];
  payment: PaymentDetails;
  bookingRef: string | null;
  errors: Record<string, string>;
}

export type BookingAction =
  | { type: 'SET_SEARCH'; payload: Partial<SearchParams> }
  | { type: 'SELECT_TRAIN'; payload: Train }
  | { type: 'SELECT_CLASS'; payload: SeatClass }
  | { type: 'SET_PASSENGERS'; payload: PassengerFormData[] }
  | { type: 'SET_PAYMENT'; payload: PaymentDetails }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'COMPLETE_BOOKING'; payload: string }
  | { type: 'RESET' }
  | { type: 'SET_ERROR'; payload: { field: string; message: string } }
  | { type: 'CLEAR_ERROR'; payload: string };