/**
 * bookingReducer — pure reducer for the whole booking flow.
 *
 * All transitions are triggered by BookingActions dispatched from components
 * and tests. Note the step type: 1-4 are wizard steps, 'complete' is terminal.
 */
import type { BookingAction, BookingState } from '@/types/booking';

// Default booking state: wizard at step 1, one adult, no train selected
export const initialState: BookingState = {
  step: 1,
  search: {
    tripType: 'one-way',
    from: null,
    to: null,
    departureDate: null,
    returnDate: null,
    passengers: { adults: 1, children: 0, infants: 0 },
  },
  selectedTrain: null,
  selectedClass: 'economy',
  passengers: [],
  payment: { method: 'card' },
  bookingRef: null,
  errors: {},
};

// Handle each action immutably — state is never mutated, only replaced.
export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: { ...state.search, ...action.payload } };

    case 'SELECT_TRAIN':
      return { ...state, selectedTrain: action.payload };

    case 'SELECT_CLASS':
      return { ...state, selectedClass: action.payload };

    case 'SET_PASSENGERS':
      return { ...state, passengers: action.payload };

    case 'SET_PAYMENT':
      return { ...state, payment: action.payload };

    // Advance one wizard step; step 4 rolls over to the terminal 'complete'
    case 'NEXT_STEP':
      if (state.step === 'complete') return state;
      const nextStep = state.step === 4 ? 'complete' : ((state.step + 1) as BookingState['step']);
      return { ...state, step: nextStep };

    // Go back a step, but never before step 1 or past 'complete'
    case 'PREV_STEP':
      if (state.step === 1 || state.step === 'complete') return state;
      return { ...state, step: (state.step - 1) as BookingState['step'] };

    case 'COMPLETE_BOOKING':
      return { ...state, step: 'complete', bookingRef: action.payload };

    case 'RESET':
      return initialState;

    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.payload.field]: action.payload.message },
      };

    // Remove a single field error while leaving the rest intact
    case 'CLEAR_ERROR': {
      const next = { ...state.errors };
      delete next[action.payload];
      return { ...state, errors: next };
    }

    default:
      return state;
  }
}