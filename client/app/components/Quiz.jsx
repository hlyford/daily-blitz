// ----- QUIZ COMPONENT ---- //
import React from 'react';
import ReactDOM from 'react-dom';
import ReactImageFallback from "react-image-fallback";
import NavBar from './NavBar.jsx';
import SuggestedQuizzes from './SuggestedQuizzes.jsx';

var Quiz = React.createClass({
  getInitialState: function() {
    return { quiz_info: {}, correct: [], takingQuiz: false, active_quiz: '', timeLeft: 0, quizEnded: false };
  },
  componentWillMount: function () {
    // check which league it is and set state
    this.state.league = this.props.location.query['league'];
    // check if there's a query string param, if so, set up that quiz
    var quizQueryParam = this.props.location.query['quiz_id'];
    // check if it's a roster; PLACEHOLDER ALL AS ROSTERS FOR NOW
    var quizRosterParam = true;
    if (quizQueryParam) {
      if (quizRosterParam) {
        this.state.roster = true;
      }
      this.state.active_quiz = quizQueryParam;
    } else {
      // PLACEHOLDER KOBE QUIZ FOR NOW
      this.state.active_quiz = '2x68a';
    }
    // this.getQuiz();
  },
  componentDidMount: function () {
    this.getQuiz();
    // DOESN'T WORK YET
    if ((this.refs.guess) !== undefined) {
      (this.refs.guess).focus();
    }
  },
  componentWillUnmount: function() {
      // this.getQuiz.abort();
  },
  componentDidUpdate: function(){
    var node = ReactDOM.findDOMNode(this.refs.guess);
    node !== null ? node.focus() : null;
  },

  handleChange: function(event) {
  	var guess = event.target.value.toLowerCase().trim();
    // check the guess against all the first and last names, and the names that removed diacritics
  	var lastNames = _.pluck(this.state.quiz_info.players, 'lastNameLower'), lastNamesCorrect = _.pluck(this.state.correct, 'lastNameLower');
  	var fullNames = _.pluck(this.state.quiz_info.players, 'fullNameLower'), fullNamesCorrect = _.pluck(this.state.correct, 'fullNameLower');
    var lastNames_r = _.pluck(this.state.quiz_info.players, 'lastNameLower_r'), lastNames_r_Correct = _.pluck(this.state.correct, 'lastNameLower_r');
    var fullNames_r = _.pluck(this.state.quiz_info.players, 'fullNameLower_r'), fullNames_r_Correct = _.pluck(this.state.correct, 'fullNameLower_r');
  	// check if they entered the last name, keep track of index
  	var indexLastName = _.indexOf(lastNames, guess), indexLastNameCorrect = _.indexOf(lastNamesCorrect, guess);
  	var indexFullName = _.indexOf(fullNames, guess), indexFullNameCorrect = _.indexOf(fullNamesCorrect, guess);
    var indexLastName_r = _.indexOf(lastNames_r, guess), indexLastName_r_Correct = _.indexOf(lastNames_r_Correct, guess);
    var indexFullName_r = _.indexOf(fullNames_r, guess), indexFullName_r_Correct = _.indexOf(fullNames_r_Correct, guess);
    // check if the it's been guessed before
    if ((indexLastNameCorrect !== -1 || indexFullNameCorrect !== -1 || indexLastName_r_Correct !== -1 || indexFullName_r_Correct !== -1)) {
      this.flash('red');
      $('.guess-box').val('ALREADY GUESSED!');
      var that = this;
      setTimeout( function () {
        $('.guess-box').val('');
      }, 500);
    } else {
    	// if the entered LAST NAME, they got it correct and they hadn't guessed it before
    	if ((indexLastName !== -1 || indexFullName !== -1 || indexLastName_r !== -1 || indexFullName_r !== -1)) {
        // add player to the correct array
        if (indexFullName !== -1) {
    		  this.setState({ correct: this.state.correct.concat( this.state.quiz_info.players[indexFullName]) });
        } else if (indexLastName !== -1) {
          this.setState({ correct: this.state.correct.concat( this.state.quiz_info.players[indexLastName]) });
        } else if (indexFullName_r !== -1) {
          this.setState({ correct: this.state.correct.concat( this.state.quiz_info.players[indexFullName_r]) });
        } else {
          this.setState({ correct: this.state.correct.concat( this.state.quiz_info.players[indexLastName_r]) });
        }
    		// reset the guess box
    		$('.guess-box').val('');
        this.flash();
    	}
    }
  },

  flash: function (color) {
    var classColor = color ? 'boom-red' : 'boom';
    $('.main-quiz-content .guess-box').addClass(classColor);
    setTimeout(function() {
      $('.main-quiz-content .guess-box').removeClass(classColor);
    }, 1000)
  },

  addFullNameAndConvertLowerCase: function (list) {
    // make it simpler if it's a roster FOR NOW
    if (this.state.roster) {
      list.title = list.team_name;
    } else {
      _.each(list.players, function(item, index, players) {
        // make full name
        item.fullName = `${item.firstName} ${item.lastName}`;
        // convert to lower case
        item.firstNameLower = item.firstName.toLowerCase(), item.lastNameLower = item.lastName.toLowerCase();
        item.fullNameLower = item.fullName.toLowerCase();
      });
    }
    return list;
  },
  startQuiz: function () {
    this.setState({'takingQuiz': true});
    var totalTime = this.state.quiz_info.players.length * 10;
    // time allowed is lesser of 240 or 10 seconds/player
    totalTime = totalTime > 240 ? 240 : totalTime;
    this.setState({'timeLeft' : totalTime});
    this.timer();
  },
  timer: function () {
    var that = this;
    var counter = setInterval(function () {
      // if time is up, end quiz
      if (that.state.timeLeft === 0) {
        that.giveUp();
        clearInterval(counter);
      } else {
        var newTime = that.state.timeLeft - 1;
        that.setState({timeLeft: newTime});
      }
    }, 1000);
  },
  timeFormatter: function (seconds) {
    if (seconds === 0) {return "Time's up!";}
    var sec_num = parseInt(seconds, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (minutes < 10) {minutes = minutes;}
    if (seconds < 10) {seconds = `0${seconds}`;}
    return `${minutes}:${seconds}`;
  },

  getQuiz: function() {
    var route = this.state.roster ? `/roster/${this.state.league}/team/` : '/quiz/';
    $.ajax({
      url: route + this.state.active_quiz,  // test query: 2x68a
      dataType: 'json',
      cache: false,
      success: function(data) {
        // console.log('from server', data);
        this.state.quiz_info = this.addFullNameAndConvertLowerCase(data[0]);
        this.setState({team_name: data[0].team_name})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  giveUp: function() {
    // add diff between correct players and all players to correct array
    var diff = _.difference(this.state.quiz_info.players, this.state.correct);
    this.setState({correct: this.state.correct.concat(diff)});
    this.setState({ quizEnded: true , timeLeft: 0 });
  },

  render: function() {
    console.log('state', this.state);
    return (
      <div>
        <NavBar todayQuizAcronym={this.state.todayQuizAcronym}/>
        <div className="container main">
          <div className="content-container twelve columns">
            <div className="main-quiz-content">
              <div className="quiz-view views">
                <div><img className="team-logo" src= {this.state.league === 'nba' ? `../../dist/images/team_logo_images/${this.state.quiz_info.acronym}.png` : `../../dist/images/team_logo_images/${this.state.league}_${this.state.quiz_info.acronym}.png`} /></div>
                <div className="page-titles"><h2>{ this.state.quiz_info.team_name }</h2></div>
                  <div className="quiz-view-body">
                    { !this.state.takingQuiz ?
                      <div>
                        <div>Try to name all the players on the current roster (last name or full name) before time expires.</div>
                        <button className="text-middle" onClick={ this.startQuiz }>Take quiz!</button>
                      </div> :
                      <div>
                        <div className="guess-box-container text-middle">

                       { <div> You have answered: {this.state.correct.length} / {this.state.quiz_info.players.length}</div> }
                          <input ref="guess" className="guess-box" type="text" name="guessing" value={this.state.guessValue} onChange={this.handleChange} />
                        </div>
                        <div className="correct-guess-container">
                          <ul>
                            { this.state.correct.map((item)=>
                              (
                            <li key={item.fullName}>
                              <ReactImageFallback
                              src={"../../dist/images/" + this.state.league + "_player_images/" + item.firstNameLower.replace(/ /g,"_").replace(/'/g, "")  + "_" + item.lastNameLower.replace(/'/g, "") + ".png"}
                              fallbackImage="../../dist/images/grey_man.png" style={this.state.league === 'soccer' ? {height: "75px", margin: "0 10px 0 0", borderRadius: "50%"}  : {display: "inline"} }/>
                              <span>{item.fullName} | #{item.player_number} {item.position}</span>
                            </li>
                            ))
                            }
                          </ul>
                        </div>
                        <div className="timer">{ this.timeFormatter(this.state.timeLeft) }</div>
                        { !this.state.quizEnded ? <button onClick={ this.giveUp } className="give-up-button button button-primary">Give up</button> : <SuggestedQuizzes team={ this.state.quiz_info } /> }
                      </div>
                    }
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default Quiz;