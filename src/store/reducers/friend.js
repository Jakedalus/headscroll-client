import { GET_FRIEND, SEARCH_FOR_FRIEND } from '../actionTypes';

export default (state = {friend: null}, action) => {
  console.log('reducers/friends:', state, action)
  switch(action.type) {
    case GET_FRIEND:
      return {...state, friend: action.friend};
    // You sent a friend request
    // case ADD_FRIEND:
    //   console.log('reducers/friends, ADD_FRIEND:', state, action);
    //   const friend = Object.assign({}, state.friend);
    //   friend.youRequestedAlready = true;
    //   console.log('new friend:', friend);
    //   console.log('old friend:', state.friend);
    //   return {
    //     friend: {
    //       youRequestedAlready: true,
    //       ...state.friend
    //     },
    //     ...state
    //   };
    // case DELETE_FRIEND:
    //     console.log('reducers/friends, DELETE_FRIEND:', state, action);
    //     return state;
    case SEARCH_FOR_FRIEND:
      return {...state, friend: action.friend.pickedUser}
    default:
        return state;
  }
};