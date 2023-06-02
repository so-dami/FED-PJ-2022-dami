// index.js는 public/index.html 페이지에 적용되는 컴포넌트

import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Characters from "./dc/Characters";
import Main from "./dc/Main";
import Layout from "./dc/Layout";
import "./index.css";
import Comics from "./dc/Comics";
import Movies from "./dc/Movies";
import Games from "./dc/Games";
import News from "./dc/News";
import Video from "./dc/Video";

/***********************************************************************
	[ React Router ]
	-> component를 연결할 특정 이벤트의 모듈을 변경해 주는 중계 역할

	1. <BrowserRouter> - router root
	2. <Routes> - 개별 라우터를 묶어주는 역할
	3. <Route> - 개별 라우터
		속성
		(1) path: 경로 지정(Link의 to 속성 경로와 일치함)
		(2) element: 연결할 component 지정
		(3) 하위 라우트 만들기
			<Route path = "/" element={}>
				<Route />
				<Route />
				<Route />
			</Route>
	4. router를 구성하는 component는 자체적으로 내보내기 셋팅을 해야 함
		(1) export default router component
***********************************************************************/

// 라우터 구성 컴포넌트: 스스로 내보내기 셋팅 필수
// 레이아웃 컴포넌트를 라우터에 입혀서 화면에 출력해야 하기 때문
export default function App(){
	
	return(

		<BrowserRouter>
			<Routes>
				
				{/* 중요: 레이아웃 컴포넌트를 루트로 잡아줌 */}
				<Route path="/" element={<Layout />}>

					{/* 하위 라우트 셋팅 */}
					{/* path 대신 index만 쓰면? 첫 페이지임 */}
					<Route index element={<Main />} />
					<Route path="ct" element={<Characters />} />
					<Route path="co" element={<Comics />} />
					<Route path="mv" element={<Movies />} />
					<Route path="gm" element={<Games />} />
					<Route path="nw" element={<News />} />
					<Route path="vd" element={<Video />} />
					
				</Route>
				
			</Routes>
		</BrowserRouter>
		
	); // return //
	
} // App component //

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);