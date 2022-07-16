import React, { Component } from 'react';

export class EditOtdel extends Component {
    static displayName = EditOtdel.name;
    constructor(props) {
        super(props);

        this.state = {
            listOtdel: [],
            currentItem: null,
            listHeight: window.innerHeight - 160

        };

        this.funOtdels = this.funOtdels.bind(this);
        this.onResize = this.onResize.bind(this);
        this.EditName = this.EditName.bind(this);
        this.CreateName = this.CreateName.bind(this);
        this.Delete = this.Delete.bind(this);
        this.selectedItem = this.selectedItem.bind(this);
        this.deleteFromOtdel = this.deleteFromOtdel.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize)
        this.LoadOtdelData();
    }

    //-----------------------------------------------------------------------------------------------
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }

    //-----------------------------------------------------------------------------------------------
    onResize() {
        this.setState({
            listHeight: window.innerHeight - 160
        })
    }


    //-----------------------------------------------------------------------------------------------

    async LoadOtdelData() {

        const response = await fetch('otdel');
        const data = await response.json();
        this.setState({ listOtdel: data });
    }

    //-------------------------------------------------------------------------------------------------------------------
    selectedItem(item) {
        //console.log("selectedItem", item);
        this.setState({ currentItem : item});
        //this.currentItem = item;
    }

    //-------------------------------------------------------------------------------------------------------------------
    CreateName(e) {



        //console.log("currentItem", this.currentItem);
        // console.log("isSubOtdel" , this.refs.isSubOtdel.checked);
        if (this.state.currentItem == null ) {
            if (this.refs.isSubOtdel.checked) {
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
            otdelParentId: this.refs.isSubOtdel.checked ? this.state.currentItem.otdelId : null,
            //otdelParent: this.currentItem
        };

        var xhr = new XMLHttpRequest();
        xhr.open("post", "otdel", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = this.state.listOtdel;
                newItem.otdelId = xhr.response;
                this.refs.isSubOtdel.checked
                    ? this.state.currentItem.subOtdel.splice(0, 0, newItem)
                    : data.splice(0, 0, newItem);
                //data.splice(0, 0, newItem);
                this.setState({ listOtdel: data });
            }
        }.bind(this);
        xhr.send(JSON.stringify(newItem));

    }
    //-------------------------------------------------------------------------------------------------------------------
    EditName(e, item) {
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
                const data = this.state.listOtdel;
                this.setState({ listOtdel: data });
            }
        }.bind(this);
        xhr.send(JSON.stringify(item));

    }

    //-------------------------------------------------------------------------------------------------------------------
    Delete(e) {

        if (this.state.currentItem == null)
            return;

        //console.log("item", this.currentItem);

        var result = window.confirm('Удалить "' + this.state.currentItem.otdelId + ' ' + this.state.currentItem.otdelName + "?");

        if (result) {
            var xhr = new XMLHttpRequest();
            xhr.open("delete", "otdel/" + this.state.currentItem.otdelId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                //console.log("status = " + xhr.status);
                if (xhr.status === 200) {
                    const data = this.state.listOtdel;

                    //const index = this.currentItem.subOtdel.findIndex(e => e.otdelId === this.currentItem.otdelId);
                    //console.log("index", index);

                    this.deleteFromOtdel(data, this.state.currentItem.otdelId, this.state.currentItem.otdelParentId);

                    //this.currentItem.subOtdel.splice(index, 1);
                    //delete data[index];
                    this.setState({ listOtdel: data });
                } else {
                    alert("Ошибка при удалении. Возможно отдел используется.");
                }
            }.bind(this);
            xhr.send();
        }

    }

    //-----------------------------------------------------------------------------------------------
    deleteFromOtdel(list, id, parentId) {

        if (list == null)
            return true;

        for (let i = 0; i < list.length; i++) {
            if (list[i].otdelId == id) {
                list.splice(i, 1);
                return true;
            }

            if (this.deleteFromOtdel(list[i].subOtdel, id, parentId) == true) {
                return true;
            }                

        }

    }


    //-----------------------------------------------------------------------------------------------
    funOtdels(data) {
        const { otdelName, subOtdel, otdelId } = data;

        //console.log("currentOtdel", this.state.currentItem);

        return (

            <li 
                className={otdelId == this.state.currentItem?.otdelId
                    ? "list-group-item active border border-primary rounded-2 border-0 text-light"
                    : "list-group-item"} 
                    id={otdelId} style={{ padding: 0 }} key={otdelId}>

                <button id={otdelId} className={otdelId == this.state.currentItem?.otdelId ? "btn text-start text-light" : "btn text-start"}
                    onClick={() => this.selectedItem(data)}
                    type="button" style={{ margin: 1 }} >{otdelId}&nbsp;&nbsp;&nbsp;{otdelName}</button>
                {
                    subOtdel &&
                    <ul>
                        {subOtdel.map((child, n) => this.funOtdels(child, n))}
                    </ul>
                }
            </li>
        );
    }

    //-------------------------------------------------------------------------------------------------------------------

    render() {

        const buttonStyle = {
            margin: "5px"
        };
        const listStyle = {
            height: this.state.listHeight
        };


        //console.log("render Otdel", this.props.searchText);

        return (
            <div style={{ margin: "6px", marginLeft: "20px" }}>
                <h3>Список отделов</h3>
                <div className="d-flex align-items-center">
                    <button className="btn btn-primary" onClick={(e) => this.EditName(e, this.state.currentItem)} style={buttonStyle}>Изменить</button>
                    <button className="btn btn-secondary" onClick={this.Delete} style={buttonStyle}>Удалить</button>
                    <button className="btn btn-primary" onClick={this.CreateName} style={buttonStyle} >Создать</button>
                    <div className="form-check" style={{ marginLeft: "8px" }}>
                        <input ref="isSubOtdel" id="formCheck-1" className="form-check-input" type="checkbox" />
                        <label className="form-check-label" htmlFor="formCheck-1">В выбранном отделе</label>
                    </div>
                </div>
                <ul className="list-group border rounded overflow-auto" style={listStyle}>
                    {this.state.listOtdel.map((data) => this.funOtdels(data))}
                </ul>
            </div>
            )
    }


}