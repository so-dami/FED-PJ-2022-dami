// 보그 PJ 메인페이지 JS - main.js

// 로딩구역 //
window.addEventListener("DOMContentLoaded",()=>{

    /*************************
     
       리턴 함수 셋팅 구역
       
    *************************/
    // 1. 요소 선택 함수: querySelectorAll();
    const q = x => {

        // 1-1. 리턴할 요소 변수: rv (return value)
        let rv = document.querySelectorAll(x);

        // 1-2. 요소 개수 체크
        let cnt = rv.length;
        cg("요소: "+cnt+"개");

        // 1-3. 1개일 경우 첫 번째만 선택해서 리턴
        if(cnt===1) rv = rv[0];

        // 1-4. 결과 리턴
        return rv;

    }; // q함수 //

    // 2. 콘솔 출력 함수
    const cg = x => console.log(x);

    // 3. 등장액션 대상 위치값 리턴
    const retVal = 
    ele => ele.getBoundingClientRect().top;

    /********************************
    
        스크롤 등장 액션 기능 구현

    ********************************/
    // 1. 대상: .scAct
    const scAct = q(".scAct");

    // 2. 스크롤 이벤트 셋팅
    window.addEventListener("scroll",()=>{

        // 2-1. 값 확인
        cg("등장 박스1: "+retVal(scAct[0]));
        
    }); // scroll

}); // 로딩 구역