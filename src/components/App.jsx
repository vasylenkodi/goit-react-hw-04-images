import React from 'react';
import { useState } from 'react';
import shortid from 'shortid';
import api from 'api/api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import '../styles.css';

const PIXABAY_DATA = {
  API_KEY: '34043302-c68d7a8556aecc2a40c20dbe5',
  BASE_URL: 'https://pixabay.com/api/',
  BASE_PARAMETERS: '&image_type=photo&orientation=horizontal&per_page=12',
};

const URL = `${PIXABAY_DATA.BASE_URL}&key=${PIXABAY_DATA.API_KEY}`;

export default function App() {
  const [images, setImages] = useState(null);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('idle');

  const onSubmitHandler = async title => {
    try {
      setStatus('pending');
      setTitle(title);
      const response = await fetch(
        `${PIXABAY_DATA.BASE_URL}?page=1${PIXABAY_DATA.BASE_PARAMETERS}&key=${PIXABAY_DATA.API_KEY}&q=${title}`
      );
      const data = await response.json();
      const images = await data.hits;
      console.log('1');
      setImages(images);
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
    }
  };

    return [
      <Searchbar key={shortid.generate()} onSubmit={onSubmitHandler} />,
      images && (
        <ImageGallery
          key={shortid.generate()}
          initImages={images}
          title={title}
        />
      ),
      status === 'pending' && <Loader key={shortid.generate()} />,
    ];
}
