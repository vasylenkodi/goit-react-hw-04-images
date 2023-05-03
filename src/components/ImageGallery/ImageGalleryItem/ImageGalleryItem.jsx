import React from 'react';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ image, onModalOpen }) {

  return (
    <li className="ImageGalleryItem" onClick={onModalOpen}>
      <img
        src={image.webformatURL}
        alt={image.largeImageURL}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
  onModalOpen: PropTypes.func,
};
