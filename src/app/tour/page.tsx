"use client";

import React, { useEffect } from "react";
import VerticalSwiper from "@/components/Tour/VerticalSwiper";
// Assuming you have this context, otherwise you can remove the hook
import { useNavbar } from "@/context/NavbarContext";

export default function TourPage() {
  const { setNavbarStyle } = useNavbar();

  // Force Navbar to be transparent on this page
  useEffect(() => {
    setNavbarStyle({
      background: "bg-transparent",
      logo: "text-white",
      text: "text-white",
      hamburger: "text-white",
    });

    return () => {
      setNavbarStyle({
        background: "bg-transparent",
        logo: "text-white",
        text: "text-white",
        hamburger: "text-white",
      });
    };
  }, [setNavbarStyle]);

  return (
    // Fixed height screen to contain the Vertical Swiper
    <main className="h-screen w-full overflow-hidden bg-black text-white">
      <VerticalSwiper />
    </main>
  );
}
