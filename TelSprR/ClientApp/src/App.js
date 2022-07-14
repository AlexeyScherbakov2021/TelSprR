import React, { Component } from 'react';
import { Route } from 'react-router';
import { Main } from './components/Main';
import { EditOtdel } from './components/Admin/EditOtdel';
import { EditProf } from './components/Admin/EditProf';
import { NavMenu } from './components/NavMenu';
import { EditForm } from './components/EditForm';


import './custom.css'
import { Layout } from './components/Layout';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);

        this.state = {
            adminEdit: true,
            searchText: null,
            curAlpha: null,
            curOtdel: -1

        };

        this.onSetSearch = this.onSetSearch.bind(this);
        this.clickOtdel = this.clickOtdel.bind(this);
        this.clickAlpha = this.clickAlpha.bind(this);
    }


    //-----------------------------------------------------------------------------------------------------------
    onSetSearch(searchText) {
        this.setState({
            searchText,
            curOtdel: -1,
            curAlpha: null
        });
    }

    //-----------------------------------------------------------------------------------------------------------
    clickOtdel(e) {
        //this.props.callBackSearch(null);
        this.setState({
            curOtdel: e.target.id,
            curAlpha: null,
            searchText: null
        });
    }

    //-----------------------------------------------------------------------------------------------------------
    clickAlpha(e) {
        //this.props.callBackSearch(null);
        this.setState({
            curAlpha: e.target.id,
            searchText: null
        });
    }


    //-----------------------------------------------------------------------------------------------------------
  render () {
      return (
          <div>
              <NavMenu adminEdit={this.state.adminEdit} callBackSearch={this.onSetSearch} />
              <Route exact path="/">
                  <Main adminEdit={this.state.adminEdit} callBackSearch={this.onSetSearch}
                      callBackOtdel={this.clickOtdel} callBackAlpha={this.clickAlpha}
                      searchText={this.state.searchText} curOtdel={this.state.curOtdel} curAlpha={this.state.curAlpha} />
              </Route>

              <Route path='/profession'>
                  <EditProf searchText={this.state.searchText} />
              </Route>
              <Route path='/otdels'>
                  <EditOtdel searchText={this.state.searchText} />
              </Route>
                  

              <Route path='/editForm' component={EditForm} />
          </div>


    );
  }
}

{/*  <Route path='/counter' component={Counter} />*/ }
{/*  <Route path='/fetch-data' component={FetchData} />*/ }

