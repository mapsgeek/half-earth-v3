import React from 'react';
import Component from './share-modal-component';

const ShareModalContainer = (props) => {
  const { setShareModalOpen } = props;
  const handleClose = () => setShareModalOpen(false);
  return <Component handleClose={handleClose} {...props} />;
};
export default ShareModalContainer;
