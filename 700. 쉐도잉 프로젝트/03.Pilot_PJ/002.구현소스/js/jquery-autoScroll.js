// 제이쿼리로 구현한 자동페이지 휠 JS : jquery-autoScroll.js
// 로딩구역 없이 함수로 구현함

// 전체를 함수로 묶기
// 이유? export 하기 위해

function autoScroll(){

/* 대상 변수 할당하기 */
    // 전체 페이지번호
    let pno = 0

    // 페이지 요소
    const pg = $(".page");

    // 전체 페이지 갯수
    const pgcnt = pg.length;
    console.log("페이지수:",pgcnt,pg);

    // 광실행 금지 변수
    let prot = [];

    // 광스크롤 금지 변수
    prot[0] = 0;

    // gnb 메뉴 li
    const gnb = $(".gnb li");
    
    // 인디케이터 메뉴 li
    const indic = $(".indic li");

    // 각 페이지별 등장 요소
    const minfo = $(".minfo");

/* 이벤트 등록하기 */
    // 윈도우 휠이벤트 발생 시
    $(window).on("wheel",wheelFn);

    // gnb 메뉴 클릭 시
    // 대상: .gnb a
    $(".gnb a").click(chgMenu);

    // 인디케이터 클릭 시
    // 대상: .indic a
    $(".indic a").click(chgMenu);

    // 새로고침 시 스크롤 위치 캐싱 변경하기(맨 위로)
    $("html,body").animate({scrollTop: "0px"});

/****************************************

    [ 스크롤 적용 함수 ]
    
    함수명: wheelFn
    기능: 마우스휠 이벤트 발생 시 호출됨
    -> 한 페이지씩 자동스크롤 기능

****************************************/
function wheelFn(){

    // 광휠 금지
    if(prot[0]) return;
    chkCrazy(0);
    
    console.log("휠");

    // 1. 휠 방향 알아내기
    let delta = event.wheelDelta;
    console.log(delta);

    // 2. 방향에 따른 페이지 번호 증감
    if(delta < 0){
        pno++;
        
        // 마지막 페이지 번호에 고정
        if(pno===pgcnt)pno=pgcnt-1;

    } // if //

    else{
        pno--;

        // 첫 페이지 번호에 고정
        if(pno===-1)pno=0;
        
    } // else //

    console.log(pno);

    // 3. 스크롤 이동하기 + 메뉴에 클래스 "on" 넣기
    movePg();
    
}; // wheelFn //

/*********************************************
    
    함수명: chgMenu
    기능: 메뉴 클릭 시 메뉴 변경과 페이지 이동

*********************************************/

// 광클 초기값
prot[1] = 0;

function chgMenu(){

    // 0. 광클 금지
    if(prot[1]) return;
    chkCrazy(1);
    
    // 1. 클릭된 a 요소의 부모인 li 순번 구하기 === pno
    let idx = $(this).parent().index();
    console.log("click",this,idx);

    // 2. 전역 페이지 번호에 순번 업데이트
    pno = idx;
    
    // 3. 페이지 이동
    movePg();

    // 4. 메뉴에 클래스 "on" 넣기
    // 대상: gnb 메뉴, 인디케이터 메뉴 -> gnb, indic 변수
    gnb.eq(pno).addClass("on").siblings().removeClass("on");
    indic.eq(pno).addClass("on").siblings().removeClass("on");
    
    
}; // chgMenu //

/***************************************
    
    함수명: chkCrazy
    기능: 광적 동작을 체크하여 제어 리턴

***************************************/
function chkCrazy(seq){ // seq - 관리 변수 순번

    prot[seq] = 1;
    setTimeout(()=>prot[seq]=0,800);
    
}; // chkCrazy //

/***************************************
    
    함수명: movePg
    기능: 페이지 이동 애니메이션

***************************************/
function movePg(){

    // 대상: html,body -> 두 개를 모두 잡아야 공통적으로 적용됨
    $("html,body")
    .animate({
        scrollTop: ($(window).height()*pno)+"px"
    },800,"easeOutBounce",showEle); // 이동 후 콜백함수 호출 

    // 대상: gnb 메뉴, 인디케이터 메뉴 -> gnb, indic 변수
    gnb.eq(pno).addClass("on").siblings().removeClass("on");
    indic.eq(pno).addClass("on").siblings().removeClass("on");
    
}; // movePg //

/***************************************
    
    함수명: showEle
    기능: 페이지 이동 후 요소 등장하기

***************************************/

// 등장할 요소 초기화
minfo.css({
    opacity: 0,
    transform: "translate(-50%,50%)",
    transition: ".3s ease-out"
}); // css //

function showEle(){

    // .minfo 페이지별 등장하기
    pg.eq(pno).find(".minfo")
    .css({
        opacity: 1,
        transform: "translate(-50%,-50%)",
    }) // css //
    // 다른 페이지 초기화
    .parents(".page").siblings().find(".minfo")
    .css({
        opacity: 0,
        transform: "translate(-50%,50%)",
        transition: ".3s ease-out"
    }); // css //
    
}; // showEle //

// 등장 액션 함수 최초 호출
setTimeout(showEle, 1000);

} // autoScroll //

// 전체 함수 내보내기 //
export default autoScroll;