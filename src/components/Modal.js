import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

/**
 * @type {React.ComponentType<ReactModal.Props>}
 */
const Modal = ({ ...restProps }) => {
  return <ReactModal {...restProps} />;
};

Modal.propTypes = {};

export default Modal;
