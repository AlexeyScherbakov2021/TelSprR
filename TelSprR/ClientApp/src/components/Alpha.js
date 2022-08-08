import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../redux/RootReducer'

//var Alphabet = [];


function Alpha(props) {

    const [loading, setLoading] = useState(true);
    const [Alphabet, setAlphabet] = useState([]);

    useEffect(() => {
        //console.log("Alpha useEffect", props.selectedOtdel);
        LoadAlpha(props.selectedOtdel);

    }, [props.selectedOtdel]);

    //console.log("otdel",  props.curOtdel);


    //-----------------------------------------------------------------------------------------------------------
    function clickalpha(e) {
        //props.setAlpha(e.target.id);
        props.onSelectAlpha(e.target.id);
    }


    async function LoadAlpha(otdel) {
        //console.log("LoadAlpha", this.props.curOtdel);
        const response = await fetch('alpha?otdel=' + otdel);
        const data = await response.json();
        setAlphabet(data);
        setLoading(false);
    }

    var alphaStyle = {
        paddingBottom: "6px",
        marginTop: "0px",
        background: "var(--bs-gray-100)",
        paddingTop: "5px",
        position: "sticky",
        top: "60px",
        zIndex: "1010"
    };

    var alphaButtonStyle = {
        padding: "8px",
        paddingTop: "0px",
        paddingBottom: "0px",
        fontSize: "18px",
        marginLeft: "1px"
    };



    return loading
        ? <p><em>Loading alpha...</em></p>
        : (
            <div id="alpha" style={alphaStyle} >
                {
                    Alphabet.map((alpha, i) => (
                        <button id={alpha} className={alpha == props.selectedAlpha
                            ? "border rounded border-primary btn-primary"
                            : "border rounded border-primary"} href={"#"} key={i} type="button"
                            style={alphaButtonStyle} onClick={clickalpha}>
                            <strong id={alpha}>{alpha}</strong>
                        </button>))
                }
            </div>
        );

}


export default connect(mapStateToProps, mapDispatchToProps) (Alpha);


