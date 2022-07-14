import React, { Component } from 'react';
import { Otdel } from './Otdel';
import { Alpha } from './Alpha';
import { Cards } from './Cards';

export class Main extends Component {
    static displayName = Main.name;

    constructor(props) {
        super(props);

        //this.state = {
        //    curAlpha: null,
        //    curOtdel: -1
        //}

        //this.searchText = null;

    //    this.clickOtdel = this.clickOtdel.bind(this);
    //    this.clickAlpha = this.clickAlpha.bind(this);
    }

    //clickOtdel(e) {
    //    this.props.callBackSearch(null);
    //    this.setState({
    //        curOtdel: e.target.id,
    //        curAlpha: null
    //    });
    //}

    //clickAlpha(e) {
    //    this.props.callBackSearch(null);
    //    this.setState({
    //        curAlpha: e.target.id
    //    });
    //}




    //-----------------------------------------------------------------------------------
    render() {

        //console.log("Main render ", this.props.searchText);

        return (
            <div>
            <div className="container-fluid d-flex" ref={this.myRef} >
                    <Otdel callBack={this.props.callBackOtdel} currentOtdel={this.props.curOtdel} />
                <div className="col-12 offset-0 offset-md-3 col-md-9 offset-lg-4 col-lg-8">
                        <Alpha callBack={this.props.callBackAlpha} currentAlpha={this.props.curAlpha} curOtdel={this.props.curOtdel} />
                        <Cards curAlpha={this.props.curAlpha} curOtdel={this.props.curOtdel} searchText={this.props.searchText}
                            adminEdit={this.props.adminEdit} />
                </div>
                {/*<ToTop scrollWin={this.myRef} />*/}
            </div>

            </div>
        );

    }

}