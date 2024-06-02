/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function RoomCard({ obj }) {
  return (
    <div key={obj.id} className="mb-4">
      <Button>
        <img src={obj.imageUrl} alt="A visualization of the room" className="rounded-2" height={350} />
      </Button>
    </div>
  );
}

RoomCard.propTypes = {
  obj: PropTypes.shape({
    imageUrl: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
