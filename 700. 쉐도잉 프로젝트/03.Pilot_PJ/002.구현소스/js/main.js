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
        console.log("drag stop", sleft);

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
                
            }); // animate //
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
                
            }); // animate //
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