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

                        {/* /det 라우터 컴포넌트 페이지 호출 시 state 속성값으로 객체를 보내어 값을 전달함 */}

                        {/* 도착 페이지인 Detail.js 컴포넌트에 페이지를 나타내야 할 데이터 항목을 데이터 속성명과 같은 이름으로 셋팅하여 라우터 전달 state객체에 담아서 보냄*/}

                        {/* selcat은 캐릭터 이름 전달 속성명 */}
                        {/* 값은 v.cname으로 캐릭터명을 보내줌 */}

                        {/*
                            cname 캐릭터 이름
                            cdesc 캐릭터 설명
                            facts 캐릭터 명세
                        */}
                        
                        <Link to="/det" 
                        state={
                            {
                                cname:v.cname,
                                cdesc:v.cdesc,
                                facts:v.facts
                            }
                        }>
                            <section className="swinbx">

                                {/* 캐릭터 이미지 영역 */}
                                <div className="catimg">
                                    <img src={v.tmsrc} alt={v.cname} />
                                </div>
                                
                                {/* 캐릭터 타이틀 영역 */}
                                <div className="cattit">
                                    <h3>{v.cname}</h3>
                                </div>

                            </section>
                        </Link>

                    </SwiperSlide>

                ))}

            </Swiper>
        </>
    );
}
