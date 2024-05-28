import './LogIn.css';
import { connect } from 'react-redux';
import { useState } from 'react';
import { setAuthedUser } from '../actions/authedUser';
import loginpic from '../assets/logo/IMG_5694.png';
import { Link } from 'react-router-dom';
import OAuth from './OAuth';

const LogIn = ({ dispatch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    let AUTHED_ID = null;
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        credentials: 'include', // include cookies in request
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: username, password: password }),
      });
      const data = await res.json();
      if (data.success === false) {
        if (data.message.includes('User not found')) {
          return setErrorMessage('User not found');
        }
        if (data.message.includes('Invalid password')) {
          return setErrorMessage('Invalid password');
        }
        return setErrorMessage('Something went wrong');
      }

      AUTHED_ID = data.id;
      setUsername('');
      setPassword('');
      dispatch(setAuthedUser(AUTHED_ID));
    } catch (err) {
      setErrorMessage('Something went wrong');
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
    <div className="login-container">
      <h3 className="login-header">QUESTIONS</h3>
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
        <button
          className="btn btn-dark text-nowrap"
          type="submit"
          disabled={username === '' || password === ''}
        >
          Log In
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
      <OAuth/>
      <div>
        {' '}
        Don't have an account? <Link to="/signup">Sing Up</Link>
      </div>
    </div>
  );
};

export default connect()(LogIn);
