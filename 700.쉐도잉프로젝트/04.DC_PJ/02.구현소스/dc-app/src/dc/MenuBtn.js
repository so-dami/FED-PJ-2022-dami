// 메뉴 버튼 모듈 - MenuBtn.js

import $ from "jQuery";
import "./css/menubtn.css";

// jQB 로드구역
function jqFn(){

    $(()=>{}); // jQB //
    
} // jqFn //

function MenuBtn(){

    return(

        // 빈 루트 생성
        <>

            <section className="menubtn">

                {/* 이미지 박스 */}
                <div className="imbx">

                    <img src="" alt="" />
                    
                </div>

                {/* 타이틀 박스 */}
                <div className="titbx">

                    {/* 작은 타이틀 */}
                    <h3></h3>

                    {/* 큰 타이틀 */}
                    <h2></h2>
                    
                </div>

                {/* 버튼 박스 */}
                <div className="btnbx"></div>
                
            </section>
    
            {/* 빈 루트를 만들고 JS 로드 함수 포함 */}
            {jqFn()}

        </>
        
    ); // return //
    
} // MenuBtn //

// 내보내기
export default MenuBtn;