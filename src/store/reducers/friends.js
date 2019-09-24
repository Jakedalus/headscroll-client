import { GET_FRIEND, ADD_FRIEND, DELETE_FRIEND } from '../actionTypes';

export default (state = {friend: null}, action) => {
  console.log('reducers/friends:', state, action)
  switch(action.type) {
    case GET_FRIEND:
      return {...state, friend: action.friend};
    case ADD_FRIEND:
      console.log('reducers/friends, ADD_FRIEND:', state, action);
      return state;
    case DELETE_FRIEND:
        return state;
    default:
        return state;
  }
};