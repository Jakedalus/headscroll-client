import React from 'react';
import DefaultProfileImage from '../images/default-profile-image.png';

const UserAside = ({ profileImageUrl, username, friends }) => (
  <aside className="col-sm-2">
    <div className="panel panel-default">
      <div className="panel-body">
        <img 
          src={profileImageUrl || DefaultProfileImage} 
          alt={username}
          className="img-thumbnail"
        />
        <p>{username}</p>
        <p>Friends: {friends.length}</p>
      </div>
    </div>
  </aside>
);

export default UserAside;