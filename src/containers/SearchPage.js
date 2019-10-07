import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchForFriend } from '../store/actions/friend';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for user:', this.state.query);
    this.props.searchForFriend(this.state.query);
    this.setState({ query: '' });
  }

  render() {

    console.log('SearchPage, props', this.props);

    return (
      <form onSubmit={this.handleSearch}>
        <label htmlFor="query">Find friend:</label>
        <input 
          type="text" 
          name="query" 
          id="query"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <button type="submit">Search</button>
        {this.props.errors && this.props.errors.message}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { searchForFriend })(SearchPage);