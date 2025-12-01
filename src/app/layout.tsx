import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // 1. Import Montserrat
import "./globals.css";
import Navbar from "@/components/Navbar";
import { NavbarProvider } from "@/context/NavbarContext";

// 2. Configure Montserrat with a CSS variable
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat", // This matches the variable in your globals.css
});

export const metadata: Metadata = {
  title: "SANAM",
  description: "Official website of the band SANAM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Apply the variable to the body */}
      <body className={`${montserrat.variable} antialiased`}>
        <NavbarProvider>
          <Navbar />
          {children}
        </NavbarProvider>
      </body>
    </html>
  );
}