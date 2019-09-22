import React from 'react';
import ReactModal from 'react-modal';

if (typeof window !== 'undefined') {
  const root = document.querySelector('#root');
  if (root) {
    ReactModal.setAppElement(root as HTMLElement);
  }
}

const Modal: React.FunctionComponent<ReactModal.Props> = ({ ...restProps }) => {
  return <ReactModal {...restProps} />;
};

Modal.propTypes = {};

export default Modal;
