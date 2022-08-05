import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function EditOtdel() {

    const [listOtdel, setListOtdel] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [listHeight, setListHeight] = useState(window.innerHeight - 160);
    const [loaded, setLoaded] = useState(false);

    const isSubOtdel = useRef();

    useEffect(() => {
        //console.log("useEffect start");
        window.addEventListener('resize', onResize)

        if (!loaded) {
            LoadOtdelData();
        }

        return () => {
            //console.log("useEffect end");
            window.removeEventListener('resize', onResize)
        }
    }, [listHeight, loaded, listOtdel]);


    //-----------------------------------------------------------------------------------------------
    function onResize() {
        setListHeight(window.innerHeight - 160);
    }

    //-----------------------------------------------------------------------------------------------

    async function LoadOtdelData() {

        const response = await fetch('otdel');
        const data = await response.json();
        setListOtdel(data);
        setLoaded(true);
    }

    //-------------------------------------------------------------------------------------------------------------------
    function selectedItem(item) {
        //console.log("selectedItem", item);
        setCurrentItem(item);
        //this.setState({ currentItem: item });
    }

    //-------------------------------------------------------------------------------------------------------------------
    function CreateName(e) {

        //console.log("currentItem", this.currentItem);
        // console.log("isSubOtdel" , this.refs.isSubOtdel.checked);
        if (currentItem == null) {
            if (isSubOtdel.current.checked) {
                return;
            }
        }

        let result = prompt("Наименование нового отдела");

        if (result == null) {
            return;
        }

        const newItem = {
            otdelId: 0,
            otdelName: result,
            otdelParentId: isSubOtdel.current.checked ? currentItem.otdelId : null,
            //otdelParent: this.currentItem
        };

        var xhr = new XMLHttpRequest();
        xhr.open("post", "otdel", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = [...listOtdel];
                newItem.otdelId = xhr.response;
                this.refs.isSubOtdel.checked
                    ? currentItem.subOtdel.splice(0, 0, newItem)
                    : data.splice(0, 0, newItem);
                //data.splice(0, 0, newItem);
                setListOtdel(data);
            }
        }.bind(this);
        xhr.send(JSON.stringify(newItem));

    }

    //-------------------------------------------------------------------------------------------------------------------
    function EditName(e, item) {
        //console.log("Edit", item);

        if (item == null)
            return;

        let result = prompt("Переименовать отдел " + item.otdelId + ' ' + item.otdelName + "?", item.otdelName);
        if (result == null) {
            return;
        }
        //console.log("item", item);

        item.otdelName = result;

        //console.log("item", item);

        var xhr = new XMLHttpRequest();
        xhr.open("post", "otdel", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                //console.log("xhr", xhr);
                const data = [...listOtdel];
                setListOtdel(data);
            }
        }.bind(this);
        xhr.send(JSON.stringify(item));

    }

    //-------------------------------------------------------------------------------------------------------------------
    function Delete(e) {

        if (currentItem == null)
            return;

        //console.log("item", this.currentItem);

        var result = window.confirm('Удалить "' + currentItem.otdelId + ' ' + currentItem.otdelName + "?");

        if (result) {
            var xhr = new XMLHttpRequest();
            xhr.open("delete", "otdel/" + currentItem.otdelId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                //console.log("status = " + xhr.status);
                if (xhr.status === 200) {
                    const data = [...listOtdel];

                    //const index = this.currentItem.subOtdel.findIndex(e => e.otdelId === this.currentItem.otdelId);
                    console.log("data", data);

                    deleteFromOtdel(data, currentItem.otdelId, currentItem.otdelParentId);

                    //this.currentItem.subOtdel.splice(index, 1);
                    //delete data[index];
                    setListOtdel(data);

                } else {
                    alert("Ошибка при удалении. Возможно отдел используется.");
                }
            }.bind(this);
            xhr.send();
        }

    }

    //-----------------------------------------------------------------------------------------------
    function deleteFromOtdel(list, id, parentId) {

        if (list == null)
            return true;

        for (let i = 0; i < list.length; i++) {
            if (list[i].otdelId == id) {
                list.splice(i, 1);
                return true;
            }

            if (deleteFromOtdel(list[i].subOtdel, id, parentId) == true) {
                return true;
            }

        }

    }


    //-----------------------------------------------------------------------------------------------
    function funOtdels(data) {
        const { otdelName, subOtdel, otdelId } = data;

        //console.log("currentOtdel", this.state.currentItem);

        let classStd = ["d-block btn", "text-start"];

        if (otdelId == currentItem?.otdelId)
            classStd.push("text-light");

        let classLi = ["list-group-item"];
        if (otdelId == currentItem?.otdelId) {
            classLi.push("active");
            classLi.push("border");
            classLi.push("border-primary");
            classLi.push("rounded-2");
            classLi.push("border-0");
            classLi.push("text-light");
        }


        return (

            <li
                className={classLi.join(" ")}
                id={otdelId} style={{ padding: 0 }} key={otdelId}>

                <a id={otdelId} className={classStd.join(" ")}
                    onClick={() => selectedItem(data)}
                    type="button" style={{ margin: 1 }} >{otdelId}&nbsp;&nbsp;&nbsp;{otdelName}</a>
                {
                    subOtdel &&
                    <ul>
                        {subOtdel.map((child, n) => funOtdels(child, n))}
                    </ul>
                }
            </li>
        );
    }

    const buttonStyle = {
        margin: "5px"
    };
    const listStyle = {
        height: listHeight
    };

    return (
        <div style={{ margin: "6px", marginLeft: "20px" }}>
            <h3>Список отделов</h3>
            <div className="d-flex align-items-center">
                <button className="btn btn-primary" onClick={(e) => EditName(e, currentItem)} style={buttonStyle}>Изменить</button>
                <button className="btn btn-secondary" onClick={Delete} style={buttonStyle}>Удалить</button>
                <button className="btn btn-primary" onClick={CreateName} style={buttonStyle} >Создать</button>
                <div className="form-check" style={{ marginLeft: "8px" }}>
                    <input ref={isSubOtdel} id="formCheck-1" className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="formCheck-1">В выбранном отделе</label>
                </div>
            </div>
            <ul className="list-group border rounded overflow-auto" style={listStyle}>
                {listOtdel.map((data) => funOtdels(data))}
            </ul>
        </div>
    )




}

export default EditOtdel;


