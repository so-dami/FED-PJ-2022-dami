// DC 로고 컴포넌트

import React from "react";
import isrc from "./ImgSrc";

const Logo = () => {

    // 객체형 스타일 적용: 속성명이 틀리면 아예 출력되지 않음
    const mystyle={
        width: "40px",
        height: "40px",
        marginRight: "80px",
        borderRadius: "50%"
        // outline: "3px solid lime"
    };

    return(

        <h1 style={mystyle}>
            <img src={isrc.logo} style={{width: "40px"}} />
        </h1>
        
    ); // return //
    
}; // Logo //

// 로고 내보내기
export default Logo;