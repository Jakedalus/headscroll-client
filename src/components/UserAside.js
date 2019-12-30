import React from 'react';
import { Link } from 'react-router-dom';
import DefaultProfileImage from '../images/default-profile-image.png';
import { convertImageDataToUrl } from '../services/utilities';

const UserAside = props => {

  console.log('UserAside, props:', props);

  let { id, profileImage, username, friends, requests } = props;
  
  const avatar = profileImage && profileImage.data 
        ? convertImageDataToUrl(profileImage.data) 
        : DefaultProfileImage;

  console.log('UserAside, profileImage:', profileImage);
  console.log('UserAside, avatar:', avatar);
  
  return (
  <aside className="user-aside">
      <div className="user-aside__body">
        <img 
          src={avatar} 
          alt={username}
          className="img-thumbnail"
        />
        <Link to={{pathname: `/users/${id}/profile`}}>{username}</Link>
        <p>Friends: {friends ? friends.length : 0}</p>
        {
          requests.length > 0 
          &&
          <div>
            <p>Friend Requests:</p>
            <div>
              {requests.map(r => <div><Link to={`/users/${r._id}/profile`}>{r.username}</Link></div>)}
            </div>
          </div>
        }
      </div>
  </aside>
)};

export default UserAside;