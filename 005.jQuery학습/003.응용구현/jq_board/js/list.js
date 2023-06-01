// 리스트 페이지 JS - list.js

// [ 제이슨 파일 데이터 로컬 스토리지에 넣기 ]
// 1. 변수에 제이슨 파일을 문자화하여 불러오기
let jsn = JSON.stringify(mydata);
// console.log(jsn);

// 2. 로컬 스토리지 변수를 설정하여 할당하기
localStorage.setItem("bdata",jsn);
console.log("로컬:",localStorage.getItem("bdata"));

// 3. 로컬 스토리지 데이터를 파싱하여 게시판 리스트에 넣기
    // 3-1. 로컬 스토리지 데이터 파싱하기
    let bdata = JSON.parse(localStorage.getItem("bdata"));
    console.log("로컬 파싱:",bdata,"개수:",bdata.length);

    // 3-2. 게시판 리스트 생성하기
    let blist = "";
    
    // 일반형 for문으로 특정대상 배열 데이터 가져오기
    // 데이터 순서: 번호, 제목, 작성자, 등록일자, 조회수
    for(let i=0; i<bdata.length; i++){

        blist += `
            <tr>
                <td>${bdata[i]["idx"]}</td>
                <td>${bdata[i]["tit"]}</td>
                <td>${bdata[i]["writer"]}</td>
                <td>${bdata[i]["date"]}</td>
                <td>${bdata[i]["cnt"]}</td>
            </tr>
        `;

    } // for //

    console.log