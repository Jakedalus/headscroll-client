import { LOAD_POSTS, UPDATE_POST, REMOVE_POST } from '../actionTypes';

export default (state = [], action) => {
  switch(action.type) {
    case LOAD_POSTS:
      return [...action.posts];
    case REMOVE_POST:
      return state.filter(post => post._id !== action.id);
    default:
      return state;
  }
};