// 배너 컴포넌트 - Ban.js

// 배너 CSS
import "./css/ban.css";

// 배너 데이터
import ban_data from "./data/banner";

// 반복 리스트 코드 생성용 컴포넌트
// rec - 개별 레코드값(객체 형식)
function MakeList(props){

    return(
        <li>
            <img className="banimg" src={props.rec["src"]} alt="배너" />
            <section className="bantit">
                <h3>{props.rec["tit1"]}</h3>
                <h2>{props.rec["tit2"]}</h2>
                <p>{props.rec["cont"]}</p>
                <button>{props.rec["btn"]}</button>
            </section>
        </li>
    );
    
} // MakeList component //

// 배너 출력용 컴포넌트
function Ban(props){

    // props.cat - 배너 데이터 구분 속성명
    // sel_data에 담긴 값은 ./data/banner.js의 객체의 배열값
    const sel_data = ban_data[props.cat];

    return(
        <div className="banner">
            <ul className="slider">
                {
                    sel_data.map(x=> <MakeList rec={x} />)
                }
            </ul>
        </div>
    );

} // Ban component //

export default Ban;