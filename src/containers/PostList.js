import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { fetchPosts, editPost, removePost } from '../store/actions/posts';
import PostItem from '../components/PostItem';
import LoadingAnimation from '../components/LoadingAnimation';

class PostList extends Component {

  constructor(props) {
    super(props);

    // going from PostPage back to Scroll fails since "posts" contains the PostPage's post
    // must wait for all posts to load instead
    this.state = {
      postsLoaded: false  
    }
  }

  async componentDidMount() {
    await this.props.fetchPosts();
    this.setState({ postsLoaded: true });
  }

  render() {

    console.log('PostList, props', this.props);

    // debugger;

    if (this.state.postsLoaded) {
      const { posts, editPost, removePost, currentUser } = this.props;

      

      let postList = posts.map(p => (
        <PostItem
          key={p._id}
          post_id={p._id}
          user_id={p.user._id}
          post_id={p._id}
          createdAt={p.createdAt}
          text={p.text}
          comments={p.comments}
          username={p.user.username}
          profileImage={p.user.profileImage}
          removePost={removePost.bind(this, p.user._id, p._id)}
          editPost={editPost.bind(this, p.user._id, p._id)}
          isCorrectUser={currentUser === p.user._id}
        />
      ));

      return (
        <div className="post-list">
          <ReactCSSTransitionGroup
            transitionName="new-element"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {postList}
          </ReactCSSTransitionGroup>
        </div>
      );
    } else {
      return (
        <div>
          <LoadingAnimation />
        </div>
      )
    } 
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    currentUser: state.currentUser.user.id
  }
}

export default connect(mapStateToProps, { fetchPosts, editPost, removePost })(PostList);