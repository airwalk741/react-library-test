import React from "react";

import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // 필요한 스타일 추가
import "./Slider.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { cardList } from "./App copy";

const MySwiper = () => {
  return (
    <Swiper
      className='sample-slider'
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={3} // 화면에 보여질 슬라이드 수
      loop={true} // 무한 루프 활성화
      navigation={false}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 0,
        pauseOnMouseEnter: true, // added
        disableOnInteraction: false,
      }}
      speed={5000} //add
    >
      {cardList.map((item, index) => (
        <SwiperSlide key={index}>
          <img src={item.src} alt='' />
        </SwiperSlide>
      ))}
      {/* 추가 슬라이드를 여기에 추가할 수 있습니다. */}
    </Swiper>
  );
};

export default MySwiper;
