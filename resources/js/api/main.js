import client from './client';

export const pizzasList = () => {
  return client('/api/v1/pizzas')
    .then(pizzas => {
      return pizzas;
    });
};