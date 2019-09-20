import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfileImage from '../images/default-profile-image.png';

const PostItem = ({ date, profileImageUrl, text, username, removePost, isCorrectUser }) => (
  <div>
    <li className="list-group-item">
      <img 
        src={profileImageUrl || DefaultProfileImage}
        alt={username}
        className="timeline-image"
      />
    
      <div className="message-area">
        <Link to='/'>{username} &nbsp;</Link>
        <span className="text-muted">
          <Moment className="text-muted" format="Do MMM YYYY">
            {date}
          </Moment>
        </span>
        <p>{text}</p>
        {isCorrectUser && <a onClick={removePost} className="btn btn-danger">Delete</a>}
      </div>
    </li>
  </div>
);

export default PostItem;