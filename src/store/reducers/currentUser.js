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
      console.log('reducers/currentUser, SET_CURRENT_USER, state, action:', state, action);

      // const urlCreator = window.URL || window.webkitURL;
      // console.log('reducers/currentUser, URL:', urlCreator);

      // const blob = new Blob(  action.type.profileImage.data , { type: "image/jpeg" } );
      // const imgUrl = urlCreator.createObjectURL(blob);

      // console.log('reducers/currentUser, imgUrl:', imgUrl);

      return {
        isAuthenticated: !!Object.keys(action.user).length,
        user: { ...state.user, ...action.user }
      };
    // Add friend if you are accepting a request
    case ADD_FRIEND:
      console.log('reducers/currentUser, ADD_FRIEND:', state, action);
      const newFriends = state.user.friends.slice();
      const user = Object.assign({}, state.user);
      newFriends.push(action.friend);
      console.log('reducers/currentUser, newFriends:', newFriends);
      user.friends = newFriends;
      console.log('reducers/currentUser, new user obj:', user);
      
      return { ...state, user };
    // Reject a request
    // case DELETE_FRIEND:
    //   console.log('reducers/currentUser, DELETE_FRIEND:', state, action);
    //   return state;
    default: 
      return state;
  }
};