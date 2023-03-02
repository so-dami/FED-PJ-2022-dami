// 보그 PJ 링크시스템 페이지 js - linksys.js

// 로딩 구역 //
window.addEventListener("DOMContentLoaded",linkFn);

// 로드 함수 //
function linkFn(){
    console.log("linksys");

    // 1. 링크 대상 선정
        // 1-1. GNB: .gnb a
        const gnb = document.querySelectorAll(".gnb a");
        // console.log("gnb:",gnb);

        // 1-2. 로고: .logo a
        const logo = document.querySelector(".logo a");
        // console.log("logo:",logo);

    // 2. click 이벤트 설정
        // 2-1. GNB 클릭
        for(let x of gnb){
            x.onclick = (e) => {

                // 2-1-1. 클릭 이동 기능 막기
                e.preventDefault();

                // 2-1-2. 클릭된 a 요소 텍스트 읽기
                let atxt = x.innerText.toLowerCase().trim();
                // toLowerCase() -> 소문자 변환
                // toUpperCase() -> 대문자 변환
                // trim() -> 앞뒤 공백 제거
                console.log(atxt);

                // 2-1-3. 서브페이지 이동하기
                if(atxt !== "search") // 클릭 시 검색 버튼(search)이 아니면 서브페이지로 이동
                location.href = "category.html?cat="+encodeURIComponent(atxt);

            
            }; // click 함수 //
        }// for of //
        
        // 2-2. 로고 클릭
        logo.onclick = (e) => {

            // 2-2-1. 클릭 이동 기능 막기
            e.preventDefault();

            // 2-2-2. 홈으로 이동하기
            location.href = "index.html"

        }; // click 함수 //

} // linkFn 함수 //