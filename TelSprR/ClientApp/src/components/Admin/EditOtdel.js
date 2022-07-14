import React, { Component } from 'react';

export class EditOtdel extends Component {
    static displayName = EditOtdel.name;
    constructor(props) {
        super(props);

        this.state = { listOtdel: [] };

        this.funOtdels = this.funOtdels.bind(this);

    }

    componentDidMount() {
        this.LoadOtdelData();
    }

    //-----------------------------------------------------------------------------------------------
    funOtdels(data) {
        const { otdelName, subOtdel, otdelId } = data;

        return (

            <li className="list-group-item"
                id={otdelId} style={{ padding: 0 }} key={otdelId}>

                <button id={otdelId} className={otdelId == this.props.currentOtdel ? "btn text-start text-light" : "btn text-start"}
                    type="button" style={{ margin: 1 }} >{otdelId }&nbsp;&nbsp;&nbsp;{otdelName}</button>
                {
                    subOtdel &&
                    <ul>
                        {subOtdel.map((child, n) => this.funOtdels(child, n))}
                    </ul>
                }
            </li>
        );
    }
    //-----------------------------------------------------------------------------------------------

    async LoadOtdelData() {

        const response = await fetch('otdel');
        const data = await response.json();
        this.setState({ listOtdel: data });
    }



    render() {

        //console.log("render Otdel", this.props.searchText);

        return (
            <div>
                <h3>Список отделов</h3>
                <ul className="list-group border rounded overflow-auto" >
                    {this.state.listOtdel.map((data) => this.funOtdels(data))}
                </ul>
            </div>
            )
    }


}