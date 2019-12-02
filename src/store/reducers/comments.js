import { LOAD_COMMENTS, ADD_COMMENT, UPDATE_COMMENT, REMOVE_COMMENT } from '../actionTypes';

export default (state = [], action) => {
  console.log('/reducers/comments, state, action:', state, action);
  switch(action.type) {
    case LOAD_COMMENTS:
      return [...action.comments];
    case ADD_COMMENT:
      return [...state, action.comment];
    case UPDATE_COMMENT:
      console.log('/reducers/posts/ UPDATE_COMMENT!');
      return state.map((comment) => {
        if(comment._id === action.id) {
            return {
                ...comment,
                ...action.updates
            };
        } else {
            return comment;
        }
      });
    case REMOVE_COMMENT:
      return state.filter(comment => comment._id !== action.id);
    default:
      return state;
  }
};