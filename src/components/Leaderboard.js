import './Leaderboard.css';
import { connect } from 'react-redux';

// Component that displays the leaderboard
const Leaderboard = ({ users }) => {

  // Create array with users id sorted descending by the sum of the number of questions and answers they have
  const usersSorted = Object.keys(users).sort(
    (a, b) =>
      Object.keys(users[b].answers).length +
      users[b].questions.length -
      (Object.keys(users[a].answers).length + users[a].questions.length)
  );

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

// Use mapStateToProps to get necessary data from the store and return props
const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

//connects component to the store
export default connect(mapStateToProps)(Leaderboard);
