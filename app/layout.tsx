import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Calmer - Sensory-friendly Melbourne journeys',
  description:
    'Plan Melbourne public transport journeys by sensory load, not just speed. Compare crowd, disruption and noise risk, and find quiet spaces along the way.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body className="font-sans text-ink antialiased">
        <a href="#main-content" className="skip-link focus-ring">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
