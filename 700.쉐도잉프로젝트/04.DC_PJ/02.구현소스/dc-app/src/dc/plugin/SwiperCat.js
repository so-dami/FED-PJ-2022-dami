import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

/* 제이쿼리 넣기 */
import $ from 'jquery';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// CSS 가져오기
import "./swipercat.css";

// import required modules
import { Navigation } from "swiper";

// 데이터 가져오기
import cat_data from "../data/cat";
import { Link } from "react-router-dom";

export default function SwiperCat(props){

    // 데이터 셋팅
    const sdt = cat_data;
    console.log(sdt);
    
    return (
        <>
            <Swiper
                // 한 화면당 개수를 Hook 변수 사용
                // slidesPerView={2}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                // 스와이퍼 사이즈별 슬라이드 수 변경
                breakpoints={{
                    200: {
                        slidesPerView: 3,
                    },
                    700: {
                        slidesPerView: 4,
                    },
                    1000: {
                        slidesPerView: 5,
                    },
                    1200: {
                        slidesPerView: 7,
                    },
                }}
                className="mySwiper"
            >

                {sdt.map((v,i) => (
                    
                    <SwiperSlide key={i}>

                        <Link to="/det">
                            <section className="swinbx">

                                {/* 캐릭터 이미지 영역 */}
                                <div className="catimg">
                                    <img src={v.tmsrc} alt={v.cname} />
                                    
                                </div>
                                
                                {/* 캐리겉 타이틀 영역 */}
                                <div className="cattit">
                                    <h3>{v.cname}</h3>
                                </div>

                            </section>
                        </Link>

                    </SwiperSlide>

                ))}

            </Swiper>

            {/* 스와이퍼 모듈에 이벤트 입히기 */}
            {/* {evtFn()} */}
        </>
    );
}
