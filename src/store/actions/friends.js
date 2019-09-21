import { apiCall } from '../../services/api';
import { addError } from './errors';
import { GET_FRIEND, DELETE_FRIEND } from '../actionTypes';

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
}