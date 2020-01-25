import React, { Component } from 'react';
import { connect } from 'react-redux';
import { commentNewComment } from '../store/actions/comments';


class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleNewComment = e => {
    e.preventDefault();

    this.props.commentNewComment(this.props.post, this.state.comment);
    this.setState({ comment: '' });

  }

  render() {
    console.log('CommentForm, props', this.props);
    return (
      <form className="comment-form" onSubmit={this.handleNewComment}>
        {this.props.errors.message && (
          <div className="alert alert-danger">
            {this.props.errors.message}
          </div>
        )}
        <textarea 
          className="comment-form__input"
          name="comment"
          onChange={this.handleChange}
          value={this.state.comment}
          rows="4"
          placeholder="Add a comment"
        />
        <button className="btn btn-primary" type="submit">
          Submit Comment
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { commentNewComment })(CommentForm);