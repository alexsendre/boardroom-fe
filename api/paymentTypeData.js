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
        throw new Error('Failed to fetch rooms');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

export default getPaymentTypes;
