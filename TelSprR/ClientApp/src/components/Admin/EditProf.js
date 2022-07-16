import React, { Component } from 'react';

export class EditProf extends Component {
    static displayName = EditProf.name;

    constructor(props) {
        super(props);

        this.state = {
            listProf: [],
            currentItem: null,
            listHeight: window.innerHeight - 160
        };

        //this.currentItem = null;
        this.EditName = this.EditName.bind(this);
        this.CreateName = this.CreateName.bind(this);
        this.Delete = this.Delete.bind(this);
        this.selectedItem = this.selectedItem.bind(this);
        this.onResize = this.onResize.bind(this);
    }

    //-----------------------------------------------------------------------------------
    componentDidMount() {
        window.addEventListener('resize', this.onResize)
        this.LoadProf();
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
    async LoadProf() {
        const response = await fetch('prof');
        const data = await response.json();
        this.setState({ listProf: data });
    }


    //-------------------------------------------------------------------------------------------------------------------
    CreateName(e) {

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
                const data = this.state.listProf;
                newItem.profId = xhr.response;
                //console.log("xhr.response", xhr.response);
                //console.log("Item", newItem);
                data.splice(0, 0, newItem);
                //console.log("data", data);
                this.setState({ listProf: data });
            }
        }.bind(this);
        xhr.send(JSON.stringify(newItem));

    }


    //-------------------------------------------------------------------------------------------------------------------
    EditName(e, item) {

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
                const data = this.state.listProf;
                this.setState({ listProf: data });
            }
        }.bind(this);
        xhr.send(JSON.stringify(item));

    }


    //-------------------------------------------------------------------------------------------------------------------
    Delete(e) {

        if (this.state.currentItem == null)
            return;

        var result = window.confirm('Удалить "' + this.state.currentItem.profId + ' ' + this.state.currentItem.profName + "?");

        if (result) {
            var xhr = new XMLHttpRequest();
            xhr.open("delete", "prof/" + this.state.currentItem.profId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const data = this.state.listProf;
                    const index = data.findIndex(e => e.profId === this.state.currentItem.profId);
                    data.splice(index, 1);
                    this.setState({ listProf: data });
                } else {
                    alert("Ошибка при удалении. Возможно должность используется.");
                }
            }.bind(this);
            xhr.send();
        }

    }

    //-------------------------------------------------------------------------------------------------------------------
    selectedItem(item) {
        //console.log("selectedItem", item);

        this.setState({ currentItem  : item});
        //this.currentItem = item;
    }


    //-------------------------------------------------------------------------------------------------------------------
    render() {
        const buttonStyle = {
            margin: "5px",
        };

        const listStyle = {
            height: this.state.listHeight
        };

        //console.log("render Prof", this.state.currentItem?.profId);

        return (
            <div style={{ margin: "6px", marginLeft: "20px"} }>
                <h3>Список должностей</h3>
                <div>
                    <button className="btn btn-primary" onClick={(e) => this.EditName(e, this.state.currentItem)} style={buttonStyle}>Изменить</button>
                    <button className="btn btn-secondary" onClick={this.Delete} style={buttonStyle}>Удалить</button>
                    <button className="btn btn-primary" onClick={this.CreateName} style={buttonStyle} >Создать</button>
                </div>
                <ul ref="profession" className="list-group border rounded overflow-auto" style={listStyle }>
                    {
                        this.state.listProf.map((item) =>
                            <li key={item.profId} style={{ padding: 0 }}
                                className={item.profId == this.state.currentItem?.profId
                                    ? "list-group-item active border border-primary rounded-2 border-0 text-light"
                                    : "list-group-item"} >

                                <button id={item.profId} 
                                    className={item.profId == this.state.currentItem?.profId ? "btn text-start text-light" : "btn text-start"}
                                    onClick={() => this.selectedItem(item)}
                                    type="button" style={{ margin: 1 }} >{item.profId}&nbsp;&nbsp;&nbsp;{item.profName}</button>

                            </li>

                )}
                </ul>
            </div>
        )
    }


}