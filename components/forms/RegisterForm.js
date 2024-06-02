import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import { registerUser } from '../../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    imageUrl: '',
    email: '',
    bio: '',
    isHost: false,
    uid: user.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <FloatingLabel
          controlId="floatingInput1"
          label="Username"
        >
          <Form.Control
            type="text"
            autoComplete="off"
            maxLength={12}
            placeholder="enter username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group>
        <FloatingLabel
          controlId="floatingInput1"
          label="First Name"
        >
          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="enter first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group>
        <FloatingLabel
          controlId="floatingInput1"
          label="Last Name"
        >
          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="enter last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group>
        <FloatingLabel
          controlId="floatingInput1"
          label="Bio"
        >
          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="enter bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group>
        <FloatingLabel
          controlId="floatingInput1"
          label="Profile Image Url"
        >
          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="enter profile picture url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group>
        <FloatingLabel
          controlId="floatingInput1"
          label="Email"
        >
          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group
        controlId="formBasicCheckbox"
        label="Are you a Host?"
      >
        <Form.Check
          type="switch"
          name="isHost"
          label="Are you a host?"
          checked={formData.isHost}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              isHost: e.target.checked,
            }));
          }}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    imageUrl: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    isHost: PropTypes.bool,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
