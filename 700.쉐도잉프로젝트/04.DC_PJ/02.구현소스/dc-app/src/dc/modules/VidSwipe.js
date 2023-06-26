// VidSwipe 모듈 - VidSwipe.js

import $ from "jquery";
import "../css/vidswipe.css";
import SwiperVid from "../plugin/SwiperVid";


// jQB 로드구역
function jqFn(){

    $(()=>{}); // jQB //
    
} // jqFn //

function VidSwipe(props){
    // props.pg - 페이지별 데이터 구분
    // props.tit - 모듈 타이틀

    return(

        // 빈 루트 생성
        <>

            {/* 모듈 코드 구역 */}
            <section className="vidswbx">

                {/* 1. 모듈 타이틀 */}
                <h2 className="tit">{props.tit}</h2>

                {/* 2. 스와이퍼 컴포넌트 */}
                <SwiperVid name="나는" />

                {/* 3. 비디오 재생창 */}
                <section className="vidbx">

                    {/* 비디오 중앙 박스 */}
                    <div className="playvid">

                        {/* 비디오 타이틀 */}
                        <h2 className="ifrtit"></h2>

                        {/* 비디오 */}
                        <iframe src="" allow="autoplay"></iframe>
                        
                        {/* 닫기 버튼 */}
                        <button className="cbtn">×</button>

                    </div>

                </section>

            </section>
    
            {/* 빈 루트를 만들고 JS 로드 함수 포함 */}
            {jqFn()}

        </>
        
    ); // return //
    
} // VidSwipe //

// 내보내기
export default VidSwipe;