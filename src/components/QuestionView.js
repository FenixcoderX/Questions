import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { handleSaveQuestionAnswer } from '../actions/questions';
import NotFound from './NotFound';

/**
 * Function that wraps a component and provides the URL parameters as props.
 *
 * @param {React.Component} Component - The component to be wrapped
 * @returns {React.Component} - The wrapped component with the URL parameters as props
 */
const withRouter = (Component) => {
  const ComponentWithRouterProp = () => {
    // const location = useLocation();
    // const navigate = useNavigate();
    const params = useParams(); // Get the URL parameters
    return <Component router={{ params }} />; // Pass the URL parameters as props to the wrapped component
  };

  return ComponentWithRouterProp;
};

// Component for viewing a question
const QuestionView = ({
  dispatch,
  author,
  avatar,
  optionOne,
  optionTwo,
  id,
  answered,
  questionIDNotExists,
  numberOfUsersForOptionOne,
  numberOfUsersForOptionTwo,
  NumberOfAllUsers,
}) => {
  /**
   * Saves the answer for a question to the store and API
   * @param {Event} e - The event object
   */
  const handleAnswer = (e) => {
    const answer = e.target.value; // Get the answer from the button value
    dispatch(handleSaveQuestionAnswer(id, answer));
  };

  // If the question ID does not exist, display the NotFound component
  return questionIDNotExists ? (
    <div>
      <NotFound />
    </div>
  ) : (
    // Otherwise, display the question view
    <div className="question-card-view-container">
      <div>Question by</div>
      <div>
        <img src={avatar} alt="Avatar" className="avatar" />
        <div className="name-in-questionview">{author}</div>
        <h3 className="question-card-header">Help me choose</h3>
        {/* If the question is  not answered, display the following html code for option one */}
        {!answered && (
          <div className="question-card-options">
            <p>{optionOne}</p>
            <button
              disabled={answered}
              className="btn btn-dark text-nowrap"
              value="optionOne"
              onClick={handleAnswer}
            >
              Choose
            </button>
          </div>
        )}
        {/* If the question is answered with optionOne, display the following html code */}
        {answered === 'optionOne' && (
          <div className="question-card-options option-selected">
            <p>{optionOne}</p>
            <div className="votes">Votes:{numberOfUsersForOptionOne}</div>{' '}
            <span className="votes">
              {/* Calculate the percentage of users who voted for optionOne */}
              {(numberOfUsersForOptionOne * 100) / NumberOfAllUsers}% of users
              are voted
            </span>
          </div>
        )}
        {/* If the question is answered with optionTwo, display the following html code */}
        {answered === 'optionTwo' && (
          <div className="question-card-options option-unselected">
            <p>{optionOne}</p>
            <div className="votes">Votes:{numberOfUsersForOptionOne}</div>{' '}
            <span className="votes">
              {/* Calculate the percentage of users who voted for optionOne */}
              {(numberOfUsersForOptionOne * 100) / NumberOfAllUsers}% of users
              are voted
            </span>
          </div>
        )}

        {/* If the question is  not answered, display the following html code for option two */}
        {!answered && (
          <div className="question-card-options">
            <p>{optionTwo}</p>

            <button
              disabled={answered}
              className="btn btn-dark text-nowrap"
              value="optionTwo"
              onClick={handleAnswer}
            >
              Choose
            </button>
          </div>
        )}
        {/* If the question is answered with optionTwo, display the following html code */}
        {answered === 'optionTwo' && (
          <div className="question-card-options option-selected">
            <p>{optionTwo}</p>
            <div className="votes">Votes:{numberOfUsersForOptionTwo}</div>{' '}
            <span className="votes">
              {(numberOfUsersForOptionTwo * 100) / NumberOfAllUsers}% of users
              are voted
            </span>
          </div>
        )}
        {/* If the question is answered with optionOne, display the following html code */}
        {answered === 'optionOne' && (
          <div className="question-card-options option-unselected">
            <p>{optionTwo}</p>
            <div className="votes">Votes:{numberOfUsersForOptionTwo}</div>{' '}
            <span className="votes">
              {(numberOfUsersForOptionTwo * 100) / NumberOfAllUsers}% of users
              are voted
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Use mapStateToProps to get necessary data from the store, url parametrs and return props
const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.router.params; // Get the id of the question from the URL

  return questions[id]
    ? {
        author: questions[id].author,
        avatar: users[questions[id].author].avatarURL,
        optionOne: questions[id].optionOne.text,
        optionTwo: questions[id].optionTwo.text,
        id,
        answered: users[authedUser].answers[id],
        numberOfUsersForOptionOne: questions[id].optionOne.votes.length,
        numberOfUsersForOptionTwo: questions[id].optionTwo.votes.length,
        NumberOfAllUsers: Object.keys(users).length,
      }
    : { questionIDNotExists: true };
};

//connects component to the store and wraps it to withRouter function to get the URL parameters as props
export default withRouter(connect(mapStateToProps)(QuestionView));
