import React from 'react';
import { Link } from 'react-router-dom';
import DefaultProfileImage from '../images/default-profile-image.png';

const FriendCard = ({ id, profileImage, username, email, friends }) => (
  <div className="panel panel-default friend-card">
    <div className="panel-body">
      <img 
        src={profileImage || DefaultProfileImage} 
        alt={username}
        className="img-thumbnail"
      />
      <div className="sub-panel-body">
        <Link to={{pathname: `/users/${id}/profile`, state: 'someState'}}>{username}</Link>
        <p>{email}</p>
      </div>
    </div>
  </div>
);

export default FriendCard;