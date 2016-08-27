import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route, hashHistory, browserHistory} from 'react-router';
// import subcomponents
import Admin from './Admin.jsx';
import PastQuizzes from './PastQuizzes.jsx';
import Subscribe from './Subscribe.jsx';
import Quiz from './Quiz.jsx';
import Rosters from './Rosters.jsx';
import SearchBar from './SearchBar.jsx';
import NavBar from './NavBar.jsx';

// ------ END SUB COMPONENTS ------- //

$(function () {
  $('[data-toggle="popover"]').popover()
})
var App = React.createClass({

  getInitialState: function() {
    return { todayQuizAcronym: 'manchester-united', todayQuizLeague: 'soccer' };
  },

  render: function() {
    return (
      <div>
        <NavBar todayQuizAcronym={this.state.todayQuizAcronym}/>
        <div className="container main">
          <div className="content-container twelve columns">
            <div className="main-quiz-content" id="main-quiz-content">

            </div>
          </div>
        </div>
      </div>
    );
  },
});

const routes = (
  <Route>
    <Route path="/" component={Main} />
    <Route path="/quiz" component={Quiz}/>
    <Route path="/pastQuizzes" component={PastQuizzes}/>
    <Route path="/subscribe" component={Subscribe}/>
    <Route path="/admin" component={Admin}/>
    <Route path="/rosters" component={Rosters}/>
  </Route>
)

ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, document.getElementById('main-quiz-content'))