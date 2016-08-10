// ----- Subcribe COMPONENT ---- //
import React from 'react';

var Subscribe = React.createClass({
  getInitialState: function() {
    return { email: null, phone_number: null, response: null };
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
        if ('err' in data) {
          this.setState({response: data.err});
        } else {
          this.setState({response: `You have been subscribed with email: ${data.email}. Look for our email in your inbox tomorrow!` });
        }
        console.log(this.state);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  },
  render: function() {
    return (
      <div className="subscribe-view">
        <div className="page-titles"><h2>Subscribe to daily sports quizzes</h2></div>
        <div>Enter your email, phone number, or both</div>
        <div>
          Get email updates: <input className="enter-email" type="text" id="email" onChange={ this.handleChange } placeholder="Email address"/>
        </div>
        <div>
          Get mobile phone updates: <input className="enter-email" type="text" id="phone" onChange={ this.handleChange } placeholder="Phone number" />
        </div>
        { !this.state.response ? <button onClick={ this.submitForm }>Submit</button> :
           this.state.response }
      </div>
    )
  }

});

export default Subscribe;