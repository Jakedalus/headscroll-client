import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, removePost } from '../store/actions/posts';
import { fetchFriend } from '../store/actions/friends';
import PostItem from '../components/PostItem';
import DefaultProfileImage from '../images/default-profile-image.png';

class ProfilePage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('ProfilePage params:', this.props.match.params);
    const {id} = this.props.match.params;
    this.props.fetchPosts();
    this.props.fetchFriend(id);
    
  }

  

  render() {

    console.log('ProfilePage, props', this.props);

    if (this.props.friend) {

      let { username, profileImageUrl, friends, posts } = this.props.friend;

      // if (!currentUser.isAuthenticated) {
      //   return (
      //     <div className="home-hero">
      //       <h1>Welcome to Headscroll!</h1>
      //       <h4>Get scrolling</h4>
      //       <Link to='/signup' className='btn btn-primary'>Sing Up Here</Link>
      //     </div>
      //   );
      // }

      let postList = null;

      if (posts) {
        let userPosts = this.props.allPosts.filter(post => post.user._id === this.props.friend._id);

        console.log('userPosts:', userPosts);

        postList = userPosts.map(p => (
          <PostItem
            key={p._id}
            user_id={p.user._id}
            date={p.createdAt}
            text={p.text}
            comments={p.comments}
            username={p.user.username}
            profileImageUrl={p.user.profileImageUrl}
            removePost={removePost.bind(this, p.user._id, p._id)}
            isCorrectUser={this.props.currentUser === p.user._id}
          />
        ));
      }

      return (
        <div>
          <h2>{username}</h2>
          <img 
            src={profileImageUrl || DefaultProfileImage} 
            alt={username}
            className="img-thumbnail"
          />
          
          <div className="row col-sm-8">
            <div className="offset-1 col sm 10">
              <ul className="list-group" id="posts">
                {postList}
              </ul>
            </div>
          </div>

          {friends}
        </div>
      );
    } else {
      return (
        <div>
          loading profile
        </div>
      )
    }
  }
};

function mapStateToProps(state) {
  console.log('ProfilePage, state', state);
  return {
    allPosts: state.posts,
    currentUser: state.currentUser.user,
    friend: state.friends.friend
  }
}

export default connect(mapStateToProps, { fetchPosts, removePost, fetchFriend })(ProfilePage);