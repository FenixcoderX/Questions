import './Leaderboard.css';
import { connect } from 'react-redux';

const Leaderboard = ({ users, authedUser }) => {
  // Create array with users id sorted descending by the sum of the number of questions and answers they have
  const usersSorted = Object.keys(users).sort(
    (a, b) =>
      Object.keys(users[b].answers).length +
      users[b].questions.length -
      (Object.keys(users[a].answers).length + users[a].questions.length)
  );

  // If the user is not in the top 10, add it to the list on the 10th position
  const userIndex = usersSorted.findIndex((id) => id === authedUser);
  if (userIndex >= 9) {
    usersSorted.splice(userIndex, 1); // Remove the user from current position
    usersSorted.splice(9, 0, authedUser); // Insert the user at position 10
  }
  // Limit the number of users to 10
  usersSorted.length = 10;

  return (
    <div className="leaderboard-container">
      <h3 className="leaderboard-header">Leaderboard</h3>
      <div className="leaderboard-subheader">Most active users based on the number of questions and asnswers</div>
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Created</th>
            <th>Answered</th>
          </tr>
        </thead>
        <tbody>
          {/* Use map method to create html for each user */}
          {usersSorted.map((id) => (
            <tr key={id}>
              <td>
                <img
                  src={users[id].avatarURL}
                  alt="Avatar"
                  className="avatar"
                />
                <br />
                <span className="name-in-table">{users[id].name}</span>
                <br />
                {/* {users[id].id} */}
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

const mapStateToProps = ({ users, authedUser }) => {
  return {
    users,
    authedUser,
  };
};

export default connect(mapStateToProps)(Leaderboard);
