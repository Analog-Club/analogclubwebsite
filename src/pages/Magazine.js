import React from 'react'
import { NavLink } from "react-router-dom";

export default function Magazine(){
    const magazineData = require('../data/magazine_2.json');
    const magazine = magazineData[0];

    return(
        <div className="second-magazine-homepage">
            <div className="right-mag">
                <p className="desc">{magazine.descParagraph}</p>
            </div>
            {/* <div>
                <a href="https://analog-club-uw.square.site/" className="mag-button"style={{ textDecoration: 'none' }}>ORDER NOW</a>
                <p>AVALIABLE UNTIL 02/28/26</p>
            </div> */}
            <div className="left-mag">
                <img src={magazine.photoUrl} className="fadeInUp-animation"/>
                <NavLink to="/home" className="home">back home</NavLink>
            </div>
        </div>
    );
}