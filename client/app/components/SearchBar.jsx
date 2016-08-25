// ----- Subcribe COMPONENT ---- //
import React from 'react';

var SearchBar = React.createClass({
  getInitialState: function() {
    return { query: null };
  },
  handleChange: function (event) {
    var entry = event.target.value;
    this.setState({ query: entry });
    if (this.state.query !== null) {
      this.sendQuery(this.state.query);
    }
  },
  sendQuery: function (query) {
    // call off to backend with user info
    $.ajax({
      url: '/search',
      type: 'POST',
      dataType: 'json',
      data: {query: query},
      cache: false,
      success: function(data) {
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  },
  render: function() {
    return (
      <div className="search-view">
        <div>
          <input className="enter-email" type="text" id="email" onChange={ this.handleChange } placeholder="Search for your team"/>
        </div>
      </div>
    )
  }

});

export default SearchBar;