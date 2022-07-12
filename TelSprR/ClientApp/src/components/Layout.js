import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

    constructor(props) {
        super(props);

        this.state = {
            adminEdit: false
        };
    }

  render () {
      return (
        <div>
            <NavMenu adminEdit={ this.state.adminEdit } />
            {this.props.children}
        </div>
    );
  }
}
