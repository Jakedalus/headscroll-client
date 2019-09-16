import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';

class Navbar extends Component {

  logout = e => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    console.log("user:", this.props.currentUser);
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              Home
            </Link>
          </div>

          {
            this.props.currentUser.isAuthenticated
            ? (
              <ul className="nav navbar-nav navbar-right">  
                see messages or sign out
              </ul>
            )
            : (
              <ul className="nav navbar-nav navbar-right">
                sign in or up
              </ul>
            )
          }

        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, { logout })(Navbar);