import React, { Component, useState, useEffect } from 'react';

//var Alphabet = [];


function Alpha(props) {

    const [loading, setLoading] = useState(true);
    const [Alphabet, setAlphabet] = useState([]);

    useEffect(() => {
        //console.log("Alpha useEffect");
        LoadAlpha(props.curOtdel);

    }, [props.curOtdel]);

    //console.log("otdel",  props.curOtdel);

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
                        <button id={alpha} className={alpha == props.currentAlpha
                            ? "border rounded border-primary btn-primary"
                            : "border rounded border-primary"} href={"#"} key={i} type="button"
                            style={alphaButtonStyle} onClick={props.callBack}>
                            <strong id={alpha}>{alpha}</strong>
                        </button>))
                }
            </div>
        );

}


//}

export default Alpha;


//export class Alpha extends Component {
//    static displayName = Alpha.name;

//    constructor(props) {
//        super(props);

//        this.state = {
//            loading: true,
//        };

//        this.LoadAlpha = this.LoadAlpha.bind(this);
//    }

//    Alphabet = [];


//    componentDidMount() {
//        this.LoadAlpha(this.props.curOtdel);
//    }


//    shouldComponentUpdate(nextProps, nextState) {
//        //console.log("shouldComponentUpdate", nextProps.curOtdel, this.props.curOtdel);
//        if (nextProps.curOtdel !== this.props.curOtdel) {
//            this.LoadAlpha(nextProps.curOtdel);
//        }

//        return true;
//    }

//    async LoadAlpha(otdel) {
//        //console.log("LoadAlpha", this.props.curOtdel);
//        const response = await fetch('alpha?otdel=' + otdel);
//        const data = await response.json();
//        this.Alphabet = data;
//        this.setState({ loading: false });
//    }



//    render() {

//        var alphaStyle = {
//            paddingBottom: "6px",
//            marginTop: "0px",
//            background: "var(--bs-gray-100)",
//            paddingTop: "5px",
//            position: "sticky",
//            top: "60px",
//            zIndex: "1010"
//        };

//        var alphaButtonStyle = {
//            padding: "8px",
//            paddingTop: "0px",
//            paddingBottom: "0px",
//            fontSize: "18px",
//            marginLeft: "1px"
//        };

//        //console.log("otdel = " + this.props.curOtdel);

//        return this.state.loading
//            ? <p><em>Loading alpha...</em></p>
//            : (
//                <div id="alpha" style={alphaStyle} >
//                    {
//                        this.Alphabet.map((alpha, i) => (
//                            <button id={alpha} className={alpha == this.props.currentAlpha ? "border rounded border-primary btn-primary" : "border rounded border-primary"} href={"#"} key={i} type="button"
//                                style={alphaButtonStyle} onClick={this.props.callBack}>
//                                <strong id={alpha}>{alpha}</strong>
//                            </button>))
//                    }
//                </div>
//            );

//    }


//}