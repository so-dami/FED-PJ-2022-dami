// 로그인 페이지 컴포넌트 - LogIn.js
// 회원가입과 디자인 동일
import { useState } from "react";
import "./css/member.css";
import $ from 'jquery';
import { clearData, initData } from "./fns/fnMem";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
    
    // 라우트 이동 메서드
    let goRoute = useNavigate();
    
    // [ 후크 useState 메서드 세팅 ]
    // [ 1. 입력 요소 후크 변수 ]

    // 1. 아이디 변수
    const [userId, setUserId] = useState("");

    // 2. 비밀번호 변수
    const [pwd, setPwd] = useState("");

    // [ 2. 에러 상태값 후크 변수 ]
    // -> 에러 상태값 변수: 초기값은 에러 아님 상태(false)

    // 1. 아이디 에러 변수
    const [userIdError, setUserIdError] = useState(false);

    // 2. 비밀번호 에러 변수
    const [pwdError, setPwdError] = useState(false);

    // [ 아이디 관련 메시지 프리셋 ]
    const msgTxt = [

        // 필수 입력
        "This is a required entry.",

        // 아이디가 존재하지 않음
        "ID does not exist.",

        // 패스워드 불일치
        "Password does not match."
    ];

    // 후크 변수 메서드
        // 아이디 메시지
        const [idMsg, setIdMsg] = useState(msgTxt[0]);
        
        // 패스워드 메시지
        const [pwdMsg, setPwdMsg] = useState(msgTxt[0]);

    // [ 3. 유효성 검사 메서드 ]

    // 1) 아이디 유효성 검사
    const changeUserId = (e) => {
        // 빈값 체크
        if (e.target.value !== "") setUserIdError(false); // 에러 아님 상태
        else {
            
            setIdMsg(msgTxt[0]);
            setUserIdError(true);

        }; // 에러 상태

        // (2) 실제 입력값 반영하기
        setUserId(e.target.value);
    }; // changeUserId //

    // 2) 패스워드 유효성 검사
    const changePwd = (e) => {
        // 빈값 체크
        if (e.target.value !== "") setPwdError(false); // 에러 아님 상태
        else {
            
            setPwdMsg(msgTxt[0]);
            setPwdError(true);

        }; // 에러 상태

        // (2) 실제 입력값 반영하기
        setPwd(e.target.value);
    }; // chagePwd //

    // 3) 전체 유효성 검사 함수
    const totalValid = () => {
        // 모든 입력창 검사(빈 값일 경우 모두 에러를 후크 변수에 전달)
        if (!userId) setUserIdError(true);
        if (!pwd) setPwdError(true);

        // 통과 조건
        // -> 빈 값이 아님
        // -> 에러 후크 변수가 모두 false
        // -> 위의 조건 모두 충족 시 true값 리턴
        if (
            userId &&
            pwd &&
            !userIdError &&
            !pwdError 
        )
            return true;

        // 하나라도 에러면 false값 리턴
        else return false;

    }; // totalValid //

    // 7) Submit 기능 함수
    const onSubmit = (e) => {
        // 기본 submit 기능 막기
        e.preventDefault();
        console.log("submit!");

        // 유효성 검사 전체 통과 시
        if (totalValid()) {

            console.log("로그인 성공");

            // 데이터 체크 초기화
            initData();

            // 로컬스 "mem-data" 데이터 확인
            let memData = localStorage.getItem("mem-data");
            
            // 로컬스 데이터 객체화
            memData = JSON.parse(memData);
            console.log(memData);

            // 같은 아이디 검사 상태 변수
            let isOK = true;

            // 입력 데이터 중 아이디 비교
            memData.forEach(v => {

                // 같은 아이디가 있는가?
                if(v["uid"] === userId){

                    console.log("ID 같음");

                    // 아이디 에러 상태 업데이트
                    setUserIdError(false);

                    // 같은 아이디 검사 상태 변수 변경
                    isOK = false;

                    // 비밀번호가 일치하는가?
                    if(v["pwd"] === pwd){

                        console.log("PW 같음");

                        // 패스워드 에러 상태 업데이트
                        setPwdError(true);
                        $(".sbtn").text("success");

                        // [ 로그인 후 셋팅 작업 ]
                        // 1. 로그인한 회원정보를 로컬스에 셋팅(세션 대신 사용)
                        // -> 실제 로그인을 하면 서버의 세션 변수가 셋팅됨
                        localStorage.setItem("minfo",JSON.stringify(v));
                        console.log(localStorage.getItem("minfo"));

                        // 2. 라우팅 페이지 이동하기(useNavigate)
                        // 첫 페이지로 이동
                        goRoute('/');


                    } // if - "pwd" //

                    else {

                        console.log("PW 다름");

                        // 패스워드가 다를 때 메시지 변경
                        setPwdMsg(msgTxt[2]);

                        // 패스워드 에러 상태 업데이트
                        setPwdError(true);

                    } // else //

                } // if - "uid" //
                
            }); // forEach //

            // 아이디가 불일치 경우
            if(isOK){

                console.log("ID 다름😥");

                // 아이디가 다를 때 메시지 변경
                setIdMsg(msgTxt[1]);

                // 아이디 에러 상태 업데이트
                setUserIdError(true);
                
            } // if //
            
        } // if - 통과 //

        // 통과x
        else {

            console.log("로그인 실패");
            
        } // elst - 통과x //

    }; // onSubmit //

    return (
        <>
            <div className="outbx">
                <section className="membx" style={{minHeight: "300px"}}>
                    <h2 onClick={clearData}>LOG IN</h2>
                    <form method="post" action="process.php">
                        <ul>
                            {/* 1. 아이디 */}
                            <li>
                                <label>ID: </label>
                                <input
                                    type="text"
                                    maxLength="20"
                                    placeholder="Please enter your ID"
                                    value={userId}
                                    onChange={changeUserId}
                                />
                                {
                                    // 에러일 경우 메시지 보여주기
                                    // 조건문 && 요소
                                    // 조건이 true - 요소 출력
                                    // 후크 데이터 idMsg로 변경 출력
                                    userIdError && (
                                        <div className="msg">
                                            <small
                                                style={{
                                                    color: "red",
                                                    fontSize: "10px",
                                                }}
                                            >
                                                {idMsg}
                                            </small>
                                        </div>
                                    )
                                }
                            </li>

                            {/* 2. 패스워드 */}
                            <li>
                                <label>Password: </label>
                                <input
                                    type="password"
                                    maxLength="20"
                                    placeholder="Please enter your Password"
                                    value={pwd}
                                    onChange={changePwd}
                                />
                                {
                                    // 에러일 경우 메시지 보여주기
                                    // 조건문 && 요소
                                    // 조건이 true - 요소 출력
                                    pwdError && (
                                        <div className="msg">
                                            <small
                                                style={{
                                                    color: "red",
                                                    fontSize: "10px",
                                                }}
                                            >
                                                {pwdMsg}
                                            </small>
                                        </div>
                                    )
                                }
                            </li>

                            {/* 6. 버튼 */}
                            <li style={{ overflow: "hidden" }}>
                                <button className="sbtn" onClick={onSubmit}>
                                    Submit
                                </button>
                                {/* input submit 버튼이 아니어도 form 요소 내부의 button은 submit 기능이 있음 */}
                            </li>

                        </ul>
                    </form>
                </section>
            </div>
        </>
    );
} // LogIn 컴포넌트 //
