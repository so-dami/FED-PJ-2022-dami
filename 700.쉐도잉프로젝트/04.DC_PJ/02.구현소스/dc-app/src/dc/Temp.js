// 어떤 모듈 - 어떤.js

import $ from "jquery";
import "./css/어떤.css";

// jQB 로드구역
function jqFn(){

    $(()=>{}); // jQB //
    
} // jqFn //

function Temp(){

    return(

        // 빈 루트 생성
        <>

            {/* 모듈 코드 구역 */}
    
            {/* 빈 루트를 만들고 JS 로드 함수 포함 */}
            {jqFn()}

        </>
        
    ); // return //
    
} // MenuBtn //

// 내보내기
export default Temp;