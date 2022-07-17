import React, { Component, useState } from 'react';
import { Label } from 'reactstrap';
import { DropzoneComponent } from './DropFile';
import { Params } from "react-router-dom";


//var oldPhoto;
//var person;


//const EditForm = props => {

//    person = {
//        personalId: 0,
//        personalName: "",
//        personalLastName: "",
//        personalMidName: "",
//        personalEmail: "",
//        personalTel: "",
//        personalMobil: "",
//        personalPhoto: null,
//        personalProfId: 0,
//        personalOtdelId: 0,
//        personalDisabled: false
//    }

//    const { filePhoto, setFilePhoto } = useState();
//    const { listProf, setListProf } = useState([]);
//    const { listOtdel, setListOtdel } = useState([]);

//    LoadProf();
//    LoadOtdel();
//    oldPhoto = person.personalPhoto;

//    function DeletePhoto(e) {

//        person.personalPhoto = null;
//        setFilePhoto(null);
//    }

//    async function LoadOtdel() {

//        const response = await fetch('otdel');
//        const data = await response.json();

//        setListOtdel(data);
//    }

//    async function LoadProf() {
//        const response = await fetch('prof');
//        const data = await response.json();

//        setListProf(data);
//    }


//    function listProfession() {

//        //console.log("personID = " + this.person.personalProfId);

//        return (
//            <select ref="profession" className="form-select"  >
//                <option key="0" value="0"></option>

//                {
//                    listProf.map((item) =>
//                        person.personalProfId == item.profId
//                            ? <option selected key={item.profId} value={item.profId} >{item.profId}&nbsp;&nbsp; {item.profName}</option>
//                            : <option key={item.profId} value={item.profId}>{item.profId}&nbsp;&nbsp;&nbsp;{item.profName}</option>

//                    )}
//            </select>
//        );
//    }

//    function SelectPhoto(file) {

//        person.personalPhoto = file.name
//        setFilePhoto(file);
//        //this.setState({ filePhoto: file });
//        console.log("SelectPhoto " + file);
//    }


//    function savePerson(event) {

//        event.preventDefault();

//        let namePhoto;
//        if (person.personalPhoto != null) {
//            namePhoto = person.personalPhoto;
//        } else {
//            namePhoto = filePhoto == null ? null : filePhoto.name;
//        }


//        console.log(namePhoto);

//        let item = {
//        //    personalId: person.personalId,
//        //    personalName: refs.name.value,
//        //    personalLastName: refs.lastName.value,
//        //    personalMidName: refs.midName.value,
//        //    personalEmail: refs.email.value,
//        //    personalTel: refs.workPhone.value,
//        //    personalMobil: refs.mobPhone.value,
//        //    personalProfId: refs.profession.value,
//        //    personalOtdelId: refs.otdel.value,
//        //    personalPhoto: namePhoto,
//        //    personalDisabled: refs.isDiasabled.checked
//        };

//        //item.personalPhoto = this.state.filePhoto.name ?? '';

//        const data = new FormData();
//        data.append("formData", filePhoto);
//        data.append("person", JSON.stringify(item));
//        data.append("oldPhoto", oldPhoto);

//        var xhr = new XMLHttpRequest();
//        xhr.open("post", "cards", true);
//        xhr.onload = function () {
//            if (xhr.status === 200) {
//                //this.fileName = this.files[0].name;
//                oldPhoto = person.personalPhoto;
//                //this.setState({ drag: false });
//                //        //this.loadData();
//                //this.props.history.push("/");
//                console.log("переход обратно");
//            }
//        };
//        xhr.send(data);
//    }


//    function BrowsePhoto(event) {

//        event.preventDefault();

//        let files = [...event.target.files];
//        //let preview;

//        if (files[0]) {

//            setFilePhoto(files[0]);

//            //this.setState(
//            //    {
//            //        filePhoto: files[0],
//            //        //preview: URL.createObjectURL(files[0])
//            //    });

//            //console.log("выбран файл " + this.preview);
//        }

//    }

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
//                ? <option selected key={otdelId} value={otdelId} >{level}{level}{level}&nbsp;{otdelId}&nbsp; &nbsp;{otdelName}</option>
//                : <option key={otdelId} value={otdelId} >{level}{level}{level}&nbsp;{otdelId}&nbsp; &nbsp; {otdelName}</option>
//            }

//            if (subOtdel.length > 0) {
//                subOtdel.map((child) => listOtdels(child, level + "-"))
//            }
//        </>
//    );
//}



//    return (
//        <div className="row justify-content-center">
//            <div className="col">
//                <div className="card mb-5 ps-5">
//                    <div className="card-body">
//                        <form method="post" onSubmit={savePerson}>
//                            <div className="mb-3">
//                                {/*<input className="form-control" type="text" defaultValue={this.person.personalId} />*/}
//                                <h6>Фамилия</h6>
//                                <input ref="lastName" id="name-2" className="form-control" type="text" defaultValue={person.personalLastName} />
//                                <h6>Имя</h6>
//                                <input ref="name" id="name-3" className="form-control" type="text" defaultValue={person.personalName} />
//                                <h6>Отчество</h6>
//                                <input ref="midName" id="name-1" className="form-control" type="text" defaultValue={person.personalMidName} />
//                                <h6>Должность</h6>
//                                {listProfession()}
//                                <h6>Рабочий телефон</h6>
//                                <input ref="workPhone" id="name-4" className="form-control" type="text" defaultValue={person.personalTel} />
//                                <h6>Мобильный телефон</h6>
//                                <input ref="mobPhone" id="name-5" className="form-control" type="text" defaultValue={person.personalMobil} />
//                                <h6>Отдел</h6>

//                                <select ref="otdel" className="form-select" >
//                                    <option key="0" value="0"></option>
//                                    {listOtdel.map((data) => this.listOtdels(data, ""))}
//                                </select>

//                                <div className="form-check" style={{ marginTop: "18px" }}>
//                                    <input ref="isDiasabled" id="formCheck-1" className="form-check-input" type="checkbox" defaultChecked={person.personalDisabled} />
//                                    <label className="form-check-label" htmlFor="formCheck-1" >Отключен</label>
//                                </div>
//                            </div>
//                            <h6>Электронная почта</h6>
//                            <input ref="email" id="email-2" className="form-control" type="email" defaultValue={person.personalEmail} />
//                            <div>
//                                <button className="btn btn-primary d-block w-100"
//                                    type="submit" style={{ margin: "14px" }}>Сохранить</button>
//                            </div>
//                        </form>
//                    </div>
//                </div>
//            </div>
//            <div className="col" style={{ marginTop: "20px" }}>
//                <div className="justify-content-center">
//                    <DropzoneComponent onCallBack={this.SelectPhoto} filePhoto={filePhoto} fileName={person.personalPhoto} />
//                </div>
//                <div style={{ margin: "10px" }}>
//                    <input id="myID" className="d-none invisible" type="file" accept="image/" required onChange={this.BrowsePhoto} />
//                    <label className="form-label btn btn-primary" htmlFor="myID" style={{ marginBottom: "0px" }}>
//                        Обзор...
//                    </label>
//                    <button className="btn btn-secondary" style={{ marginLeft: "10px" }} onClick={DeletePhoto} type="button">Удалить</button>
//                </div>

//            </div>
//        </div>
//        );


//}

//export default EditForm;


//=========================================================================================
export class EditForm extends Component {
    static displayName = EditForm.name;


    constructor(props) {
        super(props);

        //this.person = this.props.location.person;
        //if (this.person == null) {
            this.person = {
                personalId: 0,
                personalName: "",
                personalLastName: "",
                personalMidName: "",
                personalEmail: "",
                personalTel: "",
                personalMobil: "",
                personalPhoto: null,
                personalProfId: 0,
                personalOtdelId: 0,
                personalDisabled: false
            }

        //}


        this.state = {
            filePhoto: null,
            listProf: [],
            listOtdel: []
        };


        this.savePerson = this.savePerson.bind(this);
        this.BrowsePhoto = this.BrowsePhoto.bind(this);
        this.SelectPhoto = this.SelectPhoto.bind(this);
        this.listOtdels = this.listOtdels.bind(this);
        this.DeletePhoto = this.DeletePhoto.bind(this);
    }

    //-----------------------------------------------------------------------------------
    componentDidMount() {
        this.LoadProf();
        this.LoadOtdel();
        this.oldPhoto = this.person.personalPhoto;
    }


    //-----------------------------------------------------------------------------------------------
    DeletePhoto(e) {

        this.person.personalPhoto = null;
        this.setState({ filePhoto: null });
    }



    //-----------------------------------------------------------------------------------------------

    async LoadOtdel() {

        const response = await fetch('otdel');
        const data = await response.json();

        this.setState({ listOtdel: data });
    }

    //-----------------------------------------------------------------------------------------------
    async LoadProf() {
        const response = await fetch('prof');
        const data = await response.json();
        this.setState({ listProf: data });
    }


    //-----------------------------------------------------------------------------------------------
    listProfession() {

        //console.log("personID = " + this.person.personalProfId);

        return (
            <select ref="profession" className="form-select"  >
                <option key="0" value="0"></option>

                {
                    this.state.listProf.map((item) =>
                        this.person.personalProfId == item.profId
                            ? <option selected key={item.profId} value={item.profId} >{item.profId }&nbsp;&nbsp; {item.profName}</option>
                            : <option key={item.profId} value={item.profId}>{item.profId}&nbsp;&nbsp;&nbsp;{item.profName}</option>

                    )}
            </select>
        );
    }

    //-----------------------------------------------------------------------------------------------
    listOtdels(data, level) {
        const { otdelName, subOtdel, otdelId } = data;

        //console.log("subOtdel = " + subOtdel);

        //if (subOtdel.length > 0) {
        //    //console.log("subOtdel = " + subOtdel + " " + subOtdel.length);
        //} else {
        //    console.log("subOtdel = " + str);
        //}


        return (
            <>
                {this.person.personalOtdelId === otdelId
                    ? <option selected key={otdelId} value={otdelId} >{level}{level}{level}&nbsp;{otdelId}&nbsp; &nbsp;{otdelName}</option>
                    : <option key={otdelId} value={otdelId} >{level}{level}{level}&nbsp;{otdelId}&nbsp; &nbsp; {otdelName}</option>
                }

            if (subOtdel.length > 0) {
                    subOtdel.map((child) => this.listOtdels(child, level + "-"))
                }
            </>
        );
    }




    //--------------------------------------------------------------------------------------------------------
    SelectPhoto(file) {

        this.person.personalPhoto = file.name
        this.setState({ filePhoto: file });
        console.log("SelectPhoto " + file);
    }

    //--------------------------------------------------------------------------------------------------------
    savePerson(event) {

        event.preventDefault();

        let namePhoto;
        if (this.person.personalPhoto != null) {
            namePhoto = this.person.personalPhoto;
        } else {
            namePhoto = this.state.filePhoto == null ? null : this.state.filePhoto.name;
        }


        console.log(namePhoto);

        let item = {
            personalId: this.person.personalId,
            personalName: this.refs.name.value,
            personalLastName: this.refs.lastName.value,
            personalMidName: this.refs.midName.value,
            personalEmail: this.refs.email.value,
            personalTel: this.refs.workPhone.value,
            personalMobil: this.refs.mobPhone.value,
            personalProfId: this.refs.profession.value,
            personalOtdelId: this.refs.otdel.value,
            personalPhoto: namePhoto,
            personalDisabled: this.refs.isDiasabled.checked
        };

        //item.personalPhoto = this.state.filePhoto.name ?? '';

        const data = new FormData();
        data.append("formData", this.state.filePhoto);
        data.append("person", JSON.stringify(item));
        data.append("oldPhoto", this.oldPhoto);

        var xhr = new XMLHttpRequest();
        xhr.open("post", "cards", true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                //this.fileName = this.files[0].name;
                this.oldPhoto = this.person.personalPhoto;
                //this.setState({ drag: false });
                //        //this.loadData();
                this.props.history.push("/");
                console.log("переход обратно");
            }
        }.bind(this);
        xhr.send(data);



    }

    //--------------------------------------------------------------------------------------------------------
    BrowsePhoto(event) {

        event.preventDefault();

        let files = [...event.target.files];
        //let preview;

        if (files[0]) {
            this.setState(
                {
                    filePhoto: files[0],
                    //preview: URL.createObjectURL(files[0])
                });

            //console.log("выбран файл " + this.preview);
        }

    }

    //-------------------------------------------------------------------------------------------------------------
    render() {


        //console.log("profession = " + this.person.personalProfId);
        console.log("props = " + this.props);

        return (
            <div className="row justify-content-center">
                <div className="col">
                    <div className="card mb-5 ps-5">
                        <div className="card-body">
                            <form method="post" onSubmit={this.savePerson}>
                                <div className="mb-3">
                                    {/*<input className="form-control" type="text" defaultValue={this.person.personalId} />*/}
                                    <h6>Фамилия</h6>
                                    <input ref="lastName" id="name-2" className="form-control" type="text" defaultValue={this.person.personalLastName} />
                                    <h6>Имя</h6>
                                    <input ref="name" id="name-3" className="form-control" type="text" defaultValue={this.person.personalName} />
                                    <h6>Отчество</h6>
                                    <input ref="midName" id="name-1" className="form-control" type="text" defaultValue={this.person.personalMidName} />
                                    <h6>Должность</h6>
                                    {this.listProfession()}
                                    <h6>Рабочий телефон</h6>
                                    <input ref="workPhone" id="name-4" className="form-control" type="text" defaultValue={this.person.personalTel} />
                                    <h6>Мобильный телефон</h6>
                                    <input ref="mobPhone" id="name-5" className="form-control" type="text" defaultValue={this.person.personalMobil} />
                                    <h6>Отдел</h6>

                                    <select ref="otdel" className="form-select" >
                                        <option key="0" value="0"></option>
                                        {this.state.listOtdel.map((data) => this.listOtdels(data, ""))}
                                    </select>

                                    <div className="form-check" style={{ marginTop: "18px" }}>
                                        <input ref="isDiasabled" id="formCheck-1" className="form-check-input" type="checkbox" defaultChecked={this.person.personalDisabled} />
                                        <label className="form-check-label" htmlFor="formCheck-1" >Отключен</label>
                                    </div>
                                </div>
                                <h6>Электронная почта</h6>
                                <input ref="email" id="email-2" className="form-control" type="email" defaultValue={this.person.personalEmail} />
                                <div>
                                    <button className="btn btn-primary d-block w-100"
                                        type="submit" style={{ margin: "14px" }}>Сохранить</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col" style={{ marginTop: "20px" }}>
                    <div className="justify-content-center">
                        <DropzoneComponent onCallBack={this.SelectPhoto} filePhoto={this.state.filePhoto} fileName={this.person.personalPhoto} />
                    </div>
                    <div style={{ margin: "10px" }}>
                        <input id="myID" className="d-none invisible" type="file" accept="image/" required onChange={this.BrowsePhoto} />
                        <label className="form-label btn btn-primary" htmlFor="myID" style={{ marginBottom: "0px" }}>
                            Обзор...
                        </label>
                        <button className="btn btn-secondary" style={{ marginLeft: "10px" }} onClick={this.DeletePhoto} type="button">Удалить</button>
                    </div>

                </div>
            </div>

        );

    }

}

