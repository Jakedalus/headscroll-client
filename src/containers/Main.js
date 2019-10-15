import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import Homepage from '../components/Homepage';
import ProfilePage from './ProfilePage';
import AuthForm from '../components/AuthForm';
import { authUser, getUserData } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import { fetchPosts } from '../store/actions/posts';
import withAuth from '../hocs/withAuth';
import PostForm from './PostForm';
import PostPage from '../components/PostPage';
import { link } from 'fs';
import SearchPage from './SearchPage';

const Main = props => {

  const { authUser, errors, removeError, currentUser } = props;
  console.log('Main, props:', props);

  
  // console.log('localStorage:', localStorage, jwtDecode(localStorage.jwtToken));

  const unlisten = props.history.listen((location, action) => {
    console.log("!!!! on route change:", props.history, location, action, localStorage.timestamp);
    const timeChange = Date.now() - localStorage.timestamp;
    const twoMinutesHasPassed = (timeChange / 120000) >= 2;
    console.log('!!! Time Change!', localStorage.timestamp, Date.now(), timeChange, twoMinutesHasPassed);

    if (
      currentUser.isAuthenticated 
      && twoMinutesHasPassed
      // && location.pathname === '/' 
      // && location.state.prevPath !== '/'
    ) {
      console.log('!!! Refetching user data!');
      props.getUserData(currentUser.user.id);
    }
  });

  console.log('Main, currentUser:', currentUser);

  return (
    <div className="container">
      <Switch>
        <Route 
          exact path='/' 
          render={props => 
            <Homepage 
              currentUser={currentUser} 
              {...props} 
            />
          } 
        />
        <Route
          exact path='/api/search'
          render={props =>
            <SearchPage {...props}/>
          }
        />
        <Route 
          exact path='/users/:id/profile' 
          render={props => {
            console.log('ProfilePage route, props', props);
            return (
              <ProfilePage currentUser={currentUser} {...props} key={props.match.params.id} />
            );

          }}
        />
        <Route exact path='/users/:id/posts/new' component={withAuth(PostForm)} />
        <Route
          exact path='/users/:id/posts/:post_id'
          render={props => {
            console.log('Post route, props', props);
            return (
              <PostPage {...props} />
            );
          }}
        />
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

export default withRouter(connect(mapStateToProps, { authUser, getUserData, removeError, fetchPosts })(Main));