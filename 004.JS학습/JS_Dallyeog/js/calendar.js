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
            // cg(prevLast);

            // (1-2) 현월 처음 날짜(옵션: 1)
            // -> 달력 현월 처음 날짜 표시
            // -> 달력 전달 셋팅을 위한 요일을 구하기 위해
            const thisFirst = new Date(curr_date.getFullYear(),curr_date.getMonth(),1);
            // cg(thisFirst);

            // (1-3) 현월 마지막 날짜(옵션: 0)
            // -> 달력 현월 처음 날짜 표시
            // -> 달력 현월 셋팅을 위한 요일을 구하기 위해
            const thisLast = new Date(curr_date.getFullYear(),curr_date.getMonth()+1,0);
            // cg(thisLast);

            // (1-4) 년 표시
            yearTit.innerHTML = curr_date.getFullYear();
            cg(yearTit);

            // (1-5) 월 표시
            // 현재 월: monthTit.innerHTML = curr_date.getMonth()+1;
            monthTit.innerHTML = curr_date.getMonth()+1;
            cg(monthTit);

            // (1-6) 날짜 넣을 배열변수 생성
            const dset = [];

            // (1-7) 전월 날짜로 앞쪽 채우기
            // 조건: 현월 1일이 0(일요일)이 아니면 내용있음
            // cg(thisFirst.getDay());

            if(thisFirst.getDay() !==0){

                // for문 셋팅: 몇바퀴? 요일 순번보다 작을 때까지 ++
                for(let i = 0; i < thisFirst.getDay(); i++){
                    // cg(i);

                    // 전월 클래스: ".bm"
                    // 반복횟수만큼 배열 앞쪽에 추가함
                    // 전월 마지막 날짜부터 -> prevLast.getDate()
                    dset.unshift(`
                    <span style="color:#ccc" class="bm">
                        ${prevLast.getDate()-i}
                    </span>
                    `);

                    // 마지막 날짜 - i증가변수 = 1씩 작아지는 숫자가 추가됨
                    // unshift(): 배열 앞에 값을 추가하는 메서드
                    
                } // for //
            } // if //

            // cg(dset);

        // (2) 현재월 삽입
        // 반복문 구성: 현월 1일부터 마지막 날짜까지 반복 배열추가
        // 현월 마지막 날짜 -> thisLast.getDate()
        for(let i = 1; i <= thisLast.getDate(); i++ ){
            dset.push(i);
        } // for //

        // cg(thisLast.getDate());
        // cg(dset);

        // (3) 익월 남는 칸 삽입
        // 익월 클래스: ".am"
        // 반복문 구성: 익월 1부터 2주 분량
        for(let i = 1; i < 14; i++){
            dset.push(`
                <span style="color:#ccc" class="am">
                    ${i}
                </span>
            `);
        } // for //

        // cg(dset);

        // (4) 화면에 뿌릴 html 변수
        let hcode = "";

            // (4-1) 날짜만큼
            // 7일 * 6주 = 42
            for(let i = 0; i < 42; i++){
                // 오늘 날짜 표시
                if(
                    // 년, 월, 일이 모두 일치하는 경우에만 표시(클래스 today)
                    today.getDate()==dset[i] &&
                    today.getMonth()==curr_date.getMonth() &&
                    today.getFullYear()==curr_date.getFullYear()
                )
                {
                    hcode += `
                        <div class="date today">
                            ${dset[i]}
                        </div>
                    `
                } // if

                else{
                    hcode += `
                        <div class="date">
                            ${dset[i]}
                        </div>
                    
                    `
                }
            } // for //

        // (5) 코드 화면에 넣기
        // 대상: .dates -> dates 변수
        dates.innerHTML = hcode;

        // 각 날짜 .date 요소에 링크 설정
        qsa(".dates").forEach(
            (ele)=>(ele.onclick = () => {
                
                // 년
                let cyear = yearTit.innerText;
                
                // 월
                let cmonth = monthTit.innerText;

                // 일
                let cdate = ele.innerText;

                // 전월, 익월은 span 태그가 있으므로 구분할 것
                let isSpan = ele.querySelector("span");
                cg(isSpan);
                // 없을 경우 null값이 나옴 -> if문에서 false처리됨

                if(isSpan){ // null이 아닐 때만 true 처리되어 들어감
                    
                    let cls = isSpan.classList.contains("bm");
                    cg(cls);

                    if(cls){

                        // 월 -1
                        // Number(문자형숫자) -> 숫자형으로 변환
                        // -, *, / 연산은 브라우저가 자동으로 변환해줌
                        // 그러나 +연산은 문자도 더하는 게 가능하므로
                        // 이것을 강제로 형 변환시켜야 안전함
                        cmonth = Number(cmonth)-1;
                        cg("전월: "+cmonth);

                        // 만약 1월이면 전월이 0이 아니므로 12로 처리해야 함
                        if(cmonth===0){

                            // 월 설정
                            cmonth = 12;

                            // 전년도 설정(-1)
                            cyear = Number(cyear)-1;
                            
                        }; // if //
                        
                    } // 전월 if //
                    
                    else{

                        // 월 +1
                        cmonth = Number(cmonth)+1;
                        cg("익월: "+cmonth);

                        // 만약 12월이면 익월이 13이 아니므로 1로 처리해야 함
                        if(cmonth===13){

                            // 월 설정
                            cmonth = 1;

                            // 다음년도 설정(+1)
                            cyear = Number(cyear)+1;
                            
                        }; // if //
                        
                    } // 익월 else - 제 3의 경우가 있을 경우는 else X //
                    
                } // if //

                // 최종 날짜 데이터
                let comp = cyear + "-" + addZero(cmonth) + "-" + addZero(cdate);

                // cg(comp);

            }) // click//

        ); // forEach //

    }; // initDallyeok //

    // 0자릿수 만들기 함수
    const addZero = (x) => (x < 10 ? "0" + x : x);
    // 보낸 숫자가 10보다 작으면 앞에 "0"을 더해서 리턴
    
        // 함수 최초 호출
        initDallyeok();
    
        // (6) 이전 달력 출력하기 함수
        const prevCal = () => {

            // 전월로 변경하여 initDallyeok() 함수 호출
            // getMonth() 월 가져오기
            // setMonth() 월 셋팅하기
            curr_date.setMonth(curr_date.getMonth()-1);

            // 함수 호출
            initDallyeok();
            
        }; // prevCal //

        // (7) 다음 달력 출력하기 함수
        const nextCal = () => {

            // 익월로 변경하여 initDallyeok() 함수 호출
            // getMonth() 월 가져오기
            // setMonth() 월 셋팅하기
            curr_date.setMonth(curr_date.getMonth()+1);

            // 함수 호출
            initDallyeok();
            
        }; // nextCal //

        // (8) 버튼에 클릭 설정
        qs(".btnL").onclick = prevCal;
        qs(".btnR").onclick = nextCal;

} // MakeDallyeok //