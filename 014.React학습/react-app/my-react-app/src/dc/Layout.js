// 메인 레이아웃 컴포넌트

// 로고
import Logo from "./Logo";

// 레이아웃 CSS
import "./css/layout.css";

/*
    [ 리액트 라우터와 연결하여 사용되는 라우터 컴포넌트 ]
    
    <Link to="/경로명"></Link>
    -> to 속성의 경로는 <Route Path="/경로명"> 속성과 일치함
*/

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
                        
                        {/* 링크 */}
                        <li>
                            <Link to="/"></Link>
                        </li>

                    </ul>
                </nav>
                
            </header>
        
        </>
        
    ); // return //
    
}; // Layout 컴포넌트 //