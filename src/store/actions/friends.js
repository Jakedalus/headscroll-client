import { apiCall } from '../../services/api';
import { addError } from './errors';
import { GET_FRIEND, ADD_FRIEND, DELETE_FRIEND } from '../actionTypes';

export const getFriend = friend => ({
  type: GET_FRIEND,
  friend
});

export const fetchFriend = (friend) => {
  console.log('actions/friends/ fetchFriend:', friend);
  return (dispatch, getState) => {
    console.log('fetchFriend, getState:', getState());
    return apiCall('get', `/api/users/${friend}/profile`)
      .then(res => dispatch(getFriend(res)))
      .catch(err => dispatch(addError(err)));
  };
};

export const addFriend = friend => ({
  type: ADD_FRIEND,
  friend
});

export const startAddFriend = friend => {
  return (dispatch, getState) => {
    // let { currentUser } = getState();
    // const id = currentUser.user.id;
    console.log('actions/friends/ startAddFriend:', friend);

    return apiCall('post', `/api/users/${friend}/profile`)
      .then(res => dispatch(addFriend(friend)))
      .catch(err => dispatch(addError(err)));
  };
}