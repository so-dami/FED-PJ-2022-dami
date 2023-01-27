// 도깨비 PJ 공통 JS - common.js //

console.log("come on!");

// 햄버거 버튼 요소
var ham = document.querySelector(".ham");
console.log("hey, Ham?",ham);

// 햄버거 요소에 이벤트 설정하기
ham.onclick = chgMenu;
// <button class="ham" onclick="chgMenu()">로 설정한 것과 동일함
// ※ 주의: 이퀄 오른쪽에 괄호를 하면 함수가 바로 실행되므로 하지 말기

/*********************************************************** 
    함수명: chgMenu
    기능: 전체 메뉴 보이기/숨기기
 **********************************************************/
function chgMenu(){
    // 1. 호출 확인
    console.log("I'm chgMenu");

    // 2. 대상 선정: .top 요소
    var tg = document.querySelector(".top");
    
    // 3. 변경 내용: 대상에 class "on" 넣기
    tg.classList.toggle("on");
} ////////////// chgMenu 함수 //////////////////////////////

/*********************************************************** 
    [ JS 클래스 컨트롤 내장 객체 ]
    classList 객체
    -> 요소에 클래스를 넣거나 빼는 등의 필요 작업을 하는 객체

    ((관련 메서드))
    1. add("클래스명"): 클래스 추가
    2. remove("클래스명"): 클래스 제거
    3. toggle("클래스명"): 클래스 추가/제거
    4. contains("클래스명"): 클래스가 있으면 true, 없으면 false
    5. replace("이전 클래스명, 변경 클래스명"): 특정 클래스를 다른 클래스로 변경

    -> 클래스 추가/제거 시 콤마로 구분하여 여러 개의 클래스를 추가/제거할 수 있음
    예) 요소.classList.add("tt","cc","dd")
    예) 요소.classList.remove("nn","ee")
***********************************************************/