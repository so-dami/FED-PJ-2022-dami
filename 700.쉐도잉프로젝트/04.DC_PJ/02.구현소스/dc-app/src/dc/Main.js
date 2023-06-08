// 메인 페이지 컴포넌트

import Ban from "./modules/Ban";
import MenuBtn from "./modules/MenuBtn";
import VidIntro from "./modules/VidIntro";
import SwiperVid from "./plugin/SwiperVid";
import VidSwipe from "./modules/VidSwipe";

const Main = () => {
    return (
        <>
            {/* 1.배너 모듈 */}
            <Ban cat="main" />

            {/* 2. 메뉴 버튼 모듈 */}
            <MenuBtn />

            {/* 3. 비디오 소개 모듈 */}
            <VidIntro pg="main" mm="" />

            {/* 4. 비디오 스와이프 모듈 */}
            <VidSwipe pg="main" />
        </>
    );
}; /////////// Main //////////////

export default Main;