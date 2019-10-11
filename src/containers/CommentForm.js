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
      <form onSubmit={this.handleNewComment}>
        {this.props.errors.message && (
          <div className="alert alert-danger">
            {this.props.errors.message}
          </div>
        )}
        <input 
          type="text" 
          className="form-control"
          name="comment"
          onChange={this.handleChange}
          value={this.state.comment}
        />
        <button className="btn btn-success pull-right" type="submit">
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