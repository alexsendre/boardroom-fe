/* eslint-disable radix */
import { PropTypes } from 'prop-types';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getSingleRoom } from '../../api/roomData';
import { addTagToRoom, getTags } from '../../api/tagData';

export default function RoomTagForm({ roomId }) {
  const [tags, setTags] = useState([]);
  const [roomObj, setRoomObj] = useState({});
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getTags().then(setTags);
    getSingleRoom(roomId).then(setRoomObj);
  }, [roomId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTagId) {
      console.error('No tag selected.');
      return;
    }

    addTagToRoom(roomObj.id)
      .then(() => {
        setShow(false);
        console.log('Tag added successfully.', selectedTagId);
      })
      .catch((error) => {
        console.error('Error adding tag to room:', error);
        // Handle error scenario (e.g., show error message to user)
      });
  };

  const handleTagChange = (e) => {
    setSelectedTagId(parseInt(e.target.value)); // Ensure value is parsed as integer
  };

  return (
    <div className="d-flex justify-content-center">
      <Button variant="primary" size="lg" onClick={handleShow}>
        Add Tags
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center">
          <h2 className="mt-3 text-center">Add Tags</h2>

          <FloatingLabel controlId="tags" className="mt-2 mb-3 px-4">
            <Form.Select
              name="select-tags"
              onChange={handleTagChange}
              value={selectedTagId}
              required
            >
              <option value="">Select a tag...</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>{tag.label}</option>
              ))}
            </Form.Select>
          </FloatingLabel>

          <Button variant="none" className="publish-btn w-25 m-auto mb-3" type="submit">Add Tags</Button>
        </Form>
      </Modal>
    </div>
  );
}

RoomTagForm.propTypes = {
  roomId: PropTypes.number.isRequired,
};
