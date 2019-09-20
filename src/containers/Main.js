import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Homepage from '../components/Homepage';
import ProfilePage from './ProfilePage';
import AuthForm from '../components/AuthForm';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import withAuth from '../hocs/withAuth';
import PostForm from './PostForm';
import { link } from 'fs';

const Main = props => {
  const { authUser, errors, removeError, currentUser } = props;

  console.log('Main, currentUser:', currentUser);

  return (
    <div className="container">
      <Switch>
        <Route exact path='/' render={props => <Homepage currentUser={currentUser} {...props} />} />
        <Route exact path='/users/:id' render={props => <ProfilePage currentUser={currentUser} {...props} />} />
        <Route 
          exact path='/signin'
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                buttonText='Log In'
                heading='Welcome back!'
                {...props}
              />
            );
          }}
        />
        <Route
          exact path='/signup'
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                signUp
                buttonText='Sign Me Up'
                heading='Join Headscroll!'
                {...props}
              />
            );
          }}
        />
        <Route path='/users/:id/posts/new' component={withAuth(PostForm)} />
      </Switch>
    </div>
  );
};

function mapStateToProps(state) {
  console.log('Main, state:', state);
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));