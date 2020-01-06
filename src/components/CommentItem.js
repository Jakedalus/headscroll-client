import React, { Component } from 'react';
import { connect} from 'react-redux';
import { editComment, removeComment } from '../store/actions/comments';
import DefaultProfileImage from '../images/default-profile-image.png';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { convertImageDataToUrl } from '../services/utilities';

class CommentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingComment: false,
      comment: this.props.comment.text,
      modalIsOpen: false
    };
  }

  onClickEditButton = () => {
    this.setState({ editingComment: true });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleEditComment = e => {
    e.preventDefault();
    console.log('handleEditComment:', this.props.params, this.props.comment._id);
    let { id, post_id } = this.props.params;
    this.props.editComment(id, post_id, this.props.comment._id, {text: this.state.comment});
    this.setState({ editingComment: false });
  };

  handleRemoveComment = () => {
    console.log('handleRemoveComment:', this.props.params, this.props.comment._id);
    let { id, post_id } = this.props.params;
    this.props.removeComment(id, post_id, this.props.comment._id);
  };

  handleDeleteButtonClicked = () => {
    this.setState({ modalIsOpen: true });
  };

  handleCloseDeleteModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {

    console.log('CommentItem, props, state:', this.props, this.state);

    let { createdAt, text, updatedAt, user, _id } = this.props.comment;

    let { profileImage, username } = user;

    const avatar = profileImage && profileImage.data 
        ? convertImageDataToUrl(profileImage.data) 
        : DefaultProfileImage;

    return (
      <div className="comment-item" key={_id}>

        {
          !this.state.editingComment
          && 
          <div className="comment-item__body">
            <img 
              src={avatar}
              alt={username}
              className="timeline-image"
            />
              
            <div className="comment-item__text">
              <span className="comment-item__username">{username}</span>
              {text}
            </div>
            
          </div>
        }



        {
          this.state.editingComment
          &&
          <form className="edit-form">
            <textarea 
              type="text" 
              name="comment" 
              id="comment" 
              value={this.state.comment}
              onChange={this.handleChange}
            />
            <button 
              type="button" 
              onClick={() => this.setState({ editingComment: false })} 
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              onClick={this.handleEditComment} 
              className="btn btn-primary"
            >
              Save
            </button>
          </form>
        }
        

        {
          this.props.currentUser === user._id 
          && 
          <div className="comment-item__buttons">
            <a 
              onClick={this.onClickEditButton} 
              className="btn btn-primary"
            >
              Edit
            </a>
            <a 
              onClick={this.handleDeleteButtonClicked} 
              className="btn btn-danger"
            >
              Delete
            </a>
          </div>
          
        }

        <DeleteConfirmationModal 
          modalIsOpen={this.state.modalIsOpen} 
          handleCloseDeleteModal={this.handleCloseDeleteModal}
          removeItem={this.handleRemoveComment}
        />

      </div>
    )
  }
}

export default connect(null, { editComment, removeComment })(CommentItem);




// {
//   !this.state.editingComment
//   && 
//   <p>{text}</p>
// }
// {
//   this.state.editingComment
//   && 
//   <form>
//     <input 
//       type="text" 
//       name="comment" 
//       id="comment" 
//       value={this.state.comment}
//       onChange={this.handleChange}
//     />
//     <button 
//       type="submit" 
//       onClick={this.handgleEditComment} 
//       className="btn btn-primary"
//     >
//         Save
//     </button>
//   </form>
// }