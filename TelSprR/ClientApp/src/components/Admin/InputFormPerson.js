import React, { useState, Fragment } from 'react';
import { DropzoneComponent } from '../DropFile';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../redux/RootReducer'
//import * as axios from 'axios';

var navigate;
//var fileBody;

const InputFormPerson = (props) => {

    //const dispatch = useDispatch();

    const location = useLocation();
    const person = location.state.person;

    navigate = useNavigate();

    //console.log("InputFormPerson", person);

    const [filePhoto, setFilePhoto] = useState();
    const [prof, setProf] = useState(person.personalProfId ?? 0);
    const [otdel, setOtdel] = useState(person.personalOtdelId);
    const [disableSave, setDisableSave] = useState(true);


    //=========================================================================================
    function listProfession() {
        return (
            <select className="form-select" value={prof} onChange={handleChangeProf} >
                <option key="0" value="0"></option>
                {
                    props.prof.map((item) =>
                            <option key={item.profId} value={item.profId}>{item.profId}&nbsp;&nbsp;&nbsp;{item.profName}</option>
                    )}
            </select>
        );
    }

    //=========================================================================================
    function listOtdels(data, level) {
        const { otdelName, subOtdel, otdelId } = data;

        return (
            <Fragment key={otdelId }>
              <option value={otdelId} >{level}{level}{level}&nbsp;{otdelId}&nbsp; &nbsp; {otdelName}</option>

            if (subOtdel.length > 0) {
                    subOtdel.map((child) => listOtdels(child, level + "-"))
                }
            </Fragment>
        );
    }


    //=========================================================================================
    function BrowsePhoto(event) {

        event.preventDefault();

        let files = event.target.files;

        let fileURL = URL.createObjectURL(files[0]);

        if (files.length > 0) {
            person.personalPhoto = files[0].name;
            setFilePhoto(files[0]);
            //fileBody = files[0];
            setDisableSave(false);
        }

        console.log("BrowsePhoto filePhoto", filePhoto);

    }
    //=========================================================================================
    function SelectPhoto(file) {

        person.personalPhoto = file.name
        let fileURL = URL.createObjectURL(file);
        setFilePhoto(file);
        //console.log("SelectPhoto", fileURL);
        //fileBody = file;
        setDisableSave(false);
    }
    //=========================================================================================
    function DeletePhoto(e) {

        person.personalPhoto = null;
        setFilePhoto(null);
        //fileBody = null;
        setDisableSave(false);
    }
    //=========================================================================================
    function savePerson(event) {

        event.preventDefault();

        //const data = new FormData();
        //data.append("formData", fileBody);
        //data.append("person", JSON.stringify(person));

        //axios.post("cards", data, {
        //    headers: { 'Content-Type': 'multipart/form-data' }
        //})
        //    .then(res => {
        //        console.log(res);
        //        console.log(res.data);                
        //        if (res.status === 200) {
        //            navigate("/");
        //        } 
        //    })
        //.catch(error => console.log(error));

        //oldPhoto = person.personalPhoto;
        //navigate("/");

        const data = new FormData();
        //data.append("formData", fileBody);
        data.append("formData", filePhoto);
        data.append("person", JSON.stringify(person));

        var xhr = new XMLHttpRequest();
        xhr.open("post", "cards", true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                //<Navigate to="/" replace={true} />
                navigate('/', { state: { status: "saved" } });
                props.UpdatePerson(person);
                //dispatch({ type: 'UPDATE_PERSON', payload: person });
            } else {
                console.log("error save photo");
            }

        };
        xhr.send(data);
    }
    //=========================================================================================

    function handleChange(event) {
        //console.log("change", event.target.id, event.target.value);
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        person[event.target.id] = value;
        setDisableSave(false);
    }
    //=========================================================================================
    function handleChangeProf(event) {
        console.log("change prof", event.target.value);
        person.personalProfId = event.target.value;
        setProf(event.target.value);
        //person[event.target.id] = event.target.value;
        setDisableSave(false);
    }
    //=========================================================================================
    function handleChangeOtdel(event) {
        console.log("change", event.target.value);
        person.personalOtdelId = event.target.value;
        setOtdel(event.target.value);
        //person[event.target.id] = event.target.value;
        setDisableSave(false);
    }
    //=========================================================================================
    function handleCancel(e) {
        e.preventDefault();

        //console.log("e", e)
        //return <Navigate to="/" replace={true} />
        navigate('/');
    }

    console.log("fileBody", filePhoto);
    //=========================================================================================

    return (

        <div className="row justify-content-center">
            <div className="col">
                <div className="card mb-5 ps-5">
                    <div className="card-body">
                        <form method="post" onSubmit={savePerson}>
                            <div className="mb-3">
                                {/*<input className="form-control" type="text" defaultValue={this.person.personalId} />*/}
                                <h6>Фамилия</h6>
                                <input id="personalLastName" className="form-control" type="text" defaultValue={props.person.personalLastName} onChange={handleChange} />
                                <h6>Имя</h6>
                                <input id="personalName" className="form-control" type="text" defaultValue={props.person.personalName} onChange={handleChange} />
                                <h6>Отчество</h6>
                                <input id="personalMidName" className="form-control" type="text" defaultValue={props.person.personalMidName} onChange={handleChange} />
                                <h6>Должность</h6>
                                {listProfession()}
                                <h6>Рабочий телефон</h6>
                                <input id="personalTel" className="form-control" type="text" defaultValue={props.person.personalTel} onChange={handleChange} />
                                <h6>Мобильный телефон</h6>
                                <input id="personalMobil" className="form-control" type="text" defaultValue={props.person.personalMobil} onChange={handleChange} />
                                <h6>Отдел</h6>

                                <select className="form-select" value={otdel} onChange={handleChangeOtdel}>
                                    <option key="0" value="0"></option>
                                    {props.otdels.map((data) => listOtdels(data, ""))}
                                </select>

                                <div className="form-check" style={{ marginTop: "18px" }}>
                                    <input id="personalDisabled" className="form-check-input" type="checkbox" defaultChecked={props.person.personalDisabled} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="formCheck-1" >Отключен</label>
                                </div>
                            </div>
                            <h6>Электронная почта</h6>
                            <input id="personalEmail" className="form-control" type="email" defaultValue={props.person.personalEmail} onChange={handleChange} />
                            <div className="d-flex justify-content-around align-items-center mt-3">
                                <button className="btn btn-primary" disabled={ disableSave }
                                    type="submit" >Сохранить</button>
                                <button className="btn btn-secondary" onClick={handleCancel}>Отменить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col" style={{ marginTop: "20px" }}>
                <div className="justify-content-center">
                    <DropzoneComponent onCallBack={SelectPhoto} filePhoto={filePhoto} fileName={person.personalPhoto} />
                </div>
                <div style={{ margin: "10px" }}>
                    <input id="myID" className="d-none invisible" type="file" accept="image/" required onChange={BrowsePhoto} />
                    <label className="form-label btn btn-primary" htmlFor="myID" style={{ marginBottom: "0px" }}>
                        Обзор...
                    </label>
                    <button className="btn btn-secondary" style={{ marginLeft: "10px" }} onClick={DeletePhoto}
                        type="button">Удалить</button>
                </div>

            </div>
        </div>
    );

}

export default connect(null, mapDispatchToProps)(InputFormPerson);
