// import react router
var rR = window.ReactRouter;
var Router = rR.Router, Route = rR.Route,Link = rR.Link, browserHistory = rR.browserHistory;


// sub-components here for now
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
      url: '/quiz/2x68a',
      dataType: 'json',
      cache: false,
      success: function(data) {     
        console.log(data);
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
