import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
	fetchPosts,
	editPost,
	removePost
} from '../store/actions/posts';
import { getUserData } from '../store/actions/auth';
import PostItem from '../components/PostItem';
import LoadingAnimation from '../components/LoadingAnimation';

class PostList extends Component {
	constructor(props) {
		super(props);

		// going from PostPage back to Scroll fails since "posts" contains the PostPage's post
		// must wait for all posts to load instead
		this.state = {
			postsLoaded : false
		};
	}

	async componentDidMount() {
		await this.props.fetchPosts();
		this.setState({ postsLoaded: true });
	}

	render() {
		console.log('PostList, props', this.props);

		if (this.state.postsLoaded) {
			const {
				posts,
				editPost,
				removePost,
				currentUser
			} = this.props;

			// const timeChange = Date.now() - localStorage.timestamp;
			// const twoMinutesHasPassed = (timeChange / 120000) >= 2;
			// console.log('$$$ PostList, timeChange, twoMinutesHasPassed:', timeChange, twoMinutesHasPassed);
			// console.log('$$$ PostList, currentUser:', currentUser);
			// if (twoMinutesHasPassed && currentUser.isAuthenticated) {
			//   console.log('---> REFRESH USER: twoMinutesHasPassed!! getUserData!!');
			//   this.props.getUserData(currentUser.user.id);
			// }

			let postList = posts.map(p => (
				<PostItem
					key={p._id}
					post_id={p._id}
					user_id={p.user._id}
					post_id={p._id}
					date={p.createdAt}
					text={p.text}
					comments={p.comments}
					username={p.user.username}
					profileImage={p.user.profileImage}
					removePost={removePost.bind(
						this,
						p.user._id,
						p._id
					)}
					editPost={editPost.bind(this, p.user._id, p._id)}
					isCorrectUser={currentUser.user.id === p.user._id}
				/>
			));

			return (
				<div className='post-list'>
					<ReactCSSTransitionGroup
						transitionName='new-element'
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}
					>
						{postList}
					</ReactCSSTransitionGroup>
				</div>
			);
		} else {
			return (
				<div>
					<LoadingAnimation />
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		posts       : state.posts,
		currentUser : state.currentUser
	};
}

export default connect(mapStateToProps, {
	getUserData,
	fetchPosts,
	editPost,
	removePost
})(PostList);
