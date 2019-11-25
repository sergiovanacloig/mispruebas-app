import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/star-wars.png';

class Header extends Component {

    render() {
        return(
            <nav className="navbar navbar-dark bg-dark pl-4 pr-4">
                <div className="navbar-brand d-flex flex-row">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
                    <span className="ml-4">{this.props.title}</span>
                </div>
            </nav>
        ); 
    }
}

function selectState(state) {
    return {
        title: state.app.title
    };
}

export default connect(
    selectState
)(Header);