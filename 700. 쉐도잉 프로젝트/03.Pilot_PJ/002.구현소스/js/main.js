// 파일럿 PJ 메인페이지 JS - main.js

/* 
    [ 메인 페이지 주요 기능 ]

    1. 자동스크롤 기능 구현
        1-1. 페이지 도착 후 등장액션 구현

    2. 햄버거버튼 전체 메뉴 보이기/숨기기
        2-1. 보이기: 전체 메뉴 배경 동영상 보이기
        2-2. 숨기기: 전체 메뉴 배경 동영상 멈추기
    
    3. 배너 터치 기능 넘기기(제이쿼리 UI 이용)
        3-1. 배너별 타이틀 등장하기
        3-2. 양쪽 이동버튼 플러그인 적용하기
*/

// 자동스크롤 기능 함수 가져오기
import autoScroll from "./jquery-autoScroll.js";

// 자동스크롤 호출
autoScroll();

// 햄버거 버튼 클릭 시 전체 메뉴 보이기
$(".ham").click(function(){

    // 햄버거 버튼 클래스 변경(토글)
    $(this).toggleClass("on");

    // 전체 메뉴 보이기
    $(".mbox").fadeToggle(400);

    // 햄버거 버튼에 클래스 on이 있으면 재생, 없으면 정지
    let isOn = $(this).is(".on");
    console.log(isOn);
    
    if(isOn) $(".bgm").get(0).play();
    else $(".bgm").get(0).pause();
    // -> audio, video 요소 선택 시 get(순번)을 사용하는 것은
    // 같은 이름의 클래스를 사용할 경우 순서대로 요소를 담는다.
    
}); // click //

/* 
    [ 터치 배너 기능 구현하기 ]
    
    1. 원리: 제이쿼리 UI를 이용하여 x축으로만 드래그가 되도록 설정 후 위치값을 체크하여 드래그가 끝난 시점에 자동위치이동 애니메이션을 처리해줌

    2. 대상: .slide

    3. 기준
        3-1. 왼쪽방향이동: 기준값(-100%) 보다 -10% 작은 경우(-110%)
        3-2. 오른쪽방향이동: 기준값(-100%) 보다 10% 큰 경우(90%)
        3-3. 제자리이동: 양쪽 기준값 사이일 때 (-110% ~ 90%)

    4. 구현 시 주의사항
        4-1. % 단위는 모두 px 단위로 변환하여 사용
        4-2. 배너 크기가 윈도우 가로크기와 같음 -> 이것을 활용함

*/

// 1. 대상 선정
const slide = $(".slide");

// 2. 드래그 설정
slide.draggable({

    // x축 고정
    axis: "x"
    
}); // daraggable //

// 윈도우 크기 리턴함수
const reWin = () => $(window).width();

// 리사이즈 업데이트
$(window).resize(()=>{
    winW=reWin();
    console.log("winW:",winW);
})

// 3. 드래그가 끝난 후 -> dragstop 이벤트 발생
// 기준 위치 체크 후 이동 애니메이션 처리

    // 3-1. 윈도우 가로크기: left 기준 위치 px 변환
    let winW = reWin();
    console.log("winW*0.9:",winW*0.9);
    console.log("winW:",winW);
    console.log("winW*1.1:",winW*1.1);

    // 광드래그 방지 위해 커버 셋팅(show();, hide();)
    const cover = $(".cover");

    // 3-2. 드래그 끝난 후 이벤트 함수 만들기
    slide.on("dragstop",function(){

        // (0) 광드래그 방지 위해 커버 보이기
        cover.show();

        // (1) 슬라이드 left 위치값
        let sleft = $(this).offset().left;
        console.log("dragstop", sleft);

        // (2) 왼쪽으로 이동: -110% 미만일 때
        if(sleft < -winW*1.1){
            slide.animate({
                left: -winW*2+"px"
            },600,"easeOutQuint",()=>{

                // 이동 후 맨 앞 li 맨 뒤로 이동
                slide.append(slide.find("li").first())
                .css({left:"-100%"});

                // 커버 제거
                cover.hide();

                // 배너타이틀 함수
                showTit();
                
            }); // animate //

            // 블릿 변경하기 호출
            addOn(2);
            // -> 왼쪽 이동이므로 0번째 슬라이드
            
        } // if - 왼쪽 이동 //

        // (3) 오른쪽으로 이동: -90% 초과일 때
        else if(sleft > -winW*0.9){
            slide.animate({
                left: "0px"
            },600,"easeOutQuint",()=>{

                // 이동 후 맨 뒤 li 맨 앞으로 이동
                slide.prepend(slide.find("li").last())
                .css({left: "-100%"});

                // 커버 제거
                cover.hide();

                // 배너타이틀 함수
                showTit();

            }); // animate //
                
                // 블릿 변경하기 호출
                addOn(0);
                // -> 오른쪽 이동이므로 0번째 슬라이드

        } // else if - 오른쪽 이동 //

        // (4) 제자리로 이동: -110% ~ -90%
        else{
            slide.animate({
                left: winW+"px"
            },300,"easeOutQuint",()=>{

                // 커버 제거
                cover.hide();
                
            }); // animate //
        } // else - 제자리 이동 //
        
    }) // slide //

/* 
    [ 터치 배너 이동 시 블릿 변경하기 ]
    
    - 방법: 잘라서 이동되는 li의 고유 순번을 사용자정의 속성으로 처음에 설정 후 슬라이드 이동하면 그 속성값을 읽어서 블릿 순번에 반영

*/

// 1. 사용자정의 순번 속성 대상: .slide li
// 제이쿼리: for문 순회 메서드 - each(순번,요소)

// 배너 li
const blist = slide.find("li");
// 배너 객수
const bcnt = blist.length;

blist.each((idx,ele)=>{
    console.log(idx,bcnt);

    // 처음 것을 마지막 순번으로 넣기
    if(idx===0)
        $(ele).attr("data-seq",bcnt-1);
    
    // 두 번째부터 끝까지 0부터(1작음)
    else
        $(ele).attr("data-seq",idx-1);
    
}); // each //

/* 
    [ 블릿 on 넣기 함수 ]

    1. 오른쪽으로 이동할 경우
    -> 0번째 슬라이드의 data-seq값

    2. 왼쪽으로 이동할 경우
    -> 2번째 슬라이드의 data-seq값

    3. 위의 선택값으로 블릿의 li 순번에 on 넣고 나머지는 뺌
*/

// 대상 선정: .bindic li
const bindic = $(".bindic li");

function addOn(seq){
// seq - 읽을 슬라이드 순번

    // 방향은 어떻게 알지?
    // 0 - 오른쪽, 2 - 왼쪽

    // 1. 해당 슬라이드 data-seq 읽어오기
    let dseq = slide.find("li").eq(seq).attr("data-seq");
    console.log("슬라이드 data-seq:",dseq);

    // 2. 해당 슬라이드와 동일한 순번 블릿에 on 넣기
    bindic.eq(dseq).addClass("on")
    .siblings().removeClass("on");
    
}; // addOn //

// 각 배너 등장 타이틀 셋팅 //
let bantxt = {
    "ban1": "Men's Season<br>Collection",
    "ban2": "2023 Special<br>Collection",
    "ban3": "GongYoo<br>Collection",
    "ban4": "T-Shirt<br>Collection",
    "ban5": "Shoes<br>Collection",
    "ban6": "Wind Jacket<br>Collection"
}; // bantxt객체 //

/* 
    함수명: showTit
    기능: 각 배너 타이틀 보이기
    호출: 배너 이동 후 콜백함수에서 호출함
*/
function showTit(){

    // 배너 이동 후 호출하여 해당 배너의 순번에 맞는
    // 타이틀을 동적으로 생성하여 애니메이션 함

    // 주인공 배너
    const mainban = slide.find("li").eq(1);
    
    // 1. 도착 후엔 항상 두 번째 슬라이드가 주인공
    // -> 슬라이드 순번은 1
    // 슬라이드 클래스명 읽어오기(타이틀 클래스명과 연관됨)
    let clsnm = mainban.attr("class");

    // 2. 클래스명에 해당하는 객체값 읽어오기
    let bantit = bantxt[clsnm];
    
    // 호출확인
    console.log("배너타이틀",clsnm,bantit);

    // 모든 추가 타이틀 지우기
    $(".btit").remove();
    
    // 3. 타이틀을 넣을 요소를 배너에 추가하기
    mainban.append(`<h2 class="btit"></h2>`);

    // 배너 타이틀 left 위치 변수 처리
    // ban2, ban3만 오른쪽에 위치하게
    let lval = "35%";
    if(clsnm==="ban2"||"bane") lval="70%";
    
    // 4. 해당 배너 h2 태그에 배너 타이틀 넣기
    mainban.find(".btit").html(bantit)
    .css({
        position: "absolute",
        top: "55%", // 약간 아래로
        left: lval,
        transform: "translate(-50%,-50%)",
        font: "bold 4.5vmax Verdana",
        color: "#fff",
        textShadow: "1px 1px 3px #777",
        whiteSpace: "nowrap",
        opacity: 0 // 처음에 투명
    }) // css //
    
    // 3. 배너 등장 애니메이션 넣기
    .animate({
        top: "50%",
        opacity: 1
    },1000,"easeInOutQuart"); // animate //
    
}; // showTit //

// 첫 번째 배너를 위한 타이틀 함수 최초 호출
setTimeout(showTit,1000);

// 타임아웃변수
let banAgain;

// 자동 넘김 지우기 함수
const clearAuto = () => {

    clearInterval(banAuto);
    clearTimeout(banAgain);
    banAgain = setTimeout(banAutoSlide,5000);
    
}; // clearAuto //

// 배너 이동 시 자동 넘김 지우기 셋팅
slide.on("mousemove dragstart dragstop",clearAuto);

// 자동 넘김 인터발 셋팅
// 변수에 담아 정지하기
let banAuto;

const banAutoSlide = () => {

    banAuto= setInterval(()=>{
        slide.animate({
            left: -winW*2+"px"
        },600,"easeOutQuint",()=>{
    
            // 이동 후 맨 앞 li 맨 뒤로 이동
            slide.append(slide.find("li").first())
            .css({left:"-100%"});
    
            // 커버 제거
            cover.hide();
    
            // 배너타이틀 함수
            showTit();
            
        }); // animate //
    
        // 블릿 변경하기 호출
        addOn(2);
        // -> 왼쪽 이동이므로 0번째 슬라이드
        
    },3000);
    
}; // banAutoSlide //

// 자동 넘김 최초 호출
banAutoSlide();