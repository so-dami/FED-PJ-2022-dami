// nav06. 배너 셋팅 JS - ban.js

window.addEventListener("DOMContentLoaded",setBan);

// 배너 셋팅 함수 //
function setBan(){
    // 1. 호출 확인
    console.log("배너");

    // 2. 대상 선정: .bancont
    const bancont = document.querySelector(".bancont");
    console.log(bancont);
    
    // 3. 태그 구성하기
        // 태그 변수
        let hcode = `<ul class=slide>`;
        
        for(let i = 1; i <= 17; i++){
            hcode += `
            <li>
                <img src="./nav06/img/ban${i}.png" alt="배너이미지">
            </li>
            `;
        } // for of //
        
        hcode += `</ul>`;
        // console.log(hcode);

    // 4. .bancont에 출력하기
    bancont.innerHTML = hcode;

}; // setBan 함수 //