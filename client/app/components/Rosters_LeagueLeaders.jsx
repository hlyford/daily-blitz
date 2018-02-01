import React from 'react';
import NavBar from './NavBar.jsx';

var Rosters = React.createClass({

  getInitialState: function() {
    var league = this.props.location.query['league'];
    return { league: league, rosters: [] , western :[], eastern: [] };
  },

  componentWillMount: function () {
    this.getRosters(this.state.league);
  },

  // detect changes in league selected and reload the page if they switch leagues
  queryString: '',

  componentWillUpdate: function () {
    this.queryString = this.props.location.query['league'];
  },

  componentDidUpdate: function () {
    var newQueryString = this.props.location.query['league'];
    if (this.queryString !== newQueryString) {
      window.location.reload();
    }
  },

  sortByConference: function (teams) {
    var eastern = [], western = [];
    // just alternate soccer teams in columns
    if (teams[0].league === 'soccer') {
      teams.forEach(function(team, index) {
        if (index % 2 === 0) {
          western.push(team);
        } else {
          eastern.push(team);
        }
      });
    } else {
      // other sports
      teams.forEach(function(team, index) {
        if (team.conference === 'western' || team.conference === 'afc' || team.conference === 'al') {
          western.push(team);
        } else {
          eastern.push(team);
        }
      });
    }
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
    var state = this.state;
    var westernTeams = this.state.western.map(function (team) {
      team.url = `#/quiz?league=${state.league}&quiz_id=${team.acronym}`;
      if (state.league !== 'nba') {
        team.img = "../../dist/images/team_logo_images/" + state.league + "_" + team.acronym + ".png";
      } else {
        team.img = "../../dist/images/team_logo_images/" + team.acronym + ".png";
      }
      return (
         <li key={ team.acronym }>
          <img src={ team.img } />
          <a id={ team.acronym }href={ team.url }>{ team.team_name }</a>
         </li>
      )
    });
    var easternTeams = this.state.eastern.map(function (team) {
      team.url = `#/quiz?league=${state.league}&quiz_id=${team.acronym}`;
      if (state.league !== 'nba') {
        team.img = "../../dist/images/team_logo_images/" + state.league + "_" + team.acronym + ".png";
      } else {
        team.img = "../../dist/images/team_logo_images/" + team.acronym + ".png";
      }
      return (
         <li key={ team.acronym }>
          <img src={ team.img } />
          <a id={ team.acronym } href={ team.url }>{ team.team_name }</a>
         </li>
      )
      });
    return (
      <div>
        <NavBar todayQuizAcronym={this.state.todayQuizAcronym}/>
        <div className="container main">
          <div className="content-container twelve columns">
            <div className="main-quiz-content">
              <div className="roster-view views">
                <div className="page-titles"><h2>Name all the players on a team</h2></div>
                <div className="five columns">
                  <div>{this.state.league === 'nba' ? "Eastern Conference Teams" :
                  this.state.league === 'nfl' ? "NFC" :
                  this.state.league === 'mlb' ? "National League" : "English Premier League" }</div>
                  <ul>
                    { easternTeams }
                  </ul>
                </div>
                <div className="five columns">
                  <div>{this.state.league === 'nba' ? "Western Conference Teams" :
                  this.state.league === 'nfl' ? "AFC" :
                  this.state.league === 'mlb' ? "American League" : null }</div>
                  <ul>
                    { westernTeams }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default Rosters;