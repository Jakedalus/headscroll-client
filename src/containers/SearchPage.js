import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchForFriend, getFriend } from '../store/actions/friend';
import FriendCard from '../components/FriendCard';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      friendLoaded: false  
    }
  }

  async componentDidMount() {
    this.props.removeError();
    await this.props.getFriend({});
    this.setState({ friendLoaded: true });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSearch = async (e) => {
    e.preventDefault();
    this.props.removeError();
    await this.props.getFriend({});
    console.log('Searching for user:', this.state.query);
    this.props.searchForFriend(this.state.query);
    this.setState({ query: '' });
  }

  render() {

    console.log('SearchPage, props', this.props);

    if (this.state.friendLoaded) {
      return (
        <div className="container-fluid" id="search-page">

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
              
            </form>

            {this.props.errors && this.props.errors.message}

            {
              !(Object.entries(this.props.friend).length === 0 && this.props.friend.constructor === Object)
              && 

              <FriendCard 
                id={this.props.friend._id}
                username={this.props.friend.username}
                email={this.props.friend.email}
              />
            }

        </div>
      );
    } else {
      return (
        <div>loading page...</div>
      );
    }
  }
}

function mapStateToProps(state) {
  console.log('SearchPage, state', state);

  return {
    errors: state.errors,
    friend: state.friend.friend
  };
}

export default connect(mapStateToProps, { searchForFriend, getFriend })(SearchPage);