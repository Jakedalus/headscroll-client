import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_COMMENTS, UPDATE_COMMENT, REMOVE_COMMENT } from '../actionTypes';

export const loadComments = comments => ({
  type: LOAD_COMMENTS,
  comments
});

export const remove = id => ({
  type: REMOVE_COMMENT,
  id
});

// export const removeComment = (user_id, comment_id) => {
//   return dispatch => {
//     return apiCall('delete', `/api/users/${user_id}/comments/${comment_id}`)
//       .then(() => dispatch(remove(comment_id)))
//       .catch(err => dispatch(addError(err)));
//   }
// }

export const fetchComments = (user_id, post_id) => {
  console.log('fetchComments', user_id, post_id);
  return dispatch => {
    return apiCall('get', `/api/users/${user_id}/posts/${post_id}/comments/`)
      .then(res => dispatch(loadComments(res)))
      .catch(err => dispatch(addError(err)));
  };
}

export const commentNewComment = text => {
  return (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;

    return apiCall('comment', `/api/users/${id}/comments`, {text})
      .then(res => {})
      .catch(err => dispatch(addError(err)));
  };
}


