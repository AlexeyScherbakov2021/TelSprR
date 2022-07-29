import React, { Component, useState, useRef } from 'react';
import InputFormPerson from './InputFormPerson';
import { useLocation } from 'react-router-dom';


var listOtdel = [];
var listProf = [];

const EditForm = props => {

    const [loadedProf, setloadedProf ] = useState(false);
    const [loadedOtdel, setloadedOtdel] = useState(false);

    const location = useLocation();

    //console.log("location", location);



    //const person = location.state.person;

    //function DeletePhoto(e) {

    //    person.personalPhoto = null;
    //    setFilePhoto(null);
    //}

    async function LoadOtdel() {

        const response = await fetch('otdel');
        const data = await response.json();
        listOtdel = data;
        setloadedOtdel(true);
    }

    async function LoadProf() {
        const response = await fetch('prof');
        const data = await response.json();
        listProf = data;
        setloadedProf(true);
    }

    var person;

    if (location.state.person == null) {
        person = {
            personalId: 0,
            personalName: "",
            personalLastName: "",
            personalMidName: "",
            personalEmail: "",
            personalTel: "",
            personalMobil: "",
            personalPhoto: "",
            personalProfId: 0,
            personalOtdelId: location.state.otdel,
            personalDisabled: false
        }
    } else {
        person = {
            personalId: location.state.person.personalId,
            personalName: location.state.person.personalName,
            personalLastName: location.state.person.personalLastName,
            personalMidName: location.state.person.personalMidName,
            personalEmail: location.state.person.personalEmail,
            personalTel: location.state.person.personalTel,
            personalMobil: location.state.person.personalMobil,
            personalPhoto: location.state.person.personalPhoto,
            personalProfId: location.state.person.personalProfId,
            personalOtdelId: location.state.person.personalOtdelId,
            personalDisabled: location.state.person.personalDisabled
        }
    }




    LoadProf();

    LoadOtdel();

    //console.log("profession", listProf)

    //console.log("otdels",listOtdel);

    return (

        (loadedProf === true && loadedOtdel === true)
            ? <InputFormPerson person={ person } otdels={listOtdel} prof={listProf} />
            : <h2>Loading...</h2>
        );

}

export default EditForm;