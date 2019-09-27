import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_COMMENTS, UPDATE_COMMENT, REMOVE_COMMENT } from '../actionTypes';

export const loadPosts = comments => ({
  type: LOAD_COMMENTS,
  comments
});

export const remove = id => ({
  type: REMOVE_COMMENT,
  id
});

export const removePost = (user_id, comment_id) => {
  return dispatch => {
    return apiCall('delete', `/api/users/${user_id}/comments/${comment_id}`)
      .then(() => dispatch(remove(comment_id)))
      .catch(err => dispatch(addError(err)));
  }
}

export const fetchPosts = () => {
  return dispatch => {
    return apiCall('get', '/api/scroll')
      .then(res => dispatch(loadPosts(res)))
      .catch(err => dispatch(addError(err)));
  };
}

export const commentNewPost = text => {
  return (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;

    return apiCall('comment', `/api/users/${id}/comments`, {text})
      .then(res => {})
      .catch(err => dispatch(addError(err)));
  };
}


