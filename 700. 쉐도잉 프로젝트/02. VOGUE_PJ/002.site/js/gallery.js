// 보그 PJ - 갤러리 JS : gallery.js

// jQB //
$(() => {
    let swiper = new Swiper(".mySwiper", {
        
        // 한 화면에 보이는 슬라이드 수
        slidesPerView: 3,
        
        // 슬라이드 사이 간격(단위: px)
        spaceBetween: 30,

        // 슬라이드 그룹(개수단위로 넘어감!)
        slidesPerGroup: 1,

        // 무한루프(기본값:false)
        loop: true,

        // 한 화면 단위지정시 단위보다 그룹이 작을 경우 빈칸을 채움(무한루프 설정 시 true로 해놓는 게 좋음)
        loopFillGroupWithBlank: true,

        // 블릿설정
        pagination: {
            // 블릿요소설정
            el: ".swiper-pagination",
            // 클릭가능여부
            clickable: true,
        },

        // 양쪽이동버튼
        navigation: {
            // 다음버튼 요소설정
            nextEl: ".swiper-button-next",
            // 이전버튼 요소설정
            prevEl: ".swiper-button-prev",
        },

        // 자동넘김설정
        autoplay: {
            // 시간 간격(1/1000초)
            delay: 2000,
            // 상호작용(건드리는 것!)이 없으면 다시 재시작(false일때)
            // true - 드래그 하려고 슬라이드 건들면 자동넘김 멈춤
            // false - 드래그 하려고 슬라이드 건들여도 다시 안 건들면 일정시간 후에 자동넘김 재시동
            disableOnInteraction: false,
        },
    });

}); // jQB //
