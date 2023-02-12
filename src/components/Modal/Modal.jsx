import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from './Modal.styled.jsx';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    console.log('Модaльное окно зарендерилось');
    window.addEventListener('keydown', escCloseHandler);

    return () => {
      window.removeEventListener('keydown', escCloseHandler);
      console.log('Модальное окно закрылось');
    };
  });

  const escCloseHandler = event => {
    if (event.code === 'Escape') {
      onClose(event);
    }
  };

  const backdropClickHandler = event => {
    if (event.target === event.currentTarget) {
      onClose(event);
    }
    return;
  };

  return createPortal(
    <Overlay onClick={backdropClickHandler}>
      <ModalContent>{children}</ModalContent>
    </Overlay>,
    modalRoot
  );
}
