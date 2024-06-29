/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteRoom, getSingleRoom } from '../../api/roomData';
import { useAuth } from '../../utils/context/authContext';
import { getRoomItems } from '../../api/itemData';
import ItemCard from '../../components/cards/ItemCard';
import ItemForm from '../../components/forms/ItemForm';

function RoomDetails() {
  const [roomDetails, setRoomDetails] = useState({});
  const [items, setItems] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const getDetails = async () => {
    try {
      const roomData = await getSingleRoom(id);
      setRoomDetails({
        ...roomData,
        tags: roomData.tags.map((tag) => ({ value: tag.id, label: tag.label })),
      });

      const itemsData = await getRoomItems(roomData.id);
      setItems(itemsData);
    } catch (error) {
      console.error('Error fetching room details or items:', error);
    }
  };

  const deleteThisRoom = async () => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await deleteRoom(roomDetails.id);
        router.push('/feed');
      } catch (error) {
        console.error('error deleting room:', error);
      }
    }
  };

  useEffect(() => {
    if (id) {
      getDetails();
    }
  }, [id]);

  return (
    <div>
      <div className="d-flex mt-5 gap-4 justify-content-center">
        <div>
          <img src={roomDetails.imageUrl} alt="visualization of the room" height={500} className="rounded-3" />
          {user?.id === roomDetails.sellerId
            ? (
              <div className="gap-4 mt-3 d-flex justify-content-center">
                <Link passHref href={`/rooms/edit/${roomDetails.id}`}>
                  <Button variant="warning" size="lg">Edit Room</Button>
                </Link>
                <ItemForm room={roomDetails?.id} />
                <Button variant="danger" size="lg" onClick={() => deleteThisRoom()}>Delete Room</Button>
              </div>
            )
            : (
              ''
            )}
        </div>
        <div className="d-flex flex-column">
          <div>
            <h2 className="fw-bold">{roomDetails.title}</h2>
            <hr className="w-25 border-black" />
            <h6 className="mb-2">Located in {roomDetails.location}</h6>
          </div>
          <div className="mt-2 mb-1 d-flex flex-wrap gap-2">
            {roomDetails.tags?.map((tag) => (
              <span key={tag.id} className="tag-style">{tag.label}</span>
            ))}
          </div>
          <div>
            <section className="content-border">{roomDetails.description}</section>
          </div>
        </div>
      </div>
      <div>
        {items[0]?.length === 0 ? <h3 className="mt-5 text-center">No items are listed for this room.</h3> : <h3 className="mt-5 text-center">Items Listed:</h3>}
      </div>
      <div className="mt-4 d-flex flex-wrap justify-content-center gap-3">
        {items[0]?.map((item) => (
          <ItemCard itemObj={item} key={items.Id} seller={roomDetails.sellerId} />
        ))}
      </div>
    </div>
  );
}

export default RoomDetails;
