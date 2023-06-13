// Member 모듈 - Member.js

import React, {useState} from "react";
import $ from "jquery";
import "./css/member.css";

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

    // [ 후크 useState 메서드 세팅 ]
    // [ 1. 입력 요소 후크 변수 ]

        // 1) 아이디 변수
        const[userId, setUserId] = useState("");

        // 2) 패스워드 변수
        const[pwd, setPwd] = useState("");

        // 3) 패스워드 확인
        const[chkPwd, setChkPwd] = useState("");

        // 4) 사용자 이름 변수
        const[userName, setUserName] = useState("");

        // 5) 이메일 변수
        const[email, setEmail] = useState("");

    // [ 2. 에러 상태값 후크 변수 ]
    // -> 에러 상태값 변수: 초기값은 에러 아님 상태(false)
        
        // 1) 아이디 에러 변수
        const[userIdError,setUserIdError] = useState(false);

        // 2) 패스워드 에러 변수
        const[pwdError,setPwdError] = useState(false);

        // 3) 패스워드 확인 에러 변수
        const[chkpwdError,setChkPwdError] = useState(false);

        // 4) 사용자 이름 에러 변수
        const[userNameError,setUserNameError] = useState(false);
        
        // 5) 이메일 에러 변수
        const[emailError,setEmailError] = useState(false);

    // [ 3. 유효성 검사 메서드 ]

        // 1) 아이디 변수
        const changeUserId = e => { // e - 이벤트 전달 변수

            // (1) 아이디 유효성 검사식(따옴표 사용하지 않기 - 문자열x )
            const valid = /^[A-Za-z0-9+]{5,}$/;

            // (2) 입력값 확인: e.target -> 이벤트가 발생한 요소
            console.log(e.target.value);

            // (3) 에러 아님 상태 if문
            // 조건: 유효성 검사 결과가 true? 에러상태! false(에러 아님)
            // 정규식.test() -> 정규식 검사 결과 리턴 메서드
            // 결과가 true면 에러 상태값 false / false면 에러 상태값 true
            if(valid.test(e.target.value))
                setUserIdError(false); // 에러 아님 상태
            
            else
                setUserIdError(true); // 에러 상태

            // (4) 실제 userId 후크 변수값이 업데이트가 되어야 화면에 출력됨
            setUserId(e.target.value);
            
        }; // changeUserId //

        // 2) 패스워드 변수
        const changePwd = e => {

            // (1) 패스워드 유효성 검사식(따옴표 사용하지 않기 - 문자열x )
            const valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

            // (2) 입력값 확인: e.target -> 이벤트가 발생한 요소
            console.log(e.target.value);

            // (3) 에러 아님 상태 if문
            // 조건: 유효성 검사 결과가 true? 에러상태! false(에러 아님)
            // 정규식.test() -> 정규식 검사 결과 리턴 메서드
            // 결과가 true면 에러 상태값 false / false면 에러 상태값 true
            if(valid.test(e.target.value))
                setPwdError(false); // 에러 아님 상태
            
            else
                setPwdError(true); // 에러 상태

            // (4) 실제 pwd 후크 변수값이 업데이트가 되어야 화면에 출력됨
            setPwd(e.target.value);
            
        }; // chagePwd //

        // 3) 패스워드 확인
        const changeChkPwd = e => {

            // (1) 위에 입력한 비밀번호와의 일치 여부
            if(pwd === e.target.value) setChkPwdError(false); // 에러 아님 상태

            else setChkPwdError(true); // 에러 상태

            // (2) 실제 입력값 반영하기
            setChkPwd(e.target.value);
            
        }; // changeChkPwd // 

        // 4) 사용자 이름 유효성 검사
        const changeUserName = e => {

            // 빈값 체크
            if(e.target.value !== "") setUserNameError(false); // 에러 아님 상태

            else setUserNameError(true); // 에러 상태

            // (2) 실제 입력값 반영하기
            setUserName(e.target.value);
            
        }; // changeUserName // 

        // 5) 이메일 변수

    return(

        // 빈 루트 생성
        <>

            {/* 모듈 코드 구역 */}
            <section className="membx">

                <h2>Member</h2>

                <form>
                    <ul>

                        {/* 1. 아이디 */}
                        <li>

                            <label>ID: </label>
                            <input type="text" maxLength="20" placeholder="Please enter your ID" value={userId} onChange={changeUserId} />
                        
                            {
                                // 에러일 경우 메시지 보여주기
                                // 조건문 && 요소
                                // 조건이 true - 요소 출력
                                userIdError &&
                                <div className="msg">
                                    <small style={{color: "red", fontSize: "10px"}}>
                                        The ID must contain at least 5 characters or numbers.
                                    </small>
                                </div>

                                // value={userId} 값은 setUserId를 통해서만 업데이트되어 실제 화면에 반영됨

                                // onChange = {changeuserId}
                                // -> change 이벤트 발생 시 changeUserId 함수 호출
                            }

                        </li>

                        {/* 2. 패스워드 */}
                        <li>

                            <label>Password: </label>
                            <input type="password" maxLength="20" placeholder="Please enter your password" value={chkPwd} onChange={changeChkPwd} />

                            {
                                // 에러일 경우 메시지 보여주기
                                // 조건문 && 요소
                                // 조건이 true - 요소 출력
                                chkpwdError &&
                                <div className="msg">
                                    <small style={{color: "red", fontSize: "10px"}}>
                                        Password must be at least 8 characters long and must contain at least 1 number and 1 character each.
                                    </small>
                                </div>
                            }

                        </li>

                        {/* 3. 패스워드 확인 */}  
                        <li>

                            <label>Confirm password: </label>
                            <input type="password" maxLength="20" placeholder="Please confirm your password" value={pwd} onChange={changePwd} />

                            {
                                // 에러일 경우 메시지 보여주기
                                // 조건문 && 요소
                                // 조건이 true - 요소 출력
                                pwdError &&
                                <div className="msg">
                                    <small style={{color: "red", fontSize: "10px"}}>
                                        Password does not match.
                                    </small>
                                </div>
                            }

                        </li>

                        {/* 4. 성명 */}
                        <li>

                            <label>User name: </label>
                            <input type="text" maxLength="20" placeholder="Please enter your name" value={userName} onChange={changeUserName} />

                            {
                                // 에러일 경우 메시지 보여주기
                                // 조건문 && 요소
                                // 조건이 true - 요소 출력
                                userNameError &&
                                <div className="msg">
                                    <small style={{color: "red", fontSize: "10px"}}>
                                        This is required.
                                    </small>
                                </div>
                            }

                        </li>

                        {/* 5. 이메일 */}
                        <li></li>

                        {/* 6. 버튼 */}
                        <li></li>

                        {/* 7. 로그인 페이지 링크 */}
                        <li></li>

                    </ul>
                </form>
            </section>
    
            {/* 빈 루트를 만들고 JS 로드 함수 포함 */}
            {jqFn()}

        </>
        
    ); // return //
    
} // Member //

// 내보내기
export default Member;