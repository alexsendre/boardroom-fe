/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ItemForm from '../forms/ItemForm';
import { deleteRoomItem } from '../../api/itemData';
import { useAuth } from '../../utils/context/authContext';
import { createOrderItem, getAllOrders } from '../../api/orderData';

function ItemCard({ itemObj, seller }) {
  const { user } = useAuth();
  const router = useRouter();

  const getMostRecentOrder = async () => {
    try {
      const orders = await getAllOrders();
      if (orders.length === 0) {
        return null;
      }

      const openOrders = orders.filter((order) => order.isClosed === false);

      if (openOrders.length === 0) {
        return null;
      }

      const sortedOrders = openOrders.sort((a, b) => b.id - a.id); // Sorting by ID descending

      return sortedOrders[0];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return null;
    }
  };

  const removeItem = () => {
    if (window.confirm('Remove item?')) {
      deleteRoomItem(itemObj.roomId, itemObj.id).then(window.location.reload());
    }
  };

  const addItemToCart = async () => {
    const mostRecentOrder = await getMostRecentOrder();

    if (mostRecentOrder) {
      const payload = {
        orderId: mostRecentOrder.id,
        itemId: itemObj.id,
      };

      try {
        await createOrderItem(payload);
        router.push(`/orders/${payload.orderId}`);
        console.log('Item added to cart:', payload);
      } catch (error) {
        console.error('Error adding item to order:', error);
      }
    } else {
      console.error('No recent order found');
    }
  };

  return (
    <div className="d-flex justify-content-center mb-4">
      <Card key={itemObj.id} border="dark">
        <div className="d-flex flex-column align-items-center mt-2">
          <h5>{itemObj.name}</h5>
          <hr className="w-25 cart-item-separator" />
          <h6 className="silent">${itemObj.price}</h6>
        </div>
        <img src={itemObj.imageUrl} alt={itemObj.name} height={200} />
        {user?.id === seller ? (
          <div className="d-flex justify-content-center gap-3 mt-2 mb-2">
            <ItemForm obj={itemObj} />
            <Button variant="dark" size="md" onClick={removeItem}>Delete</Button>
          </div>
        ) : (
          <div className="d-flex justify-content-center mt-2 mb-2">
            <Button variant="success" size="md" onClick={addItemToCart}>Add to Cart</Button>
          </div>
        )}
      </Card>
    </div>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    roomId: PropTypes.number,
    sellerId: PropTypes.number,
  }).isRequired,
  seller: PropTypes.number.isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

export default ItemCard;
