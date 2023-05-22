// html 출력 JSX

// 변수에 태그를 jsx 문법으로 작성하여 할당
// JSX는 최상위 부모가 1개여야 함(기본 XML문법과 동일)
const myele = (
    <div>
        <h1>♣ 나의 친구 리스트</h1>
        <table>
            <tr>
                <th>이름</th>
                <th>전화번호</th>
                <th>생일</th>
            </tr>
            <tr>
                <td>전소민</td>
                <td>010-222-3333</td>
                <td>90.3.4</td>
            </tr>
            <tr>
                <td>김혁수</td>
                <td>010-555-7777</td>
                <td>02.5.8</td>
            </tr>
            <tr>
                <td>이상화</td>
                <td>010-8888-2222</td>
                <td>00.7.8</td>
            </tr>
        </table>
    </div>
); // myele //

// 화면 출력
// ReactDOM.render(출력 요소, 대상 요소)
ReactDOM.render(myele,document.querySelector("#root"));