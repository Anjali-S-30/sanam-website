// src/data/heroSlides.ts

export type HeroSlide = {
  src: string;
  alt: string;
  href: string;
  label: string;
  external?: boolean;
  mobileSrc?: string;
  objectPos?: string; // Added this property for alignment control
};

export const heroSlides: HeroSlide[] = [
  {
    src: "/HeroCarousel/hero1.png",
    mobileSrc: "/HeroCarousel/banner1-mobile.png",
    alt: "Follow SANAM on Instagram",
    href: "https://www.instagram.com/sanamband?igsh=YnNleXFmaTk5aXFl",
    external: true,
    label: "Follow us",
    objectPos: "center center",
  },
  {
    src: "/HeroCarousel/MusicBannerDesktop.png",
    mobileSrc: "/HeroCarousel/MusicBannerMobile.png",
    alt: "Explore the latest music from SANAM",
    href: "/music#latest",
    label: "Listen to us",
    objectPos: "center center",
  },
  {
    src: "/HeroCarousel/TourDesktop.png", // Note: Check if filename has typo 'landcsape' in your folder
    mobileSrc: "/HeroCarousel/TourBannerMobile.jpeg",
    alt: "See the latest tour dates",
    href: "/tour",
    label: "Tour",
    objectPos: "top center", // Keeps the band members' heads visible
  },
  {
    src: "/HeroCarousel/LatestMusicDesktop.jpg",
    mobileSrc: "/HeroCarousel/LatestMusicMobile.png",
    alt: "See the latest Release",
    href: "https://youtu.be/Gf7Lf4kiZ-A?si=CN1TTNSXzlb0lOPI",
    external: true,
    label: "Watch Latest Release",
    objectPos: "center 35%", // Prioritizes the Title Text and faces
  },
  {
    src: "/HeroCarousel/MerchBannerDesktop.png",
    mobileSrc: "/HeroCarousel/MerchBannerMobile.png",
    alt: "Shop SANAM merchandise",
    href: "/merchandise",
    label: "Shop merch",
    objectPos: "center 20%", // Fixes the cartoon heads being cut off
  },
];