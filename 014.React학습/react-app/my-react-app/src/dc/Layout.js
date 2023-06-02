// 메인 레이아웃 컴포넌트

// 로고
import Logo from "./Logo";

// 레이아웃 CSS
import "./css/layout.css";

import { Link, Outlet } from "react-router-dom";

/********************************************************
    [ 리액트 라우터와 연결하여 사용되는 라우터 컴포넌트 ]
    
    1. <Link to="/경로명"></Link>
    -> to 속성의 경로는 <Route Path="/경로명">와 일치함

    2. <Outlet />
    -> 라우터 연결 컴포넌트 출력자리
********************************************************/

const Layout = () => {

    return(

        <>
        
            {/* 1. 상단 영역 */}
            <header className="top">

                {/* 네비게이션 */}
                <nav className="gnb">
                    <ul>

                        {/* 로고 */}
                        <li>
                            <Logo />
                        </li>

                        {/* gnb 메뉴 */}
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/ct">CHARACTERS</Link>
                        </li>
                        <li>
                            <Link to="/co">COMICS</Link>
                        </li>
                        <li>
                            <Link to="/mv">MOVIES & TV</Link>
                        </li>
                        <li>
                            <Link to="/gm">GAMES</Link>
                        </li>
                        <li>
                            <Link to="/nw">NEWS</Link>
                        </li>
                        <li>
                            <Link to="/vd">VIDEO</Link>
                        </li>

                    </ul>
                </nav>
                
            </header>

            {/* 2. 메인 영역 */}
            <main className="cont">

                {/* 출력 파트: 각 페이지의 컴포넌트 출력 */}
                <Outlet />
                
            </main>

            {/* 3. 하단 영역 */}
            <footer className="info">
                All Site Content © &amp; TM DC, unless otherwise noted here.
                <br /> 
                All rights reserved. 
            </footer>
    
        </>
        
    ); // return //
    
}; // Layout 컴포넌트 //

// 컴포넌트 내보내기
export default Layout;