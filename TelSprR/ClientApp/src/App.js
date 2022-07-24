import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from './components/Main';
import { EditOtdel } from './components/Admin/EditOtdel';
import { EditProf } from './components/Admin/EditProf';
import { NavMenu } from './components/NavMenu';
import  EditForm   from './components/Admin/EditForm';
import Login from './components/Admin/Login';


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
        this.onSetAdmin = this.onSetAdmin.bind(this);
    }


    onSetAdmin() {
        console.log("onSetAdmin");
        this.setState({ adminEdit: true });
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
    render() {

        //console.log("adminEdit", this.state.adminEdit);

        //console.log("App props", this.props);

      return (
          <div>
              <NavMenu adminEdit={this.state.adminEdit} callBackSearch={this.onSetSearch} />
              <Routes >
                  <Route exact path="/" element={
                      <Main adminEdit={this.state.adminEdit} callBackSearch={this.onSetSearch}
                      callBackOtdel={this.clickOtdel} callBackAlpha={this.clickAlpha}
                          searchText={this.state.searchText} curOtdel={this.state.curOtdel} curAlpha={this.state.curAlpha} />
                  } />

                  <Route path='/profession' element={<EditProf searchText={this.state.searchText} />} />
                  <Route path='/otdels' element={<EditOtdel searchText={this.state.searchText} /> } />
                      
                  <Route path='/editForm' element={<EditForm/>} />

                  <Route path="/login" element={<Login callBackAdm={this.onSetAdmin} />} />
              </Routes>

          </div>


    );
  }
}




{/*<Route path='/login' >*/ }
{/*    <Login callBackAdm={this.onSetAdmin} />*/ }
{/*</Route>*/ }

