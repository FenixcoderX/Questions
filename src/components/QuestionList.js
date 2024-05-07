import './QuestionList.css';
import { connect } from 'react-redux';
import { useState } from 'react';
import QuestionCard from './QuestionCard';

const QuestionList = ({ authedUser, questions }) => {
  // Create state variable to toggle between new and answered questions
  const [showNewQuestions, setShowNewQuestions] = useState(true);

  // Create an array with keys from the questions object (aka id). First, we filter questions
  // that the logged-in user has not responded to, and then sort them by creation time in descending order
  const newQuestions = Object.keys(questions)
    .filter((key) => {
      return (
        !questions[key].optionOne.votes.includes(authedUser) &&
        !questions[key].optionTwo.votes.includes(authedUser)
      );
    })
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  // Create an array with keys from the questions object (aka id). First, we filter questions
  // that the logged-in user has responded to, and then sort them by creation time in descending order
  const answeredQuestions = Object.keys(questions)
    .filter((key) => {
      return (
        questions[key].optionOne.votes.includes(authedUser) ||
        questions[key].optionTwo.votes.includes(authedUser)
      );
    })
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return (
    <div>
      {/* Create this html code only if showNewQuestions is true */}
      {showNewQuestions && (
        <div className="question-list-container">
          <h3 className="question-list-header">Questions</h3>

          <button
            data-testid="create-button"
            className="btn btn-outline-secondary text-nowrap question-toggle"
            onClick={() => setShowNewQuestions(!showNewQuestions)}
          >
            <span className="toggle-unactive">Answered</span>{' '}
            <span className="toggle-active">New</span>
          </button>

          <div className="question-list-cards">
            <ul>
              {/* Use map method to create html code for each question card using the QuestionCard component (Pass the id as a prop) */}
              {newQuestions.map((id) => (
                <li key={id}>
                  <QuestionCard id={id} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Create this html code only if showNewQuestions is false */}
      {!showNewQuestions && (
        <div className="question-list-container">
          <h3 className="question-list-header">Questions</h3>

          <button
            data-testid="create-button"
            className="btn btn-outline-secondary text-nowrap question-toggle"
            onClick={() => setShowNewQuestions(!showNewQuestions)}
          >
            <span className="toggle-active">Answered</span>{' '}
            <span className="toggle-unactive">New</span>
          </button>

          <div className="question-list-cards">
            <ul>
              {/* Use map method to create html code for each question card using the QuestionCard component (Pass the id as a prop) */}
              {answeredQuestions.map((id) => (
                <li key={id}>
                  <QuestionCard id={id} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions }) => ({
  authedUser,
  questions,
});

export default connect(mapStateToProps)(QuestionList);
