import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Linkify from 'linkifyjs/react';
import sanitizeHtml from 'sanitize-html';
import DefaultProfileImage from '../images/head.svg';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { convertImageDataToUrl } from '../services/utilities';

class PostItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			post        : this.props.text,
			editingPost : false,
			modalIsOpen : false
		};
	}

	onClickEditButton = () => {
		this.setState({ editingPost: true });
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleEditPost = e => {
		e.preventDefault();
		console.log('handleEditPost', this.state.post);
		this.props.editPost({ text: this.state.post });
		this.setState({ editingPost: false });
	};

	handleDeleteButtonClicked = () => {
		this.setState({ modalIsOpen: true });
	};

	handleCloseDeleteModal = () => {
		this.setState({ modalIsOpen: false });
	};

	render() {
		console.log(
			'PostItem, props, state:',
			this.props,
			this.state
		);

		let {
			date,
			profileImage,
			text,
			username,
			comments,
			removePost,
			isCorrectUser,
			user_id,
			post_id
		} = this.props;

		const avatar =
			profileImage && profileImage.data
				? convertImageDataToUrl(profileImage.data)
				: DefaultProfileImage;

		console.log(
			'PostItem, profileImage, avatar:',
			profileImage,
			avatar
		);

		const cleanText = sanitizeHtml(text);

		console.log('PostItem, cleanText:', cleanText);

		return (
			<div className='post-item'>
				<div className='post-heading'>
					<div className='post-heading__label'>
						<div className='avatar-container'>
							<img
								src={avatar}
								alt={username}
								className='timeline-image'
							/>
						</div>

						<div className='label__info'>
							<Link to={`/users/${user_id}/profile`}>
								{username}
							</Link>
							<Link
								to={`/users/${user_id}/posts/${post_id}`}
							>
								<Moment
									className='date'
									format='Do MMM YYYY'
								>
									{date}
								</Moment>
							</Link>
						</div>
					</div>

					<div className='post-item__button-container'>
						{isCorrectUser && (
							<a
								onClick={this.onClickEditButton}
								className='btn btn-primary'
							>
								Edit
							</a>
						)}
						{isCorrectUser && (
							<a
								onClick={this.handleDeleteButtonClicked}
								className='btn btn-danger'
							>
								Delete
							</a>
						)}
					</div>
				</div>

				<div className='post-item__message-area'>
					{!this.state.editingPost && (
						<Linkify
							tagName='p'
							className='post-item__text'
							// options={options}
						>
							{text}
						</Linkify>
					)}
					{this.state.editingPost && (
						<form className='edit-form'>
							<textarea
								type='text'
								name='post'
								id='post'
								rows='5'
								value={this.state.post}
								onChange={this.handleChange}
							/>
							<div className='edit-form__buttons'>
								<button
									type='button'
									onClick={() =>
										this.setState({ editingPost: false })}
									className='btn btn-secondary'
								>
									Cancel
								</button>
								<button
									type='submit'
									onClick={this.handleEditPost}
									className='btn btn-primary'
								>
									Save
								</button>
							</div>
						</form>
					)}
				</div>

				<div className='post-footer'>
					<Link to={`/users/${user_id}/posts/${post_id}`}>
						<span>{comments.length}</span> Comments
					</Link>
				</div>

				<DeleteConfirmationModal
					modalIsOpen={this.state.modalIsOpen}
					handleCloseDeleteModal={
						this.handleCloseDeleteModal
					}
					removeItem={removePost}
				/>
			</div>
		);
	}
}

export default PostItem;
