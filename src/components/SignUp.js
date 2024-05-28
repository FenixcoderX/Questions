import './SignUp.css';
import { useState, useEffect } from 'react';
import loginpic from '../assets/logo/IMG_5694.png';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {createUser} from '../actions/users';

const SignUp = ({ dispatch }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // eslint-disable-next-line
  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ''
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const res = await fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: formData.username,
          password: formData.password,
          name: formData.name,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        if (data.message.includes('duplicate key error')) {
          return setErrorMessage('User already exists');
        }
        return setErrorMessage('Something went wrong');
      }
      dispatch(createUser(data));
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
      });
      navigate(-1);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const goBack = () => {
    navigate(-1);
  }

  return (
      <div className="login-container">
        <h3 className="login-header">QUESTIONS</h3>
        <img src={loginpic} alt="loginpic" className="loginpic" />

        <h5>Sign Up</h5>

        <form className="input-form mb-3" onSubmit={handleSubmit}>
          <label className="form-label">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            maxLength={16}
          />
          <label className="form-label">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            maxLength={100}
          />
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            maxLength={100}
          />
          <label className="form-label">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-control"
            maxLength={100}
          />
          {!passwordMatch && (
            <p style={{ color: 'red' }}>Passwords are not matched!</p>
          )}
          <button
            className="btn btn-dark text-nowrap"
            type="submit"
            disabled={
              formData.username === '' ||
              formData.password === '' ||
              formData.confirmPassword === '' ||
              formData.name === '' ||
              !passwordMatch
            }
          >
            Sign Up
          </button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
        <div>
          {' '}
          Already have an account? <Link onClick={goBack}>Log In</Link>
        </div>
      </div>
    
  );
};

export default connect()(SignUp);
