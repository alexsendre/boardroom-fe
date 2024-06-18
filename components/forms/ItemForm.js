import { PropTypes } from 'prop-types';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { createRoomItem, updateItem } from '../../api/itemData';
import { getSingleRoom } from '../../api/roomData';

const initialState = {
  id: 0,
  name: '',
  price: '',
  imageUrl: '',
};

export default function ItemForm({ room, obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [roomObj, setRoomObj] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    } else {
      setFormInput(initialState);
    }

    if (room) {
      getSingleRoom(room).then(setRoomObj);
    }
  }, [obj, room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.id) {
      updateItem(formInput).then(window.location.reload());
    } else {
      const payload = {
        ...formInput,
        roomId: room,
      };

      createRoomItem(roomObj.id, payload)
        .then(() => setShow(false))
        .then(window.location.reload());
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Button variant="success" size={obj.id ? 'sm' : 'lg'} onClick={handleShow}>
        {obj && obj.id ? 'Update' : 'Add'} Items
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center">
          <h2 className="mt-5">{obj && obj.id ? 'Update' : 'Publish an'} Item</h2>

          <FloatingLabel controlId="name" label="Name" className="mb-3">
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Enter name"
              name="name"
              value={formInput.name}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="number" label="Price" className="mb-3">
            <Form.Control
              type="number"
              autoComplete="off"
              placeholder="Enter price"
              name="price"
              value={formInput.price}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="imageUrl" label="Image URL" className="mb-3">
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Enter image url of item"
              name="imageUrl"
              value={formInput.imageUrl}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <Button variant="none" className="publish-btn" type="submit">{obj && obj.id ? 'Update' : 'Publish'} Item</Button>
        </Form>
      </Modal>

    </div>
  );
}

ItemForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    roomId: PropTypes.number,
    sellerId: PropTypes.number,
  }),
  room: PropTypes.number.isRequired,
};

ItemForm.defaultProps = {
  obj: initialState,
};
