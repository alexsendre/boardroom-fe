import { clientCredentials } from '../utils/client';

const db = clientCredentials.databaseURL;

const getPaymentTypes = () => new Promise((resolve, reject) => {
  fetch(`${db}/checkout/types`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch payment types');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const getPaymentTypeById = (id) => new Promise((resolve, reject) => {
  fetch(`${db}/checkout/types/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch payment types');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getPaymentTypeById,
  getPaymentTypes,
};
