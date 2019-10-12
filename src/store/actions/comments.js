import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_COMMENTS, ADD_COMMENT, UPDATE_COMMENT, REMOVE_COMMENT } from '../actionTypes';

export const loadComments = comments => ({
  type: LOAD_COMMENTS,
  comments
});

export const remove = id => ({
  type: REMOVE_COMMENT,
  id
});

export const removeComment = (user_id, post_id, comment_id) => {
  console.log('/actions/comments, removeComment', user_id, post_id, comment_id);
  return dispatch => {
    return apiCall('delete', `/api/users/${user_id}/posts/${post_id}/comments/${comment_id}`, {comment_id})
      .then(res => dispatch(remove(comment_id)))
      .catch(err => dispatch(addError(err)));
  }
}

export const fetchComments = (user_id, post_id) => {
  console.log('fetchComments', user_id, post_id);
  return dispatch => {
    return apiCall('get', `/api/users/${user_id}/posts/${post_id}/comments/`)
      .then(res => dispatch(loadComments(res)))
      .catch(err => dispatch(addError(err)));
  };
}

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
});

export const commentNewComment = (post_id, comment) => {
  return (dispatch, getState) => {
    // console.log('/actions/comments, commentNewComment, getState():', getState());
    let { currentUser } = getState();
    const id = currentUser.user.id;
    console.log('/actions/comments, commentNewComment, id, post_id, comment:', id, post_id, comment);

    return apiCall('post', `/api/users/${id}/posts/${post_id}/comments`, {comment})
      .then(res => dispatch(addComment(res)))
      .catch(err => dispatch(addError(err)));
  };
}


