import React, { Component } from 'react';

export class EditProf extends Component {
    static displayName = EditProf.name;

    constructor(props) {
        super(props);

        this.state = {
            listProf: [],
            selectProf: 140
        };
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



    render() {


        //console.log("render Prof", this.props.searchText);

        return (
            <div>
                <h3>Список должностей</h3>
                <ul ref="profession" className="list-group border rounded overflow-auto">
                    {
                        this.state.listProf.map((item) =>
                            <li key={item.profId} className="list-group-item">
                                <button id={item.profId} className="btn text-start"
                                    type="button" style={{ margin: 1 }} >{item.profId}&nbsp;&nbsp;&nbsp;{item.profName}</button>

                            </li>

                )}
                </ul>
            </div>
        )
    }


}