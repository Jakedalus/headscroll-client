import React from 'react';
import { Link } from 'react-router-dom';
import Scroll from './Scroll';

const Homepage = ({currentUser}) => {

  if (!currentUser.isAuthenticated) {
    return (
      <div className="home-hero">
        <h1>Welcome to Headscroll!</h1>
        <h4>Get scrolling</h4>
        <Link to='/signup' className='btn btn-primary'>Sign Up Here</Link>
      </div>
    );
  }

  console.log('Homepage, currentUser:', currentUser);

  return (
    <Scroll
      profileImage={currentUser.user.profileImage}
      username={currentUser.user.username}
      friends={currentUser.user.friends}
      requests={currentUser.user.requests}
      id={currentUser.user.id}
    />
  );
};

export default Homepage;