import React, { Component } from 'react';
import { connect} from 'react-redux';
import { editComment, removeComment } from '../store/actions/comments';

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

  render() {

    console.log('CommentItem, props, state:', this.props, this.state);

    let { createdAt, text, updatedAt, user, _id } = this.props.comment;

    return (
      <li key={_id}>

        {
          !this.state.editingComment
          && <p>{user.username}: {text}</p>
        }

        {
          this.state.editingComment
          &&
          <form>
            <input 
              type="text" 
              name="comment" 
              id="comment" 
              value={this.state.comment}
              onChange={this.handleChange}
            />
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
          <div>
            <a 
              onClick={this.onClickEditButton} 
              className="btn btn-success"
            >
              Edit
            </a>
            <a 
              onClick={this.handleRemoveComment} 
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