import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { ProgressBar } from 'react-loader-spinner';
import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal.jsx';
import { Box } from './App.styled.jsx';

const API_KEY = '30786866-3f5d93462a7f9cfec75d687d6';
const BASE_URL = 'https://pixabay.com/api/?';

export default class App extends Component {
  state = {
    request: '',
    gallery: [],
    page: 1,
    loading: false,
    showModal: false,
    modalContent: {
      src: '',
      alt: '',
    },
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.request !== this.state.request ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      setTimeout(() => {
        fetch(
          `${BASE_URL}q=${this.state.request}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${this.state.page}&per_page=12`
        )
          .then(response => {
            if (!response.ok) {
              throw new Error(response.status);
            }
            return response.json();
          })
          .then(data => {
            console.log(data.hits);
            this.setState(prevState => ({
              gallery: [...prevState.gallery, ...data.hits],
            }));
          })
          .catch(error => {
            console.log('error');
          })
          .finally(() => this.setState({ loading: false }));
      }, 500);
    }
  }

  submittedSearchHandler = query => {
    this.setState({
      request: query,
      gallery: [],
      page: 1,
    });
  };

  loadMoreHandler = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  showModalHandler = event => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));

    if (event.target.nodeName !== 'IMG') {
      return;
    }
    const imgLink = event.currentTarget.src;
    this.modalContentHandler(imgLink);
  };

  modalContentHandler = link => {
    console.log(link);

    const index = this.state.gallery.findIndex(
      item => item.webformatURL === link
    );
    const bigImgModal = this.state.gallery[index].largeImageURL;
    const descrModal = this.state.gallery[index].tags;
    this.setState({
      modalContent: {
        src: bigImgModal,
        alt: descrModal,
      },
    });
  };

  render() {
    return (
      <Box>
        <SearchBar onSubmit={this.submittedSearchHandler} />
        <ToastContainer position="top-right" autoClose={3000} />
        <ImageGallery
          collection={this.state.gallery}
          showModalHandler={this.showModalHandler}
        />
        {this.state.loading && (
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{
              marginRight: 'auto',
              marginLeft: 'auto',
            }}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#3f51b5"
          />
        )}
        {this.state.gallery.length > 0 && (
          <Button onloadMore={this.loadMoreHandler} />
        )}
        {this.state.showModal && (
          <Modal onClose={this.showModalHandler}>
            <img
              src={this.state.modalContent.src}
              alt={this.state.modalContent.alt}
            />
          </Modal>
        )}
      </Box>
    );
  }
}
