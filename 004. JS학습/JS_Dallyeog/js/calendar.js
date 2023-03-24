// 달력 생성자함수 //

// 호출
MakeDallyeok();

function MakeDallyeok(){

    // 선택함수
    const qs = x => document.querySelector(x);
    const qsa = x => document.querySelectorAll(x);

    // 메시지
    const cg = x => console.log(x);
    
    // 1. 변수 셋팅

        // (1) 변경할 현재 날짜 객체
        const curr_date = new Date();

        // (2) 오늘 날짜 객체
        const today = new Date();

        // (3) 년도 요소: .yearTit
        const yearTit = qs(".yearTit");

        // (4) 월 요소: .monthTit
        const monthTit = qs(".monthTit");

        // (5) 날짜 요소: .dates
        const dates = qs(".dates");

        cg(dates);

    // 2. 함수 생성

        // (1) 달력 초기화 구성 함수
        const initDallyeok = () => {

            // getMonth() 정보는 항상 현재달 숫자보다 -1 (배열순번)

            // (1-1) 전월 마지막 날짜(옵션: 0)
            // -> 달력 전월 끝쪽 날짜 표시
            const prevLast = new Date(curr_date.getFullYear(),curr_date.getMonth(),0);
            cg(prevLast);

            // (1-2) 현월 처음 날짜(옵션: 1)
            // -> 달력 현월 처음 날짜 표시
            // -> 달력 전달 셋팅을 위한 요일을 구하기 위해
            const thisFirst = new Date(curr_date.getFullYear(),curr_date.getMonth(),1);
            cg(thisFirst);

            // (1-3) 현월 마지막 날짜(옵션: 0)
            // -> 달력 현월 처음 날짜 표시
            // -> 달력 현월 셋팅을 위한 요일을 구하기 위해
            const thisLast = new Date(curr_date.getFullYear(),curr_date.getMonth()+1,0);
            cg(thisLast);

            // (1-4) 년 표시
            yearTit.innerHTML = curr_date.getFullYear();
            cg(yearTit);

            // (1-5) 월 표시
            monthTit.innerHTML = curr_date.getMonth();
            cg(monthTit);

            // (1-6) 날짜 넣을 배열변수 생성
            const dset = [];

            // (1-7) 전월 날짜로 앞쪽 채우기
            // 조건: 현월 1일이 0(일요일)이 아니면 내용있음
            // cg(thisFirst.getDay());

            if(thisFirst.getDay() !==0){

                // for문 셋팅: 몇바퀴? 요일 순번보다 작을 때까지 ++
                for(let i = 0; i < thisFirst.getDay(); i++){
                    cg(i);

                    // 반복횟수만큼 배열 앞쪽에 추가함
                    // 전월 마지막 날짜부터 -> prevLast.getDate()
                    dset.unshift(prevLast.getDate()-i)

                    // 마지막 날짜 - i증가변수 = 1씩 작아지는 숫자가 추가됨
                    // unshift(): 배열 앞에 값을 추가하는 메서드
                    
                } // for //
            } // if //

            cg(dset);

        // (2) 현재월 삽입
        // 반복문 구성: 현월 1일부터 마지막 날짜까지 반복 배열추가
        // 현월 마지막 날짜 -> thisLast.getDate()
        for(let i = 1; i <= thisLast.getDate(); i++ ){
            dset.push(i);
        } // for //

        cg(thisLast.getDate());
        cg(dset);

        // (3) 익월 남는 칸 삽입
        // 반복문 구성: 익월 1부터 2주 분량
        for(let i = 1; 1 < 14; i++){
            dset.push(i);
        } // for //

        cg(dset);

        // (4) 화면에 뿌릴 html 변수
        let hcode = "";

            // (4-1) 날짜만큼
            // 7일 * 6주 = 42
            for(let i = 0; i < 42; i++){
                
            } // for //

    }; // initDallyeok //

        // 함수 호출
        initDallyeok();

} // MakeDallyeok //