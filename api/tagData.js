import { clientCredentials } from '../utils/client';

const db = clientCredentials.databaseURL;

const getTags = () => new Promise((resolve, reject) => {
  fetch(`${db}/tags`, {
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

const createTag = (payload) => new Promise((resolve, reject) => {
  fetch(`${db}/tags/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const addTagToRoom = (roomId, payload) => new Promise((resolve, reject) => {
  fetch(`${db}/rooms/${roomId}/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const removeTagFromRoom = (roomId, tagId) => new Promise((resolve, reject) => {
  fetch(`${db}/rooms/${roomId}/tags/${tagId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getTags,
  createTag,
  addTagToRoom,
  removeTagFromRoom,
};
