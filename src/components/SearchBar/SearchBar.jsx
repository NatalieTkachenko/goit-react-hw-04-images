import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './SearchBar.styled.jsx';

import { ImSearch } from 'react-icons/im';

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const inputChangeHandler = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const submitHandler = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.warn('Please, type your request!');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={submitHandler}>
        <SearchFormButton type="submit">
          <ImSearch />
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={inputChangeHandler}
          value={query}
        ></SearchFormInput>
      </SearchForm>
    </Searchbar>
  );
}
