// 모듈 연습 메인 JS - main.js

// 로딩구역 없이
// -> script 태그에 defer 속성을 사용 or
// -> type="module" 사용할 경우 로딩구역이 없어도 요소 등을 가져올 수 있음

// 모듈화 JS파일 import 하기
// import{mTitle, sTitle} from "./textData.js";

// 별칭 사용
import{
    mTitle as mTit,
    sTitle as sTit,
    personInfo as pInfo,
    mvData as mv
} from "./textData.js";

// 메세지 내용 구성함수 import
import{message as msg} from "./msgFormat.js";

/* 
    [ import 형식 ]

    1. import 전달변수 from "파일경로";
    - 반드시 가져올 모듈JS에서 export를 해줘야 함
    - from 뒤에 경로는 상대경로일 경우 같은 위치일지라도 ./ 표시를 꼭 해야 함(/, ./, ../)
    - 모듈 구성은 반드시 서버형식으로 열어야 작동하는데
    (http://...) Live Server로 열기 때문에 볼수 있음
        -> 로컬 파일로 열면 작동 안됨

    [ import 변수명 변경하기(별칭 사용) ]
    
    import {전달변수 as 별칭} from "파일경로";
    예) import {mymy as m} from "파일경로";

    -> 별칭 사용 이유? 단순 변경 요구, 같은 이름 변수 피하기
    __________________________________________________________
    
    [ 모듈화를 위한 구성 ]

    1. 데이터를 처리하기 위한 JS
        -> textData.js

    2. 구체적인 데이터 구성처리를 위한 JS
        -> msgFormat.js
*/

// 1. 출력박스

    // 1-1. 타이틀
    const tpart = document.querySelector(".tpart");
    
    // 1-2. 내용
    const demo = document.querySelector("#demo");
    
    // 1-3. 영화정보 출력박스
    const mvpart = document.querySelector(".mvpart");
    console.log(tpart, demo, mvpart);
    
    // 1-4. 제목
    tpart.innerHTML = `
        <h2>${mTit}</h2>
        <h3>${sTit}</h3>
    `

    // 1-4. 내용 넣기
    demo.innerHTML = msg("공유",45);
    demo.innerHTML += msg("다미",30);
    demo.innerHTML += msg("태욱",33);

    pInfo.forEach(val=>{
        // val[0] - 이름, val[1] - 나이
        demo.innerHTML += msg(val[0],val[1]);
    });

    // 1-5. 영화정보 뿌리기
    // -> ol>li 형식으로 .mvpart 박스에 영화 정보로 js클래스를 생성하여 화면에 뿌려준다.
     