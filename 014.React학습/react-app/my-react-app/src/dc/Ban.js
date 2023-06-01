// 배너 컴포넌트 - Ban.js

import "./css/ban.css";

function Ban(){

    const ban_data = [
        {
            "src": "./images/dcm21.jpg",
            "tit1": "GOTHAM GAZETTE",
            "tit2": "WORLDS TRAVELER",
            "cont": `Barry who? The Flash isn't the only DC hero this summer who's been traveling through the multiverse.`,
            "btn": "New Places, Familiar Faces",
        },
        {
            "src": "./images/dcm25.jpg",
            "tit1": "GET TO KNOW",
            "tit2": "KATANA",
            "cont": `Wielder of the fearsome Soultaker Sword, Tatsu Yamashiro escaped a tragic past to fight alongside the Outsiders and the Suicide Squad.`,
            "btn": "MEET TATSU",
        },
    ];
    
    return (
        <div className="banner">
            <ul className="slider">
                <li>
                    <img className="banimg" src={ban_data[1]["src"]} alt="배너" />
                    <section className="bantit">
                        <h3>{ban_data[1]["tit1"]}</h3>
                        <h2>{ban_data[1]["tit2"]}</h2>
                        <p>{ban_data[1]["cont"]}</p>
                        <button>{ban_data[1]["btn"]}</button>
                    </section>
                </li>
            </ul>
        </div>
    );

} // Ban component //

export default Ban;