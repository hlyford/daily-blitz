// ----- QUIZ COMPONENT ---- //
import React from 'react';
import ReactDOM from 'react-dom';

var Quiz = React.createClass({
  getInitialState: function() {
    return { quiz_info: {}, correct: [], takingQuiz: false, active_quiz: '' };
  },
  componentWillMount: function () {
    // check if there's a query string param, if so, set up that quiz
    var quizQueryParam = this.props.location.query['quiz_id'];
    // check if it's a roster
    var quizRosterParam = this.props.location.query['roster'];
    if (quizQueryParam) {
      if (quizRosterParam) {
        this.state.roster = true;
      }
      this.state.active_quiz = quizQueryParam;
    } else {
      // PLACEHOLDER KOBE QUIZ FOR NOW
      this.state.active_quiz = '2x68a';
    }
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
    node.focus();
  },

  handleChange: function(event) {
  	var guess = event.target.value.toLowerCase().trim();
    // check the guess against all the first and last names
  	var lastNames = _.pluck(this.state.quiz_info.players, 'lastNameLower');
  	var fullNames = _.pluck(this.state.quiz_info.players, 'fullNameLower');
  	// check if they entered the last name, keep track of index
  	var indexLastName = _.indexOf(lastNames, guess);
  	var indexFullName = _.indexOf(fullNames, guess);

  	// if the entered LAST NAME, they got it correct and they hadn't guessed it before
  	if ((indexLastName !== -1 || indexFullName !== -1) && _.indexOf(this.state.correct['last_name'], guess) === -1) {
      // add player to the correct array
      if (indexFullName === -1) {
  		  this.setState({ correct: this.state.correct.concat( this.state.quiz_info.players[indexLastName]) });
      } else {
        this.setState({ correct: this.state.correct.concat( this.state.quiz_info.players[indexFullName]) });
      }
  		// reset the guess box
  		$('.guess-box').val('');
      this.flash();
  	}
  },

  flash: function () {
    $('.main-quiz-content .guess-box').addClass('boom');
    setTimeout(function() {
      $('.main-quiz-content .guess-box').removeClass('boom');
    }, 1000)
  },

  addFullNameAndConvertLowerCase: function (list) {
    // make it simpler if it's a roster FOR NOW
    if (this.state.roster) {
      list.title = list.team_name;
    } else {
      _.each(list.players, function(item, index, players) {
        // make full name
        item.fullName = item.firstName + ' ' + item.lastName;
        // convert to lower case
        item.firstNameLower = item.firstName.toLowerCase(), item.lastName = item.lastName.toLowerCase();
        item.fullNameLower = item.fullName.toLowerCase();
      });
    }
    return list;
  },
  startQuiz: function () {
    this.setState({'takingQuiz': true});
  },

  getQuiz: function() {
    var route = this.state.roster ? '/roster/team/' : '/quiz/';
    $.ajax({
      url: route + this.state.active_quiz,  // test query: 2x68a
      dataType: 'json',
      cache: false,
      success: function(data) {
        // console.log('from server', data);
        this.state.quiz_info = this.addFullNameAndConvertLowerCase(data[0]);
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
  },

  render: function() {

    return (
    	<div className="quiz-view">
        <div className="page-titles"><h2>{ this.state.quiz_info.title ? this.state.quiz_info.title : "Start the quiz" }</h2></div>
        { !this.state.takingQuiz ?
          <button className="text-middle" onClick={ this.startQuiz }>Take quiz!</button> :
          <div>
            <div className="guess-box-container text-middle">
              <div><img className="team-logo" src= {"../../dist/images/team_logo_images/" + this.state.quiz_info.acronym + ".png"} /> { this.state.quiz_info.title }</div>
           { <div> You have answered: {this.state.correct.length} / {this.state.quiz_info.players.length}</div> }
      	      <input ref="guess" className="guess-box" type="text" name="guessing" value={this.state.guessValue} onChange={this.handleChange} />
            </div>
      	    <div className="correct-guess-container">
        		  <ul>
  						  {this.state.correct.map((item)=>(

  							 <li key={item.fullName}>
                    <img src={"../../dist/images/nba_player_images/" + item.firstName.replace(/ /g,"_") + "_" + item.lastName + "_" + this.state.quiz_info.acronym + ".png"} />
                    <img src={"../../dist/images/nba_player_images/" + item.firstName.replace(/ /g,"_") + "_" + item.lastName + ".png"} />
  								  {item.fullName}
  							 </li>
  						  ))}
  					  </ul>
      	    </div>
            { this.state.takingQuiz ?
            <button onClick={ this.giveUp } className="give-up-button button button-primary">Give up</button> : null
            }
          </div> }
      </div>
    )
  }
});

export default Quiz;