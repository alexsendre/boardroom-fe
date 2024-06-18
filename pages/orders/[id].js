/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getSingleOrder } from '../../api/orderData';
import { getUserById } from '../../api/userData';
import CartItemCard from '../../components/cards/CartItemCard';
import CheckoutForm from '../../components/forms/CheckoutForm';

function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState({});
  const [userData, setUserData] = useState({});
  const [orderId, setOrderId] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const getDetails = async () => {
    getSingleOrder(id).then(setOrderDetails);
    getUserById(user.id).then(setUserData);
    setOrderId(router.query.id);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <div className="text-center mt-3">
        <h3>Order Details</h3>
        <hr className="w-25 m-auto mb-3" />
        <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Address:</strong> {orderDetails.address}</p>
        <p><strong>City:</strong> {orderDetails.city}</p>
        <p><strong>State:</strong> {orderDetails.state}</p>
      </div>
      <div className="mb-3 mt-5">
        <h3 className="text-center">Items</h3>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {orderDetails.items?.map((item) => (
            <CartItemCard key={item.id} itemObj={item} orderId={orderId} onUpdate={getDetails} isClosed={orderDetails.isClosed} />
          ))}
        </div>
      </div>
      {orderDetails.isClosed ? <div className="d-flex flex-column align-items-center"><h4>Order Complete</h4><h3 className="mb-5">${orderDetails.total}</h3></div>
        : (
          <div className="d-flex justify-content-center gap-3">
            <Button variant="primary" onClick={() => router.push('/feed')}>keep shopping</Button>
            <CheckoutForm orderId={orderDetails.id} />
          </div>
        )}
    </div>
  );
}

export default OrderDetails;
