import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { BookingProvider } from '@/context/BookingContext';
import { Layout } from '@/components/layout/Layout';
import Index from '@/pages/Index';
import Booking from '@/pages/Booking';
import Confirmation from '@/pages/Confirmation';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <BookingProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking/complete/:ref" element={<Confirmation />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </ThemeProvider>
  );
}