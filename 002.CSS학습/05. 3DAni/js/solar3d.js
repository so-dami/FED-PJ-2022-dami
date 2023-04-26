// 3D 태양계 JS - solar3d.js //

/////////////////// 로드 구역 ///////////////////
window.addEventListener("DOMContentLoaded",()=>{
    console.log("complete")

    /***************************************** 
        [ 구현 내용 ]
        - 축소/확대 버튼 클릭 시 표기된 배율만큼
        태양계 전체를 축소/확대 적용한다.
        - 이때 클릭된 메뉴는 오버 시의 변경 색상
        을 유지한다.
    *****************************************/
    // 1. 대상 선정
        // 1-1. 이벤트 대상: .tit a - 축소/확대 버튼의 a 요소들
        const menu = document.querySelectorAll(".tit a");
        // 1-2. 변경 대상: .scbx - 태양계를 싸고 있는 부모 요소
        const scbx = document.querySelector(".scbx");
        // 1-3. 함수 호출 확인
        // console.log(menu,scbx);

    // 2. 이벤트 함수 셋팅하기
        // x는 각각의 a
        for(let x of menu){ 
            x.onclick = () => {

                // 2-1. 버튼 텍스트 읽기
                let btxt = x.innerText;
                // 2-2. 문자 데이터 가공
                // 내용: "X 배율" -> "X " 부분 없애기 = "배율"
                // 문자 대체 내장함수: repalce(바꿀 문자, 바뀔 문자);
                btxt = btxt.replace("X ","");
                // 2-3. 함수 호출 확인
                // console.log(btxt);

            // 3. 배율 적용하기
                // 3-1. 변경 대상: scbx 변수
                scbx.style.transform = `scale(${btxt}`;

            // 4. click된 배율 메뉴에 클래스 "on" 넣기
                // 4-1. 모든 클래스 "on" 초기화
                menu.forEach(ele=>ele.classList.remove("on"));
                // 4-2. click된 메뉴에만 클래스 "on" 넣기
                x.classList.add("on");

            }; // click 함수 //
        } // for of //

}); /////////////// 로드 구역 ///////////////////