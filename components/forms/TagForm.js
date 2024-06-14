import { PropTypes } from 'prop-types';
import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createTag } from '../../api/tagData';

const initialState = {
  id: 0,
  name: '',
  price: '',
  imageUrl: '',
};

export default function TagForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    } else {
      setFormInput(initialState);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formInput,
    };

    createTag(payload)
      .then(router.push('/feed'));
  };

  return (
    <div className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center">
        <h2 className="mt-5">{obj && obj.id ? 'Update' : 'Create a'} Tag</h2>

        <FloatingLabel controlId="name" label="Name" className="mb-3">
          <Form.Control
            autoComplete="off"
            type="text"
            placeholder="Enter label"
            name="label"
            value={formInput.label}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Button variant="none" className="publish-btn" type="submit">{obj && obj.id ? 'Update' : 'Create'} Tag</Button>
      </Form>
    </div>
  );
}

TagForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
};

TagForm.defaultProps = {
  obj: initialState,
};
