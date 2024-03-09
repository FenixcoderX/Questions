import {useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import homeicon from '../assets/icons/home-alt-outline.svg';

const NavBar = ({ dispatch, authedUser, user }) => {
  // console.log("authedUser in NavBar",authedUser);
  // console.log("user in NavBar",user);

  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(null));
    //navigate (`/login`)
    localStorage.clear();
  };
//TODO highlight the selected link
  return (
    <div className="nav-bar-container">
      <nav className="nav-bar-menu">
        <ul>
          <li>
            <Link className="navbar-brand" to="/">
                <img src={homeicon} alt="Home" style={{ width: "20px",paddingBottom:"2px" }}/>
            </Link>
          </li>
          <li>
            <Link className="btn btn-outline-secondary text-nowrap" to="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link className="btn btn-outline-secondary text-nowrap" to="/new">New question</Link>
          </li>
        </ul>
      </nav>
      <span className="nav-bar-login">
        <ul>
          <li>
            <img src={user.avatarURL} alt="Avatar" className="avatar-login" />
          </li>
          <li id='nav-user-name'>
            <span>{user.name}</span>
          </li>
          <li>
            <button className="btn btn-outline-secondary text-nowrap" onClick={(e) => logout(e)}>
              Logout
            </button>
          </li>
        </ul>
      </span>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  user: users[authedUser],
});
export default connect(mapStateToProps)(NavBar);
