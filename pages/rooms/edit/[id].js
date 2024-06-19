import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleRoom } from '../../../api/roomData';
import RoomForm from '../../../components/forms/RoomForm';

function EditRoom() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleRoom(id).then(setEditItem);
  }, [id]);

  return <RoomForm obj={editItem} />;
}

export default EditRoom;
