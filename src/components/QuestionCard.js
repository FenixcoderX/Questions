import './QuestionCard.css';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/helpers';

const QuestionCard = ({ author, time, avatar, id }) => {
  // Create a navigate function using the useNavigate hook to redirect to required page
  const navigate = useNavigate();

  return (
    <div className="question-card-container">
      <div>
        <img src={avatar} alt="Avatar" className="avatar" />
        <h5>{author}</h5>
      </div>
      <div>
        <p className="queston-card-timestamp">{time}</p>
        <button
          className="btn btn-dark text-nowrap"
          onClick={() => navigate(`/question/${id}`)}
        >
          Show
        </button>
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
});

export default connect(mapStateToProps)(QuestionCard);
