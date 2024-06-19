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

const getPaymentTypeById = (typeId) => new Promise((resolve, reject) => {
  fetch(`${db}/checkout/types/${typeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getPaymentTypes,
  getPaymentTypeById,
};
