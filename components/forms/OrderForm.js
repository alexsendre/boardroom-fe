import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { createOrder } from '../../api/orderData';

const initialState = {
  address: '',
  city: '',
  state: '',
  isClosed: false,
};

function OrderForm() {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    createOrder(formInput).then(() => router.push('/orders'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center">
        <h2 className="mt-5">Create Order</h2>

        <FloatingLabel controlId="1" label="Enter Address" className="mb-3">
          <Form.Control
            autoComplete="off"
            type="text"
            placeholder="Enter address"
            name="address"
            value={formInput.address}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="2" label="Enter City" className="mb-3">
          <Form.Control
            autoComplete="off"
            type="text"
            placeholder="Enter city"
            name="city"
            value={formInput.city}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="state" label="Enter State (KY, TN)" className="mb-3">
          <Form.Control
            autoComplete="off"
            type="text"
            placeholder="Enter state"
            name="state"
            value={formInput.state}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Button variant="none" className="publish-btn" type="submit">Start Shopping</Button>
      </Form>

    </div>
  );
}

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    orderType: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  orderObj: initialState,
};

export default OrderForm;
