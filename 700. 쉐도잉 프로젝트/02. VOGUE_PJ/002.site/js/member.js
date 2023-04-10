// 보그 PJ: 회원가입 페이지 JS - member.js

/********************************************* 

    [ 사용자 입력폼 유효성 검사 ]
    
    - 이벤트종류 : blur(포커스가 빠질때 발생)
    - 제이쿼리 이벤트 메서드 : blur()
    - 이벤트 대상:
    -> id가 'email2'가 아니고 class가 'search'가 아닌 type이 'text'인 입력요소 input과 함께 type이 'password'인 입력요소 input

    ->>>> 제이쿼리 선택표현법:
    input[type=text][id!=email2][class!=search],
    input[type=password]
    >>> 대괄호는 속성선택자(CSS원래문법) 
    != 같지않다(제이쿼리전용)

*********************************************/

// 제이쿼리 코드블록 //
$(()=>{

    // 로딩확인
    console.log("로딩완료")

    // 유효성 검사
    $(`input[type=text][id!=email2][class!=search],
    input[type=password]`)
    // .blur = .on("blur",function(){})
    .blur(function(){

        // 0. 공백 제거 처리 함수
        // get rid of space -> 공백을 제거하라
        const groSpace = cv => cv.replace(/\s/g,"");
        // 원형: (cv) => {cv.replace(/\s/g,"")};
        // 정규식: 슬래쉬(/) 사이에 표현, \s 스페이스문자
        // 참고: https://www.w3schools.com/jsref/jsref_obj_regexp.asp
        // 해석: 공백문자를 모두(g: global, 전역) 찾아서 없애시오.

        // 1. 방금 블러가 발생한 요소의 id는?
        let cid = $(this).attr("id");
        // cid는 current id 즉, 현재 아이디
        
        // 2. 블러가 발생된 요소의 입력값은?
        let cv = cid==="mnm" ?
        $(this).val().trim() : groSpace($(this).val());
        // let cv = groSpace($(this).val());
        // let cv = $(this).val().trim();
        // cv는 current value 즉, 현재 값
        // val() 메서드 - input 요소의 값(value) 읽기
        // trim() 메서드 - 앞뒤 공백제거(공백만 있으면 공백 제거)
        // groSpace()는 전체 공백제거함수(내가 만든 것)

        // 서비스 차원으로 공백 제거된 데이터를 원래 입력창에 다시 넣어줌
        $(this).val(cv); // val(값)
        
        console.log("blur",cid,cv);
        
        /////////////////////////
        // 3. 빈 값 여부 검사하기
        /////////////////////////
        if(cv===""){
            $(this).siblings(".msg").text("필수 입력")
            .removeClass("on");
        } // if - 메시지 출력 //

        //////////////////////////////////////////////////
        // 4. 아이디일 경우 유효성 검사
        // 검사 기준: 영문자로 시작하는 6~20글자 영문자/숫자
        //////////////////////////////////////////////////
        else if(cid === "mid"){
            // console.log("아이디 검사:",vReg(cv,cid));

            // false 일 때 !(not연산자)로 true 변경
            if(!vReg(cv,cid)){

                // 통과X 일 때 메시지 - 빨간색 글자
                $(this).siblings(".msg").text("영문자로 시작하는 6~20글자 영문자/숫자").removeClass("on");
                
            } // if //

            // 통과O 일 때
            else{

                // (보류) DB에 아이디가 있는지 조회 후 결과로 처리해야 함

                // 만약 id가 이미 있을 경우 "사용 중이거나 탈퇴한 아이디입니다."

                // 만약 id가 없을 경우 "사용 가능한 아이디입니다." - 녹색 글자
                $(this).siblings(".msg").text("사용 가능한 아이디입니다.").addClass("on");
                
            } // else //
            
        } // else if - 아이디 검사 //

        //////////////////////////////////////////////////
        // 5. 비밀번호일 경우 유효성 검사
        // 검사 기준: 특수문자,문자,숫자포함 형태의 5~15자리
        //////////////////////////////////////////////////
        else if(cid === "mpw"){
            // console.log("비밀번호 검사:",vReg(cv,cid));

            // false 일 때 !(not연산자)로 true 변경
            if(!vReg(cv,cid)){

                // 통과X 일 때 메시지 - 빨간색 글자
                $(this).siblings(".msg").text("특수문자,문자,숫자포함 형태의 5~15자리").removeClass("on");
                
            } // if //

            // 통과O 일 때
            else{

                // 메시지 지우기
                $(this).siblings(".msg").empty();
                
            } // else //
            
        } // else if - 비밀번호 검사 //

        //////////////////////////////////////////////////
        // 6. 비밀번호(확인)일 경우 유효성 검사
        // 검사 기준: 비밀번호 불일치
        //////////////////////////////////////////////////
        else if(cid === "mpw2"){
            // console.log("비밀번호(확인) 검사:",vReg(cv,cid));

            if(cv !== $("#mpw").val()){

                // 통과X 일 때 메시지
                $(this).siblings(".msg").text("비밀번호가 일치하지 않습니다.");
                
            } // if //

            // 통과O 일 때
            else{

                // 메시지 지우기
                $(this).siblings(".msg").empty();
                
            } // else //
            
        } // else if - 아이디 검사 //

        // ※ 모두 통과일 경우 메시지 지우기
        // empty() 내용 지우기 메서드
        else{
            // $(this).siblings(".msg").text("");
            $(this).siblings(".msg").empty();
        } // else - 통과 //

    }); // blur //

    // 이메일 관련 대상 선정 //
    // 이메일 앞주소
    const eml1 = $("#email1");

    // 이메일 뒷주소
    const eml2 = $("#email2");
    
    // 이메일 선택박스
    const seleml = $("seleml")

    /* 
        [ 선택박스 변경 시 이메일 검사하기 ]

        검사 시점: 선택박스 변경할 때
        이벤트: change -> 제이쿼리 change() 메서드

        이벤트 대상: #seleml -> seleml 변수
    */

    seleml.change(function(){

        // 1. 선택박스 변경된 값 읽어오기
        let cv = $(this).val()
        console.log("선택값:",cv);

        // 2. 선택 옵션별 분기문
        if(cv === "init"){
            // "도메인 선택"
            // 2-1. 메시지 출력
            eml1.siblings(".msg")
            .text("도메인 선택 필수")

            // 2-2. 직접입력창 숨기기
            eml2.fadeOut(300);

        } // if - 도메인 선택 //
        
        else if(cv === "free"){
            // "직접 입력"
            // 2-3. 직접입력창 보이기
            // val(값) -> 입력창에 값 넣기(빈 문자값은 기존값을 지워준다.)
            eml2.fadeIn(300).val("")
            // focus() -> 입력창에 포커스(커서 깜빡임)
            .focus();

            // 2-4. 기존 메시지 지우기
            eml1.siblings(".msg").empty();

        } // else if - 직접 입력 //

        else{
            // "이메일 주소"
            // 2-5. 직접입력창 숨기기
            eml2.fadeOut(300);

            // 2-6. 이메일 전체 주소 조합하기
            let comp = eml1.val() + "@" + cv;
            // cv = select의 option의 value값

            // 2-7. 이메일 유효성 검사 함수 호출
            resEml(comp);
            
        } // else - 기타 이메일 주소 //
        
    }); // change //

    /* 
        [ 키보드 입력 시 이메일 체크하기 ]

        키보드 관련 이벤트
        - keypress, keyup, keydown
        
        1. keypress: 키가 눌렸을 때
        2. keyup: 키가 눌렸다가 올라올 때
        3. keydown: 키가 눌렺서 내려가 있을 때

        -> 과연 글자가 입력되는 순간 어떤 키보드 이벤트를 적용해야 할까? keyup !!!

        이벤트 대상: #email1, #email2
        
        ※ 모든 이벤트를 함수와 연결하는 jQuery 메서드는?
        -> on(이벤트명,함수)
    */
    $("#email1,#email2").on("keypress",function(){

        // 1. 현재 이벤트 대상 아이디 읽어오기
        let cid = $(this).attr("id");

        // 2. 현재 입력된 값 읽어오기
        let cv = $(this).val();

        console.log("입력아이디:",cid,"\n입력값:",cv);
        // console.log에서 \n는 줄 바꾸기

        // 3. 이메일 뒷주소 셋팅하기
        let backeml = cid === "eamil1" ? seleml.val() : eml2.val();
        // 현재 아이디가 "email1"인가? 맞으면 선택박스 : 아니면 두 번째 이메일뒷주소를 입력하는 중이므로 그것을 선택

        // 변수 = 조건연산자
        // 변수 = 조건식 ? 값1 : 값2

        // 4. 만약 선택박스 값이 "free"(직접입력)이면 이메일 뒷주소로 변경함
        if(seleml.val() === "free") backeml = eml2.val();

        // 5. 이메일 전체주소 조합하기
        let comp = eml1.val() + "@" + backeml;

        // 6. 임일 유효성 검사함수 호출
        resEml(comp);
        
    }); // keyup //

    /* 
        함수명: resEml (result Email)
        기능: 이메일 검사결과 처리
    */
    const resEml = (comp) => {

        // comp = 완성된 이메일 주소
        console.log("이메일주소:",comp);
        console.log("검사결과:",vReg(comp,"eml"));

        // 이메일 정규식 검사에 따른 메시지
        if(vReg(comp,"eml")){
            eml1.siblings(".msg")
            // 메시지 출력
            .text("적합한 이메일 형식입니다.")
            // 메시지 글자 녹색으로
            .addClass("on");
        } // if - 통과 //

        else{
            eml1.siblings(".msg")
            // 메시지 출력
            .text("부적합한 이메일 형식입니다.")
            // 메시지 글자 빨간색으로
            .removeClass("on");
        } // else - 불통과 //

    }; // resEml 함수 //
    
}); // jQB //

/*////////////////////////////////////////////////////////

    함수명: vReg (validation with Regular Expression)
    기능: 값에 맞는 형식을 검사하여 리턴함
    (주의: 정규식을 따옴표로 싸지말아라!-싸면문자가됨!)

    ※ w3c 참조
    https://www.w3schools.com/jsref/jsref_obj_regexp.asp

*/ ////////////////////////////////////////////////////////
function vReg(val, cid) {
    // val - 검사할값, cid - 처리구분아이디
    // //console.log("검사:"+val+"/"+cid);

    // 정규식 변수
    let reg;

    // 검사할 아이디에 따라 정규식을 변경함
    switch (cid) {
        case "mid": // 아이디
            reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
            // 영문자로 시작하는 6~20글자 영문자/숫자
            // /^[a-z]{1} 첫글자는 영문자로 체크!
            // [a-z0-9]{5,19} 첫글자 다음 문자는 영문 또는 숫자로
            // 최소 5글자에서 최대 19글자를 유효범위로 체크!
            // 첫글자 한글자를 더하면 최소 6글자에서 최대 20글자체크!
            break;
        case "mpw": // 비밀번호
            reg = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            // 특수문자,문자,숫자포함 형태의 5~15자리
            // (?=^.{5,15}$) 시작부터 끝까지 전체 5~15자릿수 체크!
            // (?=.*\d) 숫자 사용체크!
            // (?=.*[a-zA-Z]) 영문자 대문자 또는 소문자 사용체크!
            // (?=.*[!@#$%^&+=]) 특수문자 사용체크!
            break;
        case "eml": // 이메일
            reg =
                /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
            // 이메일 형식에 맞는지 검사하는 정규식
            break;
    } //////////// switch case문 //////////////////

    // //console.log("정규식:"+reg);

    // 정규식 검사를 위한 JS메서드
    // -> 정규식.test(검사할값) : 결과 true/false
    return reg.test(val); //호출한 곳으로 검사결과리턴!
} //////////// vReg 함수 //////////////////////////////////
///////////////////////////////////////////////////////////