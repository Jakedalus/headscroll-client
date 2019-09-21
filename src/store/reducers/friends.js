import { GET_FRIEND, DELETE_FRIEND_FROM_STATE } from '../actionTypes';

export default (state = {friend: null}, action) => {
  console.log('reducers/friends:', state, action)
  switch(action.type) {
    case GET_FRIEND:
      return {...state, friend: action.friend};
    case DELETE_FRIEND_FROM_STATE:
        return {...state, friend: null}
    default:
        return state;
  }
};