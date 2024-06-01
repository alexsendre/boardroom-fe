import { clientCredentials } from '../utils/client';

const db = clientCredentials.databaseURL;

const getUserById = (id) => new Promise((resolve, reject) => {
  fetch(`${db}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${db}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getUserById,
  getUsers,
};
