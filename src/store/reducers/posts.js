import { LOAD_POSTS, GET_POST, ADD_COMMENT, UPDATE_POST, REMOVE_POST } from '../actionTypes';

const DEFAULT_STATE = [{
  comments: [],
  post: {
    comments: [],
    text: '',
    user: '',
    _id: '',
    createdAt: '',
    updatedAt: ''
  }
}];

export default (state = DEFAULT_STATE, action) => {
  console.log('/reducers/posts:', state, state[0], action);

  switch(action.type) {
    case LOAD_POSTS:
      return [...action.posts];
    case GET_POST:
      return [action.post];
    case REMOVE_POST:
      return state.filter(post => post._id !== action.id);
    case ADD_COMMENT:
      let newFullComments = JSON.parse(JSON.stringify(state[0].comments));
      console.log('newFullComments:', newFullComments);
    
      let newPost = JSON.parse(JSON.stringify(state[0].post));
      console.log('newPost:', newPost);
    
      let newPostComments = JSON.parse(JSON.stringify(state[0].post.comments));
      console.log('newPostComments:', newPostComments);

      newFullComments.push(action.comment);
      newPostComments.push(action.comment.id);
      newPost.comments = newPostComments;
      return [{
        comments: newFullComments, 
        post: newPost
      }];
      return state;
    default:
      return state;
  }
};