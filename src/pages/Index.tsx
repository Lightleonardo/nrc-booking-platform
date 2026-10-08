/**
 * Index — landing page for the app.
 * Composes the homepage sections in order: hero, services, destinations,
 * how-it-works steps, testimonials and newsletter signup.
 */
import { Hero } from '@/components/home/Hero';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { Destinations } from '@/components/home/Destinations';
import { StepsProcess } from '@/components/home/StepsProcess';
import { Testimonials } from '@/components/home/Testimonials';
import { Newsletter } from '@/components/home/Newsletter';

export default function Index() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServicesGrid />
      <Destinations />
      <StepsProcess />
      <Testimonials />
      <Newsletter />
    </div>
  );
}