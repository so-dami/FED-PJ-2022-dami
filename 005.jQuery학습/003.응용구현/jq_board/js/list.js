// 리스트 페이지 JS - list.js

// [ 제이슨 파일 데이터 로컬 스토리지에 넣기 ]
// 1. 변수에 제이슨 파일을 문자화하여 불러오기
let jsn = JSON.stringify(mydata);
// console.log(jsn);

// 2. 로컬 스토리지 변수를 설정하여 할당하기
localStorage.setItem("bdata", jsn);
// console.log("로컬:",localStorage.getItem("bdata"));

// 3. 로컬 스토리지 데이터를 파싱하여 게시판 리스트에 넣기
// 3-1. 로컬 스토리지 데이터 파싱하기
let bdata = JSON.parse(localStorage.getItem("bdata"));
// console.log("로컬스파싱:",bdata,
// "/개수:",bdata.length);

// 페이지 번호: 페이지 단위 별 순서번호
// let pgnum = 1; -> 함수 내 전달 변수로 처리함

// 페이지 단위 수: 한 페이지 당 레코드 수
const pgblock = 9;

// 시작 번호 생성: (페이지번호-1) * 페이지 단위 수
// -> (pgnum-1)*pgblock

// 끝 번호 생성: 페이지번호 * 페이지 단위 수
// -> pgnum * pgblock

/********************************************
        함수명: bindList
        기능: 페이지별 리스트를 생성하여 바인딩
    ********************************************/
// pgnum - 페이지 번호
function bindList(pgnum) {
    // 0. 게시판 리스트 생성하기
    let blist = "";

    // 전체 레코드
    let totnum = bdata.length;
    console.log(totnum);

    // 1. 일반형 for문으로 특정대상 배열 데이터 가져오기
    // 데이터 순서: 번호, 제목, 작성자, 등록일자, 조회수
    for (let i = pgblock * (pgnum - 1); i < pgnum * pgblock; i++) {
        // 마지막 번호 한계값 조건으로 마지막 페이지 데이터
        // 존재하는 데이터까지만 바인딩하기
        if (i < totnum) {
            blist += `
                <tr>
                    <td>${bdata[i]["idx"]}</td>
                    <td>
                        <a href="view.html?idx=${bdata[i]["idx"]}">
                            ${bdata[i]["tit"]}
                        </a>
                    </td>
                    <td>${bdata[i]["writer"]}</td>
                    <td>${bdata[i]["date"]}</td>
                    <td>${bdata[i]["cnt"]}</td>
                </tr>
             `;
        } // if //
    } // for //

    // console.log("코드:",blist);

    // 2. 리스트 코드 테이블에 넣기
    $("#board tbody").html(blist);

    // 3. 페이징 블록 만들기
    // 3-1. 전체 페이지 번호 수 계산하기
    // 전체 레코드 수 / 페이지 단위 수 (나머지 있으면 +1)
    // 전체 레코드 수: totnum
    let pgtotal = Math.floor(totnum / pgblock);
    let pgadd = totnum % pgblock;
    console.log("페이지 전체 수:", pgtotal);
    console.log("페이지 나머지:", pgadd);

    // 페이징 코드 변수
    let pgcode = "";

    // 3-2. 페이징 코드 만들기
    // 나머지가 있으면 1을 더함
    if (pgadd != 0) pgtotal = pgtotal + 1; // if //
    // 코드 만들기 for문
    for (let i = 1; i <= pgtotal; i++) {
        pgcode +=
        //페이지 번호와 i가 같으면 a링크를 만들지 않음
        pgnum == i ? `<b>${i}</b>` : `<a href="#">${i}</a>`;
        
        // 사이 구분자 넣기(마지막 번호 뒤는 제외)
        if (i != pgtotal) pgcode += " | ";
    } // for //
    console.log(pgcode);

    // 3-3. 페이징 코드 넣기
    $(".paging").html(pgcode);

    // 3-5. 이벤트 링크 설정하기
    $(".paging a").click(function (e) {
        // 기본 이동 막기
        e.preventDefault();

        // 바인딩 함수 호출(페이징 번호 보내기)
        bindList($(this).text());
    }); // click //
} // bindList 함수 //

// 로드 구역 //
$(() => {
    // 최초 리스트 바인딩 호출
    bindList(1);
}); // jQB //
