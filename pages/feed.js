import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAllRooms } from '../api/roomData';
import RoomCard from '../components/cards/RoomCard';
import { getTags } from '../api/tagData';

function Feed() {
  const [rooms, setRooms] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const fetchDetails = () => {
    getAllRooms().then(setRooms);
    getTags().then(setTags);
  };

  // TODO: fix bug where nothing appears when clicking tag even when tag exists on a room | hint: may have to do with null operator on hard coded tags
  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const filteredRooms = selectedTag
    ? rooms.filter((room) => room.tags.some((tag) => tag.id === selectedTag.id))
    : rooms;

  return (
    <div className="center">
      <h2 className="fw-bold text-center mt-2 mb-3">ROOMS</h2>
      <div className="mb-3">
        <div className="d-flex justify-content-center gap-2">
          {/* hard coding the top 3 tags as they are the most popular */}
          <Button variant="secondary" onClick={() => handleTagSelect(tags[4])}>{tags[4]?.label}</Button>
          <Button variant="secondary" onClick={() => handleTagSelect(tags[6])}>{tags[6]?.label}</Button>
          <Button variant="secondary" onClick={() => handleTagSelect(tags[2])}>{tags[2]?.label}</Button>
          <Button variant="secondary" onClick={() => handleTagSelect(null)}>Show All</Button>
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {filteredRooms.length === 0 ? (
            <div className="text-center mt-5">
              <h4>no rooms exist with this tag</h4>
              <Link passHref href="/rooms/new">
                <Button variant="success" size="md">Create a room!</Button>
              </Link>
            </div>
          ) : (
            filteredRooms.map((room) => (
              <Link key={room.id} passHref href={`/rooms/${room.id}`}>
                <Button className="feed-card mt-3">
                  <RoomCard obj={room} />
                </Button>
              </Link>
            )))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
