import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './SearchBar.styled.jsx';

import { ImSearch } from 'react-icons/im';

export default class SearchBar extends Component {
  state = {
    query: '',
  };

  inputChangeHandler = e => {
    this.setState(prevState => ({ query: e.target.value.toLowerCase() }));
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      toast.warn('Please, type your request!');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.submitHandler}>
          <SearchFormButton type="submit">
            <ImSearch />
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.inputChangeHandler}
            value={this.state.query}
          ></SearchFormInput>
        </SearchForm>
      </Searchbar>
    );
  }
}
