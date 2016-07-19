// ----- Subcribe COMPONENT ---- //
import React from 'react';

var Subscribe = React.createClass({
  getInitialState: function() {
    return { email: null, phone_number: null };
  },
  handleChange: function (event) {
    var entry = event.target.value;
    if (event.target.id === 'email') {
      this.state.email = entry;
    } else {
      this.state.phone_number = entry;
    }
  },
  submitForm: function (event) {
    var submission = {email: this.state.email, phone_number: this.state.phone_number};
    // call off to backend with user info
    $.ajax({
      url: '/user',
      type: 'POST',
      dataType: 'json',
      data: submission,
      cache: false,
      success: function(data) {
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  },
  render: function() {
    return (
      <div className="subscribe-view">
        <div>Enter your email, phone number, or both</div>
        <div>
          Get email updates: <input className="enter-email" type="text" id="email" onChange={ this.handleChange } placeholder="Email address"/>
        </div>
        <div>
          Get mobile phone updates: <input className="enter-email" type="text" id="phone" onChange={ this.handleChange } placeholder="Phone number" />
        </div>
        <button onClick={ this.submitForm }>Submit</button>
      </div>
    )
  }

});

export default Subscribe;