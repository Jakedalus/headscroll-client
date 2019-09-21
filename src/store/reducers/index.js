import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import posts from './posts';
import friends from './friends';

const rootReducer = combineReducers({
  currentUser,
  errors,
  posts,
  friends
});

export default rootReducer;