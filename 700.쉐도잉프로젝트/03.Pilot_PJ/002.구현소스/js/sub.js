// 카테고리 서브페이지 JS - sub.js

// 메뉴기능함수 가져오기
import menuFn from "./mainjs/menu.js";
// 공통 데이터 가져오기
import comData from "./tempData/data-common.js";
// 서브 데이터 가져오기
import subData from "./tempData/data-sub.js";
// 신상 정보 가져오기
import sinsang from "./gdsData/sinsang.js";
// 뷰엑스 스토어 JS 가져오기
// ※ 중요 ※ 반드시 메인 JS파일 한 군데에서 불러와야 상태관리됨
// -> 이 JS 파일에 Vue 인스턴스 생성코드가 같이 있어야 함
import store from "./store.js";
// 스와이퍼 변수
let swiper;

//###### 서브영역 메뉴 뷰 템플릿 셋팅하기 #######
// 1. 배너파트 컴포넌트
Vue.component("ban-comp", {
    template: subData.banner,
}); // 상단영역 Vue component //

// 2. 컨텐츠1 영역 컴포넌트
Vue.component("cont1-comp", {
    template: subData.cont1,
}); // 상단영역 - 컨텐츠1 Vue component //

// 3. 컨텐츠2 영역 컴포넌트
Vue.component("cont2-comp", {
    template: subData.cont2,
}); // 상단영역 - 컨텐츠2 Vue component //

// 4. 컨텐츠3 영역 컴포넌트
Vue.component("cont3-comp", {
    template: subData.cont3,
}); // 상단영역 - 컨텐츠3 Vue component //

// 5. 컨텐츠4 영역 컴포넌트
Vue.component("cont4-comp", {
    template: subData.cont4,
}); // 상단영역 - 컨텐츠4 Vue component //

//###### 서브영역 뷰 인스턴스 셋팅하기 #######
new Vue({
    el:"#cont",
    store, // 뷰엑스 스토어 등록필수!!!
}); // 상단영역 Vue component //

//###### 상단영역 메뉴 뷰 템플릿 셋팅하기 #######
// Vue.component(내가지은요소명,{옵션})
Vue.component("top-comp",{
    template:comData.tareaSub,
}); // 상단영역 Vue component //

//###### 하단영역 메뉴 뷰 템플릿 셋팅하기 #######
Vue.component("foot-comp",{
    template:comData.barea,
}); // 하단영역 Vue component //

//###### 상단영역 뷰 인스턴스 생성하기 ##########
// new Vue({옵션})
new Vue({
    el:"#top",
	// 뷰엑스 스토어 사용하려면 등록 필수
	store,
    data:{},

    // mounted 실행구역: DOM 연결 후
    mounted:function(){

        // 제이쿼리코드함수 호출
        console.log("mounted구역");

        // 메뉴기능 호출
        menuFn();

        // 스와이퍼 생성함수 호출
        makeSwiper();

        // 부드러운 스크롤 실행
        startSS();

		// 신상품 기능함수 호출
		sinsangFn();

		// 패럴렉스 적용함수 호출
		// setParallax(적용요소,속도);
		// 속도는 0.1 ~ 0.9
		setParallax(".c2",0.6);

		// 스크롤리빌 플러그인 적용 호출
		$.fn.scrollReveal();

		// 전체 메뉴 클릭 시 전체 메뉴창 닫기
		$(".mlist a").click(()=>{

			// 1. 전체 메뉴창 닫기
			$(".ham").trigger("click");

			// 2. 부드러운 스크롤 위치값 업데이트 (스크롤 튀는 현상 X)
			sc_pos = 0;

			// 3. 스와이퍼 첫 번째 슬라이드로 이동
			swiper.slideTo(0);
			// -> 첫 슬라이드 번: 스와이퍼 API 이용

			// 4. 등장액션 스크롤리빌 재호출
			$.fn.scrollReveal();

		});
		// $("선택 요소").trigger("이벤트명")
		// -> 선택 요소에 이벤트 강제 발생

		// 참고) JS 클릭 이벤트 강제 발생
		// document.querySelector(요소).click();

		// gnb 메뉴 클릭 시 해당위치로 스크롤이동 애니메이션
		// 각 .gnb a에는 href="#c2" 이런식으로 아이디 요소가 있음
		// a요소의 #아이디명 으로 기본 위치 이동은 되지만 스크롤 애니메이션은 되지 ㅇ낳음
		// 이것을 제이쿼리로 구현
		$(".gnb a").click(function(e){
			
			// 1. 기본 이동 막기
			e.preventDefault();

			// 2. 클릭된 a 요소의 href값 읽어오기
			let aid = $(this).attr("href");
			
			// 3. 아이디 요소 박스 위치 구하기
			let newpos = $().offset().top;

			console.log("이동아이디:",aid, "/위치:",newpos);

			// 4. 애니메이션 이동
			$("html,body").animate({
				scrollTop: newpos + "px"
			}, 600, "easeOutQuint"); // animate //

			// 5. 부드러운 스크롤 변수에 현재 위치값 업데이트
			sc_pos = newpos;

		}); // click //

    }, // mounted// 

    // created 실행구역 : DOM 연결 전
    created:function(){

        // DOM연결전 데이터 가공작업
        console.log("created구역");

    }, // created //

}); //////// 상단영역 뷰 인스턴스 ////////  

//###### 하단영역 뷰 인스턴스 생성하기 ##########
new Vue({
    el:"#info",
}) //////// 하단영역 뷰 인스턴스 ////////  

// 스와이퍼 플러그인 인스턴스 생성하기 ///
// 스와이퍼 생성함수
function makeSwiper(){

	swiper = new Swiper(".mySwiper", {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
			// 인터렉션 비활성화 false 
			// -> 인터렉션 활성화! (가만히두면 다시자동넘김)
		},

		pagination: {
		el: ".swiper-pagination",
		clickable: true, // 블릿클릭이동여부
		},

		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
		},
  	}
);
} /////////// makeSwiper 함수 ///////////

// 신상품 기능구현 함수
function sinsangFn(){

	/****************************************************************
		함수명: moveList
		기능: 신상품 리스트 박스를 연속하여 왼쪽 방향으로 흘러가게 함
	****************************************************************/
	// 대상: .flist = $(".flist")
	const flist = $(".flist");

	// 위치값 변수
	let lpos = 0;

	// 재귀호출 상태값 변수
	// 1 - 호출가능, 0 - 호출불가
	let call_sts = 0;
	
	// 스크롤시 상태값 변수
	// 1 - 호출가능, 0 - 호출불가
	let sc_sts = 0;

	// 재귀호출 타임아웃 변수
	let callT;

	function moveList(){
		
		// 1. 이동 위치값(left값) 감소하기
		lpos--;
		// console.log("위치값",lpos);

		// 2. 한계값 초기화 + 첫 번째 요소 맨 뒤로 이동
		if(lpos < -300){

			// 위치값 초기화
			lpos = 0;

			// 첫 번째 li 맨 뒤로 이동
			flist.append(flist.find("li").first())

		} // if //

		// 3. 이동하기
		flist.css({
			left: lpos + "px"
		})
		
		// 타임아웃 비우기
		clearTimeout(callT);

		// 재귀호출하기(비동기 호출: setTimeout)
		// 조건: call_sts 상태값이 1일 때만 호출
		if(call_sts) callT = setTimeout(moveList, 40);
		
	}; // moveList 함수 //

	// 신상품 이동함수 최초 호출
	moveList();

	// 신상품 리스트에 마우스 오버 시 멈춤
	// 신상품 리스트에 마우스 아웃 시 이동
	// hover(함수1, 함수2)
	flist.hover(
		
		// over
		function(){

			// 콜백 중단
			call_sts = 0;
		},

		// out
		function(){

			// 콜백 허용
			call_sts = 1;

			// 함수 재호출
			moveList();
		}

	); // hover //

	/*************************************************************** 
		신상품 리스트 li에 마우스 오버 시 정보 보이기

		1. 대상: .flist li
		2. 정보 구분법: li의 클래스명으로 신상품 정보와 매칭하여
		상품정보박스를 동적으로 생성하고, 애니메이션을 주어 보이게 함
	***************************************************************/
	flist.find("li").hover(

		// over
		function(){

			// 1. 클래스 정보 알아내기
			let clsnm = $(this).attr("class");
			
			// 2. 클래스 이름으로 셋팅된 신상정보 객체데이터 가져오기
			// 중간 객체속성명 상위 부모박스 #c1의 data-cat 속성값 읽어와서
			// sinsang[여기][] -> [여기]에 넣기
			let cat = $(this).parents("#c1").attr("data-cat");
			let gd_info = sinsang[cat][clsnm];
			// console.log(clsnm,gd_info);
			console.log("data-cat:",cat);

			// 3. 상품정보박스 만들고 보이게 하기
			// 마우스 오버된 li 자신 (this)에 넣어줌
			$(this).append(`<div class="ibox"></div>`);

			// 4. .ibox에 상품정보 넣기
			// ^는 특수문자이므로 정규식에 넣을 때 역슬래쉬와 함께 씀
			// -> /\^/
			$(".ibox").html(gd_info.replace(/\^/g,"<br>"))
			.animate({
				top: "105%",
				opacity: 1
			},300,"easeOutCirc"); // animate //
		},

		// out
		function(){

			// 1. .ibox 지우기
			$(".ibox").remove();
		}
		
	); // hover //

	/************************************************* 
		스크롤 위치가 신상품 박스가 보일 때만 움직이기 
	*************************************************/
	// JS의 getBoundingClientRect()의 값과 같은 것은?
	// 적용박스 offset().top 위치값 - scrollbar 위치값

	// 1. 대상요소 위치값
	let tgpos = flist.offset().top;

	// 2. 스크롤 위치 변수
	let scTop = 0;

	// 3. 화면높이값
	let winH = $(window).height();
	console.log("화면높이값:",winH);
	
	// 4. 스크롤 이벤트 함수
	$(window).scroll(function(){

		// 스크롤 위치값
		scTop = $(this).scrollTop();

		// gBCR(getBoundingClienetRect)값 구하기
		let gBCR = tgpos-scTop;

		// console.log(scTop,tgpos);
		// console.log("gBCR=",gBCR);

		// 5. 신상품 리스트 이동/멈춤 분기하기
			// 5-1. 이동기준: gBCR값이 화면 높이보다 작고, 0보다 클 때
			if(gBCR < winH && gBCR > -300 && sc_sts === 0){
				sc_sts = 1; // (한 번만 실행)
				
				// 콜백 허용
				call_sts = 1;

				// 함수 재호출
				moveList();

			} // if //

			// 5-2. 기타 경우: 멈춤
			// 조건: 윈도우 높이보다 크거나 0보다 작고 call_sts===1 일 때
			else if((gBCR > winH || gBCR < -300) && sc_sts===1){
				sc_sts = 0; // (한 번만 실행)

				// 콜백 중단
				call_sts = 0;

			} // else if //

		// 서브 배너 스와이퍼 API를 이용한 작동 멈춤 셋팅하기
		// 화면높이값 보다 스크롤위치가 크면 멈춤
		// -> 스와이퍼API : swiper.autoplay.stop()
		// 작으면 자동넘김
		// -> 스와이퍼API : swiper.autoplay.start()
		if(scTop > winH){
			swiper.autoplay.stop();
		} // if //
		
		else{
			swiper.autoplay.start();
		} // else //
			
	}); // scroll //
	
}; // sinsangFn 함수 //

// 패럴렉스 플러그인 적용하기
function setParallax(ele,speed){

	// 대상: .c2
	// parallax("배경위치",속도)
	$(ele).parallax("50%",speed);

}; // setParallax //