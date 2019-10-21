import React, { Component } from 'react';
import { connect} from 'react-redux';
import { fetchPosts, editPost, removePost } from '../store/actions/posts';
import PostItem from '../components/PostItem';

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

    if (this.state.postsLoaded) {
      const { posts, editPost, removePost, currentUser } = this.props;

      console.log('PostList, props', this.props);

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
          profileImageUrl={p.user.profileImageUrl}
          removePost={removePost.bind(this, p.user._id, p._id)}
          editPost={editPost.bind(this, p.user._id, p._id)}
          isCorrectUser={currentUser === p.user._id}
        />
      ));

      return (
        <div className="row col-sm-8">
          <div className="offset-1 col sm 10">
            <ul className="list-group" id="posts">
              {postList}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          loading scroll...
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