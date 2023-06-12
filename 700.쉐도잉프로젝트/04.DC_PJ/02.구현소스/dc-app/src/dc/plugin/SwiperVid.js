import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

/* 제이쿼리 넣기 */
import $ from 'jquery';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

/* 폰트어썸 임포트 */
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// CSS 가져오기
import "./swipervid.css";

// import required modules
import { Navigation } from "swiper";

// 데이터 가져오기
import swipervid_data from "../data/swipervid";

export default function SwiperVid(props){

    // 데이터 셋팅
    const sdt = swipervid_data;

    // 하나 당 슬라이드 수: Hook 변수
    // const [변수,set변수] = useState(초기값)
    const[perSld,setPerSld] = useState(4);
    // 값의 사용은 Hook 변수를 쓰고
    // 값의 변경은 set변수(값) 형식으로 사용함

    // 비디오 보이기 함수
    // src - 비디오 경로, tit - 비디오 제목
    const showVid = (src, tit) => {

        console.log(src, tit);
        
        // .playvid iframe 변수 설정
        let ifr = $(".playvid iframe");
        
        // 1. 비디오(아이프레임) src 넣기

        // JS 문법
        // document.querySelector(".playvid iframe")
        // // ?autoplay=1 - 자동 재생
        // .setAttribute("src",src+"?autoplay=1");

        // jQuery 문법
        ifr.attr("src",src+"?autoplay=1");

        // 2. 비디오 타이틀 넣기
        $(".ifrtit").text(tit)
        // .toUpperCase()
        ;

        // .vidbx 변수 설정
        let vbx = $(".vidbx")
        
        // 3. 비디오 전체 박스 보이기
        vbx.fadeIn(300);

        // 4. 닫기 버튼 설정
        // 동영상 박스 닫기, 동영상 멈추기
        $(".cbtn").click(()=>{
            vbx.fadeOut(300);
            ifr.attr("src","");
        });
        
    }; // showVid //

    // 이벤트 함수
    const evtFn = () => {

        // jQB
        $(()=>{

            // 화면 크기 별 슬라이드 수 변경 함수
            const chgSwp = () => {

                // 윈도우 사이즈 체크
                let nowW = $(window).width();
                // console.log(nowW);

                // 화면 사이즈별 슬라이드 수 변경하기
                if(nowW <= 1000 && nowW > 700) setPerSld(3);
                else if(nowW <= 700) setPerSld(2);
                else setPerSld(4); // 1000 초과
        
            }; // chgSwp //

            // 윈도우 리사이즈 이벤트
            $(window).on("resize",chgSwp);

            // 로딩 시 최초 호출
            chgSwp();
            
        }); // jQB //
        
    }; // evtFn 함수 //
    
    return (
        <>
            <Swiper
                // 한 화면당 개수를 Hook 변수 사용
                slidesPerView={perSld}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >

                {sdt.map((v,i) => (
                    
                    <SwiperSlide key={i}>

                        <section className="swinbx"
                        onClick={()=>showVid(v.vsrc,v.tit)}>

                            {/* 동영상 이미지 영역 */}
                            <div className="vidimg">
                                <img src={v.isrc} alt={v.tit}></img>
                                <FontAwesomeIcon icon={faPlayCircle} 
                                style={{
                                    position:"absolute",
                                    bottom:"55%",
                                    left:"10%",
                                    color:"#fff",
                                    fontSize:"50px"
                                }} />

                            </div>

                            {/* 동영상 타이틀 영역 */}
                            <div className="vidtit">
                                <h4>{v.cat.toUpperCase()}</h4>
                                <h3>{v.tit.toUpperCase()}</h3>
                            </div>

                        </section>

                    </SwiperSlide>

                ))}

            </Swiper>

            {/* 스와이퍼 모듀렝 이벤트 입히기 */}
            {evtFn()}
        </>
    );
}
