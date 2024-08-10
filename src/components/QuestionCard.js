import './QuestionCard.sass';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helpers';
import { Link } from 'react-router-dom';

const QuestionCard = ({ author, time, avatar, id, questionText }) => {

  return (
    <div className="question-card-container">
      <div className='question-card-top'>
        <img src={avatar} alt="Avatar" className="question-card-avatar" />
        <h5>{author}</h5>
        <p className="question-card-question-text">{questionText}</p>
      </div>
      <div>
        <p className="queston-card-timestamp">{time}</p>
        <Link
          className="btn btn-dark text-nowrap question-card-button"
          to={`/question/${id}`}
        >
          Show
        </Link>
      </div>
    </div>
  );
};

// Use mapStateToProps to get necessary data from the store and parent component and return props
const mapStateToProps = ({ questions, users }, { id }) => ({
  author: users[questions[id].author].name,
  time: formatDate(questions[id].timestamp),
  avatar: users[questions[id].author].avatarURL,
  id,
  questionText: questions[id].questionText,
});

export default connect(mapStateToProps)(QuestionCard);
