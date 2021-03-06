import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_POSTS, GET_POST, UPDATE_POST, REMOVE_POST } from '../actionTypes';

export const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts
});

export const fetchPosts = () => {
  return dispatch => {
    return apiCall('get', '/api/scroll')
      .then(res => {
        // console.log('/actions/posts, fetchPosts, res', res);

        // Add a default empty object {} to the user.profileImage if there is none
        const cleanedRes = res.map(post => {
          console.log('/actions/posts, fetchPosts, post', post);
          if (post.user.profileImage === undefined) {
            return {
              ...post,
              user: {
                profileImage: {},
                ...post.user
              }
            }
          } else {
            return post;
          }
        });

        console.log('/actions/posts, fetchPosts, cleanedRes', cleanedRes);
        
        return dispatch(loadPosts(cleanedRes))
      })
      .catch(err => dispatch(addError(err)));
  };
}

export const get = post => ({
  type: GET_POST,
  post
});

export const getPost = (user_id, post_id) => {
  console.log('getPost', user_id, post_id);
  return dispatch => {
    return apiCall('get', `/api/users/${user_id}/posts/${post_id}`)
      .then(post => dispatch(get(post)))
      .catch(err => dispatch(addError(err.message)));
  }
}

export const edit = (id, updates) => ({
  type: UPDATE_POST,
  id,
  updates
});

export const editPost = (user_id, post_id, updates) => {
  console.log('/actions/posts/, editPost:', user_id, post_id, updates);
  return dispatch => {
    return apiCall('put', `/api/users/${user_id}/posts/${post_id}`, updates)
      .then(() => dispatch(edit(post_id, updates)))
      .catch(err => dispatch(addError(err.message)));
  }
}

export const remove = id => ({
  type: REMOVE_POST,
  id
});

export const removePost = (user_id, post_id) => {
  return dispatch => {
    return apiCall('delete', `/api/users/${user_id}/posts/${post_id}`)
      .then(() => dispatch(remove(post_id)))
      .catch(err => dispatch(addError(err.message)));
  }
}

export const postNewPost = text => {
  return (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;

    return apiCall('post', `/api/users/${id}/posts`, {text})
      .then(res => {})
      .catch(err => dispatch(addError(err.message)));
  };
}


