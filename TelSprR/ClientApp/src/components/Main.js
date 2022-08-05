import React, { useRef } from 'react';
import Otdel from './Otdel';
import Alpha from './Alpha';
import Cards from './Cards';
import ToTop from './ToTop'


function Main(props) {

    const mainRef = useRef();


    return (
        <div>
            <div className="container-fluid d-flex" ref={mainRef}>
                <Otdel callBack={props.callBackOtdel} currentOtdel={props.curOtdel} />
                <div className="col-12 offset-0 offset-md-3 col-md-9 offset-lg-4 col-lg-8">
                    <Alpha callBack={props.callBackAlpha} currentAlpha={props.curAlpha} curOtdel={props.curOtdel} />
                    <Cards curAlpha={props.curAlpha} curOtdel={props.curOtdel} searchText={props.searchText}
                        adminEdit={props.adminEdit} />
                </div>
                <ToTop scrollWin={mainRef} />
            </div>

        </div>
        );
}

export default Main;


