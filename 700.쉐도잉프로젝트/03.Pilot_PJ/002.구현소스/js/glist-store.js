// 전체 리스트 뷰엑스 스토어 셋팅 JS  - glist-store.js

// 전체 상품정보 불러오기
import gdata from "./gdsData/glist-items.js";

const store = new Vuex.Store({
    state: {
        // 서브데이터 셋업
        // 전체 상품정보 전역화
        gdata:gdata,

        // 필터 데이터용 배열변수
        chkarr: [true, true, true],

        // 필터 데이터용 배열입력값 변수
        selnm: ["", "", ""],

        // 페이징 변수
        pnum: 0,

        // 모어 변수
        mnum: 0,

        // 모어 버튼 표시 변수
        mbtn: true,

    },
    // state 데이터 변경 메서드 구역
    mutations: {

        // 체크박스 체크 시 처리메서드
        resCheck(dt){

            console.log(dt.chkarr);

            // 3개의 체크박스 상태배열변수값에 따라 실제 조건에 들어갈
            // cat명을 넣어줌

            // v는 배열값인 true/false값이 들어옴
            dt.chkarr.forEach((v,i)=>{

                // 체크박스 체크 시
                if(v){

                    dt.selnm[i] =

                    /* 
                        [ 중첩 3항연산자 사용 ]
                        조건1?값1 : 조건2?값2 : 최종값;
                    */ 

                    // i = 0? 이면 men
                    // i = 1? 이면 women
                    // 그것도 아니면 style
                    i==0?"men":i==1?"women":"style"

                } // if //

                // 체크박스 체크 x
                else{

                    // 무조건 빈 값을 할당
                    dt.selnm[i] = "";
                    
                } // else
                
            });
            
        }, // resCheck //

        // 페이징 변수 업데이트 메서드
        updatePaging(dt,pm){
        // pm - 업데이트 할 전달 수

            // pnum - 리스트 범위 수
            dt.pnum = pm;
            
        }, // updatePaging //

        // 모어 변수 업데이트 메서드
        updateMore(dt,pm){
        // pm - 업데이트 할 전달 수

            // mnum - 전체 리스트 범위 수
            dt.mnum = pm;

            // 업데이트 후 MORE 버튼 없애기
            $("#more").hide();
            
        }, // updateMore //
        
    }, // mutations //
});

// 내보내기
export default store;
