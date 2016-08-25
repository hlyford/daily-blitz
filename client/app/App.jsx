import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route, hashHistory, browserHistory} from 'react-router';
// import subcomponents
import Admin from './components/Admin.jsx';
import PastQuizzes from './components/PastQuizzes.jsx';
import Subscribe from './components/Subscribe.jsx';
import Quiz from './components/Quiz.jsx';
import Rosters from './components/Rosters.jsx';
import SearchBar from './components/SearchBar.jsx';

// ------ END SUB COMPONENTS ------- //

$(function () {
  $('[data-toggle="popover"]').popover()
})
var App = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div className="homepage-view">
        <div className="page-titles"><h2>Welcome to RosterBlitz</h2></div>
        <div className="commentBox">
          <div className="sport-selection">
            <div>Quiz yourself on the team rosters of your favorite sport</div>
            <div>
              <a href='#/rosters?league=nba'><button>NBA</button></a>
              <a href='#/rosters?league=nfl'><button>NFL</button></a>
              <a href='#/rosters?league=mlb'><button>MLB</button></a>
              <a href='#/rosters?league=soccer'><button>Soccer</button></a>
            </div>
          </div>
          <div className="bottom-buttons">
            <div className="today-quiz">
              <Link to={{ pathname: '/quiz', query: { league: 'soccer', quiz_id: 'manchester-united' } }}
                activeClassName='-active'>Play today&#39;s quiz
              </Link>
            </div>
            <div className="subscribe">
              <Link to='subscribe'
                activeClassName='-active'>Subscribe to daily quizzes
              </Link>
              {this.props.children}
            </div>
          </div>
        </div>
        <SearchBar />
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
