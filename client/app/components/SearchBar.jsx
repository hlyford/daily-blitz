// ----- Subcribe COMPONENT ---- //
import React from 'react';
import Search from 'react-search';

var SearchBar = React.createClass({
  getInitialState: function() {
    return { query: null , search_results: [], search_keys: ['team_name'], search_term: 'team_name' };
  },
  componentWillMount: function () {
    // this.getTeams();
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
        data = _.pluck(data, 'item');
        this.setState({ search_results: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getTeams: function () {
    $.ajax({
      url: '/search',
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {

      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  openTeamQuiz: function (e) {
    var teamName = $(e.target).text();
    var selectedTeam = _.find(this.state.search_results, function(team) {
      return team.team_name === teamName;
    });
    window.open(`/#/quiz?league=${selectedTeam.league}&quiz_id=${selectedTeam.acronym}`, '_self');
    location.reload(true);
  },

  render: function() {
    return (
      <div className="search-view">
        <div>
          {/* }<input className="enter-email" type="text" id="email" onChange={ this.handleChange } placeholder="Search for your team"/> */}
        </div>
        <Search placeholder="Search for a team" ItemElement='a' onClick={this.openTeamQuiz} onChange={ this.handleChange } items={this.state.search_results} keys={this.state.search_keys} searchKey={this.state.search_term} />
      </div>
    )
  }
});

export default SearchBar;