// 메인 레이아웃 컴포넌트

// 로고
import Logo from "./Logo";

// 레이아웃 CSS
import "./css/layout.css";

import { Link, Outlet } from "react-router-dom";

// 폰트어썸
import { faCamera, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/********************************************************
    [ 리액트 라우터와 연결하여 사용되는 라우터 컴포넌트 ]
    
    1. <Link to="/경로명"></Link>
    -> to 속성의 경로는 <Route Path="/경로명">와 일치함

    2. <Outlet />
    -> 라우터 연결 컴포넌트 출력자리
********************************************************/

// 객체: 데이터 내용을 구체적으로 구분하여 반복
// 배열: 데이터 단순 반복

const Layout = () => {

    // gnb 메뉴 데이터 구성 - 배열 데이터
    const gnb_data = [
        // {
        //     txt: "HOME",
        //     link: "/",
        // },
        {
            txt: "CHARACTERS",
            link: "/ct",
        },
        {
            txt: "COMICS",
            link: "/co",
            sub: [
                {
                    txt: "LATEST COMICS",
                    link: "/lc"
                },
                {
                    txt: "DC UNIVERSE INFINITE",
                    link: "/dui"
                },
                {
                    txt: "ALL COMICS SERIES",
                    link: "/acs"
                },
            ]
        },
        {
            txt: "MOVIES & TV",
            link: "/mv",
            sub: [
                {
                    txt: "DC MOVIE",
                    link: "/dm"
                },
                {
                    txt: "DC SERIES",
                    link: "/ds"
                },
                {
                    txt: "DC ON HBO MAX",
                    link: "/hbo"
                },
            ]
        },
        {
            txt: "GAMES",
            link: "/gm",
        },
        {
            txt: "NEWS",
            link: "/nw",
        },
        {
            txt: "VIDEO",
            link: "/vd",
        },
    ];

    const bmenu = [
        {
            txt: "PRIVACY POLICY",
            link: "https://www.warnermediaprivacy.com/policycenter/b2c/WM/",
        },
        {
            txt: "TERMS",
            link: "https://www.dcuniverseinfinite.com/terms?_gl=1*1cd3pj1*_gcl_au*MTE5NTcxODk4Ny4xNjg0NDc3NTQ4",
        },
        {
            txt: "AD CHOICES",
            link: "https://www.warnermediaprivacy.com/policycenter/b2c/wm/",
        },
        {
            txt: "ACCESSIBLITY",
            link: "https://policies.warnerbros.com/terms/en-us/html/terms_en-us_1.3.0.html#accessibility",
        },
    ];

    return(

        <>
        
            {/* 1. 상단 영역 */}
            <header className="top">

                {/* 네비게이션 */}
                <nav className="gnb">
                    <ul>

                        {/* 로고 */}
                        <li>
                            <Link to="/">
                                <Logo />
                            </Link>
                        </li>

                        {/* gnb 메뉴 */}
                        {
                            gnb_data.map((v,i)=>
                                <li key={i}>
                                    <Link to={v.link}>{v.txt}</Link>
                                    {/* {console.log(v.sub)} */}

                                    {/* v.sub가 없으면 undefined */}
                                    {
                                        // 조건식 && 출력코드
                                        // 조건: sub 데이터가 없지 않으면

                                        // undefined: 정의되지 않은 값
                                        // null: 빈 값
                                        // -> 위 두가지는 데이터가 없다는 하나의 값

                                        v.sub != undefined &&
                                        <div className="smenu">
                                            <ol>
                                                {
                                                    v.sub.map((v,i)=>
                                                        <li key={i}>
                                                            <Link to={v.link}>{v.txt}</Link>
                                                        </li>
                                                    )
                                                }
                                            </ol>
                                        </div>
                                    }
                                </li>
                            )
                        }

                        {/* 검색 아이콘 */}
                        <li style={{marginLeft: "auto"}}>
                            <FontAwesomeIcon icon={faSearch} />
                        </li>
                        
                        {/* 회원가입 */}
                        <li>
                            <Link to="/signup">
                                SIGN UP
                            </Link>
                        </li>

                        {/* 로그인 */}
                        <li>
                            <Link to="/login">
                                LOG IN
                            </Link>
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

                <ul>
                    <li>
                        <Logo />
                    </li>
                    <li>
                        <ol>
                            {bmenu.map((x,i)=>
                                <li key={i}>
                                    <a href={x.link} target="_blank">
                                        {x.txt}
                                    </a>
                                </li>
                            )}
                        </ol>
                    </li>
                </ul>

                All Site Content © &amp; TM DC, unless otherwise noted here.
                <br /> 
                All rights reserved.

            </footer>
    
        </>
        
    ); // return //
    
}; // Layout 컴포넌트 //

// 컴포넌트 내보내기
export default Layout;