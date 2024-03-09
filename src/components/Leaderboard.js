import { connect } from 'react-redux';
// import { handleSaveQuestionAnswer } from '../actions/questions';

const Leaderboard = ({ users }) => {
  const usersSorted = Object.keys(users).sort(
    (a, b) =>
      Object.keys(users[b].answers).length +
      users[b].questions.length -
      (Object.keys(users[a].answers).length + users[a].questions.length)
  );
  console.log('usersSorted in Leaderboard', usersSorted);

  return (
    <div className="leaderboard-container">
      <h3 className="leaderboard-header">Leaderboard</h3>
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Created</th>
            <th>Answered</th>
          </tr>
        </thead>
        <tbody>
          {usersSorted.map((id) => (
            <tr key={id}>
              <td>
                <img src={users[id].avatarURL} alt="Avatar" className="avatar" />
                <br />
                {users[id].name}
                <br />
                {users[id].id}
              </td>
              <td>{users[id].questions.length}</td>
              <td>{Object.keys(users[id].answers).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users,
    // avatar: users[questions[id].author].avatarURL,
    // optionOne: questions[id].optionOne.text,
    // optionTwo: questions[id].optionTwo.text,
    // id,
    // answered: users[authedUser].answers[id],
  };
};

export default connect(mapStateToProps)(Leaderboard);
