import React from 'react';
import { Link } from 'react-router-dom';
import DefaultProfileImage from '../images/default-profile-image.png';

const UserAside = ({ id, profileImageUrl, username, friends }) => (
  <aside className="col-sm-2">
    <div className="panel panel-default">
      <div className="panel-body">
        <img 
          src={profileImageUrl || DefaultProfileImage} 
          alt={username}
          className="img-thumbnail"
        />
        <Link to={{pathname: `/users/${id}/profile`, state: 'someState'}}>{username}</Link>
        <p>Friends: {friends ? friends.length : 0}</p>
      </div>
    </div>
  </aside>
);

export default UserAside;