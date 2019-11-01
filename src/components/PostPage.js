import React, { Component } from 'react';
import { connect} from 'react-redux';
import { getPost } from '../store/actions/posts';
import { fetchFriend } from '../store/actions/friend';
import { fetchComments } from '../store/actions/comments';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfileImage from '../images/default-profile-image.png';
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
    console.log('PostPage, this.props.match.params:', this.props.match.params);
    let { id: user_id, post_id } = this.props.match.params;
    await this.props.getPost(user_id, post_id);
    await this.props.fetchFriend(user_id);
    
    // await this.props.fetchComments(user_id, post_id);
    this.setState({ postLoaded: true });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClickEditButton = () => {
    this.setState({ editingComment: true });
  };

  

  

  render() {

    console.log('PostPage, props, state', this.props, this.state);

    // if the posts are loaded from fetchPosts
    if (this.props.posts.length === 1 && this.state.postLoaded) {

      

      // let post = this.props.posts.filter(post => post._id === this.props.match.params.post_id)[0];

      console.log('PostPage, postData', this.props.posts);

      let { post, comments } = this.props.posts[0];

      console.log('PostPage, post', post);
      console.log('PostPage, comments', comments);

      let { createdAt, profileImageUrl, text, removePost, removeComment, isCorrectUser, _id: post_id } = post;
      let { username, _id: user_id } = this.props.friend.friend;

      let commentList = comments.map(c => (
        <CommentItem 
          comment={c} 
          currentUser={this.props.currentUser}
          {...this.props.match}
        />
      ));

      // let commentList = comments.map(c => (
        // <li key={c._id}>
        //   {c.user.username}: 

        //   {c.text}


        //   {
        //     this.props.currentUser === c.user._id 
        //     && 
        //     <div>
        //       <a 
        //         onClick={this.onClickEditButton} 
        //         className="btn btn-success"
        //       >
        //         Edit
        //       </a>
        //       <a 
        //         onClick={() => this.handleRemoveComment(c._id)} 
        //         className="btn btn-danger"
        //       >
        //         Delete
        //       </a>
        //     </div>
            
        //   }
        // </li>
      // )); 

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
                {createdAt}
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

export default connect(mapStateToProps, { getPost, fetchComments, fetchFriend })(PostPage);