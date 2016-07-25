// ----- PAST QUIZZES COMPONENT ---- //
import React from 'react';

var PastQuizzes = React.createClass({
  getInitialState: function() {
    return { quiz_list: [] };
  },
  componentDidMount: function () {
    this.getQuizzes();
  },
  getQuizzes: function () {
    // call off to backend with user info
    $.ajax({
      url: '/quiz/all',
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({ quiz_list: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  },
  render: function() {
    var listItems = this.state.quiz_list.map(function(item) {
      item.url = "#/quiz?quiz_id=" + item.queryParam;
      return (
        <li key={item._id}>
          <a href={item.url}>{item.title}</a>
        </li>
      );
    });
    return (
      <div className="past-quizzes-view">
        <div className="page-titles"><h2>Not really using this page...</h2></div>
        Here are the old quizzes
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
});

export default PastQuizzes;