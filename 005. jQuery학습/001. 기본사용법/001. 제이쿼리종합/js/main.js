// 미니언즈 좀비 탈출 애니 구현 JS - main.js

$(() => { // jQB //

    // 로딩 확인
    console.log("로딩 완료");

    /*********************************** 
        [ 요구사항정리 ]
        1. 버튼을 클릭하여 미니언즈가
        순서대로 특정위치로 이동하며
        메시지를 보여준다
        2. 각 위치별 좀비를 등장시킨다
        3. 맨윗층에서 탈출할때 헬기를 사용한다

        [ 변경대상 ]
        1. 주인공 미니언즈
        2. 좀비 미니언즈들
        3. 주사기
        4. 헬기

        [ 이벤트와 이벤트대상  ]
        1. 이벤트 : 클릭이벤트
        2. 이벤트대상 : 버튼들
        3. 기능구분 : 버튼글자(지시사항)

    ***********************************/

    // 0. 변수에 할당
        // (1) 미니언즈
        const mi = $(".mi");

        // (2) 건물
        const bd = $(".building li");

        // (3) 버튼들
        const btns = $(".btns button");
        
        // (4) 메시지 박스
        const msg = $(".msg");
        
        // (5) 좀비, 주사기 요소 변수 처리
        let mz1 = `<img src="./images/mz1.png" alt="좀비1" class="mz">`;
        let mz2 = `<img src="./images/mz2.png" alt="좀비2" class="mz">`;
        let zom = `<img src="./images/zom.png" alt="좀비들" class="mz">`;
        let inj = `<img src="./images/inj.png" alt="주사기" class="inj">`;

        // console.log(mi,bd,btns,msg);
        
    // 1. 건물 각 방에 번호 넣기 + 좀비, 주사기 넣기
    // 대상: .building li -> bd 변수

        // (1) 제이쿼리 메서드
            // (1-1) each((순서,요소)=>{})
            // -> 요소의 개수만큼 순서대로 돌아줌
            // (1-2) append(요소)
            // -> 요소 내부에 자식요소 추가(이동)

            bd.each((idx,ele)=>{
                // console.log(idx,ele);

                // 각 방에 숫자로 순번 넣기
                $(ele).text(idx);
                
                // 좀비(mz1,mz2,zom), 주사기(inj) 넣기
                switch(idx){
                    case 9:
                        $(ele).append(mz1); break;
                    case 7:
                        $(ele).append(mz2); break;
                    case 1:
                        $(ele).append(zom); break;
                    case 2:
                        $(ele).append(inj); break;
                } // switch case //
            }); // each //

        // (2) 좀비는 모두 숨기기
        $(".mz").hide();
        // -> hide();에 시간 설정을 안 하면 display: none 처리함

    // 2. 버튼 셋팅
    // 대상: .btns button -> btns 변수
    btns.hide().first().show();

    // 3. 공통 함수: actMini()
        // (1) 전달변수 3개
            // (1-1) ele - 클릭된 버튼 요소
            // (1-2) seq - 이동할 li 방 순번
            // (1-3) fn - 이동 후 실행할 콜백함수
    
    const actMini = (ele,seq,fn) => {

        // (1) 클릭된 버튼 사라지기
        $(ele).slideUp(500);

        // (2) 메시지 없애기: .msg -> msg 변수
        msg.fadeOut(500);

        // (3) 미니언즈 이동할 위치값 구하기
        // 위치: li seq번방 -> bd 변수에 있는 모든 li 중 seq번
        let room = bd.eq(seq);
        // console.log(room);

        // 위치값 배열변수
        let pos = [];

        // top 위치값
        pos[0] = room.offset().top;
        // jQuery 위치값 정보 메서드: offset()
        // -> 하위 속성: top, left, right, ...
        // ※ 참고: 500.필기모음 - 017, 018

        // left 위치값: 8번 방의 중앙으로 이동
        // -> left 위치값 + li 가로 크기의 1/2 - 미니언즈 가로 크기의 1/2

        pos[1] = room.offset().left + room.width()/2 - mi.width()/2;
        console.log(room,pos)

        // jQuery 가로, 세로 크기 정보 메서드
        // -> width(), height()

        // (4) 미니언즈 이동하기
        // 대상: .mi -> mi 변수
        mi.animate({
            top: pos[0]+"px",
            left: pos[1]+"px"
        },800,"easeOutElastic",
        fn // -> 전달된 콜백함수
        ); // animate //

    }; // actMini 함수 //

    // 4. '들어가기' 버튼 클릭 시
    btns.first().click(function(){

        // 이동 후 콜백함수
        let fn = ()=>{ // 콜백함수
            // 화살표 함수 ()=>{} 쓰고 this 하면 원래 대상을 싸고 있는 그 위에 있는 대상이 선택됨
            // ex. function(){}의 this는 mi, 화살표함수를 사용하면 this는 btns.first()
    
            // (5) 메세지 넣기
            msg.html("아늑하당ㅋ<br>이제 옆방으로 보내줘").fadeIn(500)

            // (6) 다음 버튼 보이기
            // this 키워드 -> 화살표함수를 사용하여 싸고있는 요소인 클릭된 버튼을 가리킴
            // console.log(this);
            $(this).next().delay(800).slideDown(500);

        }; // fn 함수 //

        // 공통함수 호출: this는 클릭된 버튼
        actMini(this,8,fn);

    }) // '들어가기' 버튼 끝 //

    // 5. '옆방으로' 버튼 클릭 시 9번 방으로 이동하기
    .next()
    .click(function(){
        let fn = () => { // 콜백함수

            // (1) 좀비 나타나기 (1초 후)
            bd.eq(9).find(".mz")
            .delay(1000)
            .fadeIn(500,()=>{ // 콜백함수

                // (5) 메세지 넣기
                msg.html("좀비다<br>피하자")
                .css({left: "-100%"})
                .fadeIn(500)

                // (6) 다음 버튼 보이기
                // this 키워드 -> 화살표함수를 사용하여 싸고있는 요소인 클릭된 버튼을 가리킴
                // console.log(this);
                $(this).next().delay(800).slideDown(500);

            }); // fadeIn //
            
        }; // fn 함수 //
        
        // 공통함수 호출: this는 클릭된 버튼
        actMini(this,9,fn);

    }) // '옆방으로' 버튼 끝 //

}); // jQB //