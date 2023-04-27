// 쇼핑몰 갤러리 JS - small.js

// template html코드 데이터 가져오기
import hcode from "./hcode.js";

// 뷰 JS 인스턴스 생성용 함수
const makeVue = (x) => new Vue({ el: x });

// 1. 제목에 넣을 전역 컴포넌트 만들기
Vue.component("tit-comp", {
    template: hcode.tit,
}); // 전역 컴포넌트1 //

// tit 뷰 인스턴스 생성하기: 반드시 컴포넌트 아래에서 함
makeVue(".tit");

// new Vue({
//     el:".tit"
// });

// 숫자 증감 변수
let num = 0;

// 2. (★자식★) 갤러리 리스트에 넣을 전역 컴포넌트 만들기
Vue.component("list-comp", {

    // v-on:click="goPapa"로 부모이벤트 접근시작
    template: hcode.list,

    // 부모에서 v-bind:속성명=값 으로 전달한 속성 변수를
    // props:[]/{}로 받음
    props: ["haha", "myseq", "endlet"],
    // props:{"haha":Number}, -> 데이터형 일치
    // props:{"haha":String}, -> 데이터형 오류

    // 컴포넌트 내부 변수 셋팅
    data: function () {
        return {
            gsrc: `img_gallery/${this.haha}.jpg`,
            gname: `Product23` + this.haha + this.endlet + (this.myseq % 2 ? "💛" : "💜"),
            gprice: this.insComma((13000 * this.haha) / 2) + `원`,
        };
    },

    // 컴포넌트 내부 메서드 셋팅
    methods: {

        // 부모 이벤트호출 전달하기: $emit() 메서드 사용
        goPapa() {
            // $emit("부모가만든이벤트명")
            this.$emit("hull");
        }, // goPapa //

        ovNow() {
            // 부모 요소에 v-on:gotkimchi=메서드명
            // 을 만들어서 사용함
            this.$emit("gotkimchi");
        }, // ovNow //

        // 정규식함수(숫자 세자리마다 콤마해주는 기능)
        insComma(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    },
}); // 전역 컴포넌트2 //

// (★부모★) list 뷰 인스터스 생성
new Vue({
    el: ".grid",

    // 부모 뷰 인스턴스 메서드 구역
    methods: {

        // 자식이벤트 전달 후 실행메서드
        goMsg() {
            // alert("자식이 부모에게 이벤트 전달 성공");
        },

        ovMsg() {
            // console.log("오버! ok");
        },
    },
}); // Vue 인스턴스 //

// 큰 이미지 보기 배경박스 컴포넌트 //
Vue.component("win-comp",{
    template: hcode.big
}); // win-comp 컴포넌트 //

// win-comp 뷰JS 인스턴스 생성 //
new Vue({
    el: "#pbg",

    // DOM이 모두 로딩된 후의 실행구역
    mounted:function(){

        // [ jQuery 기능 구현 ]

        // 0. 공유 번호 변수
        let nowNum = 1;
        
        // 1. 갤러리 리스트 클릭 시 큰 이미지 박스 보이기
        $(".grid>div").click(function(){

            // 1-1. 클릭된 이미지 경로 읽어오기
            let isrc = $(this).find("img").attr("src");
            console.log("click img src:",isrc);

            // 1-2. 클릭된 이미지 경로를 큰 이미지에 src로 넣기
            $(".gimg img").attr("src",isrc);
            
            // 1-3. 큰 이미지 박스 보이기
            $("#bgbx").show();
            
            // 1-4. 이전/다음 이미지 변경을 위한 data-num 속성 읽기
            nowNum = $(this).attr("data-num");
            console.log("click img num:",nowNum);
            
        }); // click //
        
        // 2. 닫기 버튼 클릭 시 큰 이미지 박스 숨기기
        $(".cbtn").click(function(e){

            // 2-0. 화면 튀는 현상 막기(기본 이동 막기)
            e.preventDefault();
            
            // 2-1. 큰 이미지 박스 숨기기
            $("#bgbx").hide();

        }); // click //

        // 3. 이전/다음 버튼 클릭 시 이미지 변경하기
        $(".abtn").click(function(e){

            // 3-0. 화면 튀는 현상 막기(기본 이동 막기)
            e.preventDefault();
            
            // 3-1. 오른쪽 버튼 여부
            let isB = $(this).is(".rb");

            // 3-2. 분기하기
                // 오른쪽 버튼
                if(isB){
                    nowNum++;

                    // 한계값 설정
                    if(nowNum===51) nowNum=1;
                    
                } // if //
                
                // 왼쪽 버튼
                else{
                    nowNum--;

                    // 한계값 설정
                    if(nowNum===0) nowNum=50;
                    
                } // else //

                console.log("변경된 nowNum:",nowNum);

            // 3-3. 큰 이미지 변경하기
            $(".gimg img").attr("src",`
                img_gallery/${nowNum}.jpg
            `);
            
        }); // click //
        
    } // mounted //

}); // win-comp 인스턴스 //