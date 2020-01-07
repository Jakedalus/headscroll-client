import { apiCall } from '../../services/api';
import { addError } from './errors';
import { GET_FRIEND, ADD_FRIEND, DELETE_FRIEND, SEARCH_FOR_FRIEND } from '../actionTypes';

export const getFriend = friend => ({
  type: GET_FRIEND,
  friend
});

export const fetchFriend = (friend) => {
  console.log('-- actions/friends/ fetchFriend:', friend);
  return (dispatch, getState) => {
    console.log('fetchFriend, getState:', getState());
    return apiCall('get', `/api/users/${friend}/profile`)
      .then(res => dispatch(getFriend(res)))
      .catch(err => dispatch(addError(err)));
  };
};

export const addFriend = friend => {
  console.log('addFriend:', friend);
  return {
  type: ADD_FRIEND,
  friend
  }
};

export const startAddFriend = friend => {
  return (dispatch, getState) => {
    // let { currentUser } = getState();
    // const id = currentUser.user.id;
    console.log('actions/friends/ startAddFriend:', friend);

    return apiCall('post', `/api/users/${friend}/profile`)
      .then(res => {
        console.log('startAddFriend apiCall success:', res);
        return dispatch(addFriend(friend))})
      .catch(err => dispatch(addError(err.message)));
  };
};

export const removeFriend = friend => ({
  type: DELETE_FRIEND,
  friend
});

export const startRemoveFriend = friend => {
  return (dispatch, getState) => {
    // let { currentUser } = getState();
    // const id = currentUser.user.id;
    console.log('actions/friends/ startDeleteFriend:', friend);

    return apiCall('delete', `/api/users/${friend}/profile`)
      .then(res => dispatch(removeFriend(friend)))
      .catch(err => dispatch(addError(err.message)));
  };
}

export const findFriend = friend => ({
  type: SEARCH_FOR_FRIEND,
  friend
});

export const searchForFriend = query => {
  return dispatch => {
    console.log('actions/friends/ searchForFriend:', query);

    return apiCall('post', '/api/search', {query})
      .then(res => dispatch(findFriend(res)))
      .catch(err => dispatch(addError(err.message)));
  }
}