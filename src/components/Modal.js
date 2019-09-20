import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

if (typeof window !== 'undefined') {
  const root = document.querySelector('#root');
  if (root) {
    ReactModal.setAppElement(root);
  }
}

/**
 * @type {React.ComponentType<ReactModal.Props>}
 */
const Modal = ({ ...restProps }) => {
  return <ReactModal {...restProps} />;
};

Modal.propTypes = {};

export default Modal;
