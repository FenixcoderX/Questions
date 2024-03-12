import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { handleSaveQuestionAnswer } from '../actions/questions';
import NotFound from './NotFound';

//this is necessary in order to be able to read the id from the search bar below
const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

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
  // console.log('author in QuestionView', author);
  // console.log('avatar in QuestionView', avatar);
  // console.log('optionOne in QuestionView', optionOne);
  // console.log('optionTwo in QuestionView', optionTwo);
  // console.log('answered in QuestionView', answered);

  const handleAnswer = (e) => {
    const answer = e.target.value;
    // console.log('answer', answer);
    dispatch(handleSaveQuestionAnswer(id, answer));
  };

  return questionIDNotExists ? (
    <div><NotFound /></div>
  ) : (
    <div className="question-card-view-container">
      <div>Question by</div>
      <div>
        <img src={avatar} alt="Avatar" className="avatar" />
        <div className="name-in-questionview" >{author}</div>
        <h3 className="question-card-header">Help me choose</h3>
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
        {answered === 'optionOne' && (
          <div className="question-card-options option-selected">
            <p>{optionOne}</p>
            <div className="votes">Votes:{numberOfUsersForOptionOne}</div>{' '}
            <span className="votes">
              {(numberOfUsersForOptionOne * 100) / NumberOfAllUsers}% of users
              are voted
            </span>
          </div>
        )}
        {answered === 'optionTwo' && (
          <div className="question-card-options option-unselected">
            <p>{optionOne}</p>
            <div className="votes">Votes:{numberOfUsersForOptionOne}</div>{' '}
            <span className="votes">
              {(numberOfUsersForOptionOne * 100) / NumberOfAllUsers}% of users
              are voted
            </span>
          </div>
        )}

        {/* 
          For answered questions, each of the two options contains the following:
          the text of the option;
          the number of people who voted for that option;
          the percentage of people who voted for that option. */}
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

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.router.params;
  // console.log('id', id);

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

export default withRouter(connect(mapStateToProps)(QuestionView));
