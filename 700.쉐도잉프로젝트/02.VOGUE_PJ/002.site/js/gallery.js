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

        // 사이즈별 슬라이드 개수, 간격 동적 변경 셋팅하기(미디어쿼리)
        // Responsive breakpoints
        breakpoints: {

            // when window width is >= 200px
            200: {
            slidesPerView: 1,
            spaceBetween: 0
            },

            // when window width is >= 700px
            700: {
            slidesPerView: 2,
            spaceBetween: 10
            },

            // when window width is >= 1000px
            1000: {
            slidesPerView: 3,
            spaceBetween: 20
            }
        }
    });

    // 테스트: 스와이퍼의 인스턴스를 생성 후 특정기능의 속성과 메서드를 사용할 수 있음
    // ex) Gallery라는 제목을 클릭하면 다음 슬라이드 보이기 기능 구현
    $(".stit").click(()=>swiper.slideNext()); // click //

}); // jQB //
