import React from 'react';
import PostList from '../containers/PostList';
// import UserAside from './UserAside';

const Scroll = props => {
  return (
    <div className="row">
      {/* <UserAside
        profileImageUrl={props.profileImageUrl}
        username={props.username}
      /> */}
      <PostList />
    </div>
  );
};

export default Scroll;