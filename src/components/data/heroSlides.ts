export type HeroSlide = {
  src: string;
  alt: string;
  href: string;
  label: string;
  external?: boolean;
  mobileSrc?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    src: "/HeroCarousel/hero1.png",
    alt: "Follow SANAM on Instagram",
    href: "https://www.instagram.com/sanamband?igsh=YnNleXFmaTk5aXFl",
    external: true,
    label: "Follow us",
  },
  {
    src: "/HeroCarousel/MusicBannerDesktop.png",
    mobileSrc: "/HeroCarousel/MusicBannerMobile.png",
    alt: "Explore the latest music from SANAM",
    href: "/music#latest",
    label: "Listen to us",
  },
  {
    src: "/HeroCarousel/TourBannerDesktop.png",
    mobileSrc: "/HeroCarousel/TourBannerMobile.jpeg",
    alt: "See the latest tour dates",
    href: "/tour",
    label: "Tour",
  },
  {
    src: "/HeroCarousel/LatestMusicDesktop.jpg",
    mobileSrc: "/HeroCarousel/LatestMusicMobile.png",
    alt: "See the latest Release",
    href: "https://youtu.be/Gf7Lf4kiZ-A?si=CN1TTNSXzlb0lOPI",
    external: true,
    label: "Watch Latest Release",
  },
  {
    src: "/HeroCarousel/MerchBannerDesktop.png",
    mobileSrc: "/HeroCarousel/MerchBannerMobile.png",
    alt: "Shop SANAM merchandise",
    href: "/merchandise",
    label: "Shop merch",
  },
];
