import React, { Component, useState, useRef } from 'react';
import InputFormPerson from './InputFormPerson';
import { useLocation } from 'react-router-dom';


var listOtdel = [];
var listProf = [];

const EditForm = props => {

    //const [ filePhoto, setFilePhoto ] = useState();
    const [loadedProf, setloadedProf ] = useState(false);
    const [loadedOtdel, setloadedOtdel] = useState(false);

    const location = useLocation();

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

    //function listProfession() {

    //    //console.log("personID = " + this.person.personalProfId);

    //    return (
    //        <select  className="form-select"  >
    //            <option key="0" value="0"></option>

    //            {
    //                listProf.map((item) =>
    //                    person.personalProfId == item.profId
    //                        ? <option selected key={item.profId} value={item.profId} >{item.profId}&nbsp;&nbsp; {item.profName}</option>
    //                        : <option key={item.profId} value={item.profId}>{item.profId}&nbsp;&nbsp;&nbsp;{item.profName}</option>

    //                )}
    //        </select>
    //    );
    //}

    //function SelectPhoto(file) {

    //    person.personalPhoto = file.name
    //    setFilePhoto(file);
    //    //this.setState({ filePhoto: file });
    //    console.log("SelectPhoto " + file);
    //}


    //function savePerson(event) {

    //    event.preventDefault();

    //    let namePhoto;
    //    if (person.personalPhoto != null) {
    //        namePhoto = person.personalPhoto;
    //    } else {
    //        namePhoto = filePhoto == null ? null : filePhoto.name;
    //    }

    //    let item = {
    //        personalId: person.personalId,
    //    //    personalName: refs.name.value,
    //    //    personalLastName: refs.lastName.value,
    //    //    personalMidName: refs.midName.value,
    //    //    personalEmail: refs.email.value,
    //    //    personalTel: refs.workPhone.value,
    //    //    personalMobil: refs.mobPhone.value,
    //    //    personalProfId: refs.profession.value,
    //    //    personalOtdelId: refs.otdel.value,
    //    //    personalPhoto: namePhoto,
    //    //    personalDisabled: refs.isDiasabled.checked
    //    };


    //    const data = new FormData();
    //    data.append("formData", filePhoto);
    //    data.append("person", JSON.stringify(item));
    //    data.append("oldPhoto", oldPhoto);

    //    var xhr = new XMLHttpRequest();
    //    xhr.open("post", "cards", true);
    //    xhr.onload = function () {
    //        if (xhr.status === 200) {
    //            //this.fileName = this.files[0].name;
    //            oldPhoto = person.personalPhoto;
    //            //this.setState({ drag: false });
    //            //        //this.loadData();
    //            //this.props.history.push("/");
    //            console.log("переход обратно");
    //        }
    //    };
    //    xhr.send(data);
    //}

    //function BrowsePhoto(event) {

    //    event.preventDefault();

    //    let files = [...event.target.files];
    //    //let preview;

    //    if (files[0]) {

    //        setFilePhoto(files[0]);

    //        //this.setState(
    //        //    {
    //        //        filePhoto: files[0],
    //        //        //preview: URL.createObjectURL(files[0])
    //        //    });

    //        //console.log("выбран файл " + this.preview);
    //    }

    //}


//function listOtdels(data, level) {
//    const { otdelName, subOtdel, otdelId } = data;

//    //console.log("subOtdel = " + subOtdel);

//    //if (subOtdel.length > 0) {
//    //    //console.log("subOtdel = " + subOtdel + " " + subOtdel.length);
//    //} else {
//    //    console.log("subOtdel = " + str);
//    //}

//    return (
//        <>
//            {person.personalOtdelId === otdelId
//                ? <option selected  value={otdelId} >{level}{level}{level}&nbsp;{otdelId}&nbsp; &nbsp;{otdelName}</option>
//                : <option key={otdelId} value={otdelId} >{level}{level}{level}&nbsp;{otdelId}&nbsp; &nbsp; {otdelName}</option>
//            }

//            if (subOtdel.length > 0) {
//                subOtdel.map((child) => listOtdels(child, level + "-"))
//            }
//        </>
//    );
//    }

    //console.log("EditForm call", props);


    var person = {
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

    LoadProf();

    LoadOtdel();

    //console.log("profession", listProf)

    //console.log("otdels",listOtdel);

    return (

        //(loadedOtdel && loadedProf)
        (loadedProf === true && loadedOtdel === true)
            ? <InputFormPerson person={ person } otdels={listOtdel} prof={listProf} />
            : <h2>Loading...</h2>
        );

}

export default EditForm;