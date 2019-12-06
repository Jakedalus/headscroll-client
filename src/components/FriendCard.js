import React from 'react';
import { Link } from 'react-router-dom';
import DefaultProfileImage from '../images/default-profile-image.png';
import { convertImageDataToUrl } from '../services/utilities';

const FriendCard = ({ id, profileImage, username, email, friends }) => {

  console.log('FriendCard, id, profileImage, username, email:', id, profileImage, username, email);

  const avatar = profileImage && profileImage.data ? convertImageDataToUrl(profileImage.data) : DefaultProfileImage;

  return (
    <div className="panel panel-default friend-card">
      <div className="panel-body">
        <img 
          src={avatar} 
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
}

export default FriendCard;