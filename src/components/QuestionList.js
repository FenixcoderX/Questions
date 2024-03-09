import { connect } from 'react-redux';
import { useState } from 'react';
import QuestionCard from './QuestionCard';
const QuestionList = ({ authedUser, questions }) => {
  // console.log('authedUser in QuestionList', authedUser);
  // console.log('questions in QuestionList', questions);

  const [showNewQuestions, setFirstOption] = useState(true);
  console.log('showNewQuestions in QuestionList', showNewQuestions);

  //we сreate an array with keys from the questions object (aka id). First, we filter questions 
  //that the logged-in user has not responded to, and then sort them by creation time in descending order
  const newQuestions = Object.keys(questions)
    .filter((key, index) => {
      return (
        !questions[key].optionOne.votes.includes(authedUser) &&
        !questions[key].optionTwo.votes.includes(authedUser)
      );
    })
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  //we сreate an array with keys from the questions object (aka id). First, we filter questions 
  //that the logged-in user has responded to, and then sort them by creation time in descending order
  const answeredQuestions = Object.keys(questions)
    .filter((key, index) => {
      return (
        questions[key].optionOne.votes.includes(authedUser) ||
        questions[key].optionTwo.votes.includes(authedUser)
      );
    })
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  // console.log('newQuestions', newQuestions);
  // console.log('answeredQuestions', answeredQuestions);

  return (
    <div className="question-list-container">
      <button
        data-testid="create-button"
        className="btn btn-outline-secondary text-nowrap"
        onClick={() => setFirstOption(!showNewQuestions)}
        // type="submit"
        // disabled={firstOption === '' || secondOption === ''}
      >
        {!showNewQuestions && <span>Show new questions</span>}
        {showNewQuestions && <span>Show answered questions</span>}
      </button>
      {showNewQuestions && (
        <div className="question-list-new">
          <h3 className="question-list-header">New Questions</h3>
          <div className="question-list-cards">
            <ul>
              {newQuestions.map((id) => (
                <li key={id}>
                  <QuestionCard id={id} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {!showNewQuestions && (
        <div className="question-list-done">
          <h3 className="question-list-header">Answered Questions</h3>
          <div className="question-list-cards">
            <ul>
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
