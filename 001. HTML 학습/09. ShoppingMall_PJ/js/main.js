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
function loadFn() {
    console.log("complete");

    // 슬라이드 li 리스트
    let slist = document.querySelectorAll("#slide>li");

    // 잘라내기로 li 순번이 뒤섞이므로 블릿 변경 매칭을 위한 고유 순번을 사용자 정의 속성(data-)으로 만들어줌
    slist.forEach((ele,idx)=>{
        // 사용자 정의 속성 만들기: data-seq
        ele.setAttribute("data-seq",idx);
    }) // forEach //

    // 1. 대상 선정
    // 1-1. 이벤트 대상: .abtn
    const abtn = document.querySelectorAll(".abtn");
    // console.log(abtn);

    // 1-2. 변경 대상: #slide
    const slide = document.querySelector("#slide");
    // console.log(slide);

    // 1-3. 블릿 대상: .indic li
    const indic = document.querySelectorAll(".indic li");

    // 광클 금지 변수: 0 허용, 1 불허용
    let prot = 0;

    // 2. 슬라이드 변경 함수 만들기
    // 호출 시 seq에 들어오는 값 중 1은 오른쪽, 0은 왼쪽
    const goSlide = (seq) => {
        console.log("슬라이드", seq);
        console.log("못 들어갔어ㅠ");

        // 광클 금지 설정
        if(prot) return;
        prot = 1; // 잠금!
        setTimeout(() => {
            prot = 0; // 잠금 해제!
        }, 400); // timeout - 0.4초 후 잠금 해제 //
        console.log("나 들어왔어");
        
        /* 
        (0) 현재의 슬라이드 li 수집하기
        */
        let clist = slide.querySelectorAll("li");
        // clist = current list 현재 리스트

        // 2-1. 방향에 따른 분기
            // 2-1-1. 오른쪽 버튼 클릭 시
            if (seq) {
                console.log("오른쪽");

                /* 
                (1) 오른쪽 버튼 클릭 시 다음 슬라이드가
                나타나도록 슬라이드 박스의 left값을
                -100%로 변경시킨다.
                */
                slide.style.left = "-100%";
                slide.style.transition = "left .5s ease-in-out";

                /*
                (2) 슬라이드 이동 후 !!! -> 0.4초 후
                */
                setTimeout(() => {
                    // (2-1) 바깥에 나가있는 첫번째 슬라이드 li를 잘라서 맨 뒤로 보낸다!
                    slide.appendChild(clist[0]);

                    // (2-2) 동시에 left값을 0으로 변경흔다.
                    slide.style.left = "0";

                    // (2-3) 트랜지션 없애기
                    slide.style.transition = "none";
                }, 400); // timeout //
            } // if - 오른쪽 클릭 시 //

            // 2-1-2. 왼쪽 버튼 클릭 시
            else {
                console.log("왼쪽");

                /*
                (1) 왼쪽 버튼 클릭 시 이전 슬라이드가
                나타나도록 하기 위해 우선 맨 뒤 li를
                맨 앞으로 이동한다.
                */
                // slide.insertBefore(넣을 놈, 넣을 놈 전 놈);
                // slide.insertBefore(맨 끝 li, 맨 앞 li);
                slide.insertBefore(clist[clist.length-1],clist[0]);

                /* 
                (2) 동시에 left값을 -100%로 변경한다.
                */
                slide.style.left = "-100%";
                // 이때 트랜지션을 없앤다. (한 번 실행 후부터 생기므로)
                slide.style.transition = "none";

                /*
                (3) 그 후 left값을 0으로 애니메이션하여 슬라이드가 왼쪽에서 들어온다.
                -> 동일 속성인 left가 같은 코딩처리 공간에 동시에 있으므로 이것을 분리해야 효과가 있다. (setTimeout 사용)
                */
                setTimeout(() => {
                    slide.style.left = "0";
                    slide.style.transition = "left .5s ease-in-out";
                }, 0); // timeout //
            } // else - 왼쪽 클릭 시 //

        // 2-2. 현재 슬라이드 순번과 같은 블릿 표시하기
            // 2-2-1. 대상: .indic li -> indic 변수

            // 2-2-2. 현재 배너 리스트 업데이트
            clist = slide.querySelectorAll("li");
            // 오른쪽 클릭 시(seq===1) 두 번째 슬라이드[1]
            // 왼쪽 클릭 시(seq===0) 첫 번째 슬라이드[0]

            // 2-2-3. 방향 별 읽어올 슬라이드 순번으로 "data-seq" 값 읽어오기
            let cseq = clist[seq].getAttribute("data-seq");
            console.log("현재 순번:",cseq);

            // 2-2-4. 블릿 초기화
            for(let x of indic) x.classList.remove("on");

            // 2-2-5. 읽어온 슬라이드 순번의 블릿에 클래스 "on" 넣기
            // indic[순번].classList.add("on");
            indic[cseq].classList.add("on");
}; // goSlide 함수 //

    // 3. 대상에 이벤트 설정하기
    abtn.forEach((ele, idx) => {
        ele.onclick = () => {
            goSlide(idx);
        }; // click 함수 //
    }); // forEach //
} // loadFn 함수 //
