import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { createRoom, updateRoom } from '../../api/roomData';

const initialState = {
  id: 0,
  title: '',
  price: 0,
  description: '',
  location: '',
  imageUrl: '',
  hostId: 0,
  isLeasable: false,
};

export default function RoomForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const [tags, setTags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // getAllTags().then(setTags);
    if (obj.id) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormInput((prevState) => ({
        ...prevState,
        imageUrl: reader.result,
      }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateRoom(formInput).then(() => router.push(`/rooms/${obj.id}`));
    } else {
      const payload = { ...formInput, hostId: user.id };
      createRoom(payload).then(() => router.push('/feed'));
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center">
        <h2 className="mt-5">{obj && obj.id ? 'Update' : 'Publish a'} Room</h2>

        <FloatingLabel controlId="title" label="Title" className="mb-3">
          <Form.Control
            autoComplete="off"
            type="text"
            placeholder="Enter Title"
            name="title"
            value={formInput.title}
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

        <FloatingLabel controlId="description" label="Description" className="mb-3">
          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="Enter description"
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="location" label="Location" className="mb-3">
          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="Enter location"
            name="location"
            value={formInput.location}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="imageUrl" label="Image URL" className="mb-3">
          <Form.Control
            type="file"
            onChange={handleFileChange}
            {...(obj.id ? {} : { required: true })}
          />
        </FloatingLabel>

        <Form.Group
          controlId="formBasicCheckbox"
          label="Are you a Host?"
        >
          <Form.Check
            type="switch"
            name="isLeasable"
            label="Leasable?"
            checked={formInput.isLeasable}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                isLeasable: e.target.checked,
              }));
            }}
          />
        </Form.Group>

        <Button variant="none" className="publish-btn" type="submit">{obj && obj.id ? 'Update' : 'Publish'} Room</Button>
      </Form>
    </div>
  );
}

RoomForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    location: PropTypes.string,
    imageUrl: PropTypes.string,
    hostId: PropTypes.number,
    isLeasable: PropTypes.bool,
  }),
};

RoomForm.defaultProps = {
  obj: initialState,
};
