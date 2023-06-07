// 배너 컴포넌트 - Ban.js

// 배너 CSS
import "../css/ban.css";

// 배너 데이터
import ban_data from "../data/banner";

// 제이쿼리
import $ from "jquery";

/* 
    [ JS 혹은 jQuery 라우터 구현 시 로드 불일치 문제 ]
    
    JS 기능이 들어간 페이지의 로드구역 설정 시 본 페이지가 index페이지에 바로 불려질 경우 이 문제는 발생하지 않는다.
    그러나 라우터로 서브 로딩을 구현할 경우 이 구역은 라우터 모체가 로딩되는 것으로 실행된다.

    따라서, 본 모듈이 적용하려고 한 의도와 달리 본 소스에는 적용되지 못한다.
    -> 라우터 로딩 불일치 문제


    [ 해결방법 ]
    
    로딩구역을 함수로 만들고 컴포넌트 소스 하단에서 호출함

    ex. function jqFn(){
            로드구역을 포함한 소스
        }
        
        function 컴포넌트(){
            return(

                <>
                    소스
                    {jqFn()} -> 함수 호출
                </>
                
            ); 
        }
*/

// 로드구역 함수화
function jqFn(){

    // jQB //
    $(()=>{

        // 0. 광클 금지 변수
        let prot = 0;
        
        // 1. 버튼 클릭 시 이동 기능 구현
        $(".abtn").click(function(){

            // (0) 광클 금지
            if(prot) return;
            prot = 1;
            setTimeout(()=>{prot=0}, 400)

            // (1) 버튼 구분하기
            let isB = $(this).is(".rb");
            console.log("오른쪽 버튼?",isB);

            // 슬라이드 타겟 설정
            // -> 클릭된 버튼의 형제요소 슬라이더
            const tg = $(this).siblings(".slider");
            
            // (2) 분기하여 기능 구현하기
            // 오른쪽 버튼 클릭 시: 오른쪽에서 들어옴(left: 0 -> -100%)
            if(isB){

                tg.animate({left: "-100%"},400,
                    function(){
                        // this는 tg 
                        // 첫 번째 li 맨 뒤로 이동, 동시에 튐 현상 방지(left: 0)
                        $(this).append($(this).find("li").first())
                        .css({left: "0"});
                }); // animate //
                
            } // if //

            // 왼쪽 버튼 클릭 시: 왼쪽에서 들어옴(left: -100% -> 0)
            else{

                // 마지막 li 맨 앞으로 이동, 동시에 left: -100% 후 left:0 애니
                tg.prepend(tg.find("li").last())
                .css({left: "-100%"})
                .animate({left: "0"},400)

            } // else //

            // 2. 배너와 일치하는 블릿에 클래스 "on" 넣기(나머지는 "on" 제거)
            // 대상: .indic li
            // eq(순번) -> 오른쪽 이동 시 1, 왼쪽 이동 시 0
            // isB 값으로 오른쪽은 true - 1, 왼쪽은 false - 0
            // 순서가 바뀌는 슬라이드에 고유 순번 속성 data-seq값을 읽어옴
            $(".indic li").eq(tg.find("li").eq(isB).attr("data-seq"))
            .addClass("on").siblings().removeClass("on");
            
        }); // click //
        
    }); // jQB //

} // jqFn 함수 //

// 반복 리스트 코드 생성용 컴포넌트
// rec - 개별 레코드값(객체 형식)
function MakeList(props){

    return(
        <li data-seq={props.idx}>
            <img className="banimg" src={props.rec["src"]} alt="배너" />
            <section className="bantit">
                <h3>{props.rec["tit1"]}</h3>
                <h2>{props.rec["tit2"]}</h2>
                <p>{props.rec["cont"]}</p>
                <button>{props.rec["btn"]}</button>
            </section>
        </li>
    );
    
} // MakeList //

// 배너 출력용 컴포넌트
function Ban(props){

    // props.cat - 배너 데이터 구분 속성명
    // sel_data에 담긴 값은 ./data/banner.js의 객체의 배열값
    const sel_data = ban_data[props.cat];

    return(
        <div className="banner">

            {/* 이동 슬라이드 */}
            <ul className="slider">
                {
                    sel_data.map((x,i)=>
                    <MakeList rec={x} key={i} idx={i} />)
                }
            </ul>
            
            {/* 이동 버튼, 슬라이드 블릿(순번): 슬라이드가 2개 이상 일때만 보이게 */}
            {
                // 조건식 && 코드: 조건식이 ture일 때 코드 출력
                sel_data.length > 1 &&
                <>
                    {/* 양쪽 이동 버튼 */}
                    <button className="abtn lb">＜</button>
                    <button className="abtn rb">＞</button>

                    {/* 블릿 인디케이터*/}
                    <ol className="indic">
                        {
                            sel_data.map((x,i)=>
                                <li className={i==0? "on" : ""} key={i}></li>
                            )
                        }
                    </ol>
                </>
            }

            {/* JS, jQuery 로드구역 호출 */}
            {/* -> 여기서 ;하면 오류남 하지마~! */}
            {jqFn()}
            
        </div>
    );

} // Ban component //

export default Ban;