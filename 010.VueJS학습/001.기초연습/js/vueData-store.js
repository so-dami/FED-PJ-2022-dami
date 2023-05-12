// 뷰JS 데이터 처리 뷰엑스 스토어 JS - vueData-store.js

const store = new Vuex.Store({

    // (1) 데이터 셋팅구역 :
    state:{

        // 제이슨 데이터 담을 변수
        items: {},

    }, // state //

    // (2) 데이터 변경 메서드 구역 : 
    // 호출시 commit()사용!
    mutations:{
        
    }, // mutations //

    // (3) 백엔 관련 코딩 비동기 처리 메서드 구역 : 
    // 호출시 dispatch()사용
    actions:{
        
    } // actions //

}); // 뷰엑스 인스턴스 //


// 내보내기 
export default store;