// VidIntro 모듈 - VidIntro.js

import $ from "jquery";
import "../css/vidintro.css";
import vidintro_data from "../data/vidintro";

// jQB 로드구역
function jqFn(){

    $(()=>{}); // jQB //
    
} // jqFn //

// const 변수명 = 할당할 데이터;
// props.pg - 해당페이지 데이터 속성명
const vidintroData = vidintro_data[props.pg];

function VidIntro(){

    return(

        // 빈 루트 생성
        <>

            {/* 모듈 코드 구역 */}
            <section className="vidbox">

                {/* 비디오 */}
                <div className="vb1">
                    <iframe src="{vidintroData.vsrc}" title="{vidintroData.btit}"></iframe>
                </div>

                {/* 타이틀 */}
                <div className="vb2">

                    {/* 작은 타이틀 */}
                    <h3>{vidintroData.stit}</h3>

                    {/* 큰 타이틀 */}
                    <h2>{vidintroData.btit}</h2>

                    {/* 요약 소개 */}
                    <p></p>

                    {/* 세부 소개 */}
                    <p></p>

                    {/* 링크 있을 경우 표시 */}
                    
                </div>

            </section>
    
            {/* 빈 루트를 만들고 JS 로드 함수 포함 */}
            {jqFn()}

        </>
        
    ); // return //
    
} // MenuBtn //

// 내보내기
export default VidIntro;