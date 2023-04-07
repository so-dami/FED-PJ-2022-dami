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

        // 1. 방금 블러가 발생한 요소의 id는?
        let cid = $(this).attr("id");
        // cid는 current id 즉, 현재 아이디
        
        // 2. 블러가 발생된 요소의 입력값은?
        let cv = $(this).val().trim();
        // cv는 current value 즉, 현재 값
        // val() 메서드 - input 요소의 값(value) 읽기
        // trim() 메서드 - 앞뒤 공백 제거(공백만 있으면 공백 제거)
        
        console.log("blur",cid,cv);
        
        /////////////////////////
        // 3. 빈 값 여부 검사하기
        /////////////////////////
        if(cv===""){
            $(this).siblings(".msg").text("필수 입력");
        } // if - 메시지 출력 //

        //////////////////////////////////////////////////
        // 4. 아이디일 경우 유효성 검사
        // 검사 기준: 영문자로 시작하는 6~20글자 영문자/숫자
        //////////////////////////////////////////////////

        // ※ 모두 통과일 경우 메시지 지우기
        // empty() 내용 지우기 메서드
        else{
            // $(this).siblings(".msg").text("");
            $(this).siblings(".msg").empty();
        } // else - 통과 //

    }); // blur //

}); // jQB //