// 메인 페이지 컴포넌트

import Ban from "./modules/Ban";
import MenuBtn from "./modules/MenuBtn";
import VidIntro from "./modules/VidIntro";
import SwiperVid from "./plugin/SwiperVid";
import VidSwipe from "./modules/VidSwipe";

const Main = () => {
    return (
        <>
            {/* 1.배너 모듈: 랜덤 수로 데이터 선택 변경 */}
            <Ban cat={"main"+Math.ceil(Math.random()*2)} />

            {/* 2. 메뉴 버튼 모듈 */}
            <MenuBtn />

            {/* 3. 비디오 소개 모듈 */}
            <VidIntro pg="main" mm="" />

            {/* 4. 비디오 스와이프 모듈 */}
            <VidSwipe pg="main" tit="LATEST TRAILERS, CLIPS & MORE" />

            {/* 5. 메뉴 스와이프 모듈 */}

            {/* 6. 배너 모듈(캐릭터) */}
            <Ban cat="CHARACTERS" />

            {/* 7. 메뉴 스와이프 모듈 */}

            {/* 8. 메인 하단 모듈 */}

        </>
    );
}; /////////// Main //////////////

// 데이터 내보내기
export default Main;