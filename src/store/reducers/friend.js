import { GET_FRIEND, ADD_FRIEND, DELETE_FRIEND, SEARCH_FOR_FRIEND } from '../actionTypes';

export default (state = {friend: null}, action) => {
  console.log('reducers/friends:', state, action)
  let friend =  Object.assign({}, state.friend);
  switch(action.type) {
    case GET_FRIEND:
      return {...state, friend: action.friend};
    // You sent a friend request
    case ADD_FRIEND:
      console.log('reducers/friends, ADD_FRIEND:', state, action);
      if (friend.theyRequestedAlready) {
        friend.youRequestedAlready = false;
        friend.theyRequestedAlready = false;
        friend.isFriend = true;
      } else {
        friend.youRequestedAlready = true;
      }
      console.log('new friend:', friend);
      console.log('old friend:', state.friend);
      return {...state, friend};
    case DELETE_FRIEND:
      console.log('reducers/friends, DELETE_FRIEND:', state, action);
      if (friend.theyRequestedAlready) {
        friend.youRequestedAlready = false;
        friend.theyRequestedAlready = false;
        friend.isFriend = false;
      } else {
        friend.youRequestedAlready = false;
      }
      console.log('new friend:', friend);
      console.log('old friend:', state.friend);
      return {...state, friend};
    case SEARCH_FOR_FRIEND:
      return {...state, friend: action.friend.pickedUser}
    default:
        return state;
  }
};