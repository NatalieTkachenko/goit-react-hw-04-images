import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from './Modal.styled.jsx';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('Модaльное окно зарендерилось');
    window.addEventListener('keydown', this.escCloseHandler);
  }

  componentWillUnmount() {
    console.log('Модальное окно размонтировано');
    window.removeEventListener('keydown', this.escCloseHandler);
  }

  escCloseHandler = event => {
    if (event.code === 'Escape') {
      this.props.onClose(event);
    }
  };

  backdropClickHandler = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose(event);
    }
    return;
  };

  render() {
    return createPortal(
      <Overlay onClick={this.backdropClickHandler}>
        <ModalContent>{this.props.children}</ModalContent>
      </Overlay>,
      modalRoot
    );
  }
}
