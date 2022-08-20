import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function EditProf() {

    const [listProf, setListProf] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    //const [listHeight, setListHeight] = useState(window.innerHeight - 160);
    const [loaded, setLoaded] = useState(false);

    const searchTextProf = useSelector(state => state.searchTextProf);

    //console.log("sel", sel);

    useEffect(() => {
        //console.log("useEffect start");
        //window.addEventListener('resize', onResize)

        if (!loaded) {
            LoadProf();
        }

    //    return () => {
    //        //console.log("useEffect end");
    //        window.removeEventListener('resize', onResize)
    //    }
    }, [ loaded, listProf] );

    //-----------------------------------------------------------------------------------------------
    //function onResize() {
    //    setListHeight(window.innerHeight - 160);
    //}

        //-----------------------------------------------------------------------------------------------
    async function LoadProf() {
        const response = await fetch('prof');
        const data = await response.json();
        setListProf(data);
        setLoaded(true);
        //this.setState({ listProf: data });
    }

    //-------------------------------------------------------------------------------------------------------------------
    function CreateName(e) {

        let result = prompt("Наименование новой должности");

        if (result == null) {
            return;
        }

        const newItem = {
            profId: 0,
            profName: result,
            profOrder: 500,
        };

        var xhr = new XMLHttpRequest();
        xhr.open("post", "prof", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = [...listProf];
                newItem.profId = xhr.response;
                //console.log("xhr.response", xhr.response);
                //console.log("Item", newItem);
                data.splice(0, 0, newItem);
                //console.log("data", data);
                setListProf(data);
            }
        }.bind(this);
        xhr.send(JSON.stringify(newItem));

    }

    //-------------------------------------------------------------------------------------------------------------------
    function EditName(e, item) {

        if (item == null)
            return;

        let result = prompt("Переименовать должность " + item.profId + ' ' + item.profName + "?", item.profName);
        if (result == null) {
            return;
        }

        item.profName = result;

        var xhr = new XMLHttpRequest();
        xhr.open("post", "prof", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                //console.log("xhr", xhr);
                //const data = [...listProf];
                setListProf([...listProf]);
            }
        }.bind(this);
        xhr.send(JSON.stringify(item));

    }

    //-------------------------------------------------------------------------------------------------------------------
    function Delete(e) {

        if (currentItem == null)
            return;

        var result = window.confirm('Удалить "' + currentItem.profId + ' ' + currentItem.profName + "?");

        if (result) {
            var xhr = new XMLHttpRequest();
            xhr.open("delete", "prof/" + currentItem.profId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const data = [...listProf];
                    const index = data.findIndex(e => e.profId === currentItem.profId);
                    data.splice(index, 1);
                    setListProf(data);

                } else {
                    alert("Ошибка при удалении. Возможно должность используется.");
                }
            }.bind(this);
            xhr.send();
        }

    }

    //-------------------------------------------------------------------------------------------------------------------
    function selectedItem(item) {
        //console.log("selectedItem", item);

        setCurrentItem(item);
    }

    const buttonStyle = {
        margin: "5px",
    };

    const listStyle = {
        height: "calc(100vh - 170px)",
        boxShadow: "0px 0px 3px 3px #00000040",
    };

    const loaderStyle = {
        display: "inline-block",
        position: "relative",
        width: "100px",
        height: "100px",
        textAlign: "center"
    };


    const styleBox = {
        margin: "0 20px",

    }

    return (
        !loaded
            ? <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}>
                <img src="loading_spinner.gif" style={loaderStyle} />
            </div>

            : <div style={styleBox}>
            <h3>Список должностей</h3>
            <div>
                <button className="btn btn-primary" onClick={(e) => EditName(e, currentItem)} style={buttonStyle}>Изменить</button>
                <button className="btn btn-secondary" onClick={Delete} style={buttonStyle}>Удалить</button>
                <button className="btn btn-primary" onClick={CreateName} style={buttonStyle} >Создать</button>
            </div>
            <ul className="list-group border rounded overflow-auto" style={listStyle}>
                {
                    listProf.filter((name) => name.profName.toLowerCase().includes(searchTextProf.toLowerCase()) 

                    ).map((item) =>
                        <li key={item.profId} style={{ padding: 0 }}
                            className={item.profId == currentItem?.profId
                                ? "list-group-item active border border-primary rounded-2 border-0 text-light"
                                : "list-group-item"} >

                            <a id={item.profId}
                                className={item.profId == currentItem?.profId ? "btn text-start text-light" : "d-block btn text-start"}
                                onClick={() => selectedItem(item)}
                                type="button" style={{ margin: 1 }} >{item.profId}&nbsp;&nbsp;&nbsp;{item.profName}</a>

                        </li>

                    )}
            </ul>
        </div>
    )


}

export default EditProf;


