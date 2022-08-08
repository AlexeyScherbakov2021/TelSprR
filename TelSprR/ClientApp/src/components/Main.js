import React, { useRef } from 'react';
//import { connect, useSelector, useDispatch } from 'react-redux';
import Otdel from './Otdel';
import Alpha from './Alpha';
import Cards from './Cards';
import ToTop from './ToTop'



function Main(props) {

    const mainRef = useRef();

    //const content = useSelector(state => state.selectedAlpha);
    //const dispatch = useDispatch();

    //console.log("Main", props);


    return (
        <div>
            <div className="container-fluid d-flex" ref={mainRef}>
                {/*<Otdel callBack={props.callBackOtdel} currentOtdel={props.curOtdel} setOtdel={props.setOtdel } />*/}
                <Otdel />
                <div className="col-12 offset-0 offset-md-3 col-md-9 offset-lg-4 col-lg-8">
                    <Alpha />
                    {/*<Alpha callBack={props.callBackAlpha} currentAlpha={props.curAlpha} curOtdel={props.curOtdel}*/}
                    {/*    setAlpha={props.setAlpha }*/}
                    {/*/>*/}
                    <Cards />
                {/*    <Cards curAlpha={props.curAlpha} curOtdel={props.curOtdel} searchText={props.searchText}*/}
                {/*        adminEdit={props.adminEdit} />*/}
                </div>
                <ToTop scrollWin={mainRef} />
            </div>

        </div>
        );
}

export default Main;
//export default connect(state => ({ ...state,})) (Main);


