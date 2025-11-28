"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useNavbar } from "@/context/NavbarContext";

import Logo from "./icons/Logo";
import NameLogo from "./icons/NameLogo";

const NAV_LINKS = [
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

  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [pathname]);
  
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${background}`}
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6"
        aria-label="Global"
      >
        <Link href="/" className="flex items-center gap-3" aria-label="SANAM — Home">
          {/* --- SIZE INCREASED HERE (from h-9 w-9) --- */}
          <Logo className={`h-7 w-7 ${logo}`} />
          {/* --- SIZE INCREASED HERE (from 1.5rem) --- */}
          <NameLogo
            style={{ height: '1.7rem', width: 'auto' }}
            className={`object-contain ${logo}`}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((item) => {
             const isActive = pathname === item.href;
             return (
               <Link key={item.href} href={item.href} className={`relative px-1 text-sm font-medium transition-colors hover:opacity-75 ${isActive ? 'font-bold' : ''} ${text}`}>
                 {item.label}
               </Link>
             );
          })}
        </div>

        {/* Mobile menu button */}
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

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 h-screen w-screen bg-black/50 backdrop-blur-lg md:hidden"
          >
            <div className="h-full w-full overflow-y-auto px-6 pt-24 pb-12">
              <div className="space-y-8">
                {NAV_LINKS.map((item) => (
                  <Link key={item.href} href={item.href} className="block text-3xl font-bold text-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}