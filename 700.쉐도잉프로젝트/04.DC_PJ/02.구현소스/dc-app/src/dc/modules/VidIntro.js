// VidIntro 모듈 - VidIntro.js

import $ from 'jquery';
import "../css/vidintro.css";
import vidintro_data from '../data/vidintro';

// jQB 로드구역
function jqFn(){

    $(()=>{}); // jQB //
    
} // jqFn //

function VidIntro(props){ 
    // props.pg - 해당페이지 데이터속성명
    // props.mm - 디자인 CSS클래스"on"속성

    // 데이터 선택하기
    const sdt = vidintro_data[props.pg];
    // console.log(sdt.sum);

    // 링크코드 생성 함수 : desc 데이터 / sum 데이터에서 처리
    const lcode = (data) => { // data는 desc/sum 둘중에 전달됨
        return(
            <>
                {data.split('*')[0]}
                <a href={sdt.link[1]} target='_blank'>
                    {sdt.link[0]}
                </a>
                {data.split('*')[1]}            
            </>
        )
    }

    return(

        // 빈 루트 생성
        <>

            {/* 모듈 코드 구역 */}
            <section className={'vidbox'+' '+props.mm}>

            {/* 비디오 */}
            <div className='vb1'>
                <iframe src={sdt.vsrc} title={sdt.btit}></iframe>
            </div>

            {/* 타이틀 */}
            <div className='vb2'>
                <h3>{sdt.stit}</h3>
                <h2>{sdt.btit}</h2>
                <p>
                    {/* 특수문자(*) 여부에 따라 처리
                    indexOf(문자열) -> 없으면 -1리턴 */}
                    {
                        sdt.sum.indexOf('*') == -1 ?
                        sdt.sum : lcode(sdt.sum)
                    }
                </p>
                <p className='desc'>
                    {/* 특수문자(*)여부에 따라 처리
                    indexOf(문자열) -> 없으면 -1리턴 */}
                    {
                        sdt.desc.indexOf('*') == -1 ?
                        sdt.desc : lcode(sdt.desc)
                    }
                </p>

                    {/* 링크 있을 경우 표시 */}
                    
                </div>

            </section>
    
            {/* 빈 루트를 만들고 JS 로드 함수 포함 */}
            {jqFn()}

        </>
        
    ); // return //
    
} // MenuBtn //

// 내보내기
export default VidIntro;