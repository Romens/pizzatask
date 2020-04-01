import React, { Component } from 'react';
import store  from '../reducers/store';

class Comment extends Component {
  constructor (props) {
    super(props);

    this.state = {
      comment: '',
      payment_types: store.getState().payment_types,
      payment_type_id: 1
    };

    this.handleComment = this.handleComment.bind(this);
    this.handlePaymentType = this.handlePaymentType.bind(this);
  }

  handleComment (event) {
    this.setState({comment: event.target.value});
  }

  handlePaymentType (event) {
    this.setState({payment_type_id: parseInt(event.target.value)});
  }

  render () {
    const paymentTypes = this.state.payment_types.map(item => {
      return (
        <div key={item.id} className="form-check">
          <input onChange={ e => { this.handlePaymentType(e) }} className="form-check-input" type="radio" id={'paymentType' + item.id} value={item.id}
            checked={this.state.payment_type_id === item.id} />
          <label className="form-check-label" htmlFor={'paymentType' + item.id}>
            {item.title}
          </label>
        </div>
      );
    });

    return (
      <div className="comment-form card">
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="inputComment">Comment for order</label>
            <input type="text" name="comment" value={this.state.comment} onChange={this.handleComment} className="form-control" id="inputComment" />
          </div>
          <input type="hidden" name="payment_type_id" value={this.state.payment_type_id} />
          {paymentTypes}
        </div>
      </div>
    );
  }
}

export default Comment;
