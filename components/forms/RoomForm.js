/* eslint-disable import/no-extraneous-dependencies */
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import { useAuth } from '../../utils/context/authContext';
import { createRoom, getSingleRoom, updateRoom } from '../../api/roomData';
import { getTags } from '../../api/tagData';

const initialState = {
  id: 0,
  title: '',
  price: 0,
  description: '',
  location: '',
  imageUrl: '',
  hostId: 0,
  tags: [],
  // isLeasable: false,
};

export default function RoomForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tags, setTags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTags().then((tagOptions) => {
      setTags(tagOptions.map((tag) => ({ value: tag.id, label: tag.label })));
    });
    if (obj.id) {
      getSingleRoom(obj.id).then((room) => {
        setFormInput({
          ...room,
          tags: room.tags.map((tag) => ({ value: tag.id, label: tag.label })),
        });
      });
    }
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

  const handleSelectChange = (selectedOptions) => {
    setFormInput((prevState) => ({
      ...prevState,
      tags: selectedOptions,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formInput.tags:', formInput.tags); // Add this line to debug

    // Prepare the payload with the required tag objects
    const payload = {
      ...formInput,
      tags: formInput.tags.map((tag) => ({
        id: tag.value,
        label: tag.label,
      })), // Extracting tag objects
    };

    if (obj.id) {
      // Fetch existing room details to get current tags
      getSingleRoom(obj.id).then((existingRoom) => {
        const existingTags = existingRoom.tags;
        const newTags = formInput.tags.map((tag) => ({
          id: tag.value,
          label: tag.label,
        }));
        const mergedTags = [...existingTags, ...newTags].reduce((acc, tag) => {
          if (!acc.some((existingTag) => existingTag.id === tag.id)) {
            acc.push(tag);
          }
          return acc;
        }, []);

        // Update room with merged tags
        updateRoom({ ...payload, tags: mergedTags }).then(() => {
          console.log('Updated payload:', payload);
          router.push(`/rooms/${obj.id}`);
        });
      });
    } else {
      payload.hostId = user.id;
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

        <Form.Group className="mb-3">
          <Form.Text>Select Tags</Form.Text>
          <FloatingLabel controlId="floatingInput3" className="mb-3">
            <ReactSelect
              isMulti
              name="tags"
              options={tags}
              value={formInput.tags}
              className="basic-multi-select select-style"
              classNamePrefix="select"
              onChange={handleSelectChange}
            />
          </FloatingLabel>
        </Form.Group>

        {/* <Form.Group
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
        </Form.Group> */}

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
    // isLeasable: PropTypes.bool,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }),
};

RoomForm.defaultProps = {
  obj: initialState,
};
