// 캐릭터 상세 페이지 컴포넌트 - Detail.js
// 라우터 파라미터값 받아서 데이터 처리하기

import { useLocation } from "react-router-dom";
import Ban from "./modules/Ban";

// css 가져오기
import "./css/detail.css";

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
        // 3. 캐릭터 명세 - '^' 문자로 잘라 배열로 데이터 변경
        let facts = loc.state.facts;
        facts = facts.split('^');
    
    return(

        <>

            {/* 1. 배너 컴포넌트 */}
            <Ban cat={cname} />

            {/* 2. 상세정보 박스 */}
            <div className="detail">

                <div className="descbx">
                    <h2>{cname}</h2>
                    <div className="cdesc">
                        {cdesc.map((v,i)=>
                            <p key={i}>{v}</p>
                        )}
                    </div>
                </div>
                
                <div className="facts">
                    <div>
                        <h3>CHARACTER FACTS</h3>

                        <table>
                            <tbody>
                                {facts.map((v,i)=>
                                    <tr key={i}>
                                        <td>{v.split(':')[0]}:</td>
                                        <td>{v.split(':')[1]}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
            
        </>
        
    )
    
} // Detail //

// 내보내기
export default Detail;