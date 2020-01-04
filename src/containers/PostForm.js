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
    this.props.history.push({
      pathname: "/", 
      state: { prevPath: this.props.history.location.pathname }
    });
  }

  render() {
    console.log('PostForm, props', this.props);
    return (
      <div className="new-post-page">
        <form className="post-form" onSubmit={this.handleNewPost}>
          {this.props.errors.message && (
            <div className="alert alert-danger">
              {this.props.errors.message}
            </div>
          )}
          <label htmlFor="post">Create new post:</label>
          <textarea 
            type="text" 
            id="post"
            name="post"
            rows="5"
            onChange={this.handleChange}
            value={this.state.post}
          />
          <button className="btn btn-primary" type="submit">
            Submit Post
          </button>
        </form>
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { postNewPost })(PostForm);