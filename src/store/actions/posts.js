import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_POSTS, UPDATE_POST, REMOVE_POST } from '../actionTypes';

export const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts
});

export const remove = id => ({
  type: REMOVE_POST,
  id
});

export const removePost = (user_id, post_id) => {
  return dispatch => {
    return apiCall('delete', `/api/users/${user_id}/posts/${post_id}`)
      .then(() => dispatch(remove(post_id)))
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

export const postNewPost = text => {
  return (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;

    return apiCall('post', `/api/users/${id}/posts`, {text})
      .then(res => {})
      .catch(err => dispatch(addError(err)));
  };
}


