// 메인 레이아웃 컴포넌트

// 로고
import Logo from "./Logo";

// 레이아웃 CSS
import "./css/layout.css";

import { Link, Outlet } from "react-router-dom";

// 폰트어썸
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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
            link: "/co1",
            sub: [
                {
                    txt: "LATEST COMICS",
                    link: "/co1",
                },
                {
                    txt: "DC UNIVERSE INFINITE",
                    link: "/co2",
                },
                {
                    txt: "ALL COMICS SERIES",
                    link: "/co3",
                },
            ],
        },
        {
            txt: "MOVIES & TV",
            link: "/mv",
            sub: [
                {
                    txt: "DC MOVIES",
                    link: "/mv",
                },
                {
                    txt: "DC SERIES",
                    link: "/mv",
                },
                {
                    txt: "DC ON HBO MAX",
                    link: "/mv",
                },
            ],
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

    // 하단 링크 데이터 셋업
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
        {
            txt: "COOKIE SETTINGS",
            link: "https://www.dc.com/#compliance-link",
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
                                <Logo gb="top" />
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
                        <Logo gb="bottom" />
                    </li>
                    <li>
                        <ol className="bmenu">

                            {bmenu.map((v,i)=>
                                <li key={i}>
                                    <a href={v.link} target="_blank">
                                        {v.txt.toUpperCase()}
                                    </a>
                                </li>
                            )}

                        </ol>
                    </li>

                    <li>© & ™ DC. ALL RIGHTS RESERVED</li>
                    
                </ul>
            </footer>
    
        </>
        
    ); // return //
    
}; // Layout 컴포넌트 //

// 컴포넌트 내보내기
export default Layout;