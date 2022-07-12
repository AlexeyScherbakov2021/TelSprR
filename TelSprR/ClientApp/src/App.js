import React, { Component } from 'react';
import { Route } from 'react-router';
import { Main } from './components/Main';
import { EditOtdel } from './components/Admin/EditOtdel';
import { EditProf } from './components/Admin/EditProf';
import { NavMenu } from './components/NavMenu';
import { EditForm } from './components/EditForm';


import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);

        this.state = {
            adminEdit: true,
            searchText: null
        };

        this.onSetSearch = this.onSetSearch.bind(this);
    }


    onSetSearch(searchText) {
        this.setState({ searchText });
    }


  render () {
      return (
          <div>
              <NavMenu adminEdit={this.state.adminEdit} callBackSearch={this.onSetSearch} searchText={this.state.searchText} />
              <Route exact path="/">
                  <Main adminEdit={this.state.adminEdit} searchText={this.state.searchText} callBackSearch={this.onSetSearch} />
              </Route>

              <Route exact path='/otdel' component={EditOtdel} />
              <Route exact path='/prof' component={EditProf} />
              <Route exact path='/editForm' component={EditForm} />
          </div>


    //  <Layout>
    //    <Route exact path='/:search' component={Main} />
    //    <Route exact path='/' component={Main} />
    //  </Layout>
    );
  }
}

{/*  <Route path='/counter' component={Counter} />*/ }
{/*  <Route path='/fetch-data' component={FetchData} />*/ }

