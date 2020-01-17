import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';

export default (state = {message: null}, action) => {
  // console.log('/reducers/errors', state, action);
  switch(action.type) {
    case ADD_ERROR:
      return {...state, message: action.error.message};
    case REMOVE_ERROR:
        return {...state, message: null}
    default:
        return state;
  }
};