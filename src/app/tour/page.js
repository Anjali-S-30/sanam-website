"use client";

import React, { useEffect } from 'react';
import TourBanner from '@/components/Tour/TourBanner';
// 1. Import the hook
import { useNavbar } from '@/context/NavbarContext';

export default function TourPage() {
  // 2. Get the setter from your context
  const { setNavbarStyle } = useNavbar();

  // 3. Use useEffect to change the Navbar style ONLY for this page
  useEffect(() => {
    // A. Set to "Dark Mode" style (White text, Transparent background)
    setNavbarStyle({
      background: 'bg-transparent', // Lets the banner show through
      logo: 'text-white',           // Makes logo white
      text: 'text-white',           // Makes links white
      hamburger: 'text-white',      // Makes mobile menu icon white
    });

    // B. Cleanup function: Reset to default when leaving this page
    return () => {
      setNavbarStyle({
        background: 'bg-white',
        logo: '',
        text: 'text-neutral-700',
        hamburger: 'text-black',
      });
    };
  }, [setNavbarStyle]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar is in layout.tsx, so we don't include it here */}

      <TourBanner />

      <section className="py-20 px-4 text-center text-gray-400">
        <h2 className="text-2xl font-bold mb-4">Upcoming Shows</h2>
        <p>Tour Dates List Component Coming Soon...</p>
      </section>
    </main>
  );
}