import './QuestionList.css';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import Pagination from './Pagination';

const QuestionList = ({ authedUser, questions }) => {
  // Variable for timestamp of component mount
  const [questionListTimestamp, setQuestionListTimestamp] = useState('');

  // Variables for pagination
  const [currentPage, setCurrentPage] = useState(null);
  const [questionsPerPage] = useState(6);

  // Variable for toggling between new and answered questions
  const [showNewQuestions, setShowNewQuestions] = useState(null);

  // Get the current URL location
  const location = useLocation();

  const navigate = useNavigate();

  /**
   * Toggles the display of new questions and updates the URL query parameters.
   */
  const handleQuestionToggle = () => {
    setShowNewQuestions(!showNewQuestions);
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('showNewQuestions', String(!showNewQuestions));
    urlParams.set('page', '1');
    const searchQuery = urlParams.toString();
    navigate(`?${searchQuery}`);
  };

  // Get query parameters from URL and set the state variables
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const showNewQuestions = urlParams.get('showNewQuestions');
    const currentPage = urlParams.get('page');
    showNewQuestions
      ? setShowNewQuestions(showNewQuestions === 'true')
      : setShowNewQuestions(true);
    currentPage ? setCurrentPage(Number(currentPage)) : setCurrentPage(1);
  }, [location.search]);

  // Set the timestamp of component mount
  useEffect(() => {
    const date = new Date();
    setQuestionListTimestamp(date.toISOString());
  }, []);

  // FILTER AND SORT QUESTIONS

  // First, filter out questions that logged-in user has not responded to.
  // Then, filter out questions that not newer than timestamp of component mount.
  // Finally, sort the remaining questions by their creation time in descending order
  const newQuestions = Object.keys(questions)
    .filter((key) => {
      return (
        !questions[key].optionOne.votes.includes(authedUser) &&
        !questions[key].optionTwo.votes.includes(authedUser)
      );
    })
    .filter((key) => questions[key].updatedAt < questionListTimestamp)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  // First, filter out questions that the logged-in user has responded to.
  // Then, filter out questions that not newer than timestamp of component mount.
  // Finally, sort them by creation time in descending order
  const answeredQuestions = Object.keys(questions)
    .filter((key) => {
      return (
        questions[key].optionOne.votes.includes(authedUser) ||
        questions[key].optionTwo.votes.includes(authedUser)
      );
    })
    .filter((key) => questions[key].updatedAt < questionListTimestamp)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  // PAGINATION

  // Get current items
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentNewQuestions = newQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const currentAnsweredQuestions = answeredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('page', String(pageNumber));
    urlParams.set('showNewQuestions', String(showNewQuestions));
    const searchQuery = urlParams.toString();
    navigate(`?${searchQuery}`);
  };

  return (
    <>
      {/* Create this html code only if showNewQuestions is true */}
      {showNewQuestions && (
        <section className="question-list-container">
          <h3 className="question-list-header">Questions</h3>

          <button
            data-testid="create-button"
            className="btn btn-outline-secondary text-nowrap question-toggle"
            onClick={handleQuestionToggle}
          >
            <span className="toggle-unactive">Answered</span>{' '}
            <span className="toggle-active">New</span>
          </button>
          <Pagination
            itemsPerPage={questionsPerPage}
            totalItems={newQuestions.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          <div className="question-list-cards">
            <ul>
              {/* Use map method to create html code for each question card using the QuestionCard component (Pass the id as a prop) */}
              {currentNewQuestions.map((id) => (
                <li key={id}>
                  <QuestionCard id={id} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Create this html code only if showNewQuestions is false */}
      {!showNewQuestions && (
        <div className="question-list-container">
          <h3 className="question-list-header">Questions</h3>

          <button
            data-testid="create-button"
            className="btn btn-outline-secondary text-nowrap question-toggle"
            onClick={handleQuestionToggle}
          >
            <span className="toggle-active">Answered</span>{' '}
            <span className="toggle-unactive">New</span>
          </button>
          <Pagination
            itemsPerPage={questionsPerPage}
            totalItems={answeredQuestions.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          <div className="question-list-cards">
            <ul>
              {/* Use map method to create html code for each question card using the QuestionCard component (Pass the id as a prop) */}
              {currentAnsweredQuestions.map((id) => (
                <li key={id}>
                  <QuestionCard id={id} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ authedUser, questions }) => ({
  authedUser,
  questions,
});

export default connect(mapStateToProps)(QuestionList);
