import React, { Component, useState, useEffect } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';


//var CardsPerPage = 6;
////var currentPage = 1;
//var loadedPages = false;
//var endPage = false;


//function Cards(props) {

//    const [listPerson, setListPerson] = useState([]);
//    const [loaded, setLoaded] = useState(false);
//    const [currentPage, setCurrentPage] = useState(1);

//    //console.log("Cards start");

//    //-----------------------------------------------------------------------------------
//    useEffect(() => {
//        window.addEventListener('scroll', onScrollList);
//        //window.addEventListener('resize', onScrollList);

//        return () => {
//            //        console.log("useEffect return");
//            window.removeEventListener('scroll', onScrollList);
//            //window.removeEventListener('resize', onScrollList);
//        };

//    }, []);



//    //-----------------------------------------------------------------------------------
//    useEffect(() => {
//        //GetListPerson();
//        //currentPage = 1;
//        //loadedPages = false;

//        LoadCardData(props.adminEdit, props.curOtdel, props.curAlpha, props.searchText, 1);


//            //dataFrom();

//            //async function dataFrom() {
//            //    console.log("useEffect currentPage", currentPage);

//            //    let url = props.adminEdit ? "cards/admin" : "cards";
//            //    fetch(url + '?otdel=' + props.curOtdel + '&alpha=' + props.curAlpha +
//            //        '&search=' + props.searchText + '&page=' + currentPage +
//            //        '&CardsPerPage=' + CardsPerPage)
//            //        .then(response => response.json())
//            //        .then(stat => {
//            //            console.log("useEffect response", stat);
//            //            setListPerson(prevValue => [...prevValue, ...stat]);
//            //        });

//                //let url = props.adminEdit ? "cards/admin" : "cards";
//                //const response = await fetch(url + '?otdel=' + props.curOtdel + '&alpha=' + props.curAlpha +
//                //    '&search=' + props.searchText + '&page=' + currentPage +
//                //    '&CardsPerPage=' + CardsPerPage);

//                //const dataResult = await response.json();
//                //setListPerson([...listPerson, ...dataResult]);
//                //setLoaded(true);
//                //currentPage++;

//            //}

//    }, [props.curOtdel, props.curAlpha, props.adminEdit, props.searchText]);

//    //-----------------------------------------------------------------------------------
//    useEffect(() => {

//        console.log("Scroll");
//        //LoadCardData(props.adminEdit, props.curOtdel, props.curAlpha, props.searchText, currentPage);
//        //setLoaded(true);

//        dataFrom();

//            async function dataFrom() {
//                console.log("useEffect currentPage", currentPage);

//                //let url = props.adminEdit ? "cards/admin" : "cards";
//                //fetch(url + '?otdel=' + props.curOtdel + '&alpha=' + props.curAlpha +
//                //    '&search=' + props.searchText + '&page=' + currentPage +
//                //    '&CardsPerPage=' + CardsPerPage)
//                //    .then(response => response.json())
//                //    .then(stat => {
//                //        console.log("useEffect response", stat);
//                //        setListPerson(prevValue => [...prevValue, ...stat]);
//                //    });

//                //let url = props.adminEdit ? "cards/admin" : "cards";
//                //const response = await fetch(url + '?otdel=' + props.curOtdel + '&alpha=' + props.curAlpha +
//                //    '&search=' + props.searchText + '&page=' + currentPage +
//                //    '&CardsPerPage=' + CardsPerPage);

//                //const dataResult = await response.json();
//                //setListPerson(prevData => [...prevData, ...dataResult]);
//                setLoaded(true);
//                //currentPage++;

//            }



//    }, [currentPage]);


//    function Test( ) {

//        useEffect(() => {

//            //console.log("проверка", data)


//        }, []);
//    }



//    //-----------------------------------------------------------------------------------
//    function onScrollList() {
//        const height = document.body.clientHeight;
//        const screenHeight = window.innerHeight;
//        const scrolled = window.scrollY;

//        const threshold = height - screenHeight / 4;
//        const position = scrolled + screenHeight;

//        if (position >= threshold && !endPage) {
//            //endPage = true;
//            //currentPage++;
//            //console.log("currentPage", currentPage);
//            Test(props.curAlpha);
//            setCurrentPage(prevPage => prevPage + 1);
//            //LoadPartCardData(props.curOtdel, props.curAlpha, props.searchText, currentPage, props.adminEdit);
//        }

//    }

//    //-----------------------------------------------------------------------------------
//    //async function LoadPartCardData(/*selOtdel, selAlpha, search, page, adminEdit*/) {

//    //    //if (selOtdel == null)
//    //    //    selOtdel = -1;

//    //    //if (selAlpha == null)
//    //    //    selAlpha = '';

//    //    //if (search == null)
//    //    //    search = '';

//    //    //if (page == null)
//    //    //    page = 1;

//    //    let url = props.adminEdit ? "cards/admin" : "cards";

//    //    const response = await fetch(url + '?otdel=' + props.curOtdel + '&alpha=' + props.curAlpha +
//    //        '&search=' + props.searchText + '&page=' + currentPage +
//    //        '&CardsPerPage=' + CardsPerPage);
//    //    const dataResult = await response.json();


//    //    if (!loadedPages) {
//    //        console.log("подгрузка", dataResult);
//    //        if (dataResult.length == 0) {
//    //            loadedPages = true;
//    //            return;
//    //        }

//    //        //let data = listPerson;
//    //        //for (let d of dataResult)
//    //        //    data.push(d);

//    //        setListPerson([...listPerson, ...dataResult]);
//    //        endPage = false;

//    //    }

//    //}


//    //-----------------------------------------------------------------------------------
//    async function LoadCardData(adminEdit, selOtdel, selAlpha, search, currentPage) {

//        console.log("Load");

//        let url = adminEdit ? "cards/admin" : "cards";

//        const response = await fetch(url + '?otdel=' + selOtdel + '&alpha=' + selAlpha + '&search=' + search +
//            '&page=' + currentPage + '&CardsPerPage=' + CardsPerPage);
//        const dataResult = await response.json();

//        if (currentPage === 1) {
//            setListPerson([...dataResult]);
//        } else {
//            setListPerson(prevValue => [...prevValue, ...dataResult]);
//        }
//        setLoaded(true);
//        return dataResult;

//    }

//    //-----------------------------------------------------------------------------------
//    function DeletePerson(person) {

//        //console.log("DeletePerson " + person.personalId);

//        var result = window.confirm('Удалить "' + person.personalLastName + ' ' + person.personalName + ' ' + person.personalMidName + '"');

//        if (result) {
//            var xhr = new XMLHttpRequest();
//            xhr.open("delete", "cards/" + person.personalId, true);
//            xhr.setRequestHeader("Content-Type", "application/json");
//            xhr.onload = function () {
//                //console.log("status = " + xhr.status);
//                if (xhr.status === 200) {
//                    const list = listPerson;
//                    const index = list.findIndex(e => e.personalId === person.personalId);

//                    list.splice(index, 1);
//                    //delete data[index];
//                    setListPerson(list);

//                }
//            }.bind(this);
//            xhr.send();
//        }
//    }

//    const loaderStyle = {
//        display: "inline-block",
//        position: "relative",
//        width: "100px",
//        height: "100px",
//        textAlign: "center"
//    };

//    return (

//        !loaded
//            ? <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}>
//                <img src="loading_spinner.gif" style={loaderStyle} />
//            </div>

//            : <>
//                {props.adminEdit ? <Link className="btn btn-primary" type="button" to="/editForm" state={{ otdel: props.curOtdel }}
//                    style={{ margin: "9px" }}>Создать</Link> : null}
//                {listPerson.map((item, index) => <Card key={index} adminEdit={props.adminEdit} item={item}
//                    callBackDelete={DeletePerson} />)}

//            </>
//    );

//    console.log("function return");

//}

//export default Cards;


export class Cards extends Component {
    static displayName = Cards.name;

    constructor(props) {
        super(props);

        this.state = {
            listPerson: [],
            loaded: false
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
        //window.addEventListener('resize', this.onScrollList)
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
            this.setState({ loaded: false });
            this.currentPage = 1;
            this.loadedPages = false;
            this.LoadCardData(nextProps.curOtdel, nextProps.curAlpha, nextProps.searchText, this.currentPage);
        }

        return true;
    }


    //-----------------------------------------------------------------------------------
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollList)
        //window.removeEventListener('resize', this.onScrollList)
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

                //let data = this.state.listPerson;
                //for (let d of dataResult)
                //    data.push(d);
                //this.setState({ listPerson: data });
                this.setState({ listPerson: [...this.state.listPerson, ...dataResult] });
                this.setState({ loaded: true });

            }

        } else {
            this.setState({ listPerson: dataResult });
            this.setState({ loaded: true });

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

        const loaderStyle = {
            display: "inline-block",
            position: "relative",
            width: "100px",
            height: "100px",
            textAlign: "center"
        };


        return (

            !this.state.loaded
                ? <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}>
                    <img src="loading_spinner.gif" style={loaderStyle} />
                </div>

                : <>
                    {this.props.adminEdit ? <Link className="btn btn-primary" type="button" to="/editForm" state={{ otdel: this.props.curOtdel }}
                        style={{ margin: "9px" }}>Создать</Link> : null}
                    {this.state.listPerson.map((item, index) => <Card key={index} adminEdit={this.props.adminEdit} item={item}
                        callBackDelete={this.DeletePerson} />)}

                  </>
        );
    }

}