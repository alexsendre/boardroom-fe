import { clientCredentials } from '../utils/client';

const db = clientCredentials.databaseURL;

const getAllRooms = () => new Promise((resolve, reject) => {
  fetch(`${db}/rooms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleRoom = (id) => new Promise((resolve, reject) => {
  fetch(`${db}/rooms/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createRoom = (payload) => new Promise((resolve, reject) => {
  fetch(`${db}/rooms/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteRoom = (id) => new Promise((resolve, reject) => {
  fetch(`${db}/rooms/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const updateRoom = (roomId, payload) => new Promise((resolve, reject) => {
  fetch(`${db}/rooms/edit/${roomId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

export {
  getAllRooms,
  getSingleRoom,
  createRoom,
  deleteRoom,
  updateRoom,
};
