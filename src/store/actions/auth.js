import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER, UPLOAD_PROFILE_IMAGE } from '../actionTypes';
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
          const profileImage = user.profileImage || {};
          console.log('authUser, profileImage:', profileImage);
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('timestamp', Date.now());
          localStorage.setItem('profileImage', JSON.stringify(profileImage));
          setAuthorizationToken(token);
          dispatch(setCurrentUser({profileImage, ...user}));
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
          console.log('getUserData, user:', user);
          const profileImage = user.profileImage || {};
          console.log('getUserData, profileImage:', profileImage);
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('timestamp', Date.now());
          localStorage.setItem('profileImage', JSON.stringify(profileImage));
          setAuthorizationToken(token);
          dispatch(setCurrentUser({profileImage, ...user}));
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

export function addAvatar(profileImage) {
  return {
    type: UPLOAD_PROFILE_IMAGE,
    profileImage
  };
};

export function uploadProfileImage(user, profileImage) {
  return (dispatch) => {
    console.log('uploadProfileImage, profileImage:', profileImage);
    return apiCall('post', `/api/users/${user}/profile/avi`, profileImage)
      .then(res => dispatch(addAvatar(res)))
      .catch(err => dispatch(addError(err)));
  };
};