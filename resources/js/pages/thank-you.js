import React, {Component} from 'react';
import AuthNav from '../components/auth-nav';
import store from '../reducers/store';

class ThankYou extends Component {
  constructor (props) {
    super(props);
    this.state = {
      orders: store.getState().order
    };
  }

  render () {

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
