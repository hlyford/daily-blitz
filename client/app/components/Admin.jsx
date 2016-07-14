// ----- ADMIN COMPONENT  ----- // 
import React from 'react';

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

export default Admin;