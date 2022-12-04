import Products from "../components/Products";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const SliderContent1 = () => {
  return (
    <div className="container  pl-[62px] text-align:center flex items-center">
      <div className="w-1/2 ">
        <h6 className="text-lg">
          <em>Are you hungry?</em>
        </h6>
        <h1 className="text-3xl md:text-6xl font-bold">Don't wait!</h1>
        <button className="px-6 py-2 rounded-full text-white font-bold mt-4 bg-yellow-500 hover:bg-yellow-600">
          Order Now
        </button>
      </div>
      <div className="w-1/2">
        <img className="w-3/5 mx-auto" src="/images/Large_pizza.jpg"/>
      </div>
    </div>
  );
};
const SliderContent2 = () => {
  return (
    <div className="container mx-auto text-center flex items-center">
      <div className="w-1/2 z-20 ">
        <img className="w-3/5 mx-auto" src="/images/Large_pizza.jpg"/>
      </div>
      <div className="w-1/2 text-end pr-[62px]">
        <h6 className="text-lg pr-[180px] ">
          <em>Are you hungry?</em>
        </h6>
        <h1 className="text-1xl sm:pr-[175px] md:pr-[175px] lg:pr-[0px] pr-[175px] md:text-6xl font-bold">Don't wait!</h1>
        <div className="pr-[175px]">
        <button className="  px-6 py-2 rounded-full text-white font-bold mt-4 bg-yellow-500 hover:bg-yellow-600">
         <em > Order Now </em> 
        </button>
        </div>
        
      </div>
    </div>
  );
};

const Slider = () => {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <SliderContent1 />
        </SwiperSlide>
        <SwiperSlide><SliderContent2 /></SwiperSlide>
        <SwiperSlide><SliderContent1 /></SwiperSlide>
        <SwiperSlide><SliderContent2 /></SwiperSlide>
        <SwiperSlide><SliderContent1 /></SwiperSlide>
        <SwiperSlide><SliderContent2 /></SwiperSlide>
        <SwiperSlide><SliderContent1 /></SwiperSlide>
        <SwiperSlide><SliderContent2 /></SwiperSlide>
        <SwiperSlide><SliderContent1 /></SwiperSlide>
      </Swiper>
    </>
  );
};
const Home = () => {
  return (
    <>
      <div className="hero md:py-16 py-[150px]">
        <Slider />
      </div>
      <div>
        <Products />
      </div>
    </>
  );
};

export default Home;

