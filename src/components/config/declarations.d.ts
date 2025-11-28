// src/declarations.d.ts

// 1. Allows importing custom .js files like 'effect-shutters.js'
declare module '*.js';

// 2. Teaches TypeScript about the custom `data-swiper-parallax` attribute in your JSX
declare namespace React {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    'data-swiper-parallax'?: string;
  }
}

// 3. Teaches TypeScript about the new custom `shuttersEffect` parameter
import 'swiper/types';

declare module 'swiper/types' {
  interface SwiperOptions {
    shuttersEffect?: {
      split?: number;
    };
  }
}