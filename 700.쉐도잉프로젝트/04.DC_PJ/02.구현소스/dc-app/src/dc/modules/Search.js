// Search 모듈 - Search.js

import $ from "jquery";
import { useState } from 'react';
import cat_data from "../data/cat";
import "../css/search.css";
import CatList from "./CatList";


// jQB 로드구역
function jqFn(){

    $(()=>{}); // jQB //
    
} // jqFn //

function Search(){

    // 데이터 선택하기: Hook 데이터 구성하기
    let [sdt,setSdt] = useState(cat_data);

    return(

        // 빈 루트 생성
        <>

            {/* 모듈 코드 구역 */}
            <section className="schbx">
                
                {/* 1. 옵션 선택 박스 */}
                <div className="schopt"></div>

                {/* 2. 결과 리스트 박스 */}
                <div className="listbx">

                    {/* 결과 타이틀 */}
                    <h2 className="restit">BROWSE CHARACTERS</h2>

                    {/* 정렬 선택 박스 */}
                    <aside className="sortbx"></aside>

                    {/* 캐릭터 리스트 컴포넌트 */}
                    {/* 전달 속성 dt - 리스트 데이터 */}
                    <CatList dt={sdt} />
                </div>

            </section>
    
            {/* 빈 루트를 만들고 JS 로드 함수 포함 */}
            {jqFn()}

        </>
        
    ); // return //
    
} // Search //

// 내보내기
export default Search;