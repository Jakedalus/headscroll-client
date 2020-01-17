import { LOAD_POSTS, GET_POST, ADD_COMMENT, REMOVE_COMMENT, UPDATE_POST, REMOVE_POST, UPDATE_COMMENT } from '../actionTypes';

const DEFAULT_STATE = [{
  comments: [{
    _id: '',
    post: '',
    text: ''
  }],
  post: {
    comments: [],
    text: '',
    user: {
      _id: '',
      username: '',
      profileImage: {}
    },
    _id: '',
    createdAt: '',
    updatedAt: ''
  }
}];

export default (state = DEFAULT_STATE, action) => {
  // console.log('/reducers/posts, state, action:', state, action);
  let newFullComments, newPost, newPostComments;
  switch(action.type) {
    case LOAD_POSTS:
      return [...action.posts];
    case GET_POST:
      return [action.post];
    case UPDATE_POST:
        console.log('/reducers/posts/ UPDATE_POST!');
        return state.map((post) => {
          // console.log('!!! CHECKING POST, post:', post, post._id, action.id);
          // console.log('!!! CHECKING POST, post._id === action.id:', post._id === action.id);
          if(post._id === action.id) {
              // console.log('!!UPDATING POST!!');
              return {
                  ...post,
                  ...action.updates
              };
          } else {
              return post;
          }
      });
    case REMOVE_POST:
      return state.filter(post => post._id !== action.id);
    default:
      return state;
  }
};