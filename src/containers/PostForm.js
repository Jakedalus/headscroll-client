import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewPost } from '../store/actions/posts';


class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleNewPost = e => {
    e.preventDefault();
    this.props.postNewPost(this.state.post);
    this.setState({ post: '' });
    this.props.history.push('/');
  }

  render() {
    return (
      <form onSubmit={this.handleNewPost}>
        {this.props.errors.message && (
          <div className="alert alert-danger">
            {this.props.errors.message}
          </div>
        )}
        <input 
          type="text" 
          className="form-control"
          onChange={this.handleChange}
          value={this.state.post}
        />
        <button className="btn btn-success pull-right" type="submit">
          Submit Post
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

export default connect(mapStateToProps, { postNewPost })(PostForm);