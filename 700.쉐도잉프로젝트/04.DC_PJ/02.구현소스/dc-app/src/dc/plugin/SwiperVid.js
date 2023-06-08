import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./swipervid.css";

// import required modules
import { Navigation } from "swiper";

export default function SwiperVid(props){

    const data = ["🧡", "💛", "💚", "💙", "💜"];
    
    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                {
                    data.map((v,i)=>
                        <SwiperSlide key={i}>{props.name} {v}</SwiperSlide>
                    )
                }
            </Swiper>
        </>
    );
}
