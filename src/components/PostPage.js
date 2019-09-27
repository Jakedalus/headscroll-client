import React, { Component } from 'react';
import { connect} from 'react-redux';
import { fetchPosts, getPost } from '../store/actions/posts';
import { fetchComments } from '../store/actions/comments';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfileImage from '../images/default-profile-image.png';

class PostPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('PostPage, this.props.match.params:', this.props.match.params);
    let { id: user_id, post_id } = this.props.match.params;
    this.props.getPost(user_id, post_id);

  }

  render() {

    console.log('PostPage, props', this.props);

    // if the posts are loaded from fetchPosts
    if (this.props.posts.length > 0) {

      

      // let post = this.props.posts.filter(post => post._id === this.props.match.params.post_id)[0];

      console.log('PostPage, post', this.props.posts);


      let { date, profileImageUrl, text, user, comments, removePost, isCorrectUser, _id: post_id } = this.props.posts[0];
      let { username, _id: user_id, } = user;



      let commentList = comments.map(c => (
        <li>
          {c}
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
            {/* {comments.length} Comments */}
            {commentList}
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
    currentUser: state.currentUser.user.id
  }
}

export default connect(mapStateToProps, { getPost, fetchComments })(PostPage);