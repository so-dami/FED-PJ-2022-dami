import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// CSS 가져오기
import "./swipervid.css";

// import required modules
import { Navigation } from "swiper";

// 데이터 가져오기
import swipervid_data from "../data/swipervid";

export default function SwiperVid(props){

    // 데이터 셋팅
    const sdt = swipervid_data;
    
    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >

                {sdt.map((v,i) => (
                    
                    <SwiperSlide key={i}>

                        {/* 이미지 */}
                        <div className="vidimg">
                            <img src="" alt=""></img>
                        </div>

                        {/* 제목 */}
                        <div className="vidtit">
                            <h4></h4>
                            <h3></h3>
                        </div>
                    </SwiperSlide>

                ))}

            </Swiper>
        </>
    );
}
