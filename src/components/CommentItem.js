import React, { Component } from 'react';
import { connect} from 'react-redux';
import { removeComment } from '../store/actions/comments';

class CommentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingComment: false,
      comment: this.props.comment.text
    };
  }

  onClickEditButton = () => {
    this.setState({ editingComment: true });
  };

  handleEditComment = e => {
    e.preventDefault();
    // this.props.editComment({text: this.state.comment});
    this.setState({ editingComment: false });
  };

  handleRemoveComment = (comment_id) => {
    console.log('handleRemoveComment:', this.props.params, comment_id);
    let { id, post_id } = this.props.params;
    this.props.removeComment(id, post_id, comment_id);
  };

  render() {

    console.log('CommentItem, props, state:', this.props, this.state);

    let { createdAt, text, updatedAt, user, _id } = this.props.comment;

    return (
      <li key={_id}>
        {user.username}: {text}

        {
          this.props.currentUser === user._id 
          && 
          <div>
            <a 
              onClick={this.onClickEditButton} 
              className="btn btn-success"
            >
              Edit
            </a>
            <a 
              onClick={() => this.handleRemoveComment(_id)} 
              className="btn btn-danger"
            >
              Delete
            </a>
          </div>
          
        }
      </li>
    )
  }
}

export default connect(null, { removeComment })(CommentItem);




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