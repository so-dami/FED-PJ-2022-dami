// 메인 페이지 컴포넌트

import React from "react";
import Ban from "./modules/Ban";
import MenuBtn from "./modules/MenuBtn";
import VidIntro from "./modules/VidIntro";

const Main = () => {

    return(

        <>
            {/* 1. 배너 모듈 */}
            <Ban cat="main" />

            {/* 2. 메뉴 버튼 모듈 */}
            <MenuBtn />

            {/* 3. 비디오 소개 모듈 */}
            <VidIntro />
        </>
        
    ); // return //
    
}; // Main //

export default Main;