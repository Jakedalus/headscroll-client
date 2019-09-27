import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import posts from './posts';
import comments from './comments';
import friend from './friend';

const rootReducer = combineReducers({
  currentUser,
  errors,
  posts,
  comments,
  friend
});

export default rootReducer;