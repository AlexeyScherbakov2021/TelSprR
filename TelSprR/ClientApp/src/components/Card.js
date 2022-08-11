import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../redux/RootReducer'


const Card = props => {

    //const dispatch = useDispatch();

    //function handleDelete( person) {
        //dispatch({ type: 'DELETE_PERSON', payload: person  });
        //props.DeletePerson(person);
    //}

    var divCardStyle = {
        marginTop: "12px",
        marginLeft: "10px"
    };

    var cardStyle = {
        //background: "#effeff",
        borderRadius: "6px",
        boxShadow: "0px 0px 3px 1px var(--bs-secondary),inset 0px 0px 10px 0px rgb(123,186,249)",
        marginBottom: "13px",
        //border: "2px solid rgb(82,168,255)",
        border: "1px solid var(--bs-gray-600)",
        background: "linear-gradient(-50deg, #adcedb, #f8ffff), rgb(232,253,255)",

        marginRight: "8px"
    };

    var cardBodyStyle = {
        padding: "6px"
    };

    var photoStyle = {
        marginRight: "12px",
        //maxHeight: "100px",
        width: "130px"
    };

    var nameStyle = {
        marginBottom: "0px",
        marginTop: "-2px"
    };

    var divProfessionStyle = {
        marginTop: "-10px"
    };

    var professionStyle = {
        marginRight: "8px",
        textDecoration: "underline",
        color: "blue",
        cursor: "pointer"
    };

    var workPhoneStyle = {
        marginBottom: "2px",
        marginTop: "2px"
    };

    var svgStyle = {
        marginRight: "9px",
        color: "var(--bs-blue)"
    };

    var headerWorkPhoneStyle = {
        marginBottom: "0px",
        width: "180px"
    };

    var badgeStyle = {
        fontSize: "18px",
        borderRadius: "12px"
    };

    //console.log("Card", props.item);


    const editor = props.isAdmin
        ? <div className="d-flex flex-column flex-shrink-0 justify-content-evenly ms-auto" style={{ marginLeft: "7px" }}>
            {/*<Link className="btn btn-primary" to={{ pathname: '/editForm', id: props.item }} type="button">Изменить</Link>*/}
            <Link className="btn btn-primary" to="/editForm" state={{ person: props.item }}
                type="button" style={{ marginBottom: "10px" }}>Изменить</Link>
            <button className="btn btn-secondary btn-sm" onClick={() => props.DeletePerson(props.item)}
                type="button">Удалить</button>
        </div>
        : null



    return (

        <div className="col-md-12 col-xxl-10" style={divCardStyle}>
            <div className="card d-flex" id={props.item.personalId} style={cardStyle}>
                <div className="card-body d-flex align-items-center" style={cardBodyStyle}>
                    <img className="float-start" src={"./photo/" + props.item.personalPhoto} style={photoStyle} />
                    <div>
                        <div>
                        <h5 className="fw-bold" style={nameStyle}>{props.item.personalLastName + ' ' + props.item.personalName + ' ' +
                                props.item.personalMidName}
                                {(props.item.personalDisabled == true) ?
                                    <span className="badge rounded-pill bg-danger" style={{ marginLeft: "25px", marginTop: "5px" }} >
                                        отключен
                                    </span>
                                    : null
                                }

                            </h5>
                        <h6 className="text-muted mb-2">{props.item.profession}</h6>
                            <div style={divProfessionStyle}>
                                <a id={props.item.personalOtdelId} style={professionStyle} onClick={() => props.onSelectOtdel(props.item.personalOtdelId)}>
                                    {props.item.routeOtdels}
                                </a>
                        </div>
                    </div>
                        <div>
                        <div className="d-flex align-items-center flex-wrap" style={workPhoneStyle}>
                            <svg className="bi bi-telephone-fill" xmlns="http://www.w3.org/2000/svg" width="1em" fill="currentColor" viewBox="0 0 16 16"
                                style={svgStyle}>
                                <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path>
                            </svg>
                            <h6 style={headerWorkPhoneStyle}>рабочий телефон</h6>
                            <span className="badge bg-primary" style={badgeStyle}>{props.item.personalTel}</span>
                        </div>
                        <div className="d-flex align-items-center flex-wrap" style={workPhoneStyle}>
                            <svg className="bi bi-telephone-fill" xmlns="http://www.w3.org/2000/svg" width="1em" fill="currentColor" viewBox="0 0 16 16"
                                style={svgStyle}>
                                <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"></path>
                            </svg>
                            <h6 style={headerWorkPhoneStyle}>мобильный телефон</h6>
                            <span className="badge bg-primary" style={badgeStyle}>{props.item.personalMobil}</span>
                        </div>
                        <div className="d-flex align-items-center flex-wrap align-items-lg-center align-items-xl-center">
                            <svg className="bi bi-envelope-fill" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" style={svgStyle}>
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"></path>
                            </svg>
                            <h6 style={headerWorkPhoneStyle}>электронная почта</h6><a className="fw-bold" href={"mailto:" + props.item.personalEmail}>{props.item.personalEmail}</a>
                        </div>
                        </div>
                    </div>
                    {editor}
                </div>
            </div>
        </div>
    )

}

//-----------------------------------------------------------------------------------
//function DeletePerson(person, index) {

//    console.log("DeletePerson " + person.personalId);

//    var result = window.confirm('Удалить "' + person.personalLastName + ' ' + person.personalName + ' ' + person.personalMidName + '"');

//    if (result) {
//        var xhr = new XMLHttpRequest();
//        xhr.open("delete", "cards/" + person.personalId, true);
//        xhr.setRequestHeader("Content-Type", "application/json");
//        xhr.onload = function () {
//            console.log("status = " + xhr.status);
//            if (xhr.status === 200) {
//                const data = this.state.listPerson;
//                data.splice(index, 1);
//                //delete data[index];
//                this.setState({ listPerson: data });
//            }
//        }.bind(this);
//        xhr.send();
//    }
//}



export default connect(mapStateToProps, mapDispatchToProps)(Card);