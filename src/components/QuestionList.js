import './QuestionList.css';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import Pagination from './Pagination';

const QuestionList = ({ authedUser, questions }) => {
  // Create state variable to keep track of the current page
  const [currentPage, setCurrentPage] = useState(null);
  console.log('currentPage: ', currentPage);
  const [questionsPerPage] = useState(10);

  // Get the current location and navigate function from the router
  const location = useLocation();
  const navigate = useNavigate();

  // Create state variable to toggle between new and answered questions
  const [showNewQuestions, setShowNewQuestions] = useState(null);

  const handleQuestionToggle = () => {
    setShowNewQuestions(!showNewQuestions);
    const urlParams = new URLSearchParams(location.search);
    console.log('showNewQuestions: ', !showNewQuestions);
    urlParams.set('showNewQuestions', String(!showNewQuestions));
    urlParams.set('page', '1');
    const searchQuery = urlParams.toString();
    navigate(`?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const showNewQuestions = urlParams.get('showNewQuestions');
    console.log(showNewQuestions);
    console.log('typeof showNewQuestions: ', typeof showNewQuestions);
    const currentPage = urlParams.get('page');
    //console.log(currentPage);
    showNewQuestions
      ? setShowNewQuestions(showNewQuestions === 'true')
      : setShowNewQuestions(true);
    currentPage ? setCurrentPage(Number(currentPage)) : setCurrentPage(1);
  }, [location.search]);

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
