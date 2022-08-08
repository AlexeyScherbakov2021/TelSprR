import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../redux/RootReducer'

function Otdel(props) {

    //const [resize, setResize] = useState(false);
    const [listOtdel, setListOtdel] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [listHeight, setListHeight] = useState(window.innerHeight - 150);

    

    //console.log("Otdel start", props);


    useEffect(() => {
        //console.log("Otdel useEffect start");
        window.addEventListener('resize', onResize)

        if (!loaded) {
            //console.log("Otdel загрузка");
            LoadOtdelData();
        }
        return () => {
            //console.log("Otdel useEffect end");
            window.removeEventListener('resize', onResize)

        }
    }, [listHeight, loaded]);


    function onResize(event, resize) {
        setListHeight(window.innerHeight - 150);
    }

    //-----------------------------------------------------------------------------------------------
    function funOtdels(data) {
        const { otdelName, subOtdel, otdelId } = data;

        const listITemStyle = {
            //background: "#eff8ff",
            padding: 0
        };

        return (

            <li className={otdelId == props.selectedOtdel
                ? "list-group-item active border border-primary rounded-2 border-0 text-light"
                : "list-group-item"}
                id={otdelId} style={listITemStyle} key={otdelId} >

                <button id={otdelId} className={otdelId == props.selectedOtdel ? "btn text-start text-light" : "btn text-start"}
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


    //-----------------------------------------------------------------------------------------------------------
    function clickOtdel(e) {
        props.onSelectOtdel(e.target.id);
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


    //console.log("Otdel", props);

    //let contents = loading
    //    ? <p><em>Загрузка отделов...</em></p>
    //    : listOtdel.map((data) => funOtdels(data))

    let contents = listOtdel.map((data) => funOtdels(data));

    return (
        <aside className="col-3 d-none d-md-block col-lg-4" style={asideStyle}>
            <div className="mb-1">
                <a id="-1" className="btn btn-link fs-5 fw-bold" type="button" style={{ marginTop: "-12px" }}
                    onClick={() => props.onSelectOtdel(-1)}>Показать весь список</a>
            </div>
            <ul className="list-group border rounded overflow-auto" style={ulStyle} onClick={clickOtdel}>
                {contents}
            </ul>
        </aside>
    );


}

export default connect(mapStateToProps, mapDispatchToProps)(Otdel);




