// ----- QUIZ COMPONENT ---- //
import React from 'react';

var Quiz = React.createClass({
  getInitialState: function() {
    return { correct: [], takingQuiz: false, active_quiz: '' };
  },
  componentWillMount: function () {
    // check if there's a query string param, if so, set up that quiz
    var quizQueryParam = this.props.location.query['quiz_id'];
    if (quizQueryParam) {
      this.state.active_quiz = quizQueryParam;
    } else {
      // PLACEHOLDER KOBE QUIZ FOR NOW
      this.state.active_quiz = '2x68a';
    }
  },

  handleChange: function(event) {
  	var guess = event.target.value.toLowerCase();
  	var lastNames = _.pluck(this.state.quiz_info.players, 'lastName');
  	var fullNames = _.pluck(this.state.quiz_info.players, 'fullName');
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
  	// check if they entered the players FULL NAME
  	} else if (indexFullName !== -1) {
  		var correctName = this.state.quiz_info.players[indexFullName].fullName;
  		this.setState({ correct: this.state.correct.concat(correctName) });
  		// this.setState(correct: this.state.correct.concat(correctName);
  		// ***** remove the player from the list ****

  		// reset the guess box
  		$('.guess-box').val('');
  	}
  },

  addFullNameAndConvertLowerCase: function (list) {
    _.each(list.players, function(item, index, players) {
      // make full name
      item.fullName = item.firstName + ' ' + item.lastName;
      // convert to lower case
      item.firstNameLower = item.firstName.toLowerCase(), item.lastName = item.lastName.toLowerCase();
      item.fullNameLower = item.fullName.toLowerCase();
    });
    return list;
  },

  getQuiz: function() {
    $.ajax({
      url: '/quiz/' + this.state.active_quiz,  // test query: 2x68a
      dataType: 'json',
      cache: false,
      success: function(data) {
        data = this.addFullNameAndConvertLowerCase(data[0]);
        this.setState({quiz_info: data, takingQuiz: true});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    // console.log('state', this.state);
    return (
    	<div>
        { !this.state.takingQuiz ?
          <button onClick={ this.getQuiz }>Take quiz!</button> :
          <div>
            <div>{ this.state.quiz_info.title }</div>
            <div> You have answered: {this.state.correct.length} / {this.state.quiz_info.players.length}</div>
      	    <input className="guess-box" type="text" value={this.state.guessValue} onChange={this.handleChange} />
      	    <div>
        		  <ul>
  						  {this.state.correct.map((item)=>(
  							 <li key={this.state.timestamp}>
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