import React, { Component, useState, useEffect, useCallback } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import { connect, useDispatch, useStore } from 'react-redux';
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


    //-----------------------------------------------------------------------------------
    function DeletePerson(person) {

    //    //console.log("DeletePerson " + person.personalId);

        var result = window.confirm('Удалить "' + person.personalLastName + ' ' + person.personalName + ' ' + person.personalMidName + '"');

        if (result) {

            props.DeletePerson(person.personalId);
    //        var xhr = new XMLHttpRequest();
    //        xhr.open("delete", "cards/" + person.personalId, true);
    //        xhr.setRequestHeader("Content-Type", "application/json");
    //        xhr.onload = function () {
    //            //console.log("status = " + xhr.status);
    //            if (xhr.status === 200) {
    //                const list = listPerson;
    //                const index = list.findIndex(e => e.personalId === person.personalId);

    //                list.splice(index, 1);
    //                //delete data[index];
    //                setListPerson(list);

    //            }
    //        }.bind(this);
    //        xhr.send();
        }
    }

    const loaderStyle = {
        display: "inline-block",
        position: "relative",
        width: "100px",
        height: "100px",
        textAlign: "center"
    };



    return (

        !props.loadedCards
            ? <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}>
                <img src="loading_spinner.gif" style={loaderStyle} />
            </div>

            : <>
                {props.isAdmin ? <Link className="btn btn-primary" type="button" to="/editForm" state={{ otdel: props.selectedOtdel }}
                    style={{ margin: "9px" }}>Создать</Link> : null}
                {props.listPerson.map((item, index) => <Card key={index} adminEdit={props.isAdmin} item={item}
                    callBackDelete={DeletePerson} />)}

            </>
    );

    console.log("function return");

}

export default connect(mapStateToProps, mapDispatchToProps) (Cards);


