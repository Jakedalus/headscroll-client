import React from 'react';
import PostList from '../containers/PostList';
import UserAside from './UserAside';

const Scroll = props => {
  console.log('Scroll, props', props);
  return (
    <div className="row">
      <UserAside
        profileImage={props.profileImage}
        username={props.username}
        friends={props.friends}
        requests={props.requests}
        id={props.id}
      />
      <PostList />
    </div>
  );
};

export default Scroll;