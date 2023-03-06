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
        gnb 메뉴 객체 데이터를 이용한 html태그 만들어 넣기 
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
                <div class="smenu">
                    <!-- 하위메뉴 구조 랩핑박스 - .smbx -->
                    <aside class="smbx"> 
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
                </aside>
            </div>
        </li>
        `
        } // for in문 //
    
    hcode +=
    `</ul>`

    // 4. gnb 박스에 출력하기
    gnb.innerHTML = hcode;

    /************************************************
        gnb 메뉴 오버시 서브 메뉴 보이기
        __________________________________________

        [ 기능 정의 ]
        상위메뉴 li에 오버시 하위메뉴 .smenu
        박스의 내부 데이터만큼 height 값이 생기며
        opcity 투명도가 1로 변경되는 트랜지션 수행,
        아웃시 원상복귀
    ************************************************/
    
    // 이벤트 종류: mouseenter, mouseleave
    // 변경 대상1: .smenu
    // 변경 내용1: height값, opacity값
    // 변경 대상2: .bgbx
    const bgbx = document.querySelector(".bgbx");
    // console.log(bgbx);
    // 변경 내용2: 하위메뉴 + 메뉴 배경 style 변경함수 만들기
    const stFn = (ele,hv,opa) => {
        ele.style.height = hv+"px";
        ele.style.opacity = opa;
    }; // stfn 함수 //

    // 1. 대상 선정
        // (1) 이벤트 대상: .gnb>ul>li
        const list = document.querySelectorAll(".gnb>ul>li");
        // console.log(list);

    // 2. 상위메뉴 li에 이벤트 설정
    for(let x of list){

        // (1) 마우스 오버 시
        x.onmouseenter = () => {
            // (1-1) 하위메뉴 박스 .smenu 선택하기
            let tg = x.querySelector(".smenu");
            
            // (1-2) 하위메뉴 박스 내부박스 높이값 구하기
            let hv = tg.querySelector(".smbx").clientHeight;
            // console.log("내부 높이",hv);
            
            // (1-4) 스타일 변경 요소 함수 호출
            stFn(tg);
            stFn(bgbx);

        }; // mouseenter //

        // (2) 마우스 아웃 시
        x.onmouseleave = () => {
            // (2-1) 하위메뉴 박스 .smenu 선택하기
            let tg = x.querySelector(".smenu");
            
            // (2-2) 하위메뉴 style 변경하기
            tg.style.height = "0";
            tg.style.opacity = 0;

        }; // mouseleave //

    } // for of //

}; // loadFn 함수 //