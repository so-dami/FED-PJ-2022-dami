// 네이게이션 유형6: 공통 js - common.js

// 로드 구역
window.addEventListener("DOMContentLoaded",loadFn);

/* 
    함수명: loadFn
    기능: 로딩 후 실행함수
*/
function loadFn(){
    console.log("complete");

    /***************************************************** 
        gnb메뉴 객체 데이터를 이용한 html태그 만들어 넣기 
    *****************************************************/
    // 1. 대상 선정: .gnb
    const gnb = document.querySelector(".gnb");
    // console.log(gnb);

    // 2. 변수 셋팅: html 코드를 담을 변수
    let hcode = "";
    
    
    // 3. 코드의 구조화 생성
    hcode += `<ul>`;

        // 3-1. 상위메뉴 반복코드 생성
        // mdata객체를 가져와서 반복시킴 -> for in문
        // console.log(mdata);

        for(let tm in mdata){ // tm = mdata의 속성명
            hcode +=
            `
            <li>
                <a href="#">${tm}</a>
                <!-- 1-2-1. sub menu 영역 -->
                <div class="smenu">
                    <h2>
                        <div class="stit">${tm}</div>
                        <a href="#">전체보기＞</a>
                    </h2>
                    <div class="swrap">
            `;
            
        // 3-2. 하위메뉴 반복코드 생성
        // 객체데이터이므로 for in문 사용
        for(let sm in mdata[tm]){ // sm = 속성명(하위메뉴)
            // mdata[tm] -> mdata[속성명] -> 속성값
            // 속성값은 서브메뉴이고 객체로 구성됨

            hcode +=
            `<dl>
                <dt>
                <a href="#">${sm}</a>
                </dt>`;
            
            // 3-3. 서브메뉴(최하위메뉴) 반복코드 생성
            // 서브메뉴는 배열이므로 for of문 사용
            for(let sub of mdata[tm][sm]){
                hcode += `<dd>
                <a href="#">${sub}</a>
                </dd>`;
            } // for of문 //
            
            hcode += `</dl>`;
            
        } // for in문 //

        hcode +=
        `
                </div>
            </div>
        </li>
        `
        } // for in문 //
    
    hcode +=
    `</ul>`

    // 4. gnb 박스에 출력하기
    gnb.innerHTML = hcode;

}; // loadFn 함수 //