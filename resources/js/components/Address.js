import React, { Component } from 'react';

class Profile extends Component {
  constructor (props) {
    super(props);

    this.state = {
      address: '',
      zip: ''
    };

    this.handleAddress = this.handleAddress.bind(this);
    this.handleZip = this.handleZip.bind(this);
  }

  handleAddress (event) {
    this.setState({address: event.target.value});
  }
  handleZip (event) {
    this.setState({zip: event.target.value});
  }

  render () {
    return (
      <div className="address-form card">
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="inputAddress">Street address</label>
            <input name="address" required type="text" value={this.state.address} onChange={this.handleAddress} className="form-control" id="inputAddress" />
            <div className="valid-feedback">
              Please enter your address
            </div>
            <div className="valid-feedback">
                We will deliver your pizza to: {this.state.name}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputName">ZIP code <small className="text-muted">(optional)</small></label>
            <input name="zip" type="number" value={this.state.zip} onChange={this.handleZip} className="form-control" id="inputZip" />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
