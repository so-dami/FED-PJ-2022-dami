// 메인 레이아웃 컴포넌트

// 로고
import Logo from "./Logo";

// 레이아웃 CSS
import "./css/layout.css";

import { Link, Outlet } from "react-router-dom";
import { gnb_data, bmenu } from "./data/common";

// 폰트어썸
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";
import ScrollTop from "./common/ScrollTop";

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

    // 자식 컴포넌트 값 전달 테스트
    const callMe = (x) => {

        console.log("누구?",x);
        
    }; // callMe //

    // 로그인 상태 Hook 변수: 로컬스 "minfo" 할당
    const [logSts,setLogSts] = useState(localStorage.getItem("minfo"));

    // 로그인 환영 메시지 Hook 변수
    const [logMsg,setLogMsg] = useState("");

    // 로그인 환영 메시지 스타일
    const logstyle = {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)"
    }; // logstyle //

    // 로그인 셋팅 함수
    // -> ScrollTop.js의 useEffect 함수 구역에서 호출
    const setLogin = () => {

        // 1. 로그인 Hook 변수 업데이트
        setLogSts(localStorage.getItem("minfo"));

        // 2. 로컬스 값이 null이 아니면 메시지 뿌리기
        if(localStorage.getItem("minfo")){

            // 메시지 셋팅하기: 객체 안의 "unm" 속성이 사용자 이름
            setLogMsg("Welcome " + 
            JSON.parse(localStorage.getItem("minfo"))["unm"]);
            
        } // if //
        
    }; // setLogin //

    // 로그아웃 함수
    // -> LOGOUT 버튼에서 호출
    const logout = () => {

        // 1. 로컬스 "minfo" 삭제하기
        localStorage.removeItem("minfo");

        // 2. 로그인 상태 Hook 변수 업데이트 하기
        setLogSts(null);
        console.log("로그아웃",logSts);
        
    }; // logout //

    return(

        <>
            {/* 라우터 갱신될때 스크롤 상단이동 모듈 작동
                + 로그인 셋팅 함수 호출 전달하기, 자식에게 setLogin 함수 전달 */}
			<ScrollTop sfn={setLogin} />
        
            {/* 1. 상단 영역 */}
            <header className="top">

                {/* 로그인 환영 메시지 - 조건: logSts 값이 null이 아니면 */}
                {
                    logSts !== null &&
                    <div className="logmsg" style={logstyle}>
                        {logMsg}
                    </div>
                }
                

                {/* 네비게이션 */}
                <nav className="gnb">
                    <ul>

                        {/* 로고 */}
                        <li>
                            <Link to="/main">
                                <Logo gb="top" tt={callMe} />
                            </Link>
                        </li>

                        {/* gnb 메뉴 */}
                        {gnb_data.map((v, i) => (
                            <li key={i}>
                                <Link to={v.link}>{v.txt}</Link>
                                {/* {console.log(v.sub)} */}
                                {/* v.sub가 없으면 undefined */}
                                {
                                    // 조건식 && 출력코드
                                    // 조건: sub 데이터가 없지 않으면
                                    // undefined - 정의되지 않은 값
                                    // null - 빈 값
                                    // 위의 두 가지는 데이터가 없다는 값임
                                    v.sub != undefined && (
                                        <div className="smenu">
                                            <ol>
                                                {v.sub.map((v, i) => (
                                                    <li key={i}>
                                                        <Link to={v.link}>{v.txt}</Link>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    )
                                }
                            </li>
                        ))} 

                        {/* 검색 아이콘 */}
                        <li style={{marginLeft: "auto"}}>
                            <FontAwesomeIcon icon={faSearch} />
                        </li>

                        {/* 회원가입, 로그인은 로그이 아닌 상태일 때만 */}
                        {logSts === null &&

                            <>
                                {/* 회원가입 */}
                                <li>
                                    <Link to="/mem">Join Us</Link>
                                </li>

                                {/* 로그인 */}
                                <li>
                                    <Link to="/login">LOGIN</Link>
                                </li>
                            </>
                        }

                        {/* 로그아웃은 로그인 상태일 때만 */}
                        {
                            logSts !== null &&

                            <>
                                {/* 로그아웃 */}
                                <li>
                                    <a href="#" onClick={logout}>
                                        LOGOUT
                                    </a>
                                </li>
                            </>
                        }
                        
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
                        <Logo gb="bottom" tt={callMe} />
                    </li>
                    <li>
                        <ol className="bmenu">
                            
                            {bmenu.map((v, i) => (
                                <li key={i}>
                                    <a href={v.link} target="_blank">
                                        {v.txt.toUpperCase()}
                                    </a>
                                </li>
                            ))}

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