import React from 'react';
import { Link } from 'react-router-dom';
import Scroll from './Scroll';

const Homepage = ({currentUser}) => {

  if (!currentUser.isAuthenticated) {
    return (
      <div className="home-hero">
        <h1>Welcome to Headscroll!</h1>
        <h4>Get scrolling</h4>
        <Link to='/signup' className='btn btn-primary'>Sing Up Here</Link>
      </div>
    );
  }

  console.log('Homepage, currentUser:', currentUser);

  return (
    <Scroll
      profileImageUrl={currentUser.user.profileImageUrl}
      username={currentUser.user.username}
      friends={currentUser.user.friends}
      id={currentUser.user.id}
    />
  );
};

export default Homepage;