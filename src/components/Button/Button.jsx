import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ buttonClickHandler }) {
  
      return <button type="button" onClick={buttonClickHandler} className='Button' >Load more</button>;
}

  Button.propTypes = {
    buttonClickHandler: PropTypes.func,
  }