// 쇼핑몰 배너 JS - 01.가로방향 배너 슬라이드 //

// HTML태그 로딩후 loadFn함수 호출! ///
window.addEventListener("DOMContentLoaded", loadFn);

/******************************************* 
    [ 슬라이드 이동 기능정의 ]
    1. 이벤트 종류: click
    2. 이벤트 대상: 이동버튼(.abtn)
    3. 변경 대상: 슬라이드 박스(#slide)
    4. 기능 설계:

        (1) 오른쪽 버튼 클릭 시 다음 슬라이드가
            나타나도록 슬라이드 박스의 left값을
            -100%로 변경시킨다.
            -> 슬라이드 이동후 !!! 
            바깥에 나가있는 첫번째 슬라이드
            li를 잘라서 맨 뒤로 보낸다!
            동시에 left값을 0으로 변경한다!

        (2) 왼쪽 버튼 클릭 시 이전 슬라이드가
            나타나도록 하기 위해 우선 맨 뒤 li를
            맨 앞으로 이동하고 동시에 left값을
            -100%로 변경한다.
            그 후 left값을 0으로 애니메이션하여
            슬라이드가 왼쪽에서 들어온다.

        (3) 공통기능: 슬라이드 위치표시 블릿
            - 블릿 대상: .indic li
            - 변경 내용: 슬라이드 순번과 같은 순번의
            li에 클래스 "on"주기(나머진 빼기->초기화!)

*******************************************/

/****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/
function loadFn(){
    console.log("complete");
    
    // 슬라이드 번호 변수 만들기
    let snum = 0;

    // 슬라이드 개수
    let scnt = document.querySelectorAll("#slide>li").length;
    console.log("슬라이드 개수:",scnt);

    // 1. 대상 선정
        // 1-1. 이벤트 대상: .abtn
        const abtn = document.querySelectorAll(".abtn");
        // console.log(abtn);

        // 1-2. 변경 대상: #slide
        const slide = document.querySelector("#slide");
        // console.log(slide);
        
    // 2. 슬라이드 변경 함수 만들기
    const goSlide = (seq) => {
        console.log("슬라이드",seq);

        // 2-1. 방향에 따른 분기
            // 2-1-1. 오른쪽 버튼 클릭 시: seq===1 일때,
            if(seq){
                console.log("오른쪽",snum);
                // 슬라이드 번호 증가
                snum++;
            } // if //

            // 2-1-2. 왼쪽 버튼 클릭 시: seq===0 일때,
            else{
                console.log("왼쪽",snum);
                // 슬라이드 번호 감소
                snum--;
            } // else //

            // 2-1-3. 한계값 체크
                // 처음 이전 -> 끝
                if(snum===-1) snum = scnt-1
                // 끝 다음 -> 처음
                else if(snum===scnt) snum = 0;

        // 2-2. 이동하기
        // 이동 대상: slide 변수
        slide.style.left = (snum*-100)+"%";
        // -> snum: 0, 1, 2, 3, 4, ...
        slide.style.transition = "left .5s ease-in-out";
    }; // goSlide 함수 //

    // 3. 대상에 이벤트 설정하기
    abtn.forEach((ele,idx)=>{
        ele.onclick=()=>{goSlide(idx);
        }; // click 함수 //
    }); // forEach //
}; // loadFn 함수 //