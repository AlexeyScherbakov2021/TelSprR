import React, { Component, useState, useEffect } from 'react';

function Otdel(props) {

    //const [resize, setResize] = useState(false);
    const [listOtdel, setListOtdel] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [listHeight, setListHeight] = useState(window.innerHeight - 160);

    //console.log("Otdel start");

    useEffect(() => {
        console.log("Otdel useEffect start");
        window.addEventListener('resize', onResize)

        if (!loaded) {
            console.log("Otdel загрузка");
            LoadOtdelData();
        }
        return () => {
            console.log("Otdel useEffect end");
            window.removeEventListener('resize', onResize)

        }
    }, [listHeight, loaded]);


    function onResize(event, resize) {
        setListHeight(window.innerHeight - 160);
    }

    //-----------------------------------------------------------------------------------------------
    function funOtdels(data) {
        const { otdelName, subOtdel, otdelId } = data;

        const listITemStyle = {
            //background: "#eff8ff",
            padding: 0
        };

        return (

            <li className={otdelId == props.currentOtdel
                ? "list-group-item active border border-primary rounded-2 border-0 text-light"
                : "list-group-item"}
                id={otdelId} style={listITemStyle} key={otdelId} >

                <button id={otdelId} className={otdelId == props.currentOtdel ? "btn text-start text-light" : "btn text-start"}
                    type="button" style={{ margin: 1 }} >{otdelName}</button>
                {
                    subOtdel &&
                    <ul>
                        {subOtdel.map((child, n) => funOtdels(child, n))}
                    </ul>
                }
            </li>
        );
    }

        //-----------------------------------------------------------------------------------------------

    async function LoadOtdelData() {

        const response = await fetch('otdel');
        const data = await response.json();
        setListOtdel(data);
        setLoaded(true);

    }

    var ulStyle = {
        height: listHeight,
        marginRight: "10px",
        borderStyle: "none",
        //borderColor: "var(--bs-gray-900)",
        boxShadow: "0px 0px 4px var(--bs-gray-700)"

    };

    var asideStyle = {
        position: "fixed",
        top: "74px"
    };


    //let contents = loading
    //    ? <p><em>Загрузка отделов...</em></p>
    //    : listOtdel.map((data) => funOtdels(data))

    let contents = listOtdel.map((data) => funOtdels(data));

    return (
        <aside className="col-3 d-none d-md-block col-lg-4" style={asideStyle}>
            <div className="mb-1">
                <a id="-1" className="btn btn-link fs-5 fw-bold" type="button" style={{ marginTop: "-12px" }} onClick={props.callBack}>Показать весь список</a>
            </div>
            <ul className="list-group border rounded overflow-auto" style={ulStyle} onClick={props.callBack}>
                {contents}
            </ul>
        </aside>
    );


}

export default Otdel;




//export class Otdel extends Component {
//    static displayName = Otdel.name;

//    constructor(props) {
//        super(props);

//        this.state = { listOtdel2: [], loading: true };

//        this.funOtdels = this.funOtdels.bind(this);
//        this.onResize = this.onResize.bind(this);

//    }

//    componentDidMount() {
//        window.addEventListener('resize', this.onResize)
//        this.LoadOtdelData();
//    }

//    componentWillUnmount() {
//        window.removeEventListener('resize', this.onResize)
//    }

//    onResize() {
//        this.setState({
//            loading: false
//        })
//    }


//    //-----------------------------------------------------------------------------------------------
//    funOtdels(data) {
//        const { otdelName, subOtdel, otdelId } = data;

//        const listITemStyle = {
//            //background: "#eff8ff",
//            padding: 0
//        };

//        return (

//            <li className={otdelId == this.props.currentOtdel  
//                ? "list-group-item active border border-primary rounded-2 border-0 text-light"
//                : "list-group-item"}
//                id={otdelId} style={listITemStyle} key={otdelId} >

//                <button id={otdelId} className={otdelId == this.props.currentOtdel ? "btn text-start text-light" : "btn text-start"}
//                    type="button" style={{ margin: 1 }} >{otdelName}</button>
//                {
//                    subOtdel &&
//                    <ul>
//                        {subOtdel.map((child, n) => this.funOtdels(child, n))}
//                    </ul>
//                }
//            </li>
//        );
//    }
//    //-----------------------------------------------------------------------------------------------

//    async LoadOtdelData() {

//        const response = await fetch('otdel');
//        const data = await response.json();
//        this.setState({ listOtdel2: data, loading: false });
//    }




//    render() {

//        var ulStyle = {
//            height: window.innerHeight - 130,
//            marginRight: "10px",
//            borderStyle: "none",
//            //borderColor: "var(--bs-gray-900)",
//            boxShadow: "0px 0px 4px var(--bs-gray-700)"

//        };

//        var asideStyle = {
//            position: "fixed",
//            top: "74px"
//        };


//        let contents = this.state.loading
//            ? <p><em>Загрузка отделов...</em></p>
//            : this.state.listOtdel2.map((data) => this.funOtdels(data))

//        return (

//            <aside className="col-3 d-none d-md-block col-lg-4" style={asideStyle}>
//                <div className="mb-1">
//                    <a id="-1" className="btn btn-link fs-5 fw-bold" type="button" style={{ marginTop: "-12px" } } onClick={this.props.callBack}>Показать весь список</a>
//                </div>
//                <ul className="list-group border rounded overflow-auto" style={ulStyle} onClick={this.props.callBack}>
//                    {contents}
//                </ul>
//            </aside>
//        );
//    }


//}