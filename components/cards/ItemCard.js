import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import ItemForm from '../forms/ItemForm';
import { deleteRoomItem } from '../../api/itemData';

function ItemCard({ itemObj }) {
  const removeItem = () => {
    if (window.confirm('Remove item?')) {
      deleteRoomItem(itemObj.roomId, itemObj.id).then(window.location.reload());
    }
  };

  return (
    <div className="d-flex justify-content-center mb-4">
      <Card key={itemObj.id} border="dark">
        <div className="d-flex gap-3 mx-3 mb-1 mt-2">
          <h5>{itemObj.name}</h5>
          <h5 className="silent">{itemObj.price}</h5>
        </div>
        <img src={itemObj.imageUrl} alt="visual representation of the item" height={200} />
        <div>
          <ItemForm obj={itemObj} />
          <Button variant="dark" size="md" onClick={removeItem}>Delete</Button>
        </div>
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
  }).isRequired,
};

export default ItemCard;
