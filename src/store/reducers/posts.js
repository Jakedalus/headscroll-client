import { LOAD_POSTS, GET_POST, UPDATE_POST, REMOVE_POST } from '../actionTypes';

export default (state = [], action) => {
  console.log('/reducres/posts:', state, action);
  switch(action.type) {
    case LOAD_POSTS:
      return [...action.posts];
    case GET_POST:
      return [action.post];
    case REMOVE_POST:
      return state.filter(post => post._id !== action.id);
    default:
      return state;
  }
};