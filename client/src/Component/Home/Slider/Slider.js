import React from "react";
import "./Slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
SwiperCore.use([Pagination, Navigation]);

const Slider = () => {
  return (
    <div className="slider_container">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        slidesPerGroup={4}
        loop={true}
        loopFillGroupWithBlank={true}
        className="mySwiper"
      >
        <SwiperSlide className="swiperSlide">
          <img src="/images/slider11.png" alt="Slider " />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img src="/images/slider10.jfif" alt="Slider " />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img src="/images/slider4.jfif" alt="Slider " />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img src="/images/slider12.jfif" alt="Slider " />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img src="/images/slider9.jfif" alt="Slider " />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img src="/images/slider3.jfif" alt="Slider " />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img src="/images/slider7.png" alt="Slider Image" />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img src="/images/slider8.jfif" alt="Slider Image" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
