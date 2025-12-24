"use client";

import { useEffect, useState } from "react";
import type React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation"; // 1. Import useRouter
import { useNavbar } from "@/context/NavbarContext";

import Logo from "./icons/Logo";
import NameLogo from "./icons/NameLogo";

type NavLink = {
  href: string;
  label: string;
};
const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/tour", label: "Tour" },
  { href: "/merchandise", label: "Merchandise" },
  { href: "/contact", label: "Contact" },
  { href: "/#subscribe", label: "Subscribe" },
];

export default function Navbar() {
  const { navbarStyle } = useNavbar();
  const { background, logo, text, hamburger } = navbarStyle;

  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter(); // 2. Initialize Router

  useEffect(() => {
    if (open) setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // 3. SPECIAL FUNCTION TO HANDLE SCROLL
  const handleSubscribeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // STOP standard anchor jump
    setOpen(false); // Close mobile menu

    if (pathname === "/") {
      // If we are on Home, just tell Homepage to slide
      window.dispatchEvent(new Event("triggerSubscribeScroll"));
    } else {
      // If on another page, go to home (Home will default to top, user can click again)
      // Alternatively, you can use query params to auto-scroll on load, 
      // but for now let's just go home safely.
      router.push("/");

      // Optional: Try to trigger it after a small delay if you want auto-scroll
      setTimeout(() => {
        window.dispatchEvent(new Event("triggerSubscribeScroll"));
      }, 500);
    }
  };
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.dispatchEvent(new Event("triggerHomeScroll"));
      setOpen(false);
    } else {
      setOpen(false);
    }
  };
  // ... rest of the component
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${background}`}
      role="banner"
    >
      <nav
        className="flex w-full items-center justify-between px-4 py-3 md:px-6 lg:px-8"
        aria-label="Global"
      >
        {/* LOGO SECTION */}
        <Link
          href="/"
          onClick={handleHomeClick}
          className="flex items-center gap-3"
          aria-label="SANAM — Home"
        >          <Logo className={`h-7 w-7 ${logo}`} />
          <NameLogo
            style={{ height: "1.7rem", width: "auto" }}
            className={`object-contain ${logo}`}
          />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((item) => {

            // ----------------------------------------------------
            // FIX IS HERE: SUBSCRIBE BUTTON LOGIC
            // ----------------------------------------------------
            if (item.label === "Subscribe") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleSubscribeClick} // Attach the custom handler
                  className={`ml-2 rounded-full border px-6 py-2 text-sm font-medium uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 ${text} border-current`}
                >
                  {item.label}
                </Link>
              );
            }

            // STANDARD LINKS
            const isActive = pathname === item.href;
            const isHome = item.href === "/";

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={isHome ? handleHomeClick : undefined}
                className={`group relative px-1 text-sm uppercase tracking-widest ${text}`}
              >
                <span className="invisible font-medium" aria-hidden="true">
                  {item.label}
                </span>
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-all ${isActive ? "font-medium" : "font-light group-hover:font-medium"
                    }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="relative z-50 inline-flex items-center justify-center rounded-md p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className={`h-6 w-6 ${hamburger}`} />
          ) : (
            <Menu className={`h-6 w-6 ${hamburger}`} />
          )}
        </button>
      </nav>

      {/* FULL SCREEN MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 h-screen w-screen bg-black/90 backdrop-blur-lg md:hidden"
          >
            <div className="h-full w-full overflow-y-auto px-6 pt-24 pb-12">
              <div className="flex flex-col items-center space-y-8 text-center">
                {NAV_LINKS.map((item) => {

                  // Mobile Subscribe Button Style
                  if (item.label === "Subscribe") {
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleSubscribeClick} // Attach handler here too
                        className="mt-4 rounded-full border border-white px-8 py-3 text-xl font-medium uppercase tracking-widest text-white transition-transform active:scale-95"
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  const isActive = pathname === item.href;
                  const isHome = item.href === "/";
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={isHome ? handleHomeClick : () => setOpen(false)}
                      className={`block text-xl uppercase tracking-widest text-white transition-all 
                        ${isActive ? "font-medium" : "font-light hover:font-medium"}`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}