
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route, hashHistory} from 'react-router';
// import subcomponents
import Admin from './components/Admin.jsx';
import PastQuizzes from './components/PastQuizzes.jsx';
import Subscribe from './components/Subscribe.jsx';
import Quiz from './components/Quiz.jsx';

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

const routes = (
  <Route>
    <Route path="/" component={App} />
    <Route path="/quiz" component={Quiz}/>
    <Route path="/pastQuizzes" component={PastQuizzes}/>
    <Route path="/subscribe" component={Subscribe}/>
    <Route path="/admin" component={Admin}/>
  </Route>
)

ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, document.getElementById('app'))
