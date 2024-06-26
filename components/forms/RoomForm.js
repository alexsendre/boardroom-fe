/* eslint-disable import/no-extraneous-dependencies */
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { createRoom, getSingleRoom, updateRoom } from '../../api/roomData';
import { getTags } from '../../api/tagData';
import TagDisplay from '../TagDisplay';

const initialState = {
  id: 0,
  title: '',
  price: 0,
  description: '',
  location: '',
  imageUrl: '',
  sellerId: 0,
  tags: [],
};

export default function RoomForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      getSingleRoom(obj.id).then(setFormInput);
    }
    getTags().then(setTags);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggle = (option) => {
    if (selectedTags.includes(option)) {
      setSelectedTags(
        selectedTags.filter((item) => item !== option),
      );
    } else {
      setSelectedTags(
        [...selectedTags, option],
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (obj.id) {
      const payload = {
        ...formInput,
        tags: selectedTags,
      };
      updateRoom(payload)?.then(() => router.push('/feed'));
    } else {
      const payload = {
        ...formInput,
        sellerId: user.id,
        tags: selectedTags,
      };
      createRoom(payload).then(() => router.push('/feed'));
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center">
        <h1 className="mt-5 mb-3">{obj && obj.id ? 'Update' : 'Create a'} Room</h1>

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

        <FloatingLabel controlId="description" label="Description" className="mb-3">
          <Form.Control
            as="textarea"
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
            autoComplete="off"
            type="text"
            placeholder="Enter image url of item"
            name="imageUrl"
            value={formInput.imageUrl}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <div
          className="flex flex-row justify-start"
        >
          {tags.map((tag) => (
            <>
              <div className="d-flex justify-content-center gap-2 mb-2 mt-2">
                <Form.Check
                  key={tag.id}
                  onClick={() => toggle(tag)}
                />
                <TagDisplay id={tag.id} />
              </div>
            </>
          ))}
        </div>

        <Button variant="none" className="publish-btn" type="submit">{obj && obj.id ? 'Update' : 'Create'} Room</Button>
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
    sellerId: PropTypes.number,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
      }),
    ),
  }),
};

RoomForm.defaultProps = {
  obj: initialState,
};
