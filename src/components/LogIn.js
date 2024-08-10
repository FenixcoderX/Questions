import './LogIn.sass';
import { connect } from 'react-redux';
import { useState } from 'react';
import { setAuthedUser } from '../actions/authedUser';
import loginpic from '../assets/logo/IMG_5694.png';
import { Link } from 'react-router-dom';
import OAuth from '../utils/OAuth';

const LogIn = ({ dispatch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    let AUTHED_ID = null;
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include', // include cookies in request
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
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
      setEmail('');
      setPassword('');
      dispatch(setAuthedUser(AUTHED_ID));
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    
  };
  const handleChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  return (
    <div className="login-container">
      <h3 className="login-header">QUESTIONS</h3>
      <img src={loginpic} alt="loginpic" className="login-pic" />

      <h5>Log In</h5>

      <form className="input-form login-input-form mb-3" onSubmit={handleSubmit}>
        <label className="form-label">E-mail</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChangeEmail}
          className="form-control login-form-control"
          maxLength={100}
        />
        <label className="form-label">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChangePassword}
          className="form-control login-form-control"
          maxLength={100}
        />
        <button
          className="btn btn-dark text-nowrap"
          type="submit"
          disabled={email === '' || password === ''}
        >
          Log In
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
      <OAuth />
      <div className="mt-3">
        {' '}
        Don't have an account? <Link to="/signup">Sing Up</Link>
      </div>
    </div>
  );
};

export default connect()(LogIn);
