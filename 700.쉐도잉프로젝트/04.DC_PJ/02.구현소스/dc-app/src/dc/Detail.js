// 캐릭터 상세 페이지 컴포넌트 - Detail.js
// 라우터 파라미터값 받아서 데이터 처리하기

import { useLocation } from "react-router-dom";

function Detail(props){
    
    // 라우터 전달값을 받기 위한 useLocation 생성하기
    const loc = useLocation();

    // 보낸 속성명을 변수에 할당하기
    // state.속성명: 내가 라우터를 통해 보낸 속성명 받기

        // 1. 캐릭터 이름
        const cname = loc.state.cname;
        // 2. 캐릭터 설명 - '^' 문자로 잘라 배열로 데이터 변경
        let cdesc = loc.state.cdesc;
        cdesc = cdesc.split('^');
        // 3. 캐릭터 명세
        const facts = loc.state.facts;

    return(

        <>

            <h2>{cname}</h2>
            <div className="cdesc">
                {
                    cdesc.map(v=><p>{v}</p>)
                }
            </div>
            
            <div className="facts">
                <h3>CHARACTER FACTS</h3>
                {facts}
            </div>
            
        </>
        
    )
    
} // Detail //

// 내보내기
export default Detail;