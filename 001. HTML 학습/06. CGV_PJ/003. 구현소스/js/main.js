// CGV PJ 메인 페이지 JS - main.js\

// 요소 선택함수 ///////////////
const qs =  x => document.querySelector(x);
const qsa =  x => document.querySelectorAll(x);

////////// 로드 구역 //////////

window.addEventListener("DOMContentLoaded",()=>{
    console.log("complete");

    /***************************************
     
        [ 포스터 메뉴 클릭 시 클래스 주기]

        - 포스터 메뉴 클릭 시 해당 li에 클래스
        "on"을 주고 나머지 li는 "on"을 모두 지
        워서 선택된 li만 일어서있는 css가 적용
        되게 한다.

    ***************************************/
   // 1. 대상 선정: .mlis ul>li -> 이벤트 + 변경대상 일치
   const mlist = qsa(".mlist ul>li");
   // console.log(mlist);
   
   // 2. 클릭이벤트 함수 설정
   // for of문 사용 -> 배열/컬렉션
   for(let x of mlist){ // x = 각 li요소
    x.onclick = ()=>{

        // li에 클래스 초기화
        mlist.forEach(ele=>ele.classList.remove("on"));
        // forEach((요소,순번,객체)=>{코드});

        // 클릭된 li에 클래스 "on" 넣기
        x.classList.add("on");
        // classList 객체 사용
        // add() 메서드 사용

    }; // click 함수 ///////////////
   } // for of문 //////////////////

   /***************************************
        [ 극장가는 길 구글맵 보기 기능 ]
        - 극장가는 길 박스 클릭 시 구글맵 등장
        - 구글맵 박스의 닫기버튼 클릭 시 구글맵 퇴장
        -> 방법: css셋팅된 클래스 "on" 넣기/빼기
   ***************************************/
    // 1. 대상선정
        // 1-1. 이벤트 대상: .anibx -> 애니메이션 버튼 박스
        const anibx = qs(".anibx");
        // 1-2. 이벤트 대상: .cbtn -> 구글맵 닫기 버튼
        const cbtn = qs(".cbtn");
        // 1-3. 변경 대상: .gmap -> 구글맵 박스
        const gmap = qs(".gmap");

        // console.log(anibx,gmap,cbtn);

    // 2. 버튼에 클릭이벤트 설정하기
        // 2-1. 극장가는 길 클릭 시 구글맵 박스에 클래스 넣기
        anibx.onclick = ()=>{
            gmap.classList.add("on");
            anibx.classList.add("on");
        };
        // 2-2. × 클릭 시 구글맵 박스에 클래스 빼기(구글맵 박스 닫기)
        cbtn.onclick = ()=>{
            gmap.classList.remove("on");
            anibx.classList.remove("on");
        };

    /***************************************
        [ SNS 링크 연결하기 ]
    ***************************************/
   
   // 1. 대상 선정: .sns a
   const sns = qsa(".sns a");

   // 2. 클릭 이벤트 설정
   // forEach((요소,순번,객체)=>{코드});
   sns.forEach((ele)=>{
        ele.onclick=()=>{
            // 2-1. 내부 텍스트
            let btxt = ele.innerText;
            // console.log(btxt);

            // 2-2. 분기문 url 할당하기
            // 이동주소 변수
            let url="";
            switch(btxt){
                case "페이스북 바로가기": url="http://www.facebook.com/CJCGV"; break;
                case "트위터 바로가기": url="https://twitter.com/CGV_ID"; break;
                case "인스타그램 바로가기": url="https://www.instagram.com/cgv_korea/"; break;
            } ////////// swich case문 //////////

            // 2-3 . 새 창으로 페이지 이동하기
            // 새창 -> window.open()
            // 페이지 이동 -> location.href=url값
            window.open().location.href=url;

        }; ////////// click 함수 //////////
   }); ////////// forEach //////////
}); ////////// 로드 구역 //////////