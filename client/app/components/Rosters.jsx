import React from 'react';

var Rosters = React.createClass({
	getInitialState: function() {
	  return { rosters: [] };
	},
	componentDidMount: function () {
		// call off for all team rosters
		$.ajax({
		  url: '/roster',
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
		    console.log(data);
		    this.setState({ rosters: data });
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},
	render: function () {
		return (
			<div className="roster-view">
		    <div className="six columns">Eastern Conference Teams</div>
		    <div className="six columns">Western Conference Teams</div>
		  </div>
		)
	}
});

export default Rosters;