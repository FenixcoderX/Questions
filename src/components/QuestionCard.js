import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
const QuestionCard = ({ author, time, avatar,id }) => {
  // console.log('author in QuestionCard', author);
  // console.log('time in QuestionCard', time);

  const navigate = useNavigate();

  return (
    <div className="question-card-container">
      <img src={avatar} alt="Avatar" className="avatar" />
      <h5>{author}</h5>
      <p className="queston-card-timestamp">{time}</p>
      <button className="btn btn-outline-secondary text-nowrap" onClick={() => navigate(`/question/${id}`)}>
        Show
      </button>
    </div>
  );
};

const mapStateToProps = ({ questions, users }, { id }) => ({
  author: questions[id].author,
  time: formatDate(questions[id].timestamp),
  avatar: users[questions[id].author].avatarURL,
  id,
});

export default connect(mapStateToProps)(QuestionCard);
