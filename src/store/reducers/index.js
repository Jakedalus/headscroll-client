import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import posts from './posts';
import friend from './friend';

const rootReducer = combineReducers({
  currentUser,
  errors,
  posts,
  friend
});

export default rootReducer;