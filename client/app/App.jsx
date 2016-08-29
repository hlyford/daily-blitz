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
import NavBar from './components/NavBar.jsx';

// ------ END SUB COMPONENTS ------- //

var App = React.createClass({

  getInitialState: function() {
    return { todayQuizAcronym: 'manchester-united', todayQuizLeague: 'soccer' };
  },
  gaEvent: function (league) {
    googleClickEvent(league);
  },
  render: function() {
    return (
      <div>
        <NavBar todayQuizAcronym={this.state.todayQuizAcronym}/>
        <div className="container main">
          <div className="content-container twelve columns">
            <div className="main-quiz-content">
              <div className="homepage-view">
                <div className="page-titles"><h2>Welcome to RosterBlitz</h2></div>
                <div className="commentBox">
                  <div className="sport-selection">
                    <div>Quiz yourself on the team rosters of your favorite sport</div>
                    <div>
                      <a href='#/rosters?league=nba' onClick={ this.gaEvent.bind(this, 'nba') } ><button>NBA</button></a>
                      <a href='#/rosters?league=nfl' onClick={ this.gaEvent.bind(this, 'nfl') } ><button>NFL</button></a>
                      <a href='#/rosters?league=mlb' onClick={ this.gaEvent.bind(this, 'mlb') }><button>MLB</button></a>
                      <a href='#/rosters?league=soccer' onClick={ this.gaEvent.bind(this, 'soccer') }><button>Soccer</button></a>
                    </div>
                  </div>
                  <div className='hide-desktop'>
                    <SearchBar />
                  </div>
                  <div className="bottom-buttons">
                    <div className="today-quiz">
                      <Link to={{ pathname: '/quiz', query: { league: this.state.todayQuizLeague, quiz_id: this.state.todayQuizAcronym } }}
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
                {/* <SearchBar /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

const routes = (
  <Route>
    <Route path="/" component={App} />
    <Route path="/quiz" component={Quiz}/>
    {/* <Route path="/pastQuizzes" component={PastQuizzes}/> */}
    <Route path="/subscribe" component={Subscribe}/>
    {/* <Route path="/admin" component={Admin}/> */}
    <Route path="/rosters" component={Rosters}/>
  </Route>
)

ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, document.getElementById('app'));
