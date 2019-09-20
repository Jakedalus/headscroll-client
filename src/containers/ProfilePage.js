import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, removePost } from '../store/actions/posts';
import PostItem from '../components/PostItem';
import DefaultProfileImage from '../images/default-profile-image.png';

class ProfilePage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  

  render() {

    console.log('ProfilePage, props', this.props);

    let { username, profileImageUrl, posts, friends } = this.props.currentUser;

    // if (!currentUser.isAuthenticated) {
    //   return (
    //     <div className="home-hero">
    //       <h1>Welcome to Headscroll!</h1>
    //       <h4>Get scrolling</h4>
    //       <Link to='/signup' className='btn btn-primary'>Sing Up Here</Link>
    //     </div>
    //   );
    // }

    let userPosts = this.props.allPosts.filter(post => post.user._id === this.props.currentUser.id);

    console.log('userPosts:', userPosts);

    let postList = userPosts.map(p => (
      <PostItem
        key={p._id}
        date={p.createdAt}
        text={p.text}
        comments={p.comments}
        username={p.user.username}
        profileImageUrl={p.user.profileImageUrl}
        removePost={removePost.bind(this, p.user._id, p._id)}
        isCorrectUser={this.props.currentUser === p.user._id}
      />
    ));

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
  }
};

function mapStateToProps(state) {
  console.log('ProfilePage, state', state);
  return {
    allPosts: state.posts,
    currentUser: state.currentUser.user
  }
}

export default connect(mapStateToProps, { fetchPosts, removePost })(ProfilePage);