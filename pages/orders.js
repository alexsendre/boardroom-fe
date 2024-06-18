import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getAllOrders } from '../api/orderData';
import OrderCard from '../components/cards/OrderCard';

function ViewOrders() {
  const [openOrders, setOpenOrders] = useState([]);
  const [closedOrders, setClosedOrders] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getOrders = () => {
    getAllOrders(user.uid)
      .then((orders) => {
        const open = [];
        const closed = [];
        orders.forEach((order) => {
          if (order.isClosed) {
            closed.push(order);
          } else {
            open.push(order);
          }
        });
        setOpenOrders(open);
        setClosedOrders(closed);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center mt-3 mb-3">
        <Button variant="primary" onClick={() => router.push('/orders/new')}>Create an Order</Button>
      </div>
      <div className="d-flex flex-column justify-content-center mt-3 mb-3">
        <h2 className="text-center">Open Orders</h2>
        <hr className="m-auto w-25" />
        {openOrders.length < 1 ? <div className="d-flex align-items-center mt-3 mb-3 flex-column"><h4>No orders yet!</h4></div> : (
          <div className="d-flex flex-wrap justify-content-center">
            {openOrders.map((order) => (
              <OrderCard key={order.id} orderObj={order} />
            ))}
          </div>
        )}
      </div>
      <div className="text-center mt-3 mb-3">
        <h2 className="order-headers">Closed Orders</h2>
        <hr className="m-auto w-25" />
        <div>
          <div className="d-flex flex-wrap justify-content-center">
            {closedOrders.map((order) => (
              <OrderCard key={order.id} orderObj={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOrders;
