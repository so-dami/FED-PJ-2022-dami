// 07. 조건 렌더링 + 리스트 렌더링 JSX
// 리액트에서는 조건부로 구성요소를 렌더링 할 수 있음

// 1. if문을 사용하여 조건부 렌더링하기
// 선택적으로 로딩하도록 컴포넌트 2개 생성하기

// 컴포넌트1
function MakeDev(){

    return <h1>나는 개발자이다.</h1>;
    
} // MakeDev //

// 컴포넌트2
function LostDev(){

    return <h1>개발자가 뭐지?</h1>;
    
} // LostDev //

// 컴포넌트3
function MakeImg(props){

    return <img src={props.isrc} alt={props.ialt} />;
    
} // MakeImg //

// 메인 컴포넌트 출력
// 위의 2가지 컴포넌트 중 선택적으로 출력
// props - 호출 시 전달되는 속성
function Developer(props){

    // 값: true or flase
    const isNow = props.isDev;

    // 조건문
    if(isNow){

        return(
            <React.Fragment>
                <MakeDev />
                <MakeImg isrc={props.isrc} ialt={props.ialt} />
            </React.Fragment>
        ); // return //
        
    } // if //

    // else 없이도 if문에 들어가면 return 때문에 컴포넌트를 나감
    return(
        <React.Fragment>
            <LostDev />
            <MakeImg isrc={props.isrc} ialt={props.ialt} />
        </React.Fragment>
    ); // return //
    
} // Developer component //

// 이미지 경로 배열
const wisrc = [
    "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/HYAONH6EGJBKIU5CJWWF343MKE.jpg",
    "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201608/04/htm_2016080484837486184.jpg"

]

// 컴포넌트 호출1
ReactDOM.render(<Developer
    isDev={true}
    isrc={wisrc[0]}
    ialt="프론트엔드 개발자 공유입니다."
/>,
document.querySelector("#root1"));

// 컴포넌트 호출2
ReactDOM.render(<Developer
    isDev={false}
    isrc={wisrc[1]}
    ialt="주먹대왕 마동석"
/>,
document.querySelector("#root2"));

// 2. if문이 아닌 조건 표현하기
// 조건식 && JSX 표현식
// 조건이 true일 때만 && 뒤에 jsx 표현식이 출력됨

    // 2-1. 제목을 찍기 위한 타이틀 컴포넌트
    // 컴포넌트 호출 시 속성으로 tit 셋팅
    function Title(props){

        return <h1>개발자가 좋아하는 {props.tit}</h1>
        
    } // Title component //

    // 음식 리스트
    const foods = [
        "파스타",
        "짜파게티",
        "감자탕",
        "사시미",
        "피자"
    ];
    
    // const foods = [];

    // 2-2. 반복 리스트를 위한 컴포넌트
    function FoodList(props){

        // 음식명을 fname에 담아서 보내줌
        return <li>개발자는 {props.fname} 좋아해~</li>
        
    }; // FoodList component //

    // 2-3. 개발자 선호 음식 리스트 출력 컴포넌트
    function WishList(props){

        // 위시리스트 담기
        // wlist 속성에 담아 보내줌
        const myfood = props.wlist;

        // 코드 리턴
        return(
            <React.Fragment>
                <Title tit="음식" />
                {/* 음식 위시 리스트의 길이가 0 보다 클 때만 출력 */}
                {
                    myfood.length > 0 &&
                    <div>
                        <h2>
                            개발자가 좋아하는 음식은 모두 {myfood.length}가지입니다.
                        </h2>
                        <ul>
                            {
                                // 배열변수.mpa() 메서드 사용
                                // map(변수=>{ㅍ현식})
                                // 변수는 화살표함수 안으로 배열값 전달
                                myfood.map(x=> <FoodList fname={x} />)
                            }
                        </ul>
                    </div>
                }
            </React.Fragment>
        ); // return //
        
    }; // WishList component //

    // 컴포넌트 출력
    ReactDOM.render(WishList wlist={foods},
    document.querySelector("#root2"))