import { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import homeicon from '../assets/logo/IMG_5694.png';
// import homeicon from '../assets/icons/home-alt-outline.svg';

const SCREEN_SM = 510; //768, from Bootstrap
// const SCREEN_LG = 992;
// const SCREEN_XL = 1200;
// const SCREEN_XXL = 1400;

const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth); // State variable to hold the window width

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth); // Update width state on window resize
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Return an object containing window width and screen size flags based on breakpoints
  return {
    width,
    isScreenSm: width >= SCREEN_SM,
    // isScreenMd: width >= SCREEN_MD,
    // isScreenLg: width >= SCREEN_LG,
    // isScreenXl: width >= SCREEN_XL,
    // isScreenXxl: width >= SCREEN_XXL,
  };
};

const NavBar = ({ dispatch, authedUser, user }) => {
  // console.log("authedUser in NavBar",authedUser);
  // console.log("user in NavBar",user);

  const screenWidthTrueFalse = useResize();
  // console.log (screenWidthTrueFalse);

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
                <img src={homeicon} alt="Home" style={{ width: "30px" }}/>
            </Link>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? "link-active btn btn-outline-secondary text-nowrap " : "btn btn-outline-secondary text-nowrap link")} to="/leaderboard">Leaderboard</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? "btn btn-outline-secondary text-nowrap link-active" : "btn btn-outline-secondary text-nowrap link")} to="/new">New question</NavLink>
          </li>
        </ul>
      </nav>
      <span className="nav-bar-login">
        {screenWidthTrueFalse.isScreenSm && (
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
        )}
        {!screenWidthTrueFalse.isScreenSm && (
          <div className="dropdown">
            <span className="" type="button" id="" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src={user.avatarURL} alt="Avatar" className="avatar-login" />
            </span>
            <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton">
              <li id="nav-user-name" className='drop-down-container'>{user.name}</li>
              {/* <li> <hr className="dropdown-divider"/></li> */}
              <li className='drop-down-container'><button className="btn btn-outline-secondary text-nowrap" type="button" onClick={(e) => logout(e)}>
                Logout
              </button></li>
            </ul>
          </div>
        )}
      </span>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  user: users[authedUser],
});
export default connect(mapStateToProps)(NavBar);
