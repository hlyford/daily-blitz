// sub-components here for now

var GuessInput = React.createClass({
  getInitialState: function() {
    return {correct: []};
  },

  handleChange: function(event) {
  	var guess = event.target.value //.toLowerCase();
  	var lastNames = _.pluck(this.props.data[0].players, 'lastName');  	
    if (_.contains(lastNames , guess)) {
    	this.setState({ correct: this.state.correct.concat(guess) });    
    	$('.guess-box').val('');	    	
    }
  },

  render: function() {  	    
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

  render: function() {  	    
    return (
      <div className="commentBox">
        Name the players older than Kobe
        <GuessInput data={ this.state.data } />
      </div>
    );    
  },

  componentDidMount: function() {  	
    $.ajax({
      url: '/quiz/2x68a',
      dataType: 'json',
      cache: false,
      success: function(data) {      	
        this.setState({data: data});    
        console.log(this.state);    
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});

ReactDOM.render(<MainApp />, document.getElementById('app'))