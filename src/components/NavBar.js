import './NavBar.css';
import useResize from '../utils/hooks';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import homeicon from '../assets/logo/IMG_5694.png';

const NavBar = ({ dispatch, user }) => {
  // Use hook to save window width and screen size flags to variable
  const screenWidthTrueFalse = useResize();

  /**
   * Logs out the authenticated user
   * @param {Event} e - The event object
   */
  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // include cookies in request
      });

      const responseJSON = await response.json();

      if (responseJSON.success === false) {
        throw new Error(responseJSON.message);
      }

      dispatch(setAuthedUser(null));
      
    } catch (error) {
      console.error('Error:', error);
      alert('Problem with logging out');
    }
  };

  return (
    <section className="nav-bar-container">
      <nav className="nav-bar-menu">
        <ul>
          <li>
            <Link className="navbar-brand" to="/">
              <img src={homeicon} alt="Home" style={{ width: '30px' }} />
            </Link>
          </li>
          <li>
            {/* NavLink component is used to create links that are active when the URL matches the path. when active, the link is styled differently to highlight it */}
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'link-active btn btn-outline-secondary text-nowrap '
                  : 'btn btn-outline-secondary text-nowrap link'
              }
              to="/leaderboard"
            >
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'btn btn-outline-secondary text-nowrap link-active'
                  : 'btn btn-outline-secondary text-nowrap link'
              }
              to="/new"
            >
              New question
            </NavLink>
          </li>
        </ul>
      </nav>
      <span className="nav-bar-login">
        {/* If the screen width is not small then display this html code */}
        {!screenWidthTrueFalse.isScreenSm && (
          <ul>
            <li>
              <img src={user.avatarURL} alt="Avatar" className="avatar-login" />
            </li>
            <li id="nav-user-name">
              <span>{user.name}</span>
            </li>
            <li>
              <button
                className="btn btn-outline-secondary text-nowrap"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
        {/* If the screen width is small then display this html code */}
        {screenWidthTrueFalse.isScreenSm && (
          <div className="dropdown">
            <span
              className=""
              type="button"
              id=""
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src={user.avatarURL} alt="Avatar" className="avatar-login" />
            </span>
            <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton">
              <li id="nav-user-name" className="drop-down-container">
                {user.name}
              </li>
              <li className="drop-down-container">
                <button
                  className="btn btn-outline-secondary text-nowrap"
                  type="button"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </span>
    </section>
  );
};

// Use mapStateToProps to get necessary data from the store and return props
const mapStateToProps = ({ authedUser, users }) => ({
  user: users[authedUser],
});

//connects component to the store
export default connect(mapStateToProps)(NavBar);
