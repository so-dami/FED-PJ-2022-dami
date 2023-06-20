// 메뉴 버튼 모듈 - MenuBtn.js

import $ from "jquery";
import "../css/menubtn.css";
import menubtn_data from "../data/menubtn";
import { Link } from 'react-router-dom';

// jQB 로드구역
function jqFn(){

    $(()=>{}); // jQB //
    
} // jqFn //

function MenuBtn(){

    return(
        <>

            <section className="menubtn">

            {
                menubtn_data.map((v,i) => 
                    <div key={i}>

                        {/* 이미지 박스 */}
                        <div className="imbx">

                            <img src={v.isrc} alt="메뉴버튼" />

                        </div>

                        {/* 타이틀 박스 */}
                        <div className="titbx">

                            {/* 작은 타이틀 */}
                            <h3>{v.tit.split('^')[0]}</h3>

                            {/* 큰 타이틀 */}
                            <h2>{v.tit.split('^')[1].toUpperCase()}</h2>
                            
                        </div>

                        {/* 버튼 박스 */}
                        <div className="btnbx">
                            
                            {/* 라우터를 이용한 이동은 반드시 Link를 사용할 것 */}
                            <Link to={v.link}>
                                <button>
                                    {v.btn.toUpperCase()}
                                </button>
                            </Link>

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