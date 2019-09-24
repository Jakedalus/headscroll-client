import { SET_CURRENT_USER, ADD_FRIEND, DELETE_FRIEND } from '../actionTypes';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {
    username: '',
    email: '',
    id: '',
    friends: [],
    requests: [],
    posts: []
  }
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      };
    // Add friend if you are accepting a request
    case ADD_FRIEND:
      console.log('reducers/currentUser, ADD_FRIEND:', state, action);
      const newFriends = state.user.friends.slice();
      newFriends.push(action.friend);
      return {
        user: {
          friends: newFriends,
          ...state.user
        },
        ...state
      };
    // Reject a request
    // case DELETE_FRIEND:
    //   console.log('reducers/currentUser, DELETE_FRIEND:', state, action);
    //   return state;
    default: 
      return state;
  }
};