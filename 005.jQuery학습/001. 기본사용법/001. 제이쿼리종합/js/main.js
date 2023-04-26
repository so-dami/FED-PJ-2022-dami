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
                    case 647:
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
    // btns.hide().eq(5).show();

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

            // (4 다음 버튼 보이기
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

    // 6. '위층으로 도망가' 버튼 클릭 시 7번 방으로 이동하기
    .next()
    .click(function(){
        let fn = () => { // 콜백함수

            // 메시지 보이기
            msg.html(`여긴 없겠지?`)
            .fadeIn(400);

            // 좀비 보이기
            bd.eq(7).find(".mz")
            .delay(1000).fadeIn(400,()=>{ // 좀비 등장 후 메시지와 버튼 생기기

                // 메시지 변경하기
                msg.html(`아 미친`);

                // 다음 버튼 보이기
                $(this).next().delay(800).slideDown(500);

            }); // fadeIn //

        }; // fn 함수 //
        
        // 공통함수 호출: 7번 방으로
        actMini(this,7,fn);

    }) // '위층으로 도망가' 버튼 끝 //

    // 7. '다시 옆방으로' 버튼 클릭 시 6번 방으로 이동하기
    .next()
    .click(function(){
        let fn = () => { // 콜백함수

            // 메시지 보이기
            msg.html(`여긴 없겠지?`)
            .fadeIn(200)
            .delay(1000) // 1초 지연(애니 앞에만 적용)
            .fadeIn(200,()=>{

                // 두 번째 메시지
                msg.html(`그래도 무서워<br>위로 갈래`);

                // 다음 버튼 보이기
                $(this).next().delay(800).slideDown(500);
                
            }); // fadeIn //

        }; // fn 함수 //
        
        // 공통함수 호출: 6번 방으로
        actMini(this,6,fn);

    }) // '다시 옆방으로' 버튼 끝 //

    // 8. '무서우니 위층으로' 버튼 클릭 시 4번 방으로 이동하기
    .next()
    .click(function(){
        let fn = () => { // 콜백함수

            // 무서워 메시지
            msg.html(`무`)
            .fadeIn(200)
            .delay(500)
            .fadeIn(200,()=>msg.html(`무.`))
            .delay(500)
            .fadeIn(200,()=>msg.html(`무.서`))
            .delay(500)
            .fadeIn(200,()=>msg.html(`무.서.`))
            .delay(500)
            .fadeIn(200,()=>msg.html(`무.서.워`))
            .delay(500)
            .fadeIn(200,()=>msg.html(`무.서.워.`))
            .delay(500)
            .fadeIn(200,()=>msg.html(`무.서.워..`))
            .delay(500)
            .fadeIn(200,()=>msg.html(`무.서.워...`))
            .delay(500)
            .fadeIn(200,()=>{
                // 7번 방 좀비가
                bd.eq(7).find(".mz")
                .animate({
                    // 위층으로 li 높이만큼 올라와서
                    bottom: bd.eq(7).height()+"px"
                },500,"easeOutElastic")
                .delay(500)
                .animate({
                    // 달려들기
                    // 왼쪽으로 li 넓이 * 1.2 만큼 이동
                    right: bd.eq(7).width()*1.2+"px"
                },1000,"easeOutBounce",()=>{
                    // 좀비한테 물린 후 대사
                    msg
                    .css({left: "-100%"})
                    .html(`아파<br>치료 주사방으로`)

                    // 미니언즈 -> 좀비로 변경 (1초 후)
                    setTimeout(() => {
                        mi.find("img")
                        .attr("src","images/mz1.png")
                        // 이미지 흑백처리
                        .css({filter: "grayscale(100%)"})
                        
                        // 다음 버튼 보이기
                        $(this).next().delay(800).slideDown(500);
                    }, 1000);
                })
            })
        }; // fn 함수 //
        
        // 공통함수 호출: 4번 방으로
        actMini(this,4,fn);

    }) // '무서우니 위층으로' 버튼 끝 //

    // 9. '치료 주사방으로' 버튼 클릭 시 2번 방으로 이동하기
    .next()
    .click(function(){
        let fn = () => { // 콜백함수

            // 주사기 돌리기
            // -> animate는 transform 적용 안됨
            $(".inj").css({
                // 반시계 방향
                transform: "rotate(-150deg)",
                // 트랜지션: 속시이지
                // 0.5초 후 0.5초간 애니
                transition: ".5s .5s",
                // 미니언즈 보다 위
                zIndex: "9999"
            }); // css //

            // 1초 후 미니언즈 부활
            setTimeout(() => {
                // 이미지 변경
                mi.find("img")
                .attr("src","images/m2.png")
                // 흑백에서 컬러로 변경
                .css({filter: "grayscale(0)"})

                // 대사
                msg.html(`이제 조금만 더<br>가면 탈출이야`)
                .fadeIn(200);

                // 주사기 없애기
                $(".inj").hide();
                
                // 다음 버튼 보이기
                $(this).next().delay(800).slideDown(500);

            }, 1000);

        }; // fn 함수 //
        
        // 공통함수 호출: 2번 방으로
        actMini(this,2,fn);

    }) // '치료 주사방으로' 버튼 끝 //

    // 10. '3번 방으로' 버튼 클릭 시 3번 방으로 이동하기
    .next()
    .click(function(){
        let fn = () => { // 콜백함수

            // 대사
            msg.html(`위층으로...`).fadeIn(300);

            // 다음 버튼 보이기
            $(this).next().delay(800).slideDown(500);
            
        }; // fn 함수 //
        
        // 공통함수 호출: 3번 방으로
        actMini(this,3,fn);

    }) // '3번 방으로' 버튼 끝 //

    // 11. '1번 방으로' 버튼 클릭 시 1번 방으로 이동하기
    .next()
    .click(function(){
        let fn = () => { // 콜백함수

            // 대사
            msg.html(`이제 곧 탈출이다...`).fadeIn(300);

            // 다음 버튼 보이기
            $(this).next().delay(800).slideDown(500);
            
        }; // fn 함수 //
        
        // 공통함수 호출: 1번 방으로
        actMini(this,1,fn);

    }) // '1번 방으로' 버튼 끝 //

    // 12. '헬기 호출' 버튼 클릭 시 0번 방으로 이동하기
    .next()
    .click(function(){
        let fn = () => { // 콜백함수

            // 대사
            msg.html(`도와줘`).fadeIn(300);

            // 1번 방에 있는 단체 좀비들이 달려들음
            bd.eq(1).find(".mz").fadeIn(300)
            .animate({
                right: bd.eq(1).width()+"px",
            },3000,"easeInExpo")

            // 헬기 등장
            $(".heli")
            .animate({
                left: "20%" // 헬기가 미니언즈 위치까지 이동함
            },4000,"easeOutBack",function(){ // 콜백함수
                // 헬기 이동 완료 후 헬기 이미지 변경
                // (this = .heli)
                $(this).attr("src","images/heli12.png")

                // 원본 미니언즈 없애기
                mi.hide();
            })
            // 0.5초 쉬기
            .delay(500)
            .animate({
                left: "70%"
            },4000,"easeInOutCirc",function(){ // 애니 후 실행함수
                // 끝에서 조정사 좀비로
                $(this).attr("src","images/heli3.png")
            })
            .delay(300)
            // 헬기 바깥으로(오른쪽) 천천히 밀기
            .animate({
                left: "100%"
            },10000,"lienar",()=>{ // 헬기 나간 후

                // 간판 떨어트리기

                    // 1단계: 중간까지 떨어짐
                    // -> 간판에 class "on" 주기
                    let tit = $(".tit");
                    tit.addClass("on");

                    // 2단계: 맨 아래까지 떨어짐
                    // -> 3초 후 간판에 class "on2" 추가
                    setTimeout(() => {
                        tit.addClass("on2")
                    }, 3000);

                // 건물 무너뜨리기
                // -> 간판 떨어진 후 실행(6초 후)
                setTimeout(() => {
                    // parent() 부모요소인 .building
                    bd.parent().addClass("on");
                }, 6000);

            }); // animate //
            
        }; // fn 함수 //
        
        // 공통함수 호출
        actMini(this,0,fn);

    }) // '헬기 호출' 버튼 끝 - 모든 버튼 마무리 //

    // 간판에 마우스 오버/아웃 시 색상 변경
    // hover(함수1, 함수2)
    $(".tit").hover(

        // 오버
        function(){
            $(this).css({
                backgroundColor: "lightblue",
                border: "5px solid blue"
            }); // 오버 css //
        },

        // 아웃
        function(){
            $(this).css({
                backgroundColor: "pink",
                border: "5px solid red"
            }); // 아웃 css //

        }); // hover //

}); // jQB //