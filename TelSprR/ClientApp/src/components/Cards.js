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
        this.loadedPages = false;

        this.onScrollList = this.onScrollList.bind(this);
        this.LoadCardData = this.LoadCardData.bind(this);
        this.DeletePerson = this.DeletePerson.bind(this);


    }


    //-----------------------------------------------------------------------------------
    componentDidMount() {
        window.addEventListener('scroll', this.onScrollList)
        window.addEventListener('resize', this.onScrollList)
        this.LoadCardData(this.props.curOtdel, this.props.curAlpha, this.props.searchText, this.currentPage);
    }


    //-----------------------------------------------------------------------------------
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.curOtdel !== this.props.curOtdel
            || nextProps.curAlpha !== this.props.curAlpha    
            || nextProps.searchText !== this.props.searchText    
            //|| nextProps.currentPage !== this.props.currentPage    
        ) {
            //console.log("shouldComponentUpdate");
            this.currentPage = 1;
            this.loadedPages = false;
            this.LoadCardData(nextProps.curOtdel, nextProps.curAlpha, nextProps.searchText, this.currentPage);
        }

        return true;
    }


    //-----------------------------------------------------------------------------------
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollList)
        window.removeEventListener('resize', this.onScrollList)
    }

    //-----------------------------------------------------------------------------------
    onScrollList(e) {
        const height = document.body.clientHeight;
        const screenHeight = window.innerHeight;
        const scrolled = window.scrollY;

        const threshold = height - screenHeight / 4;
        const position = scrolled + screenHeight;

        if (position >= threshold && !this.LoadedAll && !this.endPage) {
            this.endPage = true;
            this.currentPage++;
            this.LoadCardData(this.props.curOtdel, this.props.curAlpha, this.props.curSearch, this.currentPage);
        }

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


        let url = this.props.adminEdit ? "cards/admin" : "cards";


        const response = await fetch(url + '?otdel=' + selOtdel + '&alpha=' + selAlpha + '&search=' + search + '&page=' + page +
            '&CardsPerPage=' + this.CardsPerPage);
        const dataResult = await response.json();

        if (page > 1) {
            if (this.loadedPages) {
                return;
            } else {
                //console.log("подгрузка", dataResult);
                if (dataResult.length == 0) {
                    this.loadedPages = true;
                    return;
                }

                let data = this.state.listPerson;
                for (let d of dataResult)
                    data.push(d);
                this.setState({ listPerson: data });
            }

        } else {
            this.setState({ listPerson: dataResult });
        }

        this.endPage = false;

    }


    //-----------------------------------------------------------------------------------
    DeletePerson(person) {

        //console.log("DeletePerson " + person.personalId);

        var result = window.confirm('Удалить "' + person.personalLastName + ' ' + person.personalName + ' ' + person.personalMidName + '"');

        if (result) {
            var xhr = new XMLHttpRequest();
            xhr.open("delete", "cards/" + person.personalId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                //console.log("status = " + xhr.status);
                if (xhr.status === 200) {
                    const listPerson = this.state.listPerson;
                    const index = listPerson.findIndex(e => e.personalId === person.personalId);

                    listPerson.splice(index, 1);
                    //delete data[index];
                    this.setState({ listPerson });
                }
            }.bind(this);
            xhr.send();
        }
    }

    //-----------------------------------------------------------------------------------

    render() {

        return (
            <>
                {this.props.adminEdit ? <Link className="btn btn-primary" type="button" to='/editForm'
                    style={{ margin: "9px" }}>Создать</Link> : null}
                {this.state.listPerson.map((item, index) => <Card key={index} adminEdit={this.props.adminEdit} item={item}
                    callBackDelete={this.DeletePerson} />)}


            </>
        );
    }

}