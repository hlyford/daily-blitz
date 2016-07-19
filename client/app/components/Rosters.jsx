import React from 'react';

var Rosters = React.createClass({

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