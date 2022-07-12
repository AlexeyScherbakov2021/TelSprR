import React, { Component } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

export class Cards extends Component {
    static displayName = Cards.name;

    constructor(props) {
        super(props);


        this.state = {
            listPerson: []
        }

        this.currentPage = 1;
        this.CardsPerPage = 6;

        this.onScrollList = this.onScrollList.bind(this);
        this.LoadCardData = this.LoadCardData.bind(this);


    }


    //-----------------------------------------------------------------------------------
    componentDidMount() {
        //window.addEventListener('scroll', this.onScrollList)
        //window.addEventListener('resize', this.onScrollList)
        this.LoadCardData(this.props.curOtdel, this.props.curAlpha, this.props.searchText, this.currentPage);
    }


    //-----------------------------------------------------------------------------------
    shouldComponentUpdate(nextProps, nextState) {
        //console.log("shouldComponentUpdate", nextProps.searchText);
        if (nextProps.curOtdel !== this.props.curOtdel
            || nextProps.curAlpha !== this.props.curAlpha    
            || nextProps.searchText !== this.props.searchText    
            || nextProps.currentPage !== this.props.currentPage    
        ) {

             this.LoadCardData(nextProps.curOtdel, nextProps.curAlpha, nextProps.searchText, this.currentPage);
        }

        return true;
    }


    //-----------------------------------------------------------------------------------
    componentWillUnmount() {
    //    window.removeEventListener('scroll', this.onScrollList)
    //    window.removeEventListener('resize', this.onScrollList)
    }

    //-----------------------------------------------------------------------------------
    onScrollList(e) {
        //const height = document.body.clientHeight;
        //const screenHeight = window.innerHeight;
        //const scrolled = window.scrollY;

        //const threshold = height - screenHeight / 4;
        //const position = scrolled + screenHeight;

        //if (position >= threshold && !this.LoadedAll && !this.endPage) {
        //    this.endPage = true;
        //    this.currentPage++;
        //    this.LoadCardDataPart(this.props.curOtdel, this.props.curAlpha, this.props.curSearch, this.currentPage);
        //}

    }

    //-----------------------------------------------------------------------------------
    async LoadCardData(selOtdel, selAlpha, search, page) {

        if (selOtdel == null)
            selOtdel = -1;

        if (selAlpha == null)
            selAlpha = '';

        if (search == null)
            search = '';

        if (page == null)
            page = 1;

        //console.log('cards?otdel=' + selOtdel + '&alpha=' + selAlpha + '&search=' + search + '&page=' + page + '&CardsPerPage=' + this.CardsPerPage);
        const response = await fetch('cards?otdel=' + selOtdel + '&alpha=' + selAlpha + '&search=' + search + '&page=' + page +
            '&CardsPerPage=' + this.CardsPerPage);
        const data = await response.json();

        //this.listPerson = data;
        this.setState({ listPerson: data });
        this.endPage = false;

    }


    //-----------------------------------------------------------------------------------

    render() {

        return (
            <>
                {this.props.adminEdit ? <Link className="btn btn-primary" type="button" to='/editForm' style={{ marginLeft: "11px", marginBottom: "5px" }}>Создать</Link> : null}
                {this.state.listPerson.map((item, index) => <Card key={index} adminEdit={this.props.adminEdit} item={item} />)}
            </>
        );
    }

}