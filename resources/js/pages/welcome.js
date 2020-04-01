import React, {Component} from 'react';
import AuthNav from '../components/auth-nav';
import FullPageSpinner from '../components/full-page-spinner';
import PizzaEmptyList from '../components/objects/PizzaEmptyList';
import {pizzasList} from '../api/main';
import PizzaList from '../components/objects/PizzaList';
import CartWelcome from '../components/CartWelcome';
import store from '../reducers/store';

class Welcome extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pizzas: null,
      currency: 'USD',
      currencies: {},
      loading: false
    };

    this.setSubcriber();
  }

  setSubcriber () {
    this.unsubscribe = store.subscribe(() => {
      let {pizzas, currencies, currency} = store.getState();
      this.setState({
        pizzas: pizzas,
        currency: currency,
        currencies: currencies
      });
    });
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  componentDidMount () {
    this.getPizzasList();
  }

  setInitCurrency (code) {
    const userCurrency = window.localStorage.getItem('currency');

    if (userCurrency !== null) {
      if (this.state.currencies[userCurrency]) {
        code = userCurrency;
      }
    }
    store.dispatch({
      type: 'SET_CURRENCY',
      payload: code
    });
  }

  getPizzasList () {
    this.setState({
      loading: true
    });

    pizzasList()
      .then(result => {
        store.dispatch({
          type: 'SET_CURRENCIES',
          payload: result.currencies
        });
        store.dispatch({
          type: 'SET_PAYMENT_TYPES',
          payload: result.payment_types
        });
        store.dispatch({
          type: 'SET_CURRENCY',
          payload: result.default_currency
        });
        store.dispatch({
          type: 'SET_CRUSTS',
          payload: result.crusts
        });
        store.dispatch({
          type: 'SET_SIZES',
          payload: result.sizes
        });
        store.dispatch({
          type: 'SET_PIZZAS',
          payload: result.pizzas
        });

        store.dispatch({
            type: 'RESTORE_CART',
        });

        this.setInitCurrency(result.default_currency);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  };

  render () {
    const pizzaList = this.state.pizzas
      ? <PizzaList list={this.state.pizzas} />
      : <PizzaEmptyList/>;

    const loader = <FullPageSpinner/>;

    return (
      <div className="flex flex-col min-h-screen">
        <AuthNav />
        <div className="container">
          <div className='row'>
            <div className='col-12 col-md-9'>
              <div className="pizza_list">
                {this.state.loading ? loader : pizzaList}
              </div>
            </div>
            <div className='col-12 col-md-3'>
              <CartWelcome />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
