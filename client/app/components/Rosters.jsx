import React from 'react';

var Rosters = React.createClass({
	getInitialState: function() {
		var league = this.props.location.query['league'];
	  return { league: league, rosters: [] , western :[], eastern: [] };
	},
	componentWillMount: function () {
		this.getRosters(this.state.league);
	},
	// detect changes in league selected
	componentDidUpdate: function () {
		// this.getRosters(league);
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
	getRosters: function (league) {
		// call off for all team rosters for given league
		$.ajax({
		  url: '/roster/' + league,
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
		  	// console.log(JSON.stringify(data));
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
	  			  <a id={ team.acronym }href={ team.url }>{ team.team_name }</a>
	  		 </li>
		  )
		});
		var easternTeams = this.state.eastern.map(function (team) {
			team.url = "#/quiz?roster=1&quiz_id=" + team.acronym;
		  return (
	  		 <li key={ team.acronym }>
	  			  <a id={ team.acronym } href={ team.url }>{ team.team_name }</a>
	  		 </li>
		  )
			});
		return (
			<div className="roster-view">
				<div className="page-titles"><h2>Name all the players on a team</h2></div>
		    <div className="five columns">
		    	<div>Eastern Conference Teams</div>
    		  <ul>
    		  	{ easternTeams }
				  </ul>
				</div>
		    <div className="five columns">
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