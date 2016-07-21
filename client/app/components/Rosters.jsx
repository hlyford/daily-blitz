import React from 'react';

var Rosters = React.createClass({
	getInitialState: function() {
	  return { rosters: [] , western :[], eastern: [] };
	},
	sortByConference: function (teams) {
		var eastern = [], western = [];
		teams.forEach(function(team, index) {
			if (team.conference === 'western') {
				western.push(team);
			} else {
				eastern.push(item);
			}
		});
		this.setState({ rosters: teams, western: western, eastern: eastern });
	},
	componentDidMount: function () {
		// call off for all team rosters
		$.ajax({
		  url: '/roster',
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
		    this.sortByConference(data);
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},
	render: function () {
		return (
			<div className="roster-view">
		    <div className="six columns">
		    	<div>Eastern Conference Teams</div>
    		  <ul>
					  {this.state.eastern.map((team)=>
						  	(
							 <li key={ team.acronym }>
								  { team.name }
							 </li>
						  ))}
				  </ul>
				</div>
		    <div className="six columns">
		    	<div>Western Conference Teams</div>
    		  <ul>
					  {this.state.western.map((team)=>
						  	(
							 <li key={ team.acronym }>
								  <a data={ team.acronym }>{ team.name }</a>
							 </li>
						  ))}
				  </ul>
		    </div>
		  </div>
		)
	}
});

export default Rosters;