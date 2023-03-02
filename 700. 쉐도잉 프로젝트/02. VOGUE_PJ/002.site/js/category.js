// 보그 PJ 카테고리 페이지 js - category.js

// 넘어온 url 받기
// pm = parameter(전달값 변수)
let pm = location.href;
// location.href이 이퀄 오른쪽에 있으면 url주소를 읽어옴

// 문자열 잘라서 값 읽어오기
// -> 물음표를 잘라서 두번 째 값, 이퀄로 잘라서 두 번째 값
pm = pm.split("?")[1].split("=")[1];

// pm값 특수문자 복원하기
pm = decodeURIComponent(pm);

console.log(pm);

// 로딩 구역 //
window.addEventListener("DOMContentLoaded",loadFn);

// 로드 함수 //
function loadFn(){

    console.log("category");
    
    // 1. 대상 선정
        // 1-1. 서브 타이틀
        const stit = document.querySelector(".stit");
        
        // 1-2. 서브 메뉴
        const lnb = document.querySelector(".lnb");

        // 1-3. 내용 타이틀
        const contit = document.querySelectorAll(".icont h2")

        // 1-4. 컨텐츠 상위박스(카테고리 클래스 넣기)
        const cont = document.querySelector(".cont")

        // 1-5. title 요소(타이틀 내용에 카테고리명 앞에 추가)
        const titag = document.querySelector("title");

        // console.log(stit,lnb,contit,cont,titag);

    // 2. 메뉴 데이터 (sinfo 변수) 객체에서 카테고리값 선택하기
    const mdata = sinfo[pm];
    console.log(mdata);

    // 3. 대상에 변경 적용하기
        // 3-1. 카테고리 페이지 title 넣기
        // 대상: .stit -> stit 변수
        stit.innerText = mdata["제목"];

        // 3-2. LNB 메뉴 넣기
        // 대상: .lnb -> lnb 변수
        // 코드 넣기: <ul><li><a href="#">메뉴</a></li></ul>
        // mdata["메뉴"] 값이 "없음"이면 lnb를 지우고 아니면 배열값으로 메뉴가 있으므로 배열만큼 위의 ul>li>a 코드를 넣어준다.
        
        // 메뉴값 담기
        let mvalue = mdata["메뉴"];

        if(mvalue==="없음"){
            // lnb 박스 제거
            lnb.remove()
        } // if //
        else{ // "메뉴"가 배열에 있을 때
            let temp = "<ul>"; // 임시 변수

            // 메뉴 배열만큼 돌아서 코드 생성
            mvalue.forEach((val)=>{ // val 배열값
                temp += `
                    <li>
                        <a href="#">${val}</a>
                    </li>
                `;
            }); // forEach //

            temp += "</ul>";

            // lnb 박스에 html 넣기
            lnb.innerHTML = temp;

        } // else //

        // 3-3. 내용 타이틀 넣기
        // 대상: .icont h2 -> contit 변수
        // -> h2 개수만큼 순번대로 mdata["타이틀"][순번]
        // h2 돌릴 때 forEach 메서드 사용
        // -> forEah((요소,순번)=>{코드});
        contit.forEach((ele,idx)=>{
            ele.innerHTML = mdata["타이틀"][idx];
        }); // forEach //

        // 3-4. 컨텐츠 박스에 pm과 같은 이름의 클래스 넣기
        // 대상: .cont -> cont 변수
        cont.classList.add(mdata["경로"]);
        // "경로" 속성의 값이 실제 클래스명과 일치함

        // cont.classList.add(pm.replace(" & ","-"));
        // replace("바뀔값","바꿀값");

        // 3-5. 탭메뉴 출력 title 요소 데이터 넣기
        // 기존값을 앞에 "제목" 속성값을 넣어준다.
        // 대상: title -> titag 변수
        titag.innerText = mdata["제목"] + titag.innerText;
    
} // loadFn 함수 //