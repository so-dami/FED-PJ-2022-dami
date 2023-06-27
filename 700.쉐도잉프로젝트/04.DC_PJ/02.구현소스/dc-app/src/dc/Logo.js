// DC 로고 컴포넌트
import React from "react";
import isrc from "./ImgSrc";

const Logo = (props) => {
    // props.gb : 상단, 하단 구분 코드

    // 객체형 스타일 적용: 속성명이 틀리면 아예 출력되지 않음
    const mystyle = {
        
        top: {
            width: "45px",
            height: "45px",
            marginRight: "30px",
            borderRadius: "50%",
            // outline:"3px solid lime"
        },

        bottom: {
            height: "80px",
        },
    };

    let istyle = {
        top: "45px",
        bottom: "80px",
    };

    // 자식 컴포넌트 처리용 함수
    const me = (x) => {

        // 속성 전달을 통한 부모 함수 호출 및 값 전달
        props.tt(x);
        
    }; // me //
    
    return (

        <h1 style={mystyle[props.gb]} onClick={()=>me("it's me")}>
            <img src={isrc.logo} style={{ width: istyle[props.gb] }} />
        </h1>
        
    ); // return //
    
}; // Logo //

// 로고 내보내기
export default Logo;