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

    // 상단메뉴 대상: #top
    const topA = q("#top");
    
    // 상단이동버튼 대상: .tbtn
    const tbtn = q(".tbtn");
    // cg(tbtn);

    // 2. 화면높이값의 2/3구하기
    const hv = window.innerHeight/3*2;
    // console.log("2/3높이:",hv);

    // 3. 클래스 넣기 함수 만들기
    const showIt = x => { // x - 등장요소
        // 대상요소의 현재스크롤 위치
        let xval = retVal(x);

        // 구간적용여부 검사하기
        // 0보다 크고 화면의 2/3보다 작은 구간!
        if(xval < hv && xval > 0){
            // console.log("작동");
            // 해당요소에 클래스 넣기!
            x.classList.add("on");
        } // if
        
        // 되돌리기(on 제거)는 else문에 구현 가능
        // else{
        //     x.classList.remove("on");
        // } // else

    }; // showIt

    // 현재 스크롤 위치 변수
    let scTop;

    // 4. 스크롤 이벤트 셋팅
    window.addEventListener("scroll",()=>{

        // 2-0. 현재 스크롤 위치
        scTop = window.scrollY;
        // cg(scTop);

        // 상단영역 슬림메뉴 적용하기
        if(scTop >= 100) topA.classList.add("on");
        else topA.classList.remove("on");
        
        // 위로이동버튼 보이기, 숨기기
        if(tbtn >= 300) topA.classList.add("on");
        else tbtn.classList.remove("on");

        // 2-1. 값 확인
        // cg("등장 박스1: "+retVal(scAct[0]));

        // 2-2. 스크롤등장 요소 개수만큼 for문으로 돌리기
        for(let x of scAct) showIt(x);
        // 순서:
        // 1. 스크롤 이벤트시 setit에 담긴 요소를 수집
        // 2. 요소만큼 x에 하나씩 순서대로 담는다
        // 3. showIt(x) 호출시 x, 즉 요소자신을 보낸다!
        // 4. showIt() 함수는 그 x의 위치값을 조사해서
        // if문 구간에 해당하는지 검사후 해당요소에
        // 클래스 "on"을 넣어준다!
        
    }); // scroll

}); // 로딩 구역