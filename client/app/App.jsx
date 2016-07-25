
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route, hashHistory, browserHistory} from 'react-router';
// import subcomponents
import Admin from './components/Admin.jsx';
import PastQuizzes from './components/PastQuizzes.jsx';
import Subscribe from './components/Subscribe.jsx';
import Quiz from './components/Quiz.jsx';
import Rosters from './components/Rosters.jsx';

// ------ END SUB COMPONENTS ------- //

var App = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div>
        <div className="page-titles"><h2>Welcome to RosterBlitz 2.0</h2></div>
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
      </div>
    );
  },
});

const routes = (
  <Route>
    <Route path="/" component={App} />
    <Route path="/quiz" component={Quiz}/>
    <Route path="/pastQuizzes" component={PastQuizzes}/>
    <Route path="/subscribe" component={Subscribe}/>
    <Route path="/admin" component={Admin}/>
    <Route path="/rosters" component={Rosters}/>
  </Route>
)

ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, document.getElementById('app'))
