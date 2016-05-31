// import react router
var rR = window.ReactRouter;
var Router = rR.Router, Route = rR.Route,Link = rR.Link, browserHistory = rR.browserHistory;

// sub-components here for now

// ----- ADMIN COMPONENT  ----- // 

var Admin = React.createClass({
  getInitialState: function() {
    return { players: {} };
  },
  submitQuiz: function () {
    $.ajax({
      url: '/quiz',
      type: 'POST',
      data: this.state,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log('response from server', data);             
        this.setState({response: data});  
        console.log(this.state);                 
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    // reset the form
    this.setState({ players: {}, quiz_id: '', password: '', quiz_name: '' });
  },
  handleChange: function(event) {
    if (event.target.id === 'quiz-name') {
      this.setState({quiz_name: event.target.value});        
    } else if (event.target.id === 'quiz-id') {
      this.setState({quiz_id: event.target.value});        
    } else if (event.target.id === 'password') {
      this.setState({password: event.target.value });
    } else {
      var playerId = event.target.id, newPlayers = this.state.players;
      newPlayers[playerId] = event.target.value;
      this.setState({ players: newPlayers });
    }

  },
  render: function () {    
    return (
      <div> 
        <div>Quiz Name: <input id="quiz-name" className="guess-box" type="text" value={this.state.quiz_name} onChange={this.handleChange} /></div>
        <div>Quiz ID: <input className="quiz-id" id="quiz-id" type="text" value={this.state.quiz_id} onChange={this.handleChange} /></div>
        <div>Player 1: <input className="player" id="1" type="text" value={this.state.players[1]} onChange={this.handleChange} /></div>
        <div>Player 2: <input className="player" id="2" type="text" value={this.state.players[2]} onChange={this.handleChange} /></div>
        <div>Player 3: <input className="player" id="3" type="text" value={this.state.players[3]} onChange={this.handleChange} /></div>
        <div>Player 4: <input className="player" id="4" type="text" value={this.state.players[4]} onChange={this.handleChange} /></div>
        <div>Player 5: <input className="player" id="5" type="text" value={this.state.players[5]} onChange={this.handleChange} /></div>
        <div>Player 6: <input className="player" id="6" type="text" value={this.state.players[6]} onChange={this.handleChange} /></div>
        <div>Player 7: <input className="player" id="7" type="text" value={this.state.players[7]} onChange={this.handleChange} /></div>
        <div>Player 8: <input className="player" id="8" type="text" value={this.state.players[8]} onChange={this.handleChange} /></div>
        <div>Player 9: <input className="player" id="9" type="text" value={this.state.players[9]} onChange={this.handleChange} /></div>
        <div>Player 10: <input className="player" id="10" type="text" value={this.state.players[10]} onChange={this.handleChange} /></div>
        <div>Player 11: <input className="player" id="11" type="text" value={this.state.players[11]} onChange={this.handleChange} /></div>
        <div>Password: <input className="player" id="password" type="text" value={this.state.password} onChange={this.handleChange} /></div>
        <button onClick={ this.submitQuiz }>Add Quiz</button>
        { this.state.response ? <div>Quiz created with id: {this.state.response.queryParam} </div>: ''}
      </div>
    )
  }
})

// ----- QUIZ COMPONENT ---- //
var Quiz = React.createClass({
  getInitialState: function() {
    return { correct: [], takingQuiz: false };
  },

  handleChange: function(event) {
  	var guess = event.target.value.toLowerCase();
  	var lastNames = _.pluck(this.state.data.players, 'lastName');
  	var fullNames = _.pluck(this.state.data.players, 'fullName');  
  	// check if they entered the last name, keep track of index
  	var indexLastName = _.indexOf(lastNames, guess);
  	var indexFullName = _.indexOf(fullNames, guess);
  	// if the entered last name, they got it correct
  	if (indexLastName !== -1) {  		
  		var correctName = this.state.data.players[indexLastName].fullName;
  		this.setState({ correct: this.state.correct.concat(correctName) });  
  		// ***** remove the player from the list ****
  		
  		// reset the guess box
  		$('.guess-box').val(''); 
  	// check if they entered the players full name
  	} else if (indexFullName !== -1) {
  		var correctName = this.state.data.players[indexFullName].fullName;
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
      url: '/quiz/2x68a',  // test query: 2x68a
      dataType: 'json',
      cache: false,
      success: function(data) {     
        console.log('first res', data);
        data = this.addFullNameAndConvertLowerCase(data[0]);        
        this.setState({data: data, takingQuiz: true});               
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {  	    	
    console.log('state', this.state);
    return (      
    	<div>
        { !this.state.takingQuiz ? 
          <button onClick={ this.getQuiz }>Take quiz!</button> :
          <div>
            <div>Name the players older than Kobe</div>
      	    <input className="guess-box" type="text" value={this.state.guessValue} onChange={this.handleChange} />
      	    <div>
        		  <ul>
  						  {this.state.correct.map((item)=>(
  							 <li key={this.state.timestamp}>
  								  {item}
  							 </li>
  						  ))}
  					  </ul>
      	    </div>
          </div> }
      </div>     	 
    )
  }

});
// ------ END SUB COMPONENTS ------- //

var App = React.createClass({

  getInitialState: function() {  	
    return {};
  },    

  render: function() {  	    
    return (
      <div className="commentBox">     
        Welcome to GOAT blitz
        <div>
          <Link to='quiz'
            activeClassName='-active'>Play today&#39;s quiz
          </Link>    
        </div>
        <div>Subscribe to daily quizzes</div>    
        {this.props.children}
         {/*} <GuessInput data={ this.state.data } /> */ }
      </div>
    );    
  },
});
/* history={browserHistory} */  
ReactDOM.render((
  <Router > 
    <Route path="/" component={App} />
    <Route path="/quiz" component={Quiz}/>  
    <Route path="/admin" component={Admin}/>

  </Router>
), document.getElementById('app'))
