import React, { Component } from 'react';
import store from '../reducers/store';

class Profile extends Component {
  constructor (props) {
    super(props);

    let {name, phone} = store.getState().profile;

    this.state = {
      name: name || '',
      phone: phone || '',
      remember: (name && phone)
    };

    this.handleName = this.handleName.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleRemember = this.handleRemember.bind(this);
  }

  handleName (event) {
    this.setState({name: event.target.value});
  }

  handlePhone (event) {
    this.setState({phone: event.target.value});
  }

  handleRemember (event) {
    this.setState({
        remember: !this.state.remember
    });
  }

  render () {
    return (
      <div className="address-form card">
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="inputName">Your Name</label>
            <input name="name" required placeholder="John Doe" type="text" value={this.state.name} onChange={this.handleName} className="form-control" id="inputName" />
              <div className="valid-feedback">
                Nice to meet you, {this.state.name}!
              </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPhone">Your phone</label>
            <input type="text" required
              value={this.state.phone} onChange={this.handlePhone}
              name="phone" className="form-control" id="inputPhone" aria-describedby="phoneHelp" />
            <small id="emailHelp" className="form-text text-muted">Example: +78005535353
            </small>
              <div className="invalid-feedback">
                 This is not phone, please try again!
              </div>
          </div>
          <div className="form-group form-check">
            <input name="remember" type="hidden" value={this.state.remember} />
            <input checked={this.state.remember} onChange={this.handleRemember} type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Remember me!</label>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
