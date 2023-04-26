// CGV PJ 인트로 페이지 JS - intro.js

// 로딩 호출 //
window.addEventListener("DOMContentLoaded",loadFn);

// 로딩 실행 함수 //
function loadFn(){
    console.log("complete");
    
    // 동영상 시간을 체크하여 일정 시간 후 메인 페이지로 넘길 수 있음
    /* setTimeout(() => {
        location.href = "main.html";
    }, 5000); */
    
    // 그러나, 동영상 시간 이벤트를 사용하여 넘김
    // 대상: #myvid
    const myvid = document.querySelector("#myvid");
    // console.log(myvid);

    // 동영상 재생 중 발생하는 이벤트는?
    // -> timeupdate -> 동영상 재생 시간이 계속 업데이트 시 발생함
    myvid.addEventListener("timeupdate",chkVid);
    function chkVid(){
        console.log("동영상 멈춤?",myvid.paused);
        // 비디오가 멈추면 재생이 끝이므로 비디오의 멈춤 상태를 체크함
        // paused 속성은 멈추면 true 아니면 false 리턴 
        // 비디오에 loop 가 설정되어 있으면 안됨

        // 멈춤 상태가 true면 메인페이지로 이동하기
        if(myvid.paused){
            location.href = "main.html";
        } // if문 //
    }; // chkVid 함수 //

}; // loadFn 함수 //