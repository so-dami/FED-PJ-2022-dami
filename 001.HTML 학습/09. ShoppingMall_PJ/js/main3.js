// 쇼핑몰 배너 JS - 03.페이드효과 //

// 로딩후 loadFn함수 호출 //////////
window.addEventListener("DOMContentLoaded", loadFn);

/******************************************** 
 * 
    [ 페이드 효과 슬라이드 기능정의 ]
    -> 슬라이드 순번에 대한 전역변수를 사용한다!

    1. 오른쪽 버튼클릭시 다음 순번슬라이드에
    클래스 "on"을 줘서 opacity:1, z-index:1
    로 보이며 맨위로 설정해준다!(트랜지션적용)
    ->나머지 li는 모두 "on"을 지워서 초기화!

    2. 왼쪽버튼은 이전순번이 나오며 위와 동일

    3. 끝번호에 가서는 처음은 마지막으로 
    마지막은 처음으로 슬라이드가 다시 반복된다.

    4. 블릿은 현재 슬라이드와 일치된 순번표시

********************************************/

/******************************************** 
    함수명: loadFn
    기능: 로딩후 이벤트설정 및 슬라이드 기능
********************************************/
function loadFn() {
    console.log("로딩완료!");

    // 슬라이드번호 변수
    let snum = 0;

    // 광클금지변수 : 0 - 허용, 1 - 불허용
    let prot = 0;

    // 1. 대상선정
        // 1-1. 이벤트 대상: .abtn
        const abtn = document.querySelectorAll(".abtn");
        // console.log(abtn);

        // 1-2. 변경 대상: #slide li
        const slide = document.querySelectorAll("#slide>li");

        // 슬라이드 개수
        let scnt = slide.length;
        console.log("슬개수:",scnt);

        // 1-3. 블릿 대상: .indic li
        const indic = document.querySelectorAll(".indic li");

    // 2. 슬라이드 변경함수 만들기
    const goSlide = (seq) => {
        console.log("슬고우!",seq);

        // 2-0. 광클금지 설정하기 //////
        if (prot) return;
        prot = 1; // 잠금!
        setTimeout(() => {
            prot = 0; // 해제!
        }, 500); /// 0.5초후 해제! ///

        // 2-1. 방향에 따른 분기
            // 2-1-1. 오른쪽버튼 클릭시: seq===1일때
            if(seq){
                // 슬라이드번호 증가!
                snum++;
                console.log("오른!",snum);

            }
            // 2-1-2. 왼쪽버튼 클릭시: seq===0일때
            else{
                // 슬라이드번호 감소!
                snum--;
                console.log("왼쪽!",snum);
            }

        // 2-3. 한계값 체크
        // 처음 이전->끝 번호
        if(snum===-1) snum = scnt-1;
        //끝 다음->처음 번호
        else if(snum === scnt) snum = 0;

        // 2-4. 이동하기: 해당 순번 슬라이드 li에 클래스 on 넣기
        // 변경 대상: slide변수(#slide li)
            // 2-4-1. 전체 초기화
            slide.forEach(ele=>ele.classList.remove("on"));
            
            // 2-4-2. 해당 순번 li에 클래스 넣기
            slide[snum].classList.add("on");

        // 2-5. 블릿 변경: 해당 순번 블릿 li에 클래스 on 넣기
        // 변경 대상: indic변수(.indic li)
            // 2-4-1. 전체 초기화
            chgSlide(slide);

            // 2-4-2. 해당 순번 li에 클래스 넣기
            chgSlide(indic);
        
    }; // goSlide함수 //

    // 3. 대상에 이벤트 설정하기
    abtn.forEach((ele, idx) => {
        ele.onclick = () => {
            // 3-1. 슬라이드 함수 호출
            goSlide(idx);

            // 3-2. 자동넘김멈춤 함수 호출
            clearAuto();

        }; // click함수 //
    }); // forEach //

    // 인터발함수 지우기위한 변수
    let autoI;

    // 타임아웃함수 지우기위한 변수
    let autoT;

    /**************************************** 
        함수명: autoSlide
        기능: 인터발함수로 슬라이드함수 호출
    ****************************************/
    function autoSlide(){
        console.log("인터발시작!");
        // 인터발함수로 슬라이드함수 호출하기
        autoI = setInterval(()=>goSlide(1),3000);
    } ////////////// autoSlide함수 //////////

    // 자동넘김 최초호출!
    autoSlide();

    /*************************************** 
        함수명: clearAuto
        기능: 인터발함수를 지우고 다시 셋팅
    ***************************************/
    function clearAuto(){
    console.log("인터발멈춤!");
        // 1. 인터발 지우기
        clearInterval(autoI);

        // 2. 타임아웃도 지우지 않으면
        // 쌓여서 타임아웃 쓰나미실행이 발생한다!
        clearTimeout(autoT);

        // 3. 잠시후 다시 작동하도록 타임아웃으로
        // 인터발함수를 호출한다! 
        // 5초후(인터발은 3초후, 토탈 8초후 작동 시작)
        autoT = setTimeout(autoSlide,5000);

    } ///////// clearAuto 함수 /////////////

    /*************************************** 
        블릿 클릭 시 슬라이드 이동하기
    ***************************************/
    // 이벤트 대상: .indic li -> indic 변수
    // 이벤트 종류: click
    indic.forEach((ele,idx)=>{
        ele.onlick = () => {

            // 1. 전역변수 snum 업데이트 하기
                // 왜? 블릿 순번 === 슬라이드 순번이므로 
            snum = idx;

            // 2. 블릿 변경
            chgSlide(indic);
            
            // 3. 슬라이드 변경
            chgSlide(slide);

            // 4. 자동 넘김 멈추기
            clearAuto();
            
        }; // click //
    }); // forEach //

    /************************************** 
        [ 슬라이드, 블릿 변경 기능 공통 함수 ]
        함수명: chgSlide
    **************************************/
    function chgSlide(obj){
    // obj - 변경대상 노드리스트

        // 1. 전체리스트 초기화
        obj.forEach((ele)=>ele.classList.remove("on"));

        // 2. 해당 순번 li에 클래스 넣기
        obj[snum].classList.add("on");
        
    } // chgSlide 함수 //
    
} // loadFn 함수 //