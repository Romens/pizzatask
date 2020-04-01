
import _ from 'lodash';

let storage = window.localStorage;

let initialState = {
  profile: storage.getItem('profile') ? JSON.parse(storage.getItem('profile')) : {},
  cart: [],
  order: null,
  orders: [],
  pizzas: [],
  payment_types: storage.getItem('payment_types') ? JSON.parse(storage.getItem('payment_types')) : {},
  crusts: storage.getItem('crusts') ? JSON.parse(storage.getItem('crusts')) : {},
  sizes: storage.getItem('sizes') ? JSON.parse(storage.getItem('sizes')) : {},
  currencies: storage.getItem('currencies') ? JSON.parse(storage.getItem('currencies')) : {},
  currency: storage.getItem('currency') || 'USD'
};


function saveCart (cart) {
  let newCart = [];

  cart.forEach(item => {
    newCart.push({
      id: item.id,
      count: item.count || 1,
      size_id: item.size_id,
      crust_id: item.crust_id,
      prices: item.prices,
      pizza_id: item.pizza_id,
      pizza: {
        title: item.pizza.title,
        image: item.pizza.image,
        image_url: item.pizza.image_url,
      },
    });
  });

  window.localStorage.setItem('cart', JSON.stringify(newCart));
}

function rootReducer (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'ADD_TO_CART':
      const index = _.findIndex(state.cart, ['id', action.payload.id]);

      if (index === -1) {
        action.payload.count = 1;
        state.cart.push(action.payload);
      } else {
        state.cart[index].count++;
      }
      saveCart(state.cart);
      break;

    case 'RESTORE_CART':
      if (window.localStorage.getItem('cart') !== null) {
        state.cart = JSON.parse(window.localStorage.getItem('cart'));
      }
      break;

    case 'NEW_ORDER':
      if (state.order) {
        state.orders.push(state.order);
      }
      state.order = action.payload;
      break;

    case 'REMEMBER_PROFILE':
      state.profile = action.payload;
      storage.setItem('profile', JSON.stringify(action.payload));
      break;

    case 'UNREMEMBER_PROFILE':
      state.profile = {};
      storage.removeItem('profile');
      break;

    case 'CHANGE_CURRENCY':
      let keys = Object.keys(state.currencies);
      let nextIndex = keys.indexOf(state.currency) + 1;
      let nextItem = keys[nextIndex] ? keys[nextIndex] : keys[0];
      state.currency = nextItem;
      window.localStorage.setItem('currency', nextItem);
      break;

    case 'SET_CURRENCY':
      state.currency = action.payload;
      window.localStorage.setItem('currency', action.payload);
      break;

    case 'SET_CRUSTS':
      state.crusts = action.payload;
      window.localStorage.setItem('crusts', JSON.stringify(action.payload));
      break;

    case 'REMOVE_FROM_CART':
      _.remove(state.cart, function (n) {
        return n.id === action.payload;
      });
      saveCart(state.cart);
      break;

    case 'SET_SIZES':
      state.sizes = action.payload;
      window.localStorage.setItem('sizes', JSON.stringify(action.payload));
        break;


    case 'SET_PAYMENT_TYPES':
      state.payment_types = action.payload;
      window.localStorage.setItem('payment_types', JSON.stringify(action.payload));
        break;

    case 'SET_CURRENCIES':
      state.currencies = action.payload;
      window.localStorage.setItem('currencies', JSON.stringify(action.payload));
      break;

    case 'SET_PIZZAS':
      state.pizzas = action.payload;
      break;
  }
  return state;
};

export default rootReducer;
