// Racing PJ 메인 JS - main.js

// 요소 선택함수
const qs = x => x.document.querySelector("x");
const qsa = x => x.document.querySelectorAll("x");

// 메시지 함수
const cg = x => console.log(x);

//////////////// 로드구역 /////////////////////////

window.addEventListener("DOMContentLoaded", ()=>{
    console.log("로딩완료!");

    /* 
        [ 게임 기능정의 ]
        1. 게임룰: 거북버튼 글릭하여 거북을 왼쪽에서 오른쪽으로 이동한다. 이 때 토끼는 자동으로 이동하여 결승선에 먼저 도달하는 레이서가 승리
        2. 토끼의 이동속도: 레벨로 설정
        3. 결승선 도착은 둘 중 하나가 먼저 도착할 경우 판별 함수에서 결괄르 화면에 출력
        4. 포커스가 버튼에 갈 경우 마우스가 아닌 키보드 버튼으로는 조작할 수 없게 함(마우스만 사용)
    */

    // 1. 대상 선정
        // (1) 거북: #t1
        const t1 = qs("#t1");       

        // (2) 토끼: #r1
        const r1 = qs("#r1");

        // (3) 버튼: #btns a
        const btns = qsa("#btns a");

        // (4) 레벨: #level
        const level = qs("#level")

        // (5) 메시지박스: #msg
        const msg = qs("#msg");

}); /////////// 로드구역 ///////////////////////////
