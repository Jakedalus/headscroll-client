import { LOAD_POSTS, GET_POST, ADD_COMMENT, REMOVE_COMMENT, UPDATE_POST, REMOVE_POST } from '../actionTypes';

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
  let newFullComments, newPost, newPostComments;
  switch(action.type) {
    case LOAD_POSTS:
      return [...action.posts];
    case GET_POST:
      return [action.post];
    case REMOVE_POST:
      return state.filter(post => post._id !== action.id);
    case ADD_COMMENT:
      newFullComments = JSON.parse(JSON.stringify(state[0].comments));
      console.log('newFullComments:', newFullComments);
    
      newPost = JSON.parse(JSON.stringify(state[0].post));
      console.log('newPost:', newPost);
    
      newPostComments = JSON.parse(JSON.stringify(state[0].post.comments));
      console.log('newPostComments:', newPostComments);

      newFullComments.push(action.comment);
      newPostComments.push(action.comment._id);
      newPost.comments = newPostComments;
      console.log('new newFullComments, newPostComments, newPost:', newFullComments, newPostComments, newPost);
      return [{
        comments: newFullComments, 
        post: newPost
      }];
    case REMOVE_COMMENT:
        console.log('BEFORE new newFullComments, newPostComments, newPost:', newFullComments, newPostComments, newPost);
      newFullComments = JSON.parse(JSON.stringify(state[0].comments));
      console.log('newFullComments:', newFullComments);
    
      newPost = JSON.parse(JSON.stringify(state[0].post));
      console.log('newPost:', newPost);
    
      newPostComments = JSON.parse(JSON.stringify(state[0].post.comments));
      console.log('newPostComments:', newPostComments);
      // return state;
      newFullComments = newFullComments.filter(comment => comment._id !== action.id);
      newPostComments = newPostComments.filter(comment => comment !== action.id);
      newPost.comments = newPostComments;


      console.log('NEW newFullComments, newPostComments, newPost:', newFullComments, newPostComments, newPost);
      

      return [{
        comments: newFullComments, 
        post: newPost
      }];
    default:
      return state;
  }
};