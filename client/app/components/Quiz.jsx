// ----- QUIZ COMPONENT ---- //
import React from 'react';

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
  },
  componentWillUnmount: function() {
      this.getQuiz.abort();
  },
  handleChange: function(event) {
  	var guess = event.target.value.toLowerCase();
  	var lastNames = _.pluck(this.state.quiz_info.players, 'lastNameLower');
  	var fullNames = _.pluck(this.state.quiz_info.players, 'fullNameLower');
  	// check if they entered the last name, keep track of index
  	var indexLastName = _.indexOf(lastNames, guess);
  	var indexFullName = _.indexOf(fullNames, guess);
  	// if the entered LAST NAME, they got it correct and they hadn't guessed it before
  	if (indexLastName !== -1 && _.indexOf(this.state.correct['last_name'], guess) === -1) {
  		var correctName = this.state.quiz_info.players[indexLastName].fullName;
      var correctLastName = this.state.quiz_info.players[indexLastName].lastName;
  		this.setState({ correct: this.state.correct.concat( {full_name:correctName, last_name: correctLastName}) });
  		// ***** remove the player from the list ****

  		// reset the guess box
  		$('.guess-box').val('');
      this.flash();
  	// check if they entered the players FULL NAME
  	} else if (indexFullName !== -1) {
	    var correctName = this.state.quiz_info.players[indexFullName].fullName;
      var correctLastName = this.state.quiz_info.players[indexFullName].lastName;
      this.setState({ correct: this.state.correct.concat( {full_name:correctName, last_name: correctLastName}) });
  		// this.setState(correct: this.state.correct.concat(correctName);
  		// ***** remove the player from the list ****

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
    this.setState({'takingQuiz' :true});
  },

  getQuiz: function() {
    var route = this.state.roster ? '/roster/' : '/quiz/';
    $.ajax({
      url: route + this.state.active_quiz,  // test query: 2x68a
      dataType: 'json',
      cache: false,
      success: function(data) {
        // console.log('from server', data);
        this.state.quiz_info = this.addFullNameAndConvertLowerCase(data[0]);
        // console.log('done with sort', this.state);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
    	<div className="quiz-view">
        { !this.state.takingQuiz ?
          <button className="text-middle" onClick={ this.startQuiz }>Take quiz!</button> :
          <div>
            <div className="guess-box-container text-middle">
              <div>{ this.state.quiz_info.title }</div>
           { <div> You have answered: {this.state.correct.length} / {this.state.quiz_info.players.length}</div> }
      	      <input className="guess-box" type="text" value={this.state.guessValue} onChange={this.handleChange} />
            </div>
      	    <div>
        		  <ul>
  						  {this.state.correct.map((item)=>(
  							 <li key={item.full_name}>
  								  {item.full_name}
  							 </li>
  						  ))}
  					  </ul>
      	    </div>
          </div> }
      </div>
    )
  }
});

export default Quiz;