import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, removePost } from '../store/actions/posts';
import { fetchFriend, startAddFriend, startRemoveFriend } from '../store/actions/friend';
import PostItem from '../components/PostItem';
import FriendCard from '../components/FriendCard';
import DefaultProfileImage from '../images/default-profile-image.png';

class ProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      postsLoaded: false  
    }
  }

  async componentDidMount() {
    console.log('ProfilePage params:', this.props.match.params);
    const {id} = this.props.match.params;
    await this.props.fetchPosts();
    await this.props.fetchFriend(id);
    this.setState({ postsLoaded: true });
  }

  componentDidpdate(prevProps) {
    console.log('!ProfilePage has updated!', prevProps);
    // this.setState({ postsLoaded: true });
  }

  handleFriendButton = async (isFriend, youRequestedAlready, theyRequestedAlready) => {
    console.log('clicked Friend button!', isFriend);
    console.log(this.props);

    if (isFriend || youRequestedAlready) {
      console.log('-- Unloading posts!');
      await this.setState({ postsLoaded: false });

      console.log('Removing friend :(((', this.props.friend._id);
      this.props.startRemoveFriend(this.props.friend._id);

      console.log('-- Refetching all posts!');
      await this.props.fetchPosts();

      console.log('-- Refetching friend!');
      await this.props.fetchFriend(this.props.friend._id);

      console.log('-- Redloading posts!');
      await this.setState({ postsLoaded: true });

    } else if (!isFriend || theyRequestedAlready) { 
      console.log('-- Unloading posts!');
      await this.setState({ postsLoaded: false });

      console.log('-- Requesting friend!', this.props.friend._id);
      await this.props.startAddFriend(this.props.friend._id);

      console.log('-- Refetching all posts!');
      await this.props.fetchPosts();
      
      console.log('-- Refetching friend!');
      await this.props.fetchFriend(this.props.friend._id);

      console.log('-- Redloading posts!');
      await this.setState({ postsLoaded: true });
    }
  }
  

  render() {

    console.log('ProfilePage, props, state', this.props, this.state);

    if (this.state.postsLoaded) {

      let { 
        username, 
        profileImageUrl, 
        friends, 
        youRequestedAlready, 
        theyRequestedAlready,
        posts, 
        email, 
        _id, 
        isFriend } = this.props.friend;

      // let theyRequestedAlready = this.props.currentUser.requests.includes(_id);

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
      let friendList = null;

      if (isFriend) {
        let userPosts = this.props.allPosts.filter(post => post.user._id === this.props.friend._id);

        console.log('userPosts:', userPosts);

        postList = userPosts.map(p => (
          <PostItem
            key={p._id}
            post_id={p._id}
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
        
        friendList = friends.map(friend => (
          <FriendCard
            // profileImageUrl={props.profileImageUrl}
            username={friend.username}
            email={friend.email}
            id={friend._id}
            key={friend._id}
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
          
          <h4>Posts</h4>
          <div className="row justify-content-md-center">
            <div className="col-7">
              <ul className="list-group" id="posts">
                {postList}
              </ul>
            </div>
          </div>
          
          <h4>Friends</h4>
          <div className="row justify-content-md-center" id="friend-list">
            <div className="col-7">
              <ul className="list-group row" id="friends">
                {friendList}
              </ul>
            </div>
          </div>

          
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
    friend: state.friend.friend
  }
}

export default connect(mapStateToProps, { fetchPosts, removePost, fetchFriend, startAddFriend, startRemoveFriend })(ProfilePage);