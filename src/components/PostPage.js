import React, { Component } from 'react';
import { connect} from 'react-redux';
import { getPost } from '../store/actions/posts';
import { fetchFriend } from '../store/actions/friend';
import { fetchComments, removeComment } from '../store/actions/comments';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfileImage from '../images/default-profile-image.png';
import CommentForm from '../containers/CommentForm';

class PostPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postLoaded: false  
    }
  }

  async componentDidMount() {
    console.log('PostPage, this.props.match.params:', this.props.match.params);
    let { id: user_id, post_id } = this.props.match.params;
    await this.props.getPost(user_id, post_id);
    await this.props.fetchFriend(user_id);
    
    // await this.props.fetchComments(user_id, post_id);
    this.setState({ postLoaded: true });
  }

  handleRemoveComment = (comment_id) => {
    console.log('handleRemoveComment:', this.props.match, comment_id);
    let { id, post_id } = this.props.match.params;
    this.props.removeComment(id, post_id, comment_id);
  }

  render() {

    console.log('PostPage, props', this.props);

    // if the posts are loaded from fetchPosts
    if (this.props.posts.length === 1 && this.state.postLoaded) {

      

      // let post = this.props.posts.filter(post => post._id === this.props.match.params.post_id)[0];

      console.log('PostPage, postData', this.props.posts);

      let { post, comments } = this.props.posts[0];

      console.log('PostPage, post', post);
      console.log('PostPage, comments', comments);

      let { date, profileImageUrl, text, removePost, removeComment, isCorrectUser, _id: post_id } = post;
      let { username, _id: user_id } = this.props.friend.friend;



      let commentList = comments.map(c => (
        <li key={c._id}>
          {c.user.username}:  
          {c.text}
          {
            this.props.currentUser === c.user._id 
            && 
            <a 
              onClick={() => this.handleRemoveComment(c._id)} 
              className="btn btn-danger"
            >
              Delete
            </a>
          }
        </li>
      )); 

      return (
        <div>
          <div className="post-heading">
            <img 
              src={profileImageUrl || DefaultProfileImage}
              alt={username}
              className="timeline-image"
            />
            <Link to={`/users/${user_id}/profile`}>{username}</Link>
            <span className="text-muted">
            <Link to={`/users/${user_id}/posts/${post_id}`}>
              <Moment className="text-muted" format="Do MMM YYYY">
                {date}
              </Moment>
            </Link>
            </span>
            {isCorrectUser && <a onClick={removePost} className="btn btn-danger">Delete</a>}
            {!isCorrectUser && <a onClick={removePost} className="btn btn-blank">      </a>}
          </div>
          
          <div className="message-area">
            <p>{text}</p>
            
          </div>
          <div className="post-footer">
            <CommentForm 
              post={post._id}
            />
            <ul>
              {commentList}
            </ul>
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
  console.log('PostPage, state', state);
  return {
    posts: state.posts,
    comments: state.comments,
    currentUser: state.currentUser.user.id,
    friend: state.friend
  }
}

export default connect(mapStateToProps, { getPost, fetchComments, removeComment, fetchFriend })(PostPage);