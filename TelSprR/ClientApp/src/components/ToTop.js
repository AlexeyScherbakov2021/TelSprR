import React, { Component } from 'react';
import './ToTop.css'

export class ToTop extends Component {
    static displayName = ToTop.name;

    constructor(props) {
        super(props);

        this.state = {
            displayToTop: "none"
        };

        this.onScrollList = this.onScrollList.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    //-----------------------------------------------------------------------------------
    componentDidMount() {
        window.addEventListener('scroll', this.onScrollList)
    }

    //-----------------------------------------------------------------------------------
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollList)
    }


    //-----------------------------------------------------------------------------------
    onScrollList(e) {
        if (window.scrollY > 0) {
            this.setState({ displayToTop: "block" });
        } else {
            this.setState({ displayToTop: "none" });
        }
    }

    //-----------------------------------------------------------------------------------
    onClick(e) {
        window.scrollTo(0, 0);
    }


    //-----------------------------------------------------------------------------------
    render() {

        var toTopStyle = {
            display: this.state.displayToTop
        };


        return (
            <a className="totop" style={toTopStyle} onClick={this.onClick}></a>
        );
    }

}