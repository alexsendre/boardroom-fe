import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { getUserById } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';
import { getPaymentTypeById } from '../../api/paymentTypeData';

function OrderCard({ orderObj }) {
  const [buyer, setBuyer] = useState({});
  const [paymentType, setPaymentType] = useState({});
  const { user } = useAuth();

  const fetchDetails = () => {
    getUserById(user.id).then(setBuyer);
    getPaymentTypeById(orderObj.paymentTypeId).then(setPaymentType);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <Card style={{ width: '22rem', margin: '20px' }}>
      <Card.Body className="text-center">
        <Card.Title className="card-title">{orderObj.id}</Card.Title>
        <Card.Text>{buyer.firstName} {buyer.lastName}</Card.Text>
        <Card.Text>Address: {orderObj.address}</Card.Text>
        <Card.Text>{orderObj.city}, {orderObj.state}</Card.Text>
        <Card.Text>Total: {orderObj?.calculateTotal}</Card.Text>
        {orderObj.isClosed ? (
          <Card.Text>Closed</Card.Text>
        ) : (
          <Card.Text>Current Order</Card.Text>
        )}
        <Card.Text>Payment Type: {paymentType.label}</Card.Text>
        <Link href={`orders/${orderObj.id}`} passHref>
          <Button className="user-card-button" variant="danger">VIEW DETAILS</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    paymentTypeId: PropTypes.number,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    isClosed: PropTypes.bool,
    calculateTotal: PropTypes.number,
  }).isRequired,
};

export default OrderCard;
