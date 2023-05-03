import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Searchbar({onSubmit}) {
  const [inputValue, setInputValue] = useState('');


  

  const onInputChange = event => {
    const input = event.currentTarget.value;
    setInputValue(input);
  };

    const submitHandler = (event) => {
        event.preventDefault();

        onSubmit(inputValue);
    }

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={submitHandler}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            value={inputValue}
            onChange={onInputChange}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
}

  Searchbar.propTypes = {
    onSubmit: PropTypes.func,
    }