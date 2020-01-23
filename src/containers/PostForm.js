import React, { Component } from 'react';
import sanitizeHtml from 'sanitize-html';
import { connect } from 'react-redux';
import { postNewPost, fetchPosts } from '../store/actions/posts';
import { addError, removeError } from '../store/actions/errors';


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

  handleNewPost = async e => {
    const cleanText = sanitizeHtml(this.state.post);
    e.preventDefault();
    if (this.state.post === '') {
      this.props.addError('Your post cannot be empty');
    } else {
      await this.props.postNewPost(this.state.post);
      this.setState({ post: '' });
      await this.props.fetchPosts();
      await this.props.removeError();
    }
    
    // this.props.history.push({
    //   pathname: "/", 
    //   state: { prevPath: this.props.history.location.pathname }
    // });
  }

  render() {
    console.log('PostForm, props, state', this.props, this.state);
    return (
      <div className="new-post-page">
        <form className="post-form" onSubmit={this.handleNewPost}>
          

            <label htmlFor="post">Create a new post:</label>
            <textarea 
              type="text" 
              id="post"
              name="post"
              rows="5"
              placeholder={`What's in your head, ${this.props.username}?`}
              onChange={this.handleChange}
              value={this.state.post}
            />

          {this.props.errors.message && (
            <div className="alert alert-danger">
              {this.props.errors.message}
            </div>
          )}

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

export default connect(mapStateToProps, { postNewPost, fetchPosts, addError, removeError })(PostForm);