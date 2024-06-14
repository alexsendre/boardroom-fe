/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { FloatingLabel, Modal } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
import { getSingleOrder, updateOrder } from '../../api/orderData';
import { getPaymentTypes } from '../../api/paymentTypeData';

function CheckoutForm({ orderId }) {
  const [formInput, setFormInput] = useState([]);
  const [paymentType, setPaymentType] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getDetails = () => {
    getPaymentTypes().then(setPaymentType);
    getSingleOrder(router.query.id).then(setOrderDetails);
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (window.confirm('Confirm order?')) {
      try {
        const updatedOrder = { isComplete: true, paymentTypeId: paymentType };
        console.log('Updating order with:', updatedOrder);
        await updateOrder(updatedOrder, orderId).then(handleClose());
        router.push(`/orders/${orderId}`);
      } catch (error) {
        console.error('Failed to update order:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Button variant="success" size="lg" onClick={handleShow}>
        checkout
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <h2 className="mt-2">Checkout</h2>

          <FloatingLabel controlId="paymentType" label="Payment Type">
            <Form.Select
              name="paymentTypeId"
              onChange={handleChange}
              className="mb-3"
              value={formInput.paymentTypeId}
              required
            >
              <option value="">Select a Payment Type</option>
              {paymentType?.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>

          <h3 className="text-center">Order Total: ${orderDetails.total}</h3>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Complete Order
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

// CheckoutForm.propTypes = {
//   orderId: PropTypes.number.isRequired,
//   order: PropTypes.shape({
//     calculateTotal: PropTypes.number,
//   }).isRequired,
// };

export default CheckoutForm;
