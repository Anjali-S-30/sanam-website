"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of our style object
type NavbarStyle = {
  background: string;
  logo: string;
  text: string;
  hamburger: string;
};

// Define the context shape
type NavbarContextType = {
  navbarStyle: NavbarStyle;
  setNavbarStyle: (style: NavbarStyle) => void;
};

// Create the context with a default value
const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

// Create a Provider component that will wrap our app
export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [navbarStyle, setNavbarStyle] = useState<NavbarStyle>({
    background: 'bg-white',
    logo: '',
    text: 'text-neutral-700',
    hamburger: 'text-black',
  });

  return (
    <NavbarContext.Provider value={{ navbarStyle, setNavbarStyle }}>
      {children}
    </NavbarContext.Provider>
  );
};

// Create a custom hook to easily use the context
export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
};