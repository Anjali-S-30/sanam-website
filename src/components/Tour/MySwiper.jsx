// components/MySwiper.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./MySwiper.css";

/**
 * Inner horizontal swiper.
 * Props:
 *  - nested: boolean (true when used inside an outer swiper)
 */
export default function MySwiper({ nested = true }) {
  const params = {
    modules: [A11y, Pagination, Navigation, Autoplay],
    direction: "horizontal",
    slidesPerView: 1,
    loop: true,
    nested, // important so parent doesn't capture horizontal swipes
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: { clickable: true },
    navigation: true,
    speed: 600,
  };

  // Simple 6 text slides like your example
  return (
    <Swiper {...params} className="inner-swiper">
      <SwiperSlide className="swiper-slide-4ffe">
        <div className="swiper-slide-content swiper-slide-content-2f5e">
          <div className="swiper-slide-text swiper-slide-text-78dc">Slide 1</div>
        </div>
      </SwiperSlide>

      <SwiperSlide className="swiper-slide-4ffe">
        <div className="swiper-slide-content swiper-slide-content-2f5e">
          <div className="swiper-slide-text swiper-slide-text-78dc">Slide 2</div>
        </div>
      </SwiperSlide>

      <SwiperSlide className="swiper-slide-4ffe">
        <div className="swiper-slide-content swiper-slide-content-2f5e">
          <div className="swiper-slide-text swiper-slide-text-78dc">Slide 3</div>
        </div>
      </SwiperSlide>

      <SwiperSlide className="swiper-slide-4ffe">
        <div className="swiper-slide-content swiper-slide-content-2f5e">
          <div className="swiper-slide-text swiper-slide-text-78dc">Slide 4</div>
        </div>
      </SwiperSlide>

      <SwiperSlide className="swiper-slide-4ffe">
        <div className="swiper-slide-content swiper-slide-content-2f5e">
          <div className="swiper-slide-text swiper-slide-text-78dc">Slide 5</div>
        </div>
      </SwiperSlide>

      <SwiperSlide className="swiper-slide-4ffe">
        <div className="swiper-slide-content swiper-slide-content-2f5e">
          <div className="swiper-slide-text swiper-slide-text-78dc">Slide 6</div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
