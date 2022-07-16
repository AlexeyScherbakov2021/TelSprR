import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
      };

      this.searchSubmit = this.searchSubmit.bind(this);

      //this.refSearch = React.createRef();
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

    //-----------------------------------------------------------------------------------
    searchSubmit(e) {
        //console.log("searchSubmit", this.refs.searchText.value);
        this.props.callBackSearch(this.refs.searchText.value);
        this.refs.searchText.value = '';
    }


    //---------------------------------------------------------------------------------------
    render() {

        let admButton = this.props.adminEdit
            ? <ul className="navbar-nav ">
                <NavItem>
                    <NavLink tag={Link} to="/otdels">Отделы</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/profession">Должности</NavLink>
                </NavItem>
            </ul>
            : null;

        //console.log("Nav", this.props.searchText);


    return (
        <Navbar className="navbar-dark navbar-expand-md sticky-top py-2 " style={{ background: "#00406b" }}>
            <div className="container-fluid">
                <img src="NGK.png" style={{ width: 110 }} className="img-thumbnail bg-primary mx-2" />
                <NavbarBrand className="" tag={Link} to="/">Телефонный справочник</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} />
                <Collapse className="navbar-collapse" isOpen={!this.state.collapsed} navbar>
                    {admButton}
                    <input type="search" ref="searchText" placeholder="Поиск..." ></input>
                    <button onClick={this.searchSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" className="bi bi-search">
                            <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"></path>
                            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"></path>
                        </svg>
                    </button>
                </Collapse>
            </div>
        </Navbar>
    );
  }
}
