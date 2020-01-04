import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserData, uploadProfileImage } from '../store/actions/auth';
import { fetchPosts, editPost, removePost } from '../store/actions/posts';
import { fetchFriend, startAddFriend, startRemoveFriend } from '../store/actions/friend';
import PostItem from '../components/PostItem';
import FriendCard from '../components/FriendCard';
import DefaultProfileImage from '../images/default-profile-image.png';
import { convertImageDataToUrl } from '../services/utilities';

Modal.setAppElement('#root');

class ProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {   
      postsLoaded: false,
      modalIsOpen: false,
      uploadImageError: null
    };

    this.fileInput = React.createRef();
  }

  async componentDidMount() {
    console.log('-- ProfilePage, componentDidMount, params:', this.props.match.params);
    const {id} = this.props.match.params;
    await this.props.fetchFriend(id);
    await this.props.fetchPosts();
    this.setState({ postsLoaded: true });
  }

  componentDidUpdate(prevProps) {
    console.log('!ProfilePage has updated!', prevProps);

    // this.setState({ postsLoaded: true });
  }

  handleFriendButton = async (friendAction, isFriend, youRequestedAlready, theyRequestedAlready) => {
    console.log('clicked Friend button!', isFriend);
    console.log(this.props);

    if (friendAction === 'negative') {
      console.log('-- Unloading posts!');
      await this.setState({ postsLoaded: false });

      console.log('Removing friend :(((', this.props.friend._id);
      this.props.startRemoveFriend(this.props.friend._id);

      console.log('-- Refetching all posts!');
      await this.props.fetchPosts();

      console.log('-- Refetching friend!');
      await this.props.fetchFriend(this.props.friend._id);

      console.log('-- Refetching user');
      await this.props.getUserData(this.props.currentUser.id);

      console.log('-- Redloading posts!');
      await this.setState({ postsLoaded: true });

    } else if (friendAction === 'affirmative') { 
      console.log('-- Unloading posts!');
      await this.setState({ postsLoaded: false });

      console.log('-- Requesting friend!', this.props.friend._id);
      await this.props.startAddFriend(this.props.friend._id);

      console.log('-- Refetching all posts!');
      await this.props.fetchPosts();
      
      console.log('-- Refetching friend!');
      await this.props.fetchFriend(this.props.friend._id);

      console.log('-- Refetching user');
      await this.props.getUserData(this.props.currentUser.id);

      console.log('-- Redloading posts!');
      await this.setState({ postsLoaded: true });
    }
  }
  
  handleClickUploadPhoto = () => {
    console.log('Starting photo upload!');
    this.setState({ modalIsOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleFileSelect = () => {
    console.log('selecting file!!');
    this.setState({ uploadImageError: null });
  };

  handleImageUpload = async () => {
    const file = this.fileInput.current.files[0];
    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        console.log('Sending image to backend! file:', file);
        var formData = new FormData();
        formData.append(`profileImage`, file);
        await this.props.uploadProfileImage(this.props.friend._id, formData);
        await this.props.getUserData(this.props.friend._id);
        await this.props.fetchPosts();
        await this.props.fetchFriend(this.props.friend._id);
        this.setState({ modalIsOpen: false });
      } else {
        console.log('Select a file first!!!');
        this.setState({ uploadImageError: 'Please select a valid image file' });
      }
      
    } else {
      console.log('Select a file first!!!');
      this.setState({ uploadImageError: 'Select a file first' });
    }
  }

  render() {

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    console.log('-- ProfilePage, props, state', this.props, this.state);
    console.log('-- ProfilePage, fileInput', this.fileInput.current);

    if (this.state.postsLoaded) {

      let { 
        username, 
        profileImage, 
        friends, 
        youRequestedAlready, 
        theyRequestedAlready,
        posts, 
        email, 
        _id, 
        isFriend } = this.props.friend;

      const avatar = profileImage && profileImage.data 
        ? convertImageDataToUrl(profileImage.data) 
        : DefaultProfileImage;

      const isYou = _id == this.props.currentUser.id;

      // let theyRequestedAlready = this.props.currentUser.requests.includes(_id);

      console.log('You sent them a friend request:', youRequestedAlready);
      console.log('They sent you a friend request:', theyRequestedAlready);

      let positiveFriendButtonText = '';
      let negativeFriendButtonText = '';
      if (isFriend) {
        negativeFriendButtonText = 'Remove Friend';
      } else if (youRequestedAlready) {
        negativeFriendButtonText = 'Cancel Friend Request';
      } else if (theyRequestedAlready) {
        positiveFriendButtonText = 'Accept Friend Request';
        negativeFriendButtonText = 'Decline Friend Request';
      } else {
        positiveFriendButtonText = 'Add Friend';
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

        console.log('ProfilePage, userPosts:', userPosts);

        postList = userPosts.map(p => (
          <PostItem
            key={p._id}
            post_id={p._id}
            user_id={p.user._id}
            date={p.createdAt}
            text={p.text}
            comments={p.comments}
            username={p.user.username}
            profileImage={p.user.profileImage}
            removePost={this.props.removePost.bind(this, p.user._id, p._id)}
            editPost={this.props.editPost.bind(this, p.user._id, p._id)}
            isCorrectUser={this.props.currentUser.id === p.user._id}
          />
        ));
        
        friendList = friends.map(friend => (
          <FriendCard
            username={friend.username}
            email={friend.email}
            id={friend._id}
            key={friend._id}
            profileImage={friend.profileImage}
          />
        ));
        
      }

      return (
        <div className="profile-page">
          <div className="profile-header">
            <div className="profile-header__avatar">
              <img 
                src={avatar} 
                alt={username}
                className="avatar__profile-img"
              />
              {
                isYou &&
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={this.handleClickUploadPhoto}
                >
                  Upload Profile Image
                </button>
              }
            </div>
            
            <div className="profile-info">
              <h2>{username}</h2>
              {
                isFriend && 
                <div className="profile-info__data">
                  <p>{friends.length} {friends.length == 1 ? 'Friend' : 'Friends'}</p>
                  <p>{posts.length} {posts.length == 1 ? 'Post' : 'Posts'}</p>
                </div>
              }
              <p>{email}</p>
            </div>

            { !isYou // if you aren't on your own ProfilePage
              ? 
              <div className="profile-header__friend-buttons">
                { (!isFriend && !youRequestedAlready) && // show Add/Accept friend button unless you have requested them already or you are already friends
                  <button 
                    className="btn btn-primary"
                    onClick={() => this.handleFriendButton('affirmative', isFriend, youRequestedAlready, theyRequestedAlready)}
                  >
                    {positiveFriendButtonText}
                  </button>
                }
                
                { (isFriend || youRequestedAlready || theyRequestedAlready) && // show Cancel/Remove friend button when friends or if you/they already requested
                  <button 
                  className="btn btn-danger"
                    onClick={() => this.handleFriendButton('negative', isFriend, youRequestedAlready, theyRequestedAlready)}
                  >
                    {negativeFriendButtonText}
                  </button>
                }
              </div>

              : <div></div>
            }
          </div>

          
          <h4>Posts</h4>
          <div className="profile-page__post-list">
            {postList}
          </div>
          
          <h4>Friends</h4>
          <div className="profile-page__friend_list">
            {friendList}
          </div>

          <Modal
            isOpen={this.state.modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={this.handleCloseModal}
            // style={customStyles}
            contentLabel="Choose Profile Image Modal"
            className="upload-image-modal"
          >
            <label htmlFor="profileImage">Choose an Image to Upload</label>
            <input 
              type="file" 
              className="form-control"
              name="profileImage" 
              id="profileImage" 
              accept="image/*"
              ref={this.fileInput}
              onChange={this.handleFileSelect}
              // className="btn btn-secondary"
            />
            <button 
              className="btn btn-primary"
              onClick={this.handleImageUpload}
            >
              Upload Picture
            </button>
            <button 
              className="btn btn-danger"
              onClick={this.handleCloseModal}
            >
              Close
            </button>
            {
              this.state.uploadImageError
              && <p>{this.state.uploadImageError}</p>
            }
          </Modal>
          
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
  console.log('-- ProfilePage, state', state);
  return {
    allPosts: state.posts,
    currentUser: state.currentUser.user,
    friend: state.friend.friend
  }
}

export default connect(mapStateToProps, { 
  fetchPosts, 
  editPost, 
  removePost, 
  fetchFriend, 
  startAddFriend, 
  startRemoveFriend,
  getUserData,
  uploadProfileImage 
})(ProfilePage);