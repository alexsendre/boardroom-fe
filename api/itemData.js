import { clientCredentials } from '../utils/client';

const db = clientCredentials.databaseURL;

const getAllItems = () => new Promise((resolve, reject) => {
  fetch(`${db}/items`, {
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

const getSingleItem = (id) => new Promise((resolve, reject) => {
  fetch(`${db}/item/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createRoomItem = (roomId, payload) => new Promise((resolve, reject) => {
  fetch(`${db}/rooms/${roomId}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteRoomItem = (roomId, itemId) => new Promise((resolve, reject) => {
  fetch(`${db}/rooms/${roomId}/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const updateItem = (payload) => new Promise((resolve, reject) => {
  fetch(`${db}/items/edit/${payload.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

const getRoomItems = (id) => new Promise((resolve, reject) => {
  fetch(`${db}/rooms/${id}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getAllItems,
  getSingleItem,
  createRoomItem,
  deleteRoomItem,
  updateItem,
  getRoomItems,
};
