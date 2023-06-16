// CatSwipe 모듈 - CatSwipe.js

import $ from "jquery";
import "../css/catswipe.css";
import SwiperCat from "../plugin/SwiperCat";

// jQB 로드구역
function jqFn(){

    $(()=>{}); // jQB //
    
} // jqFn //

function CatSwipe(props){
    // props.pg - 페이지별 데이터 구분
    // props.tit - 모듈 타이틀

    return(

        // 빈 루트 생성
        <>

            {/* 모듈 코드 구역 */}
            <section className="catswbx">

                {/* 1. 모듈 타이틀 */}
                <h2 className="tit">{props.tit}</h2>

                {/* 2. 스와이퍼 컴포넌트 */}
                <SwiperCat />

            </section>
    
            {/* 빈 루트를 만들고 JS 로드 함수 포함 */}
            {jqFn()}

        </>
        
    ); // return //
    
} // CatSwipe //

// 내보내기
export default CatSwipe;