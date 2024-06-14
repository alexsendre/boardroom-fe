/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { deleteOrderItem } from '../../api/orderData';

function CartItemCard({ itemObj, orderId, onUpdate }) {
  const removeProductFromCart = () => {
    if (window.confirm(`Remove ${itemObj.name} from cart?`)) {
      deleteOrderItem(orderId, itemObj.id)
        .then(() => {
          onUpdate();
        })
        .catch((error) => {
          console.error('error removing product from order:', error);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center mb-3">
      <Card key={itemObj.id} border="dark" width={300}>
        <div className="d-flex gap-3 mx-3 mb-1 mt-2">
          <h5>{itemObj.name}</h5>
          <h5 className="silent">{itemObj.price}</h5>
        </div>
        <img src={itemObj.imageUrl} alt={itemObj.name} height={200} />
        <Button variant="danger" onClick={removeProductFromCart}>Remove</Button>
      </Card>
    </div>
  );
}

CartItemCard.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    roomId: PropTypes.number,
    hostId: PropTypes.number,
  }).isRequired,
  orderId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CartItemCard;
