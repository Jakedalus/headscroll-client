import React from 'react';
import { Link } from 'react-router-dom';
import DefaultProfileImage from '../images/default-profile-image.png';

const FriendCard = ({ id, profileImageUrl, username, email, friends }) => (
  <div className="panel panel-default">
    <div className="panel-body">
      <img 
        src={profileImageUrl || DefaultProfileImage} 
        alt={username}
        className="img-thumbnail"
      />
      <Link to={{pathname: `/users/${id}/profile`, state: 'someState'}}>{username}</Link>
      <p>{email}</p>
      <p>Friends: {friends ? friends.length : 0}</p>
    </div>
  </div>
);

export default FriendCard;