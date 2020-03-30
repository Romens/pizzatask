import React, { Component } from 'react';

class Cart extends Component {
  constructor (props) {
    super(props);

    const currencies = window.localStorage.getItem('currencies')
      ? JSON.parse(window.localStorage.getItem('currencies'))
      : {};

    const currency = window.localStorage.getItem('currency')
      ? window.localStorage.getItem('currency')
      : 'USD';

    this.state = {
      currencies: props.currencies || currencies,
      currency: props.currency || currency,
      items: JSON.parse(window.localStorage.getItem('cart_items') || '[]')
    };
  }

  tick () {
    this.setState({
      items: window.localStorage.getItem('cart_items')
    });
  }

  static addToCart (variant, pizza) {
    let items = window.localStorage.getItem('cart_items') || '[]';
    items = JSON.parse(items);
    variant = JSON.parse(JSON.stringify(variant));
    pizza = JSON.parse(JSON.stringify(pizza));
    variant.pizza = pizza;
    items.push(variant);
    window.localStorage.setItem('cart_items', JSON.stringify(items));
  }

  render () {
    const price = this.state.items.map(item => {
      return 0;
    });

    return (
      <div className='cart'>
            Price: {price}
      </div>
    );
  }
}

export default Cart;
