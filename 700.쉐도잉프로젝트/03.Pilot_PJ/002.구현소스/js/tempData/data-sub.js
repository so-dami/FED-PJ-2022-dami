// 서브 data 객체 셋팅 JS - data-sub.js

const subData = {

    // 배너 영역
    banner: `
        <section id="ban" class="page">
            <!-- Swiper -->
            <div class="swiper mySwiper">
            
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="v in $store.state.cnt" v-bind:key="v">
                        <img v-bind:src="
                            './images/sub/'+
                            $store.state.cat +
                            '/banner/ban' +
                            v +
                            '.png'" 
                        alt="서브배너이미지"/>
                    </div>
                </div>

                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
            </div>
        </section>
    `,
    
    // 컨텐츠 영역1: new arrivals
    cont1: ``,

    // 컨텐츠 영역2: special
    cont2: ``,

    // 컨텐츠 영역3: 일반 소개1
    cont3: ``,

    // 컨텐츠 영역4: 일반 소개2
    cont4: ``,
    
}; // subData //

// 내보내기
export default subData;