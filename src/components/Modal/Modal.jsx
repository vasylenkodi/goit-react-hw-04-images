import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Modal({ imageUrl, onModalClose, onEscPush }) {
  useEffect(() => {
    window.addEventListener('keydown', onEscPush);
    return () => {
      window.removeEventListener('keydown', onEscPush);
    };
  }, []);

  return (
    <div className="Overlay" onClick={onModalClose}>
      <div className="Modal">
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  imageUrl: PropTypes.string,
  onModalClose: PropTypes.func,
  onEscPush: PropTypes.func,
};
