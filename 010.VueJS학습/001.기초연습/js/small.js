// 쇼핑몰 갤러리 JS - small.js

// 뷰 JS 인스턴스 생성용 함수
const makeVue = (x) => new Vue({ el: x });

// 1. 제목에 넣을 전역 컴포넌트 만들기
Vue.component("tit-comp", {
    template: `
        <strong>
            <span>Vue JS 💘 Shopping mall</span>
        </strong>
    `,
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
    template: `
        <div>
            <img v-bind:src="gsrc" v-on:click="goPapa" v-on:mouseover="ovNow" alt="dress">
            <aside>
                <h2>{{gname}}</h2>
                <!-- <h2 v-text="gname"></h2> -->
                <h3>{{gprice}}</h3>
            </aside>
        </div>
    `,

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
            alert("자식이 부모에게 이벤트 전달 성공");
        },

        ovMsg() {
            console.log("오버! ok");
        },
    },
}); // Vue 인스턴스 //

// 큰 이미지 보기 배경박스 컴포넌트 //
Vue.component("win-comp"),{
    template:`
        <!-- 큰이미지 배경박스 -->
        <div id="bgbx">
            <!-- 오른쪽버튼 -->
            <a href="#" class="abtn rb">
                <span class="ir">오른쪽버튼</span>
            </a>
            <!-- 왼쪽버튼 -->
            <a href="#" class="abtn lb">
                <span class="ir">왼쪽버튼</span>
            </a>
            <!-- 닫기버튼 -->
            <a href="#" class="cbtn">
                <span class="ir">닫기버튼</span>
            </a>
            
            <!-- 큰이미지 박스 -->
            <div id="imbx">
                <!-- 큰 이미지 -->
                <img src="img_gallery/50.jpg" alt="큰 이미지">
                <!-- 이미지 설명 -->
                <h4></h4>
            </div>
        </div>
    `
}; // win-comp 컴포넌트 //

// win-comp 뷰JS 인스턴스 생성 //
new Vue({
    el: "#pbg",
}); // win-comp 인스턴스 //