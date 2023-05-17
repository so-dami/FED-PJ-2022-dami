// 전체 리스트 페이지 JS - glist.js

// 메뉴기능함수 가져오기
import menuFn from "./mainjs/menu.js";

// 전체 리스트 태그 데이터 가져오기
import comData from "./tempData/data-glist.js";

// 전체 리스트 뷰엑스 스토어 JS 가져오기
// 중요! 반드시 메인JS파일 한군데서 불러와 써야 상태관리됨!
// -> 이 JS파일에 Vue 인스턴스 생성코드가 같이 있어야한다!
import store from "./glist-store.js";

// 전체 리스트 라우터 JS 가져오기
import router from "./glist-router.js";

// 1. 뷰 템플릿 만들기
    // ###### 상단영역 메뉴 뷰 템플릿 셋팅하기 #######
    // Vue.component(내가 지은 요소명,{옵션})
    Vue.component("top-comp", {
        template: comData.tarea,
        methods: {},
    }); // 상단영역 Vue component //

    // ###### 하단영역 메뉴 뷰 템플릿 셋팅하기 #######
    Vue.component("foot-comp", {
        template: comData.barea,
    }); // 하단영역 Vue component //

// 2. 뷰 인스턴스 생성하기
new Vue({

    el: ".wrap",
    
    // 스토어 등록
    store,

    // 라우터 등록
    router,

    mounted(){

        // push('실행 vue router 경로'): 라우터용 메서드
        // $router - 전체 라우터 객체
        // 비교) $route - 개별 경로 정보 객체
        
        // 첫 번째 라우터 강제 실행
        this.$router.push('/glist');

        // 최초 체크박스체크 메서드 실행해야 리스트 나옴
        store.commit('resCheck');

        // 메뉴 기능
        menuFn();

        // 로고 이동 기능
        $("#logo").click(() => (location.href = "index.html"));
        
    }, // mounted //
    
}); // 뷰 인스턴스 //