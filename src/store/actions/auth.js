import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errors';

export function setCurrentUser(user) {
  console.log('/actions/auth/ setCurrentUser, user:', user);
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  console.log('logging out!');
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function authUser(type, userData) {
  console.log('authUser, type, userData:', type, userData);
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall('post', `/api/auth/${type}`, userData)
        .then(({token, ...user}) => {
          console.log('authUser, user:', user);
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('timestamp', Date.now());
          localStorage.setItem('profileImage', JSON.stringify(user.profileImage));
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve();
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}

export function getUserData(userData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      console.log('/actions/auth, getUserData, userData:', userData);
      return apiCall('get', `/user/${userData}`)
        .then(({token, ...user}) => {
          console.log('/actions/auth, getUserData, user:', user);
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('timestamp', Date.now());
          localStorage.setItem('profileImage', JSON.stringify(user.profileImage));
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve();
        })
        .catch(err => {
          dispatch(addError(err));
          reject();
        });
    });
  };
}