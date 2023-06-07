// VidIntro 모듈 - VidIntro.js

import $ from "jquery";
import "../css/vidintro.css";
import vidintro_data from "../data/vidintro";

// jQB 로드구역
function jqFn(){

    $(()=>{}); // jQB //
    
} // jqFn //

function VidIntro(){

    return(

        // 빈 루트 생성
        <>

            {/* 모듈 코드 구역 */}
            <section>

                {/* 비디오 */}
                <div className="">
                    <iframe src="{}" title="{}"></iframe>
                    <div></div>
                </div>

                {/* 타이틀 */}
                <div className="">

                    {/* 작은 타이틀 */}
                    <h3></h3>

                    {/* 큰 타이틀 */}
                    <h2></h2>

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