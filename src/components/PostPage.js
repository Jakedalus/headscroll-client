import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect} from 'react-redux';
import { getPost } from '../store/actions/posts';
import { fetchFriend } from '../store/actions/friend';
import { fetchPosts, editPost, removePost } from '../store/actions/posts';
import { fetchComments } from '../store/actions/comments';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { convertImageDataToUrl } from '../services/utilities';
import PostItem from '../components/PostItem';
import CommentForm from '../containers/CommentForm';
import CommentItem from './CommentItem';

class PostPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postLoaded: false
    }
  }

  async componentDidMount() {
    console.log('PostPage, componentDidMount, this.props.match.params:', this.props.match.params);
    let { id: user_id, post_id } = this.props.match.params;
    // await this.props.getPost(user_id, post_id);
    await this.props.fetchPosts();
    await this.props.fetchComments(user_id, post_id);
    await this.props.fetchFriend(user_id);
    
    // await this.props.fetchComments(user_id, post_id);
    this.setState({ postLoaded: true });
  }

  async componentDidUpdate(prevProps, prevState) {
    // console.log('PostPage, componenetdidUpdate, prevProps, prevState:', prevProps, prevState);
    // if (false) {
    //   let { id: user_id, post_id } = this.props.match.params;
    //   await this.props.getPost(user_id, post_id);
    // }
    
    // this.setState({ postLoaded: false });
    // await this.props.getPost(user_id, post_id);
    // this.setState({ postLoaded: true });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // onClickEditCommentButton = () => {
  //   this.setState({ editingComment: true });
  // };

  

  

  render() {

    console.log('PostPage, props, state', this.props, this.state);

    const post = this.props.posts.filter(post => post._id === this.props.match.params.post_id)[0];

    // if the posts are loaded from fetchPosts
    if (post && this.state.postLoaded) {

      const {comments} = this.props;

      console.log('PostPage, post', post);

      // let { post, comments } = this.props.posts[0];

      console.log('PostPage, comments', comments);

      let { createdAt, text, _id: post_id } = post;
      let { username, _id: user_id, profileImage } = this.props.friend.friend;



      let commentList = comments.map(c => (
        <CommentItem 
          key={c._id}
          comment={c} 
          currentUser={this.props.currentUser}
          {...this.props.match}
        />
      ));

      console.log('PostPage, user_id, post_id:', user_id, post_id);

      return (
        <div className="post-page">
          <PostItem
            key={post_id}
            post_id={post_id}
            user_id={user_id}
            date={createdAt}
            text={text}
            comments={comments}
            username={username}
            profileImage={profileImage}
            removePost={this.props.removePost.bind(this, user_id, post_id)}
            editPost={this.props.editPost.bind(this, user_id, post_id)}
            isCorrectUser={this.props.currentUser === user_id}
          />

          <div className="post-page__footer post-footer">
            <CommentForm 
              post={post._id}
            />
            <div className="comment-list">
            <ReactCSSTransitionGroup
              transitionName="new-element"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {commentList}
            </ReactCSSTransitionGroup>

            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          loading post...
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  console.log('*** PostPage, state', state);
  return {
    posts: state.posts,
    comments: state.comments,
    currentUser: state.currentUser.user.id,
    friend: state.friend
  }
}

export default connect(mapStateToProps, { 
  getPost, 
  fetchPosts,
  fetchComments, 
  fetchFriend, 
  editPost, 
  removePost
})(PostPage);