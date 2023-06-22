// 캐릭터 리스트 모듈 - CatList.js

import $ from "jquery";
import "../css/catlist.css";

// jQB 로드구역
function jqFn(){

    $(()=>{}); // jQB //
    
} // jqFn //

function CatList(props){

    // 선택 데이터
    let sdt = props.dt;

    return(

        // 빈 루트 생성
        <>

            {/* 모듈 코드 구역 */}
            <ul className="clist">
                {
                    sdt.map((v,i)=>
                        <li key={i}>
                            <img src={v.tmsrc} alt={v.cname} />
                            <h3>{v.cname}</h3>
                        </li>
                    )
                }
            </ul>
            
            {/* {console.log(sdt)} */}
    
            {/* 빈 루트를 만들고 JS 로드 함수 포함 */}
            {jqFn()}

        </>
        
    ); // return //
    
} // CatList //

// 내보내기
export default CatList;