import React from 'react';
import PostList from '../containers/PostList';
import PostForm from '../containers/PostForm';

const Scroll = props => {
  console.log('Scroll, props', props);
  return (
    <div className="scroll">
      <PostForm username={props.username} />
      <PostList />
    </div>
  );
};

export default Scroll;