import React, { Component } from 'react';
import Modal from 'react-modal';

const DeleteConfirmationModal = props => (
  <Modal
    isOpen={props.modalIsOpen}
    // onAfterOpen={afterOpenModal}
    onRequestClose={props.modalIsOpen}
    contentLabel="Delete Confirmation Modal"
    className="modal delete-confirmation-modal"
  > 
    <p>Are you sure you want to delete this post?</p>
    <div className="delete-confirmation-modal__buttons">
      <button 
        className="btn btn-secondary"
        onClick={props.handleCloseDeleteModal}
      >
        Cancel
      </button>
      <button 
        className="btn btn-danger"
        onClick={props.removeItem}
      >
        Delete 
      </button>
    </div>
    
  </Modal>  
);

export default DeleteConfirmationModal;