import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, removePost } from '../store/actions/posts';
import { fetchFriend, startAddFriend, startRemoveFriend } from '../store/actions/friends';
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

  componentWillUpdate() {
    const {id} = this.props.match.params;
    this.props.fetchFriend(id);
  }

  handleFriendButton = (isFriend, youRequestedAlready, theyRequestedAlready) => {
    console.log('clicked Friend button!', isFriend);
    console.log(this.props);

    if (isFriend || youRequestedAlready) {
      console.log('Removing friend :(((', this.props.friend._id);
      this.props.startRemoveFriend(this.props.friend._id);
    } else if (!isFriend || theyRequestedAlready) { 
      console.log('Requesting friend!', this.props.friend._id);
      this.props.startAddFriend(this.props.friend._id);
      // this.forceUpdate();
    }
  }
  

  render() {

    console.log('ProfilePage, props', this.props);

    if (this.props.friend) {

      let { 
        username, 
        profileImageUrl, 
        friends, 
        youRequestedAlready, 
        posts, 
        email, 
        _id, 
        isFriend } = this.props.friend;

      let theyRequestedAlready = this.props.currentUser.requests.includes(_id);

      console.log('You sent them a friend request:', youRequestedAlready);
      console.log('They sent you a friend request:', theyRequestedAlready);

      let friendButtonText = '';
      if (isFriend) {
        friendButtonText = 'Remove Friend';
      } else if (youRequestedAlready) {
        friendButtonText = 'Cancel Friend Request';
      } else if (theyRequestedAlready) {
        friendButtonText = 'Accept Friend Request';
      } else {
        friendButtonText = 'Add Friend';
      }

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

      if (isFriend) {
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
        <div className="container-fluid" id="profile-page">
          <div className="row justify-content-md-center">
            <div className="row col-7 profile-header">
              <img 
                src={profileImageUrl || DefaultProfileImage} 
                alt={username}
                className="profile-img"
              />
              <div className="profile-info justify-content-md-start">
                <h2>{username}</h2>
                {isFriend && <div className="">
                  <p className="">{friends.length} {friends.length == 1 ? 'Friend' : 'Friends'}</p>
                  <p>{posts.length} {posts.length == 1 ? 'Post' : 'Posts'}</p>
                </div>}
                <p>{email}</p>
              </div>
              { _id !== this.props.currentUser.id 
                ? <button 
                  className={(isFriend || youRequestedAlready)? "btn btn-danger" : "btn btn-primary"}
                  onClick={() => this.handleFriendButton(isFriend, youRequestedAlready, theyRequestedAlready)}
                >
                  {friendButtonText}
                </button>

                : <div></div>
              }
            </div>
          </div>
          
          <div className="row justify-content-md-center">
            <div className="col-7">
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
          loading profile...
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

export default connect(mapStateToProps, { fetchPosts, removePost, fetchFriend, startAddFriend, startRemoveFriend })(ProfilePage);