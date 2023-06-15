// Member 모듈 - Member.js

import React, { useState } from "react";
import $ from "jquery";
import "./css/member.css";
import { Link, useNavigate } from "react-router-dom";
import { clearData, initData } from "./fns/fnMem";

/* 
    [ 후크: Hook - 왜 필요한가? ]

    1. 목적
    - 어떤 특정 데이터가 변경될 때 다른 것을 매칭하여 실시간으로 변경할 필요가 있을 경우 간단하고 효과적으로 이것을 구현해 주는 방법

    2. 구현 방법

        1) 상단에 후크를 import 한다 -> useState
        2) useState() 메서드를 사용한다
        (1) 코드 법
        - 배열 변수 = useState(치기 값)

        (2) 일반형
        - const [변수명, set 변수명] = useState(치기 값)
        -> set 변수명 작성 시 변수명 첫 글자는 대문자로 처리!
        -> set 변수명(값) : 메서드 형태로 값을 셋팅한다!(셋터와 비슷함)

    3) 작동원리
        (1) useState에 쓴 초깃값이 배열 변수 첫 번째에 할당됨
        (2) 코드에서 set 변수명에 값을 할당하면 useState가 이것을 체크하여 다른 변경을 하도록 메서드 실행

    4) 사용 결과
    - 별도의 메서드 호출 없이 후크 상태변수를 사용한 곳이 자동으로 변경될 때마다 다시 갱신되는 것을 확인할 수 있음
*/

// jQB 로드구역
function jqFn(){

    $(()=>{}); // jQB //
    
} // jqFn //

function Member(){

    // 요구사항: 각 입력 항목에 맞는 유효성 검사를 입력하는 순간 실시간으로 체크하여 결과를 화면에 리턴함

    // [ 리액트 라우터 이동 시 이동메서드 사용하기: useNavigate ]
    // 1. Link를 사용한 셋팅으로 라우터를 이동함
    // -> 코드적으로 이동할 때는? useNavigate 사용함
    // 2. import 하기: import { useNavigate } from "react-router-dom";
    // 3. 사용법: 변수 = useNavigate();
    // -> 변수("라우터 경로")

    // 라우터 이동 Navigate 생성하기
    const goRoute = useNavigate();

    // [ 후크 useState 메서드 세팅 ]
    // [ 1. 입력 요소 후크 변수 ]

        // 1. 아이디 변수
        const [userId, setUserId] = useState("");

        // 2. 비밀번호 변수
        const [pwd, setPwd] = useState("");

        // 3. 비밀번호 확인 변수
        const [chkPwd, setChkPwd] = useState("");

        // 4. 사용자 이름 변수
        const [userName, setUserName] = useState("");

        // 5. 이메일 변수
        const [email, setEmail] = useState("");

    // [ 2. 에러 상태값 후크 변수 ]
    // -> 에러 상태값 변수: 초기값은 에러 아님 상태(false)
        
        // 1. 아이디 에러 변수
        const [userIdError, setUserIdError] = useState(false);

        // 2. 비밀번호 에러 변수
        const [pwdError, setPwdError] = useState(false);

        // 3. 비밀번호 확인 에러 변수
        const [chkPwdError, setChkPwdError] = useState(false);

        // 4. 사용자 이름 에러 변수
        const [userNameError, setUserNameError] = useState(false);

        // 5. 이메일 에러 변수
        const [emailError, setEmailError] = useState(false);

        // [ 아이디 관련 메시지 프리셋 ]
        const msgId = [

            "User ID must contain a minimum of 5 characters",
            "This ID is already in use!",
            "This ID is available."

        ];

        // 후크 변수 메서드
        const [idMsg, setIdMsg] = useState(msgId[0]);

        // // [ 로컬스 클리어 ] -> ./fns/fnMem.js로 보냄
        // const clearData = ()=> {

        //     localStorage.clear()
        //     console.log("로컬스 클리어");
            
        // }; // clearData //

        // [ 로컬스 초기 체크 셋팅 ] -> ./fns/fnMem.js로 보냄
        // const initData = () => {

        //         // 만약 로컬스 "mem-data"가 null이면 만들어줌
        //         if(localStorage.getItem("mem-data") === null){

        //             localStorage.setItem("mem-data",`
        //                 [
        //                     {
        //                         "idx": "1",
        //                         "uid":"tomtom",
        //                         "pwd":"1111",
        //                         "unm":"Tom",
        //                         "eml":"tom@gmail.com"
        //                     }
        //                 ]
        //             `);
        //         }
            
        // }; // initData //
        
    // [ 3. 유효성 검사 메서드 ]

        // 1) 아이디 변수
        const changeUserId = (e) => {
        // e - 이벤트 전달 변수

            // (1) 아이디 유효성 검사식(따옴표 사용하지 않기 - 문자열x )
            const valid = /^[A-Za-z0-9+]{5,}$/;

            // (2) 입력값 확인: e.target -> 이벤트가 발생한 요소
            console.log(e.target.value);

            // (3) 에러 아님 상태 if문
            // 조건: 유효성 검사 결과가 true? 에러상태! false(에러 아님)
            // 정규식.test() -> 정규식 검사 결과 리턴 메서드
            // 결과가 true면 에러 상태값 false / false면 에러 상태값 true
            if(valid.test(e.target.value)){

                // 로컬스 데이터 체크 함수 호출
                initData();

                // 아이디 형식에는 맞지만 사용중인 아이디인지 검사하기
                let memData = localStorage.getItem("mem-data");
                console.log("로컬스:",memData);
                
                // 로컬스 null이 아닌 경우
                if(memData){

                    // 로컬스에 기존 아이디 중 있는지 확인하기
                    // 문자형 데이터를 객체형 데이터로 변환(배열형)
                    memData = JSON.parse(memData);
                    console.log("검사:", memData);

                    // 기존 아이디가 있으면 상태값 false로 업데이트
                    let isOK = true;

                    // 검사 돌기
                    memData.forEach((v) => {

                        // 기존의 아이디와 같은 경우
                        if(v["uid"] === e.target.value){

                            console.log(v["uid"]);

                            // 메시지 변경
                            setIdMsg(msgId[1]);
                            
                            // 아이디 에러 상태값 업데이트
                            setUserIdError(true);

                            // 존재 여부 업데이트
                            isOK = false;
                            
                        } // if //
                    }); // forEach //

                    // 기존 아이디가 없으면 들어감
                    if(isOK){

                        console.log("바깥");

                        // 메시지 변경(처음 메시지로 변경)
                        setIdMsg(msgId[0]);      

                        // 아이디 에러 상태값 업데이트
                        setUserIdError(false);

                    } // if: isOK //

                } // if //

                else{

                    console.log("DB 없음");
                    
                } // else //

                // setUserIdError(false); // 에러 아님 상태

            } // if //

            else setUserIdError(true); // 에러 상태
                
            // (4) 실제 userId 후크 변수값이 업데이트가 되어야 화면에 출력됨
            setUserId(e.target.value);
            
        }; // changeUserId //

        // 2) 패스워드 유효성 검사
        const changePwd = e => {
        // e - 이벤트 전달 변수

            // (1) 패스워드 유효성 검사식(따옴표 사용하지 않기 - 문자열x )
            const valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

            // (2) 입력값 확인: e.target -> 이벤트가 발생한 요소
            console.log(e.target.value);

            // (3) 에러 아님 상태 if문
            // 조건: 유효성 검사 결과가 true? 에러상태! false(에러 아님)
            // 정규식.test() -> 정규식 검사 결과 리턴 메서드
            // 결과가 true면 에러 상태값 false / false면 에러 상태값 true
            if (valid.test(e.target.value)) setPwdError(false); // 에러 아님 상태
            
            else setPwdError(true); // 에러 상태

            // (4) 실제 useerId 후크 변수값이 업데이트가 되어야 화면에 출력됨
            setPwd(e.target.value);
            
        }; // chagePwd //

        // 3) 패스워드 확인 유효성 검사
        const changeChkPwd = (e) => {

            // (1) 위에 입력한 비밀번호와의 일치 여부
            if(pwd === e.target.value) setChkPwdError(false); // 에러 아님 상태
            else setChkPwdError(true); // 에러 상태

            // (2) 실제 입력값 반영하기
            setChkPwd(e.target.value);
            
        }; // changeChkPwd // 

        // 4) 사용자 이름 유효성 검사
        const changeUserName = (e) => {

            // 빈값 체크
            if(e.target.value !== "") setUserNameError(false); // 에러 아님 상태
            else setUserNameError(true); // 에러 상태

            // (2) 실제 입력값 반영하기
            setUserName(e.target.value);
            
        }; // changeUserName // 

        // 5) 이메일 유효성 검사
        const changeEmail = (e) => {

            // 이메일 정규식 셋팅
            const valid = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;


            // 이메일 유효성 검사
            if(valid.test(e.target.value)) setEmailError(false); // 에러 아님 상태
            else setEmailError(true); // 에러 상태

            // (2) 실제 입력값 반영하기
            setEmail(e.target.value);
            
        }; // changeEmail //

        // 6) 전체 유효성 검사 함수
        const totalValid = () => {

            // 모든 입력창 검사(빈 값일 경우 모두 에러를 후크 변수에 전달)
            if (!userId) setUserIdError(true);
            if (!pwd) setPwdError(true);
            if (!chkPwd) setChkPwdError(true);
            if (!userName) setUserNameError(true);
            if (!email) setEmailError(true);

            // 통과 조건
            // -> 빈 값이 아님
            // -> 에러 후크 변수가 모두 false
            // -> 위의 조건 모두 충족 시 true값 리턴
            if (
                userId &&
                pwd &&
                chkPwd &&
                userName &&
                email &&
                !userIdError &&
                !pwdError &&
                !chkPwdError &&
                !userNameError &&
                !emailError
            ) return true;
            
            // 하나라도 에러면 false값 리턴
            else return false;
            
        }; // totalValid //

        // 7) Submit 기능 함수
        const onSubmit = (e) => {

            // 기본 submit 기능 막기
            e.preventDefault();
            console.log("submit!");

            // 유효성 검사 전체 통과 시
            if(totalValid()){

                // alert("처리 페이지로 이동");

                // 로컬스 변수 할당
                let memData = localStorage.getItem("mem-data");
                console.log(memData);
                
                // 로컬스 객체로 변환하기
                memData = JSON.parse(memData);
                console.log(memData);

                // 새로운 데이터 구성
                let newObj = {

                    idx: memData.length + 1,
                    uid: userId,
                    pwd: pwd,
                    unm: userName,
                    eml: email,

                };
                
                // 데이터 추가하기: 배열에 데이터 추가 -> push()
                memData.push(newObj);

                // 데이터 추가 후 확인
                console.log(memData);

                // 로컬스에 반영하기
                localStorage.setItem("mem-data", JSON.stringify(memData));

                // 로그인 페이지로 이동(라우터 이동)
                // useNavigate 사용
                $(".sbtn").text("Success");
                setTimeout(() => {
                    goRoute('/login');
                }, 1500);
                
            } // if - 통과 //  

            // 통과x
            else{

                // alert("입력을 수정하세요.");
                
            } // elst - 통과x //

        }; // onSubmit //

    return(

        // 빈 루트 생성
        <>

            {/* 모듈 코드 구역 */}
            <div className="outbx">
                <section className="membx">
                    <h2 onClick={clearData}>JOIN US</h2>
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
                                            <small style={{ color: "red", fontSize: "10px" }}>
                                                {idMsg}
                                            </small>
                                        </div>
                                    )
                                }
                                {
                                    // "훌륭한 아이디네요."일 경우
                                    // 아이디 에러가 false일때 출력
                                    // 고정데이터 배열 msgId 세번째 값 출력
                                    // 조건 추가: userId가 입력 전일 때는 안 보임
                                    // userId가 입력 전엔 false를 리턴함!
                                    !userIdError && userId && (
                                        <div className="msg">
                                            <small style={{ color: "green", fontSize: "10px" }}>
                                                {msgId[2]}
                                            </small>
                                        </div>
                                    )
                                    // value={userId} 값은 setUserId를 통해서만 업데이트되어 실제 화면에 반영됨
                                    // onChange = {changeuserId}
                                    // -> change 이벤트 발생 시 changeUserId 함수 호출
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
                                            <small style={{ color: "red", fontSize: "10px" }}>
                                                Password must be at least 8 characters long and must
                                                contain at least one letter and one number each.
                                            </small>
                                        </div>
                                    )
                                }
                            </li>
                            {/* 3. 패스워드 확인 */}
                            <li>
                                <label>Confirm password: </label>
                                <input
                                    type="password"
                                    maxLength="20"
                                    placeholder="Please enter your Confirm Password"
                                    value={chkPwd}
                                    onChange={changeChkPwd}
                                />
                                {
                                    // 에러일 경우 메시지 보여주기
                                    // 조건문 && 요소
                                    // 조건이 true - 요소 출력
                                    chkPwdError && (
                                        <div className="msg">
                                            <small style={{ color: "red", fontSize: "10px" }}>
                                                Password verification does not match.
                                            </small>
                                        </div>
                                    )
                                }
                            </li>
                            {/* 4. 성명 */}
                            <li>
                                <label>User name: </label>
                                <input
                                    type="text"
                                    maxLength="20"
                                    placeholder="Please enter your Name"
                                    value={userName}
                                    onChange={changeUserName}
                                />
                                {
                                    // 에러일 경우 메시지 보여주기
                                    // 조건문 && 요소
                                    // 조건이 true - 요소 출력
                                    userNameError && (
                                        <div className="msg">
                                            <small style={{ color: "red", fontSize: "10px" }}>
                                                This is a required entry.
                                            </small>
                                        </div>
                                    )
                                }
                            </li>
                            {/* 5. 이메일 */}
                            <li>
                                <label>Email: </label>
                                <input
                                    type="text"
                                    maxLength="50"
                                    placeholder="Please enter your Email"
                                    value={email}
                                    onChange={changeEmail}
                                />
                                {
                                    // 에러일 경우 메시지 보여주기
                                    // 조건문 && 요소
                                    // 조건이 true - 요소 출력
                                    emailError && (
                                        <div className="msg">
                                            <small style={{ color: "red", fontSize: "10px" }}>
                                                Please enter a valid email format.
                                            </small>
                                        </div>
                                    )
                                }
                
                            </li>
                            {/* 6. 버튼 */}
                            <li style={{overflow: "hidden"}}>
                                <button className="sbtn" onClick={onSubmit}>
                                    Submit
                                </button>
                                {/* input submit 버튼이 아니어도 form 요소 내부의 button은 submit 기능이 있음 */}
                
                            </li>
                            {/* 7. 로그인 페이지 링크 */}
                            <li>
                                Are you already a member?
                                <Link to="/login"> Log In </Link>
                            </li>
                        </ul>
                    </form>
                </section>
            </div>
    
            {/* 빈 루트를 만들고 JS 로드 함수 포함 */}
            {jqFn()}

        </>
        
    ); // return //
    
} // Member //

// 내보내기
export default Member;