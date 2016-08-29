// ----- Subcribe COMPONENT ---- //
import React from 'react';
import SearchBar from './SearchBar.jsx';

var NavBar = React.createClass({
  getInitialState: function() {  	;
    return {todayQuizAcronym: 'manchester-united', todayQuizLeague: 'soccer' };
  },
  openTodayQuiz: function () {
  	window.open(`/#/quiz?league=${this.state.todayQuizLeague}&quiz_id=${this.state.todayQuizAcronym}`,"_self");
  },
  gaEvent: function (event) {
    googleClickEvent(league);
  },
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">
              <img src="./dist/images/lightning-bolt3.png" />
            </a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="navbar-item hide"><a className="navbar-link" href="/#">Home</a></li>
              <li className="navbar-item">
                <a className="navbar-link" href="" data-toggle="dropdown" data-popover="subscribe" role="button" aria-haspopup="true" aria-expanded="false">Rosters<span className="caret">
                </span></a>
                <ul className="dropdown-menu">
                  <li><a href="#/rosters?league=nba" onClick={ this.gaEvent.bind(this, 'nba') }>NBA</a></li>
                  <li><a href="#/rosters?league=nfl" onClick={ this.gaEvent.bind(this, 'nfl') }>NFL</a></li>
                  <li><a href="#/rosters?league=mlb" onClick={ this.gaEvent.bind(this, 'mlb') }>MLB</a></li>
                  <li><a href="#/rosters?league=soccer" onClick={ this.gaEvent.bind(this, 'soccer') }>Soccer</a></li>
                  <li><a href="#/rosters?league=mlb" onClick={ this.gaEvent.bind(this, 'nhl') }>NHL (coming soon)</a></li>
                </ul>
              </li>
              <li className="navbar-item">
                <a className="navbar-link" href="" onClick={ this.openTodayQuiz } data-popover="#codeNavPopover">Todays Quiz</a>
              </li>
              <li className="navbar-item">
                <a className="navbar-link" href="#/subscribe" data-popover="subscribe">Subscribe</a>
              </li>
              <li className="navbar-item">
                <a className="navbar-link" data-popover="subscribe" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-content="Click Rosters to select your sport then choose a team. Your goal is to name all the players on the team.">How this works</a>
              </li>
              <li className="navbar-item"><SearchBar /></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }

});

export default NavBar;
