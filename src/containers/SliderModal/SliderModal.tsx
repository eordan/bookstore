import React from 'react';
import { Carousel, Modal, Image, Button } from 'react-bootstrap';

import './SliderModal.scss';
import Lorem1 from '../../assets/lorem1.jpg';
import Lorem2 from '../../assets/lorem2.jpg';

interface ModalProps {
  url: string;
  onHide: () => void;
  show: boolean;
}

export function SliderModal(props: ModalProps) {
  return (
    <Modal className="book-modal" centered {...props}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Image modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel variant="dark">
          <Carousel.Item>
            <Image className="w-100 book-img" src={props.url} fluid />
          </Carousel.Item>
          <Carousel.Item>
            <Image className="w-100 book-img" src={Lorem1} fluid />
          </Carousel.Item>
          <Carousel.Item>
            <Image className="w-100 book-img" src={Lorem2} fluid />
          </Carousel.Item>
        </Carousel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
