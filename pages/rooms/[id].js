import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleRoom } from '../../api/roomData';

function RoomDetails() {
  const [roomDetails, setRoomDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getDetails = () => {
    getSingleRoom(id).then(setRoomDetails);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <div className="d-flex mt-5 gap-4 justify-content-center">
        <div>
          <img src={roomDetails.imageUrl} alt="visualization of the room" height={500} className="rounded-3" />
          <div className="gap-4 mt-3 d-flex justify-content-center">
            <Button variant="primary" size="lg">Rent room</Button>
            <Button variant="secondary" size="lg">View items</Button>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div>
            <h2 className="fw-bold">{roomDetails.title}</h2>
            <hr className="w-25 mb-3 border-black" />
            <h4>${roomDetails.price}</h4>
            <h6>Located in {roomDetails.location}</h6>
          </div>
          <div>
            <section className="content-border">{roomDetails.description}</section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
