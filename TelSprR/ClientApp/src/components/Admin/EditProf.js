import React, { Component } from 'react';

export class EditProf extends Component {
    static displayName = EditProf.name;

    constructor(props) {
        super(props);

        this.state = {
            listProf: [],
        };

        this.seletedItem = null;
        this.EditName = this.EditName.bind(this);
        this.Delete = this.Delete.bind(this);
        this.selectedItem = this.selectedItem.bind(this);
    }

    //-----------------------------------------------------------------------------------
    componentDidMount() {
        this.LoadProf();
    }


    //-----------------------------------------------------------------------------------------------
    async LoadProf() {
        const response = await fetch('prof');
        const data = await response.json();
        this.setState({ listProf: data });
    }


    //-------------------------------------------------------------------------------------------------------------------
    EditName(e, item) {
        console.log("Edit", item);

        let result;
        if (item == null) {
            result = prompt("Наименование новой должности");
        } else {
            result = prompt("Переименовать должность", this.seletedItem.profName);
        }

        if (result == null) {
            return;
        }



        const newItem = {
            profId: item ? item.profId : 0,
            profName: result,
            profOrder: item ? item.profOrder : 500
        };


        console.log("Edit newItem", newItem);


        fetch("prof", {
            method: 'POST',
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        })
            //.then(response => response.json())
            .then((stat) => {
                console.log("response " + stat.status);
            //    getItems();
            //    addNameTextbox.value = '';
            })
            .catch(error => console.error('Unable to add item.', error));

    }


    //-------------------------------------------------------------------------------------------------------------------
    Delete(e) {
        var result = window.confirm('Удалить "' + this.seletedItem.profId + ' ' + this.seletedItem.profName + "?" );

        if (result) {
            var xhr = new XMLHttpRequest();
            xhr.open("delete", "prof/" + this.seletedItem.profId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                //console.log("status = " + xhr.status);
                if (xhr.status === 200) {
                    //const data = { ...this.state.listProf };
                    //delete data[index];
                    //this.setState({ listProf: data });
                    console.log("listProf", this.state.listProf);
                }
            }.bind(this);
            xhr.send();
        }

    }

    //-------------------------------------------------------------------------------------------------------------------
    selectedItem(item) {
        //console.log("selectedItem", item);
        this.seletedItem = item;
    }


    render() {


        //console.log("render Prof", this.props.searchText);

        return (
            <div>
                <h3>Список должностей</h3>
                <ul ref="profession" className="list-group border rounded overflow-auto" style={{ height: 500} }>
                    {
                        this.state.listProf.map((item) =>
                            <li key={item.profId} className="list-group-item">
                                <button id={item.profId} className="btn text-start" onClick={ () => this.selectedItem(item) }
                                    type="button" style={{ margin: 1 }} >{item.profId}&nbsp;&nbsp;&nbsp;{item.profName}</button>

                            </li>

                )}
                </ul>
                <div>
                    <button onClick={(e) => this.EditName(e, null)} >Создать</button>
                    <button onClick={(e) => this.EditName(e, this.seletedItem)}>Изменить</button>
                    <button onClick={this.Delete}>Удалить</button>
                </div>
            </div>
        )
    }


}