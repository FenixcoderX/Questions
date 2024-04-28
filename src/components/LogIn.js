import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useHistory } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import loginpic from '../assets/logo/IMG_5694.png';

const LogIn = ({ dispatch, users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [correct, setCorrect] = useState(true);
  const [show, setShow] = useState(false);
  // const history = useHistory()
  // const goBack = () => {
  //     history.goBack()
  // }

  // Set delay to show the component
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 10); // 10ms delay

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = (e) => {
    let AUTHED_ID = null;
    e.preventDefault();
    // dispatch(handleСreateQuestion(firstOption, secondOption));
    // setFirstOption('');
    // setSecondOption('');
    // navigate(`/`);
    const foundUser = Object.keys(users).find((id) => id === username);
    console.log('users', users);
    console.log('foundUser', foundUser);

    if (foundUser) {
      if (users[foundUser].password === password) {
        AUTHED_ID = foundUser;
      } else {
        AUTHED_ID = null;
        setCorrect(false);
      }
    } else {
      setCorrect(false);
    }

    if (AUTHED_ID === null || !foundUser) {
    } else {
      setCorrect(true);
      setUsername('');
      setPassword('');
      dispatch(setAuthedUser(AUTHED_ID));
      localStorage.setItem('authedUser', AUTHED_ID);
      //navigate(`/`);
    }
  };

  const handleChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const handleChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  return (
    show && (
      <div className="login-container">
        <h3 className="login-header">HELP ME CHOOSE</h3>
        <img src={loginpic} alt="loginpic" className="loginpic" />

        <h5>Log In</h5>

        <form className="input-form mb-3" onSubmit={handleSubmit}>
          <label className="form-label">Username</label>
          <input
            itemID=""
            name="username"
            value={username}
            onChange={handleChangeUsername}
            className="form-control"
            maxLength={16}
          />
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleChangePassword}
            className="form-control"
            maxLength={100}
          />
          {correct === false && <div>Wrong username/password</div>}
          <button
            className="btn btn-dark text-nowrap"
            type="submit"
            disabled={username === '' || password === ''}
          >
            Log In
          </button>
        </form>
      </div>
    )
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapStateToProps)(LogIn);
