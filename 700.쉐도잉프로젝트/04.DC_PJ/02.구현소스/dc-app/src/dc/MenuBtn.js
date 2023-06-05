// 메뉴 버튼 모듈 - MenuBtn.js

import $ from "jquery";
import "./css/menubtn.css";
import menubtn_data from "./data/menubtn";
import { Link, Outlet } from 'react-router-dom';

// jQB 로드구역
function jqFn(){

    $(()=>{

        $(".btnbx button").click(()=>{}); // click //
        
    }); // jQB //
    
} // jqFn //

// const 변수명 = 할당할데이터; 
const menubtnData = menubtn_data;

// 앞, 뒤 변수
const tit1 =[];
const tit2 = [];

//  {객체}, [배열]

menubtnData.forEach((x,i)=>{
    tit1.push(x.tit.split('^')[0]);
    tit2.push(x.tit.split('^')[1]);
})

function MenuBtn(){

    return(
        <>

            <section className="menubtn">

            {
                menubtnData.map((x,i) => 
                    <div key={i}>

                        {/* 이미지 박스 */}
                        <div className="imbx">

                            <img src={menubtnData[i]['isrc']} alt="메뉴버튼" />

                        </div>

                        {/* 타이틀 박스 */}
                        <div className="titbx">

                            {/* 작은 타이틀 */}
                            <h3>
                                {tit1[i].toUpperCase()}
                            </h3>

                            {/* 큰 타이틀 */}
                            <h2>
                                {tit2[i].toUpperCase()}
                            </h2>
                            
                        </div>

                        {/* 버튼 박스 */}
                        <div className="btnbx">
                            {/* 라우터를 이용한 이동은 반드시 Link를 사용할 것 */}
                            <button>
                                {menubtnData[i]['btn'].toUpperCase()}
                            </button>
                        </div>
                        
                    </div>
                )
            }

            </section>

            {/* 빈 루트를 만들고 JS 로드 함수 포함 */}
            {jqFn()}

        </>
        
    ); // return //
    
} // MenuBtn //

// 내보내기
export default MenuBtn;