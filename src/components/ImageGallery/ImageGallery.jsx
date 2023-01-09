import React from 'react';
import { Gallery } from './ImageGallery.styled.jsx';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem.jsx';

export default function ImageGallery({
  collection,
  showModalHandler,
  modalImageShow,
}) {
  return (
    <Gallery>
      {collection.map(item => (
        <ImageGalleryItem
          key={item.id}
          description={item.tags}
          link={item.webformatURL}
          showModalHandler={showModalHandler}
          modalImageShow={modalImageShow}
        />
      ))}
    </Gallery>
  );
}
