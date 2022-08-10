import React, { useRef } from 'react';
//import { connect, useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Otdel from './Otdel';
import Alpha from './Alpha';
import Cards from './Cards';
import ToTop from './ToTop'


function Main(props) {

    const mainRef = useRef();

    //const content = useSelector(state => state.selectedAlpha);
    //const dispatch = useDispatch();

    //const location = useLocation();

    //if (location.state?.status? === 'save') {

    //}


    //console.log("Main", location.state);


    return (
        <div>
            <div className="container-fluid d-flex" ref={mainRef}>
                <Otdel />
                <div className="col-12 offset-0 offset-md-3 col-md-9 offset-lg-4 col-lg-8">
                    <Alpha />
                    <Cards />
                </div>
                <ToTop scrollWin={mainRef} />
            </div>

        </div>
        );
}

export default Main;
//export default connect(state => ({ ...state,})) (Main);


