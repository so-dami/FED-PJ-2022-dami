// 파일럿 PJ 메인페이지 JS - main.js

// 자동스크롤 기능 함수 가져오기
import autoScroll from "./jquery-autoScroll.js";

// 메뉴 기능함수 가져오기
import menuFn from "./mainjs/menu.js";

// 배너 기능함수 가져오기
import banFn from "./mainjs/ban.js";

// 공통 데이터 가져오기
import comData from "./tempData/data-common.js";

// 상단영역 메뉴 뷰템플릿 셋팅하기
// Vue.component("내가지은요소명",{옵션})
Vue.component("top-comp",{
    template: comData.tarea,
}) // 상단영역 Vue component //

// 하단영역 메뉴 뷰템플릿 셋팅하기
// Vue.component("내가지은요소명",{옵션})
Vue.component("foot-comp",{
    template: comData.barea,
}) // 하단영역 Vue component //

// 상단영역 Vue 인스턴스 생성하기 //
// new Vue({옵션})
new Vue({
    el: "#top",
    data: {},

    // created 실행구역: DOM 연결 전
    created: function(){
        console.log("created 구역")

        // DOM 연결 전 데이터 가공 작업
        
    },

    // mounted 실행구역: DOM 연결 후
    mounted: function(){
        console.log("mounted 구역")

        // 제이쿼리코드 함수 호출
            // 자동스크롤
            autoScroll();
            // 메뉴 기능
            menuFn();
            // 배너 기능
            banFn();
    }
}); // 상단영역 Vue 인스턴스 //

// 하단영역 Vue 인스턴스 생성하기 //
// new Vue({옵션})
new Vue({
    el: "#info",
}); // 하단영역 Vue 인스턴스 //

// 파일럿 PJ 메인 페이지 JS - main.js

/*************************************************** 
    [ 메인 페이지 주요 기능 ]

    1. 자동스크롤 기능 구현 (ok)
    + 페이지 도착후 등장액션 구현

    2. 햄버거버튼 전체메뉴 보이기/숨기기(OK)
    + 전체메뉴 배경동영상 보일때만 재생(숨길때 멈춤)

    3. 배너 터치기능 넘기기 (제이쿼리 UI이용)
    + 배너별 타이틀 등장하기
    + 양쪽 이동버튼 플러그인 적용하기

***************************************************/