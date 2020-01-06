import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';

class Navbar extends Component {

  logout = e => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push({pathname: "/", state: { prevPath: this.props.history.location.pathname }});
  }

  render() {
    console.log('Navbar, props', this.props);
    console.log("user:", this.props.currentUser);
    return (
      <nav className="navbar">
        <div className="navbar-header">
          <Link to={{pathname: "/", state: { prevPath: this.props.history.location.pathname }}} className="navbar-brand">
            Headscroll
          </Link>
        </div>


        {
          this.props.currentUser.isAuthenticated
          ? (
            <ul className="navbar__menu">  
              <li>
                <Link to={`/api/search`}>Find Friends</Link>
              </li>
              {/* <li>
                <Link to={`/users/${this.props.currentUser.user.id}/posts/new`}>New Post</Link>
              </li> */}
              <li>
                <a onClick={this.logout}>Logout</a>
              </li>
            </ul>
          )
          : (
            <ul className="navbar__menu">
              <li>
                <Link to='/signup'>Sign Up</Link>
              </li>
              <li>
                <Link to='/signin'>Sign In</Link>
              </li>
            </ul>
          )
        }

      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default withRouter(connect(mapStateToProps, { logout })(Navbar));