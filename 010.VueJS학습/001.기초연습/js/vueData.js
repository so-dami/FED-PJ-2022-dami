// 뷰JS 데이터 처리 JS - vueData.js

// 뷰엑스 스토어 불러오기
import store from "./vueData-store.js";

// 컴포넌트 생성하기
Vue.component("my-comp",{
    template: `
        <div class="grid">

            <div v-for="(v,i) in $store.state.items.data">
                <img 
                v-bind:src="
                    './img_gallery/'+v.idx+.'jpg'    
                "
                alt="dress">
                <aside>
                    <h2>{{v.gname}}</h2>
                    <h3>{{v.gprice}}</h3>
                </aside>
            </div>
    `,

    props: ["", "", ""],

    data(){
        return{
            myt: "나~",
        }
    }
})

// 뷰 인스턴스 생성하기
new Vue({
    el: "#app",
    
    // 뷰엑스 스토어 등록
    store,

    data: {
        // json 데이터 담을 변수
        items: {},
        myt: "나~"
    },

    // 뷰 인스턴스 생성 직후(가상돔/돔 생성 전)
    created(){

        // 엑시오스 사용하여 제이슨 데이터 가져오기
        // axios.get(제이슨파일).then(데이터=>담을 변수)
        axios.get("./js/data.json")
        // 스토어의 items 전역변수에 셋팅
        .then(x=>store.state.items = x);

        console.log(store.state.items);

    } // created //
})