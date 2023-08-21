import React, { Component, useState, useEffect, useCallback } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../redux/RootReducer'


function Cards(props) {

    const dispatch = useDispatch();

    const nextPageCallback = useCallback((
    ) => dispatch({ type: 'NEXT_LOAD' }),
        [dispatch]
    )

    //-----------------------------------------------------------------------------------
    useEffect(() => {
        window.addEventListener('scroll', () => { onScrollList(nextPageCallback) });

        return () => {
            window.removeEventListener('scroll', () => { onScrollList(nextPageCallback) });
        };

    }, [nextPageCallback]);


    useEffect(() => {
        window.addEventListener('resize', onResize );

        return () => {
            window.removeEventListener('resize', onResize );
        };

    }, );

    //-----------------------------------------------------------------------------------
    function onResize() {

        var cnt = props.cardsPerPage2;
        //console.log("количество0:" + cnt);

        props.calcCardsPerPage(Math.round(6 * window.innerHeight / 970));

        //console.log("количество:" + cnt);
        //console.log("cardsPerPage2:" + props.cardsPerPage2);

        if (cnt > props.cardsPerPage2) {
            nextPageCallback();
        }

    }
        


    //-----------------------------------------------------------------------------------
    function onScrollList(nextPageCallback) {

        //console.log("onScrollList");

        const height = document.body.clientHeight;
        const screenHeight = window.innerHeight;
        const scrolled = window.scrollY;

        const threshold = height - screenHeight / 4;
        const position = scrolled + screenHeight;

        //console.log("document height =", document.body.clientHeight);
        //console.log("screenHeight =", window.innerHeight);
        //console.log("window.scrollY =", window.scrollY);
        //console.log("количество =", Math.ceil(6 * window.innerHeight / 970));
        //console.log("position =", position);

        if (position >= threshold) {

            //console.log("nextPageCallback");
            nextPageCallback();

        }

    }

    const loaderStyle = {
        display: "inline-block",
        position: "relative",
        //width: "150px",
        //height: "150px",
        textAlign: "center"
    };

    //console.log("Cards", props);

    return (

        !props.loadedCards
            ? <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}>
                <img src="loading_spinner.gif" style={loaderStyle} />
            </div>

            : <>
                {props.isAdmin ? <Link className="btn btn-primary" type="button" to="/editForm" state={{ otdel: props.selectedOtdel }}
                    style={{ margin: "9px" }}>Создать</Link> : null}
                {props.listPerson.map((item, index) => <Card key={index} item={item} />)}

            </>
    );

}

export default connect(mapStateToProps, mapDispatchToProps) (Cards);


