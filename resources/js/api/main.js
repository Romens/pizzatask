import client from './client';

export const pizzasList = () => {
  return client('/api/v1/pizzas')
    .then(pizzas => {
      return pizzas;
    });
};

export const createOrder = (order) => {
    return client('/api/v1/orders', { body: order })
        .then(result => {
            return result;
        });
};