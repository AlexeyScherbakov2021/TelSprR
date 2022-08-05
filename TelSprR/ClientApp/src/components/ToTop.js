import React, { useState, useEffect } from 'react';
import './ToTop.css'

function ToTop(props) {
    const [displayToTop, setDisplayToTop] = useState("none");

    useEffect(() => {
        window.addEventListener('scroll', onScrollList);

        return () => {
            window.removeEventListener('scroll', onScrollList)
        }
    });

    //-----------------------------------------------------------------------------------
    function onScrollList(e) {
        if (window.scrollY > 400) {
            setDisplayToTop("block");
        } else {
            setDisplayToTop("none");
        }
    }
    //-----------------------------------------------------------------------------------
    function onClick(e) {
        window.scrollTo(0, 0);
    }

    var toTopStyle = {
        display: displayToTop
    };

    return (
        <a className="totop" style={toTopStyle} onClick={onClick}></a>
    );

}

export default ToTop;



