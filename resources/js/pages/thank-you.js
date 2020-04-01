import React, {Component} from 'react';
import AuthNav from '../components/auth-nav';
import store from '../reducers/store';
import Cart from '../components/Cart';
import Profile from '../components/Profile';
import Address from '../components/Address';
import Comment from '../components/Comment';
import {createOrder} from '../api/main';

class ThankYou extends Component {
  constructor (props) {
    super(props);
    this.state = {
      orders: store.getState().order,
    };

    // this.setSubcriber();
  }

  setSubcriber () {
    this.unsubscribe = store.subscribe(() => {
      let { currency, cart } = store.getState();
      this.setState({
        currency: currency,
        cart: cart
      });
    });
  }

  getFormData (formElem) {
    let form = {};

    for (const index in formElem.elements) {
      let input = formElem.elements[index];
      if (input.name && input.value) {
        form[input.name] = input.value;
      }
    }

    form['cart'] = store.getState().cart;

    return form;
  }

  handleSubmit (event) {
    const form = document.getElementById('orderForm');

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    const order = this.getFormData(form);
    this.setState({loading: true});

    createOrder(order)
      .then(result => {
        this.successOrder(result, order);
      })
      .catch(err => {
        this.state.errors.push(err);
      })
      .finally(() => {
        this.setState({loading: false});
      });

    event.preventDefault();
  }



  componentWillUnmount () {
      this.unsubscribe();
  }


    successOrder (result, order) {
    console.log('successOrder');

    if (order.remember === 'true') {
      this.rememberProfile({
        name: order.name,
        phone: order.phone
      });
    } else {
      this.unrememberProfile();
    }
    console.log(result);
    console.log(order);
  }

  rememberProfile (profile) {
    store.dispatch({
      type: 'REMEMBER_PROFILE',
      payload: profile
    });
  }

  unrememberProfile () {
    store.dispatch({ type: 'UNREMEMBER_PROFILE' });
  }

  componentDidMount () {
    store.dispatch({
      type: 'RESTORE_CART'
    });
  }

  render () {
    const errors = this.state.errors.map(error => {
      return (
        <div className="alert alert-danger">
          <h5>Houston, we have a problem!</h5>
          <p>Try again later!</p>
        </div>
      );
    });

    return (
      <div className="flex flex-col min-h-screen">
        <AuthNav />
        <div className="container create-order-page">
          <div className="title-area">
            <h3>Thank you for order!</h3>
            <div className="alert alert-success">
              <h3>We have started your order.</h3>
              <p>Cooks began to cook and the courier would arrive within 40 minutes.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ThankYou;
