import { render } from '@testing-library/react';
import shortid from 'shortid';
import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button';
import { Loader } from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

const PIXABAY_DATA = {
  API_KEY: '34043302-c68d7a8556aecc2a40c20dbe5',
  BASE_URL: 'https://pixabay.com/api/',
  BASE_PARAMETERS: '&image_type=photo&orientation=horizontal&per_page=12',
};

const URL = `${PIXABAY_DATA.BASE_URL}&key=${PIXABAY_DATA.API_KEY}`;

export default function ImageGallery({ initImages, title }) {
  const [images, setImages] = useState(initImages);
  const [page, setPage] = useState(1);
  const [imageToOpen, setImageToOpen] = useState(null);
  const [status, setStatus] = useState('idle');

  const buttonHandler = () => {
    setPage(page + 1);
    setStatus('pending');
  };

  const onModalOpen = event => {
    const image = event.target.alt;
    setImageToOpen(image);
  };

  const onModalClose = event => {
    if (event.target === event.currentTarget) {
      setImageToOpen(null);
    }
  };

  const onEscPush = event => {
    if (event.key === 'Escape') {
      setImageToOpen(null);
    }
  };

  useEffect(() => {
    pageChangeHandler();
  }, [page]);

  async function pageChangeHandler() {
    if (page > 1) {
      try {
        const response = await fetch(
          `${PIXABAY_DATA.BASE_URL}?page=${page}${PIXABAY_DATA.BASE_PARAMETERS}&key=${PIXABAY_DATA.API_KEY}&q=${title}`
        );
        const data = await response.json();
        const newImages = await data.hits;
        setImages([...images, ...newImages]);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
      }
    }
  }
  console.log('render');

  return [
    <ul key={shortid.generate()} className="ImageGallery">
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onModalOpen={onModalOpen}
          />
        );
      })}
    </ul>,
    imageToOpen && (
      <Modal
        key={shortid.generate()}
        imageUrl={imageToOpen}
        onModalClose={onModalClose}
        onEscPush={onEscPush}
      />
    ),
    status === 'pending' && <Loader key={shortid.generate()} />,
    status !== 'pending' && (
      <Button key={shortid.generate()} buttonClickHandler={buttonHandler} />
    ),
  ];
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  title: PropTypes.string,
};
