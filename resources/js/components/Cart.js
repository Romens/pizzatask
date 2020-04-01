import React, { Component } from 'react';
import store from '../reducers/store';

class Cart extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: props.loading || false,
      currencies: store.getState().currencies,
      currency: store.getState().currency,
      cart: store.getState().cart,
      mode: 'page',
      crusts: store.getState().crusts,
      sizes: store.getState().sizes
    };

    this.setSubcriber();
    this.renderItem = this.renderItem.bind(this);
  }

  changeCurrency () {
    store.dispatch({
      type: 'CHANGE_CURRENCY'
    });
  }

  removeVariant (id) {
    if (confirm('Are you sure?')) {
      store.dispatch({
        type: 'REMOVE_FROM_CART',
        payload: id
      });
    }
  }

  renderItem (item) {
    return (
      <li key={item.id} className="list-group-item pizza-item">
        <div className="media">
          <div className="align-self-start mr-3">
            <span>{item.count || 1}</span>
          </div>
          <div className="media-body">

            <div className="d-flex w-100 justify-content-between">
              <h6 className="mb-1">{item.pizza.title}</h6>
              <span className='badge remove-btn badge-danger' onClick={() => { this.removeVariant(item.id); }}>
                Remove?
              </span>
            </div>
            <p className="m-0">{this.state.crusts[item.crust_id].title} crust, {this.state.sizes[item.size_id].title} cm for {this.state.sizes[item.size_id].persons} persons</p>
          </div>
        </div>
      </li>
    );
  }

  setSubcriber () {
    this.unsubscribe = store.subscribe(() => {
      let {cart, currencies, currency, sizes, crusts} = store.getState();
      this.setState({
        cart: cart,
        currency: currency,
        currencies: currencies,
        sizes: sizes,
        crusts: crusts
      });
    });
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  calcPrice () {
    let price = 0;
    this.state.cart.forEach(item => {
      price += parseFloat(item.prices[this.state.currency].value) * item.count;
    });

    return price;
  }

  render () {
    const price = this.calcPrice();

    const pizzas = this.state.cart.map(this.renderItem);
    const emptyPizzas = (
      <li className='list-group-item empty-pizzas'>
          Add pizza to cart!!!
      </li>
    );

    return (
      <div className="cart card">
        <div className="card-header">
          <div className='total-area row'>
            <div onClick={this.changeCurrency} className='price-area col-6 text-center'>
              {price.toFixed(2)} {this.state.currencies[this.state.currency]}
            </div>
            <div className='action-area col-6 text-right'>
              <button type="submit" className="btn btn-primary" disabled={pizzas.length === 0 || this.state.loading}>
                          Order Now!
              </button>
            </div>
          </div>
        </div>
        <div className='card-body cart-area'>
          <input type="hidden" name="price" value={price} />
          <input type="hidden" name="currency" value={this.state.currency} />
          <ul className="list-group list-group-flush pizza-area">
            {pizzas.length === 0 ? emptyPizzas : pizzas}
          </ul>
        </div>
      </div>
    );
  }
}

export default Cart;
