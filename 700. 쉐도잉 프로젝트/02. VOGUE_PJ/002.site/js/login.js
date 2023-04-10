// 보그 PJ: 로그인 페이지 JS - login.js

// jQuery 구역 //
$(()=>{
    
    /****************************** 
        로그인 페이지 유효성 검사
    ******************************/
    // 대상: #mid, #mpw
    const mid = $("#mid");
    const mpw = $("#mpw");

    // 유효성 검사: 전송 시 아이디, 비밀번호 모두 빈값이 없어야 함
    // 이벤트 대상: #sbtn
    // 이벤트 종류: click
    $("#sbtn").click(function(e){
        
        // 기본 이동 막기(submit 기능 차단)
        e.preventDefault();

        // 공백데이터 처리 하무
        const groSpace = val => val.replace(/\s/g,"");

        // 유효성 검사
        // 아이디, 비밀번호 중 하나라도 비었으면 불통과
        if(groSpace(mid.val())==="" || groSpace(mpw.val())===""){

            alert("아이디 또는 비밀번호를 입력하세요.")

            // 초기화 + 아이디에 포커스
            mid.val("").focus();
            mpw.val("")

        } // if - 불통과 //

        else{

            // 원래는 DB에서 조회된 결과를 받고 성공메시지를 보이거나 첫 페이지로 보내준다.
            alert("로그인되었습니다.");
            
        } // else - 통과 //
        
    }); // click //
    
}); // jQB //