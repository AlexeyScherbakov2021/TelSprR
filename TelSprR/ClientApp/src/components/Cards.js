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

    //-----------------------------------------------------------------------------------
    function onScrollList(nextPageCallback) {


        const height = document.body.clientHeight;
        const screenHeight = window.innerHeight;
        const scrolled = window.scrollY;

        const threshold = height - screenHeight / 4;
        const position = scrolled + screenHeight;

        if (position >= threshold) {

            nextPageCallback();

        }

    }

    const loaderStyle = {
        display: "inline-block",
        position: "relative",
        width: "100px",
        height: "100px",
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


