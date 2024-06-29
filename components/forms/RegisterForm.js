import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { registerUser } from '../../utils/auth';

function RegisterForm({ userObj }) {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    imageUrl: '',
    email: '',
    bio: '',
    isSeller: false,
    uid: user.uid,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (userObj.id) {
    //   updateUser(formData, userObj.id)?.then(() => router.push('/profile'));
    // } else {
    //   createUser(formData)?.then(() => router.push('/feed'));
    // }

    registerUser(formData).then(router.push('/feed'));
  };

  useEffect(() => {
    if (userObj.id) {
      setFormData(userObj);
    } else {
      setFormData(formData);
    }
  }, [userObj]);

  return (
    <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
      <h2 className="d-flex justify-content-center mt-3">{userObj.id ? 'Update' : 'Create'} Account</h2>
      <Form.Group>
        <FloatingLabel
          controlId="floatingInput1"
          label="Username"
        >
          <Form.Control
            type="text"
            className="mb-2 mt-2"
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
            className="mb-2"
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
            className="mb-2"
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
            className="mb-2"
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
            className="mb-2"
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
            className="mb-2"
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
        label="Are you a Seller?"
      >
        <Form.Check
          type="switch"
          className="mb-4"
          name="isSeller"
          label="Are you a seller?"
          checked={formData.isSeller}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              isSeller: e.target.checked,
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
  userObj: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    imageUrl: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    isSeller: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
};

export default RegisterForm;
