import { LOAD_COMMENTS, UPDATE_COMMENT, REMOVE_COMMENT } from '../actionTypes';

export default (state = [], action) => {
  switch(action.type) {
    case LOAD_COMMENTS:
      return [...action.comments];
    case REMOVE_COMMENT:
      return state.filter(comment => comment._id !== action.id);
    default:
      return state;
  }
};