// 패럴렉스 PJ 메인 JS - main.js

// 로드 이벤트 설정 //
window.addEventListener("DOMContentLoaded", loadFn);

// 로드 함수 //
function loadFn() {
    console.log("loading...");

    // 1. 부드러운 스크롤 적용 - smoothScroll20.js
    startSS();

    // 2. 공통 선택 함수
    const qs = (x) => document.querySelector(x);
    const qsa = (x) => document.querySelectorAll(x);

    // 3. 등장위치 리턴 함수
    const retVal = (x) => x.getBoundingClientRect().top;
    // getBondingClientRect().top -> 화면 등장 후 위로 올라가면 마이너스됨

    // 4. 화면높이값 읽기: 등장 요소의 시작값
    const winH = window.innerHeight;
    console.log("winH:", winH + "px");

    // 5. 패럴렉스 수치 범위: 움직일 값 설정
    const setH1 = 100;
    const setH2 = 200;

    // 6. 패럴렉스 대상 선정
    // 6-1. 글자 박스
    const tg1 = qsa(".txt");

    // 6-2. 아이콘
    const tg2 = qsa(".icon");

    // 7. 패럴렉스 이동함수
    const moveEl = (elpos, ele, setH) => {
        // elpos - 위치값, ele - 요소, setH - 정한 범위수

        // 패럴렉스 범위: 윈도우높이값 ~ 0까지
        // 화면에서 완전히 사라질 때 범위는 0이 아니고
        // 요소의 -높이값만큼임 -> 적당히 -수치로 해결
        if (elpos < winH && elpos > -200) {
            // 7-1. 위치이동값 계산
            let x = setH - (elpos * setH) / winH;
            console.log("x:", -x);

            // 7-2. 해당 요소에 위치이동 css 반영
            ele.style.cssText = `
                transform:translateY(${-x}px);
            `;
            // cssText 속성은 style 속성값을 직접 넣어줌

            // 대상요소의 트랜스폼 Y축 이동
            // 위치 이동의 계산원리
            // -> 윈도우화면 : 위치값 = 정한 범위 : 실제 이동값
            // ∴ 실제 이동값 = 정한범위 - (위치값 * 정한 범위) / 윈도우화면
            // x = setH2 - (elpos * setH2) / winH
            // -> 이동수치는 0부터 서서히 증가해야 하므로 정한 범위수에서 빼줌

            // ex) 윈도우가 1000px : 500px = 200px : x?
            // -> x = 500px * 200px / 1000px
        } // 패럴렉스 범위 if //
    }; // moveEl //

    // 8. 스크롤 이벤트 함수 만들기
    window.addEventListener("scroll", () => {
        // 대상1: 글자박스 패럴렉스 호출
        tg1.forEach((ele) => moveEl(retVal(ele), ele, setH2)); // forEach //
        // moveEl(위치값,요소,정한 범위)

        // 대상1: 아이콘 패럴렉스 호출
        tg2.forEach((ele) => moveEl(retVal(ele), ele, setH1)); // forEach //
        // moveEl(위치값,요소,정한 범위)
    }); // scroll //

    // 스크롤바를 직접 잡고 움직일 시 부드러운 스크롤 위치값 업데이트
    window.addEventListener("mouseup", () => {
        // 이것 안 하면 다시 스크롤 시 튐
        pos = window.scrollY;
    }); // mouseup //

    window.addEventListener("keyup", () => {
        pos = window.scrollY;
    }); // keyup //

    // 로딩 시 맨 위로 이동하기
    setTimeout(() => {
        // 맨 위로 이동
        window.scrollTo(0, 0);

        // 부드러운 스크롤 위치값 반영
        // 안 하면 화면 튐
        pos = 0;
    }, 400);
} // loadFn //
