import React, {Component} from 'react';
import AuthNav from '../components/auth-nav';
import FullPageSpinner from '../components/full-page-spinner';
import PizzaEmptyList from '../components/objects/PizzaEmptyList';
import {pizzasList} from '../api/main';
import PizzaList from '../components/objects/PizzaList';
import CartWelcome from '../components/CartWelcome';

class Welcome extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pizzas: null,
      currency: 'EUR',
      currencies: {},
      loading: false
    };

    this.changeCurrency = this.changeCurrency.bind(this);
  }

  componentDidMount () {
    this.getPizzasList();
  }

  update () {
    this.setState({});
  }

  setInitCurrency (code) {
    const userCurrency = window.localStorage.getItem('currency');

    if (userCurrency !== null) {
      if (this.state.currencies[userCurrency]) {
        code = userCurrency;
      }
    }
    window.localStorage.setItem('currency', code);
    this.setState({
      currency: code,
    });
  }

  getPizzasList () {
    this.setState({
      loading: true
    });

    pizzasList()
      .then(result => {
        this.setState({
          pizzas: result.pizzas,
          currencies: result.currencies
        });

        window.localStorage.setItem('currencies', JSON.stringify(result.currencies));
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

  changeCurrency () {
    let keys = Object.keys(this.state.currencies);
    let nextIndex = keys.indexOf(this.state.currency) + 1;
    let nextItem = keys[nextIndex] ? keys[nextIndex] : keys[0];
    this.setState({
      currency: nextItem,
    });
    window.localStorage.setItem('currency', nextItem);
  }

  render () {
    const pizzaList = this.state.pizzas
        ? <PizzaList action={this.changeCurrency}
                     update={this.update}
                     currencies={this.state.currencies}
                     currency={this.state.currency}
                     list={this.state.pizzas} />
        : <PizzaEmptyList/>;

    const loader = <FullPageSpinner/>;

    return (
      <div className="flex flex-col min-h-screen">
        <AuthNav />
        <div className="container">
          <div className="pizza_list">
            {this.state.loading ? loader : pizzaList}
          </div>
          <CartWelcome
            changeCurrency={this.changeCurrency}
            currencies={this.state.currencies}
            currency={this.state.currency}/>
        </div>
      </div>
    );
  }
}

export default Welcome;
