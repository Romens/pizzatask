import React, {Component} from 'react';
import CrustSelect from './CrustSelect';
import SizeSelect from './SizeSelect';
import Cart from '../Cart';

class PizzaMiniView extends Component {

  constructor (props) {
    super(props);

    const variant = this.getInitVariant(props.pizza);

    this.state = {
      pizza: props.pizza,
      variant: variant,
    };

    this.setCrust = this.setCrust.bind(this);
    this.setSize = this.setSize.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  getInitVariant (pizza) {
    const key = window.localStorage.getItem('pizza_' + pizza.id);
    if (key !== null) {
      return pizza.variants.filter(item => { return parseInt(key) === item.id; })[0];
    }
    return pizza.variants[0];
  }

  setCrust (crustId) {
    this.updateVariant(
      crustId,
      this.state.variant.size_id
    );
  }
  setSize (sizeId) {
    this.updateVariant(
      this.state.variant.crust_id,
      sizeId
    );
  }

  addToCart () {
    Cart.addToCart(this.state.variant, this.state.pizza);
    this.props.update();
  }

  updateVariant (crustId, sizeId) {
    const variant = this.state.pizza.variants.filter(item => {
      return (item.crust_id === crustId) && (item.size_id === sizeId);
    })[0];

    window.localStorage.setItem(
      'pizza_' + this.state.pizza.id,
      variant.id
    );

    this.setState({
      variant: variant
    });
  }

  render () {
    let imageArea = null;

    if (this.state.pizza.image) {
      imageArea = (
        <img className="card-img-top" src={this.state.pizza.image_url} alt={this.state.pizza.title} />
      );
    }

    const ingredients = this.state.pizza.ingredients.map(item =>
      <span key={item.id}>{item.title}</span>
    );

    const price = this.state.variant.prices[this.props.currency];

    return (
      <div className='col'>
        <div className='pizza-mini-view card'>
          {imageArea}
          <div className='card-body'>
            <div className='title'>{this.state.pizza.title}</div>
            <div className='description'>Pizza with {ingredients} and {this.state.pizza.sauce}</div>
          </div>
          <div className='selects'>
            <CrustSelect action={this.setCrust} value={this.state.variant.crust_id} crusts={this.state.pizza.crusts}/>
            <SizeSelect action={this.setSize} value={this.state.variant.size_id} sizes={this.state.pizza.sizes}/>
          </div>
          <div className='card-footer footer'>
            <div className='price' onClick={this.props.action}>
              <div>{price.value} {price.symbol}</div>
            </div>
            <button onClick={this.addToCart} className='btn btn-special to-cart'>
                Add to cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PizzaMiniView;
