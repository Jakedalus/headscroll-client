import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfileImage from '../images/default-profile-image.png';

const PostItem = ({ date, profileImageUrl, text, username, comments, removePost, isCorrectUser, user_id }) => (
  <div>
    <li className="list-group-item">
      <div className="post-heading">
        <img 
          src={profileImageUrl || DefaultProfileImage}
          alt={username}
          className="timeline-image"
        />
        <Link to={`/users/${user_id}/profile`}>{username}</Link>
        <span className="text-muted">
          <Moment className="text-muted" format="Do MMM YYYY">
            {date}
          </Moment>
        </span>
        {isCorrectUser && <a onClick={removePost} className="btn btn-danger">Delete</a>}
        {!isCorrectUser && <a onClick={removePost} className="btn btn-blank">      </a>}
      </div>
      
      <div className="message-area">
        <p>{text}</p>
        
      </div>
      <div className="post-footer">
        Comments: {comments.length}
      </div>
    </li>
  </div>
);

export default PostItem;