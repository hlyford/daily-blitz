// import react router
var rR = window.ReactRouter;
var Router = rR.Router;
var Route = rR.Route;
var Link = rR.Link;


// sub-components here for now
var GuessInput = React.createClass({
  getInitialState: function() {
    return {correct: []};
  },

  handleChange: function(event) {
  	var guess = event.target.value.toLowerCase();
  	var lastNames = _.pluck(this.props.data.players, 'lastName');
  	var fullNames = _.pluck(this.props.data.players, 'fullName');  
  	// check if they entered the last name, keep track of index
  	var indexLastName = _.indexOf(lastNames, guess);
  	var indexFullName = _.indexOf(fullNames, guess);
  	// if the entered last name, they got it correct
  	if (indexLastName !== -1) {  		
  		var correctName = this.props.data.players[indexLastName].fullName;
  		this.setState({ correct: this.state.correct.concat(correctName) });  
  		// ***** remove the player from the list ****
  		
  		// reset the guess box
  		$('.guess-box').val(''); 
  	// check if they entered the players full name
  	} else if (indexFullName !== -1) {
  		var correctName = this.props.data.players[indexFullName].fullName;
  		this.setState({ correct: this.state.correct.concat(correctName) }); 
  		// this.setState(correct: this.state.correct.concat(correctName);  
  		// ***** remove the player from the list ****
  		
  		// reset the guess box
  		$('.guess-box').val(''); 
  	}   		
  },

  render: function() {  	  
  	console.log(this.props);  
    return (
    	<div>
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
      </div>
     	 
    )
  }

});
// ------ END SUB COMPONENTS ------- //

var MainApp = React.createClass({

  getInitialState: function() {  	
    return {};
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

  componentDidMount: function() {  	
    $.ajax({
      url: '/quiz/2x68a',
      dataType: 'json',
      cache: false,
      success: function(data) {     
      	data = this.addFullNameAndConvertLowerCase(data[0]);       	
        this.setState({data: data});              
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {  	    
    return (
      <div className="commentBox">
        Name the players older than Kobe
        <GuessInput data={ this.state.data } />
      </div>
    );    
  },
});

ReactDOM.render(<MainApp />, document.getElementById('app'))