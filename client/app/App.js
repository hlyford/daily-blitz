// import react router
var rR = window.ReactRouter;
var Router = rR.Router, Route = rR.Route,Link = rR.Link, browserHistory = rR.browserHistory;

// sub-components here for now

// ----- ADMIN COMPONENT  ----- // 

var Admin = React.createClass({
  getInitialState: function() {    
    return { players: [] };
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
      !newPlayers[playerId] ? newPlayers[playerId] = {} : newPlayers[playerId];     
      event.target.className === 'firstName' ? newPlayers[playerId].firstName = event.target.value : newPlayers[playerId].lastName = event.target.value;      
      this.setState({ players: newPlayers });
      console.log(this.state);
    }

  },
  render: function () {        
    return (
      <div> 
        <div>Quiz Name: <input id="quiz-name" className="guess-box" type="text" value={this.state.quiz_name} onChange={this.handleChange} /></div>
        <div>Quiz ID: <input className="quiz-id" id="quiz-id" type="text" value={this.state.quiz_id} onChange={this.handleChange} /></div>
        <div>Player 1 (first, last names): 
          <input className="firstName" data="" id="0" type="text" value={ this.state.players[0] !== undefined ? this.state.players[0].firstName : ''}  onChange={this.handleChange} />
          <input className="lastName" id="0" type="text" value={ this.state.players[0] !== undefined ? this.state.players[0].lastName : '' } onChange={this.handleChange} />
        </div>
        <div>Player 2 (first, last names): 
          <input className="firstName" data="" id="1" type="text" value={ this.state.players[1] !== undefined ? this.state.players[1].firstName : ''}  onChange={this.handleChange} />
          <input className="lastName" id="1" type="text" value={ this.state.players[1] !== undefined ? this.state.players[1].lastName : '' } onChange={this.handleChange} />
        </div><div>Player 3 (first, last names): 
          <input className="firstName" data="" id="2" type="text" value={ this.state.players[2] !== undefined ? this.state.players[2].firstName : ''}  onChange={this.handleChange} />
          <input className="lastName" id="2" type="text" value={ this.state.players[2] !== undefined ? this.state.players[2].lastName : '' } onChange={this.handleChange} />
        </div><div>Player 4 (first, last names): 
          <input className="firstName" data="" id="3" type="text" value={ this.state.players[3] !== undefined ? this.state.players[3].firstName : ''}  onChange={this.handleChange} />
          <input className="lastName" id="3" type="text" value={ this.state.players[3] !== undefined ? this.state.players[3].lastName : '' } onChange={this.handleChange} />
        </div><div>Player 5 (first, last names): 
          <input className="firstName" data="" id="4" type="text" value={ this.state.players[4] !== undefined ? this.state.players[4].firstName : ''}  onChange={this.handleChange} />
          <input className="lastName" id="4" type="text" value={ this.state.players[4] !== undefined ? this.state.players[4].lastName : '' } onChange={this.handleChange} />
        </div><div>Player 6 (first, last names): 
          <input className="firstName" data="" id="5" type="text" value={ this.state.players[5] !== undefined ? this.state.players[5].firstName : ''}  onChange={this.handleChange} />
          <input className="lastName" id="5" type="text" value={ this.state.players[5] !== undefined ? this.state.players[5].lastName : '' } onChange={this.handleChange} />
        </div><div>Player 7 (first, last names): 
          <input className="firstName" data="" id="6" type="text" value={ this.state.players[6] !== undefined ? this.state.players[6].firstName : ''}  onChange={this.handleChange} />
          <input className="lastName" id="6" type="text" value={ this.state.players[6] !== undefined ? this.state.players[6].lastName : '' } onChange={this.handleChange} />
        </div><div>Player 8 (first, last names): 
          <input className="firstName" data="" id="7" type="text" value={ this.state.players[7] !== undefined ? this.state.players[7].firstName : ''}  onChange={this.handleChange} />
          <input className="lastName" id="7" type="text" value={ this.state.players[7] !== undefined ? this.state.players[7].lastName : '' } onChange={this.handleChange} />
        </div>
        {/*
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
      */}
        <div>Password: <input className="player" id="password" type="text" value={this.state.password} onChange={this.handleChange} /></div>
        <button onClick={ this.submitQuiz }>Add Quiz</button>
        { this.state.response ? <div>Quiz created with id: {this.state.response.queryParam} </div>: ''}
      </div>
    )
  }
})
// ----- PAST QUIZZES COMPONENT ---- //
var PastQuizzes = React.createClass({  
  getInitialState: function() {
    return { quiz_list: [] };
  },  
  componentDidMount: function () {
    this.getQuizzes();
  },
  getQuizzes: function () {    
    // call off to backend with user info
    console.log('hui');
    $.ajax({
      url: '/quiz/all',  
      type: 'GET',
      dataType: 'json',      
      cache: false,
      success: function(data) { 
        console.log('all quizzes' , data);    
        this.setState({ quiz_list: data });
      }.bind(this),      
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)    
    });

  },
  render: function() {     
    var listItems = this.state.quiz_list.map(function(item) {
      item.url = "#/quiz?quiz_id=" + item.queryParam;
      return (
        <li key={item._id}>
          <a href={item.url}>{item.title}</a>
        </li>
      );
    });
    return (      
      <div>
        Here are the old quizzes
        <ul>
          {listItems}
        </ul>
      </div>       
    )
  }
});

// ----- Subcribe COMPONENT ---- //
var Subscribe = React.createClass({  
  getInitialState: function() {
    return { email: null, phone_number: null };
  },
  handleChange: function (event) {
    var entry = event.target.value;    
    if (event.target.id === 'email') {      
      this.state.email = entry;
    } else {
      this.state.phone_number = entry;
    }    
  },
  submitForm: function (event) {    
    var submission = {email: this.state.email, phone_number: this.state.phone_number};
    // call off to backend with user info
    $.ajax({
      url: '/user',  
      type: 'POST',
      dataType: 'json',
      data: submission,
      cache: false,
      success: function(data) {     
        console.log('first res', data);                  
      }.bind(this),      
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)    
    });

  },
  render: function() {                
    return (      
      <div className="subscribe-container">
        <div>Enter your email, phone number, or both</div>
        <div>
          Get email updates: <input className="enter-email" type="text" id="email" onChange={ this.handleChange } placeholder="Email address"/>          
        </div>
        <div>
          Get mobile phone updates: <input className="enter-email" type="text" id="phone" onChange={ this.handleChange } placeholder="Phone number" />          
        </div>
        <button onClick={ this.submitForm }>Submit</button>
      </div>       
    )
  }

});

// ----- QUIZ COMPONENT ---- //
var Quiz = React.createClass({
  getInitialState: function() {
    return { correct: [], takingQuiz: false, active_quiz: '' };
  },
  componentWillMount: function () {
    // check if there's a query string param, if so, set up that quiz
    var quizQueryParam = this.props.location.query['quiz_id'];
    if (quizQueryParam) {
      this.state.active_quiz = quizQueryParam;
      this.getQuiz();
      console.log('get quiz', this.state);
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
      console.log('after guess' , this.state);
  	// check if they entered the players FULL NAME
  	} else if (indexFullName !== -1) {
  		var correctName = this.state.quiz_info.players[indexFullName].fullName;
  		this.setState({ correct: this.state.correct.concat(correctName) }); 
  		// this.setState(correct: this.state.correct.concat(correctName);  
  		// ***** remove the player from the list ****
  		
  		// reset the guess box
  		$('.guess-box').val(''); 
      console.log('after guess' , this.state);
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
// ------ END SUB COMPONENTS ------- //

var App = React.createClass({

  getInitialState: function() {  	
    return {};
  },    

  render: function() {  	    
    return (
      <div className="commentBox">             
        <div>
          <Link to='quiz'
            activeClassName='-active'>Play today&#39;s quiz
          </Link>    
        </div>        
        <Link to='subscribe'
          activeClassName='-active'>Subscribe to daily quizzes
        </Link>    
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
    <Route path="/pastQuizzes" component={PastQuizzes}/>  
    <Route path="/subscribe" component={Subscribe}/>  
    <Route path="/admin" component={Admin}/>

  </Router>
), document.getElementById('app'))
