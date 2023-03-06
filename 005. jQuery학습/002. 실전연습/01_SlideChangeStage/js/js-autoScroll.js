// JS로 구현한 자동페이지 휠 js - js-autoScroll.js

// 로딩 구역 //
window.addEventListener("DOMContentLoaded",loadFn);

// 새로고침할 때 스크롤 위치 캐싱은 무시하고 맨 위로 이동하기
// scrollTo(가로, 세로) -> 위치이동 메서드
setTimeout(() => {
    window.scrollTo(0,0);
}, 100);

function loadFn(){
    // 호출 확인
    console.log("로딩완료");

    /***************************************************************
        [ 휠 이벤트를 이용한 페이지 이동 컨드롤 ]
        -> 휠 이벤트명: wheel
        (예전엔 mousewheel 이벤트가 사용됨 - 현재는 공식 폐기)

        1. 사용법
            (1) 이벤트 속성에 함수를 할당
            - 요소.onwheel = 함수
            (2) 브라우저 이벤트에 등록
            - 요소.addEventListenr("wheel",함수,{옵션})

        2. 포인트
            (1) 기존 휠 이동 기능은 정지시킴
            - event.preventDefault();
            (2) 휠 방향을 알아내어 기능과 매칭
            - event.wheelDelta (휠 방향 속성)
            (3) 페이지 번호를 전역적으로 사용
            - let pgnum = 0

        3. 휠 이벤트 대상
            (1) 전체 스크롤바인 경우: window
            (2) 개별박스인 경우: 선택 요소

        4. scroll 이벤트와 wheel 이벤트 비교
            (1) 공통점: 스크롤되는 페이지의 위치 이동
            (2) 차이점
                - 마우스 휠의 동작에만 반응하는 이벤트는 wheel
                - 스크롤바의 이동에 반응하는 이벤트는 scroll

    ____________________________________________________________

        [ addEventListener 메서드 옵션에 관하여 ]
        기존 addEventListener의 3번째 파라미터로 캡쳐링/버블링 여부를 
        제어할 수 있는 부분이 EventListenerOptions이라는 객체형태의 
        추가 옵션을 받을수 있음

        EventListenerOptions 사용 전
        document.addEventListener('touchstart', handler, false);

        EventListenerOptions 사용 후
        document.addEventListener("touchstart", handler, {
            capture: false,
            once: false,
            passive: false
        });

        ※ 현재 크롬에서 지원하는 EventListenerOptions 옵션은 다음과 같다.

        (1) capture: 이벤트 캡쳐링 적용 여부. 크롬 49부터 지원
        (2) once: 이벤트를 한번만 호출하고 해제되는 옵션. 크롬 55부터 지원
        (3) passive: 스크롤 성능 향상을 위한 옵션으로 true일 경우, 
                스크롤을 위해 블록되는 것을 방지함. 이 경우, 
                preventDefault를 사용할 수 없음. 크롬 51부터 지원
                이 중, passive 속성은 성능향상을 위해, 
                브라우저의 기능을 프로그래밍으로 제어할수 있음
                -> 최근 업데이트된 브라우저는 passive 기본값이 true로 셋팅되므로 window, document, body 이 세가지 객체에 대해 스크롤 막기 기능을 비활성화 함
                -> 따라서 기본 기능을 막고자 하면 passive:false로 기능을 활성화해야 함
    ***************************************************************/
    // 0. 변수 설정
        // (1) 전체 페이지 변수
        let pgnum = 0; // 현재 페이지 번호(첫 페이지)

    // 1. 전체 휠 이벤트 설정하기
    window.addEventListener("wheel",wheelFn,{passive:false});
    
    // 2. 휠 이벤트 함수 만들기
    function wheelFn(e){ // e - 이벤트 전달변수
        // (0) 기본 기능 멈추기
        // addEventListener 옵션 passive:false 필수
        e.preventDefault();

        // (1) 호출 확인
        console.log("휠");

        // (2) 휠 방향 알아내기
        // 이벤트객체.wheelDelta
        let dir = e.wheelDelta;
        console.log("방향:",dir);
        // -> 휠을 내리면 -값, 올리면 +값
        
        // (3) 방향에 따른 페이지 번호 증감
            // (3-1) 스크롤 아랫방향: 페이지 번호 증가
            if(dir>0){
                pgnum++;
                    if(pgnum>6) pgnum = 6;
            } // if //
            
            // (3-2) 스크롤 윗방향: 페이지 번호 감소
            else{
                pgnum--;
                if(pgnum<0) pgnum = 0;
            } // else //

    }; // wheelFn //
    
}; // loadFn //