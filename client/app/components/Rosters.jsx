import React from 'react';

var Rosters = React.createClass({
	getInitialState: function() {
	  return { rosters: [] , western :[], eastern: [] };
	},
	componentWillMount: function () {
		this.getRosters();
	},
	sortByConference: function (teams) {
		var eastern = [], western = [];
		teams.forEach(function(team, index) {
			if (team.conference === 'western') {
				western.push(team);
			} else {
				eastern.push(team);
			}
		});
		this.setState({ rosters: teams, western: western, eastern: eastern });
	},
	getRosters: function () {
		// call off for all team rosters
		$.ajax({
		  url: '/roster',
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
		  	console.log(JSON.stringify(data));
		    this.sortByConference(data);
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},
	render: function () {
		var westernTeams = this.state.western.map(function (team) {
			team.url = "#/quiz?roster=1&quiz_id=" + team.acronym;
		  return (
	  		 <li key={ team.acronym }>
	  			  <a href={ team.url }>{ team.team_name }</a>
	  		 </li>
		  )
		});
		var easternTeams = this.state.eastern.map(function (team) {
			team.url = "#/quiz?roster=1&quiz_id=" + team.acronym;
		  return (
	  		 <li key={ team.acronym }>
	  			  <a data={ team.url }>{ team.team_name }</a>
	  		 </li>
		  )
			});
		return (
			<div className="roster-view">
		    <div className="six columns">
		    	<div>Eastern Conference Teams</div>
    		  <ul>
    		  	{ easternTeams }
				  </ul>
				</div>
		    <div className="six columns">
		    	<div>Western Conference Teams</div>
    		  <ul>
					  { westernTeams }
				  </ul>
		    </div>
		  </div>
		)
	}
});

export default Rosters;