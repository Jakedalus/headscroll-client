import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfileImage from '../images/default-profile-image.png';
import { convertImageDataToUrl } from '../services/utilities';

class PostItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      post: this.props.text,
      editingPost: false
    };
  }

  onClickEditButton = () => {
    this.setState({ editingPost: true });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handgleEditPost = e => {
    e.preventDefault();
    console.log('handleEditPost', this.state.post);
    this.props.editPost({text: this.state.post});
    this.setState({ editingPost: false });
  };

  render () {

    console.log('PostItem, props, state:', this.props, this.state);

    let { createdAt, profileImage, text, username, comments, removePost, isCorrectUser, user_id, post_id } = this.props;

    const avatar = profileImage && profileImage.data 
        ? convertImageDataToUrl(profileImage.data) 
        : DefaultProfileImage;

    console.log('PostItem, profileImage, avatar:', profileImage, avatar);

    return (
      <div className="post-item">
        <div className="post-heading">
          <div className="post-heading__label">
            <img 
              src={avatar}
              alt={username}
              className="timeline-image"
            />
            <div className="label__info">
              <Link to={`/users/${user_id}/profile`}>{username}</Link>
              <Link to={`/users/${user_id}/posts/${post_id}`}>
                <Moment className="date" format="Do MMM YYYY">
                  {createdAt}
                </Moment>
              </Link>
            </div>
          </div>
          
          

          <div className="post-item__button-container">
            {isCorrectUser && <a onClick={this.onClickEditButton} className="btn btn-primary">Edit</a>}
            {!isCorrectUser && <a className="btn btn-blank">      </a>}
            {isCorrectUser && <a onClick={removePost} className="btn btn-danger">Delete</a>}
            {!isCorrectUser && <a className="btn btn-blank">      </a>}
          </div>
          


        </div>
        
        <div className="message-area">
          {
            !this.state.editingPost 
            && <p>{text}</p>
          }
          {
            this.state.editingPost 
            && 
            <form>
              <input 
                type="text" 
                name="post" 
                id="post" 
                value={this.state.post}
                onChange={this.handleChange}
              />
              <button 
                type="submit" 
                onClick={this.handgleEditPost} 
                className="btn btn-primary"
              >
                Save
              </button>
            </form>
          }
        </div>

        <div className="post-footer">
          {comments.length} Comments
        </div>
      </div>
    )
  }
}

export default PostItem;