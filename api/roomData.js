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
    .then((data) => resolve(data[0]))
    .catch(reject);
});

export {
  getAllRooms,
  getSingleRoom,
};
