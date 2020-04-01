import React from 'react';
import { NavLink } from 'react-router-dom';
import Cart from './Cart';

class CartWelcome extends Cart {
  renderItem (item) {
    return (
      <div key={item.id} className="media pizza-item">
        <div className="media-body">
          <span className='remove' onClick={() => { this.removeVariant(item.id) }}>X</span>
          <h6 className="m-0">{item.count || 1} x {item.pizza.title}</h6>
          <small className="m-0">{this.state.crusts[item.crust_id].title} crust, {this.state.sizes[item.size_id].title} cm for {this.state.sizes[item.size_id].persons} persons</small>
        </div>
      </div>
    );
  }

  render () {
    const pizzas = this.state.cart.map(this.renderItem);

    let price = this.calcPrice();
    let counter = 0;

    const emptyPizzas = (
      <div className='empty-pizzas'>
          Add pizza to cart!!!
      </div>
    );

    this.state.cart.forEach(item => {
      counter += item.count || 1;
    });

    const linkToOrder = (
      <NavLink
        to="/create-order"
        activeClassName="active"
        className="btn btn-block btn-light">
            Order Now!
      </NavLink>
    );

    return (
      <div className={'cart cart-welcome mode-' + this.state.mode}>
        <div className='icon-area'>{counter}</div>
        <div className='row cart-area'>
          <div className='col-12'>
            <div className='pizza-area'>
              {pizzas.length === 0 ? emptyPizzas : pizzas}
            </div>
          </div>
          <div className='col-12'>
            <div className='total-area row'>
              <div onClick={this.changeCurrency} className='price-area col-12'>
                {price.toFixed(2)} {this.state.currencies[this.state.currency]}
              </div>
              <div className='action-area col-12'>
                {price === 0 ? '' : linkToOrder}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartWelcome;
