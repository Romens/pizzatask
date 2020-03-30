import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Cart from './Cart';

class CartWelcome extends Cart {
  renderItem (item) {
    return (
      <div key={item.id}>{item.pizza.title}</div>
    );
  }

  render () {

    const pizzas = this.state.items.map(this.renderItem);

    let price = 0;

      this.state.items.forEach(item => {
        price += item.prices[this.state.currency];
      });

    return (
      <div className='cart cart-welcome'>
        <div className='row'>
          <div className='col-12 col-md-8'>
            <div className='pizza-area'>
              {pizzas}
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <div className='total-area row'>
              <div className='price-area col-6'>
                {price}
              </div>
              <div className='action-area col-6'>
                <NavLink
                  to="/create-order"
                  activeClassName="font-bold"
                  className="text-gray-800 no-underline text-indigo">
                      Order Now!
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartWelcome;
