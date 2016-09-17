// ----- Subcribe COMPONENT ---- //
import React from 'react';

var SuggestedQuizzes = React.createClass({
  getInitialState: function() {
    return { league: this.props.team.league, conference: this.props.team.conference, suggested: [] };
  },
  componentDidMount: function () {
    this.getTeams();
  },
  makeSuggestedTeams: function (teams) {
    var indexesSelected = [];
    // make a random team index as long as it's not already selected
    function makeRandomNumber () {
      var number = Math.floor(Math.random() * teams.length);
      if (indexesSelected.indexOf(number) === -1) {
        return number;
      } else {
        return makeRandomNumber();
      }
    }
    indexesSelected = [makeRandomNumber(), makeRandomNumber(), makeRandomNumber()];
    this.setState({ suggested: [ teams[indexesSelected[0]], teams[indexesSelected[1]], teams[indexesSelected[2]]] });
  },
  getTeams: function () {
    $.ajax({
      url: `/roster/${this.state.league}`,
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.makeSuggestedTeams(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  openTeamQuiz: function (acronym) {
    window.open(`/#/quiz?league=${this.state.league}&quiz_id=${acronym}`, '_self');
    location.reload(true);
  },

  render: function() {
    return (
      <div className="suggested-quizzes-view">
        <div>You might also like</div>
        <div>
          <ul>
            { this.state.suggested.map((team)=>
              (
              <li key={team.acronym} >
                <a onClick={ this.openTeamQuiz.bind(this, team.acronym) }>{ team.team_name } </a>
              </li>
            ))
            }
          </ul>
        </div>
      </div>
    )
  }
});

export default SuggestedQuizzes;
