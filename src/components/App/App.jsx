import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { ProgressBar } from 'react-loader-spinner';
import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal.jsx';
import { Box } from './App.styled.jsx';

const API_KEY = '30786866-3f5d93462a7f9cfec75d687d6';
const BASE_URL = 'https://pixabay.com/api/?';

export default function App() {
  const [request, setRequest] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    src: '',
    alt: '',
  });
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);

  useEffect(() => {
    if (request === '') {
      return;
    }
    setLoading(true);

    setTimeout(() => {
      fetch(
        `${BASE_URL}q=${request}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
      )
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          console.log(data.hits);
          console.log(page);
          setGallery(prevGallery => [...prevGallery, ...data.hits]);
          setShowLoadMoreButton(page < Math.ceil(data.totalHits / 12));
        })
        .catch(error => {
          console.log('error');
        })
        .finally(() => setLoading(false));
    }, 500);
  }, [request, page]);

  const submittedSearchHandler = query => {
    setRequest(query);
    setGallery([]);
    setPage(1);
  };

  const loadMoreHandler = () => {
    setPage(page + 1);
  };

  const showModalHandler = event => {
    setShowModal(!showModal);

    if (event.target.nodeName !== 'IMG') {
      return;
    }
    const imgLink = event.currentTarget.src;
    modalContentHandler(imgLink);
  };

  const modalContentHandler = link => {
    console.log(link);

    const index = gallery.findIndex(item => item.webformatURL === link);
    const bigImgModal = gallery[index].largeImageURL;
    const descrModal = gallery[index].tags;
    setModalContent({
      src: bigImgModal,
      alt: descrModal,
    });
  };

  return (
    <Box>
      <SearchBar onSubmit={submittedSearchHandler} />
      <ToastContainer position="top-right" autoClose={3000} />
      <ImageGallery collection={gallery} showModalHandler={showModalHandler} />
      {loading && (
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
      {showLoadMoreButton && <Button onloadMore={loadMoreHandler} />}
      {showModal && (
        <Modal onClose={showModalHandler}>
          <img src={modalContent.src} alt={modalContent.alt} />
        </Modal>
      )}
    </Box>
  );
}
