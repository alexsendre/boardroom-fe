import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAllRooms } from '../api/roomData';
import RoomCard from '../components/cards/RoomCard';

function Feed() {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = () => {
    getAllRooms().then(setRooms);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="center">
      <h2 className="fw-bold text-center mt-2 mb-3">ROOMS</h2>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {rooms?.map((room) => (
          <Link passHref href={`/rooms/${room.id}`}>
            <Button className="feed-card">
              <RoomCard obj={room} key={room.id} />
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Feed;
