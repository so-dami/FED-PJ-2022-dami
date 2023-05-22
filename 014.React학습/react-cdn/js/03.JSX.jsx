// 03. JSX 특성 알아보기

/******************************************* 
    [ JSX란? ]
    
    - JavaScriptXML
    - React에서 html을 쉽게 작성할 수 있음
    - appendChild() 메서드 없이 DOM에 요소 넣기 가능

*******************************************/

/******************************************* 
    1. JSX를 사용한 것과 JSX를 사용하지 않은 것 비교하기
        (1) JSX를 사용한 예
*******************************************/
       // 넣을 요소
       const myele1 = <h1>나는 JSX를 사용하고 있다.</h1>

       // 리액트 루트 생성하기: createRoot() 메서드 사용
       const root1 = ReactDOM.createRoot(document.querySelectorAll("#root>div")[0]);

       // 적용하기: 생성된 루트에 render() 메서드를 붙여서 사용
       root1.render(myele1);

/******************************************* 
        (2) JSX를 사용하지 않은 예
        - 넣을 요소를 createElement() 메서드로 생성해야 함
*******************************************/
        // 넣을 요소
        // createElement(요소명, {JS코드작성}, 요소내용)
        const myele2 = React.createElement("h1",{},"나는 JSX를 쓰지 않는다.");

        // 두 번째 div 요소에 출력
        ReactDOM.render(myele2,document.querySelectorAll("#root>div")[1])

/******************************************* 
    [ 출력방식 정리 ]
    
    1. 한 번에 쓰기
    ReactDOM.render(출력 요소, 대상 요소)

    2. 따로 쓰기
        1) 생성변수 = ReactDOM.createRoot(대상 요소)
        2) 생성변수.render(출력 요소)
    ______________________________________

    [ JSX를 사용하거나 사용하지 않는 경우 ]

    -> 개발자의 선택사항
    -> JSX는 ES6 기반의 자바스크립트 언어의 확장이며
    런타임 시 일반 자바스크립트로 변환됨    
    ______________________________________

    [ JSX 표현식 ]   
    
    JSX를 사용하면 중괄호에 표현식을 작성할 수 있음
    {.....표현식.....}

    -> 표현식이란 React변수, 속성, JS문법 등의 내용

*******************************************/
let num1 = 1000;
let num2 = 7;

// 3. JSX 표현식 사용
const myele3 = <h1>리액트는 {num1*num2}번 사용해도 좋다.</h1>;

// 세 번째 div 요소에 출력
ReactDOM.render(myele3,document.querySelectorAll("#root>div")[2]);

/* 
    [ JSX 태그요소 작성시 여러줄일 경우 ]
        1. 최상위를 하나 만들고 여러요소를 작성한다!
        2. 소괄호로 전체를 싸준다! (소괄호 생략 가능)

        - 지원되는 스타일:
        1) <>태그들</>
        2) <Fragment>태그들</Fragment>
        3) <기존태그>태그들</기존태그>

        -> 1),2)번은 CDN방식에서는 지원안함!(설치형SPA지원!)
        -> 2)번 CDN에서 사용하려면 아래와 같이 사용한다!
            <React.Fragment></React.Fragment>
        -> 1),2)번을 사용하는 이유는 쓸때 없는 태그삽입을 막는데있다!
        -> 기존태그는 <div>,<section> 등 원래있는 html태그를 말함
            (단점, 원하는 않는 태그가 삽입됨!!!)
*/

// 4. 다중요소 html 블록 삽입
const myele4 = (
    <React.Fragment>
        <div>
            <h2>[ 다중요소 html 블록 출력하기 ]</h2>
            <ul>
                <li>프론트엔드 개발</li>
                <li>리액트 적용 개발</li>
                <li>뷰JS 적용 개발</li>
            </ul>
        </div>
    </React.Fragment>
);

// 네 번째 div 요소에 출력
ReactDOM.render(myele4,document.querySelectorAll("#root>div")[3]);