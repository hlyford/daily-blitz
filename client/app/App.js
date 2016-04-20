// sub-components here for now

var GuessInput = React.createClass({
  getInitialState: function() {
    return {guessValue: ''};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
    console.log(this.state);
  },
  render: function() {  	    
    return (
      <input type="text" value={this.state.guessValue} onChange={this.handleChange} />
    )
  }

});
// ------ END SUB COMPONENTS ------- //

var MainApp = React.createClass({

  getInitialState: function() {
  	this.getQuiz();
    return {};
  },

  render: function() {  	    
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
        <GuessInput />
      </div>
    );    
  },

  getQuiz: function() {  	
    $.ajax({
      url: '/quiz/2x68a',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});

ReactDOM.render(<MainApp />, document.getElementById('app'))