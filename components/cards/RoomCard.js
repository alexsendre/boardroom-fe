/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

export default function RoomCard({ obj }) {
  return (
    <div key={obj.id} className="mb-4">
      <img src={obj.imageUrl} alt="A visualization of the room" className="rounded-2" height={350} />
    </div>
  );
}

RoomCard.propTypes = {
  obj: PropTypes.shape({
    imageUrl: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
