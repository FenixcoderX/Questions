import './SignUp.css';
import { useState, useEffect, useRef } from 'react';
import loginpic from '../assets/logo/IMG_5694.png';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../actions/users';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

const SignUp = ({ dispatch }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    avatarURL:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Image Upload
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  );
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const fileRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileSize = file.size; // Get the size of the file in bytes
      if (fileSize > 2 * 1024 * 1024) {
        setErrorMessage('Could not upload image. File must be less than 2MB');
        return;
      }
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadingImage();
    }
    // eslint-disable-next-line
  }, [imageFile]);

  const uploadingImage = async () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime().toString() + '-' + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress);
      },
      (error) => {
        setErrorMessage('Could not upload image. File must be less than 2MB');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData((formData) => ({
            ...formData,
            avatarURL: downloadURL,
          }));
          setImageFileUploading(false);
        });
      }
    );
  };

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ''
    );
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          avatarURL: formData.avatarURL,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        if (data.message.includes('name_1 dup key')) {
          return setErrorMessage('Username already exists');
        }
        if (data.message.includes('email_1 dup key')) {
          return setErrorMessage('E-mail already exists');
        }
        return setErrorMessage('Something went wrong');
      }
      dispatch(createUser(data));
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
      });
      navigate(-1);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <h3 className="login-header">QUESTIONS</h3>
      <img src={loginpic} alt="loginpic" className="loginpic" />

      <h5>Sign Up</h5>

      <form className="input-form mb-3" onSubmit={handleSubmit}>
        <label className="form-label">E-mail</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          maxLength={100}
        />
        <label className="form-label">Username</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          maxLength={20}
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

        <label className="form-label">Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileRef}
          hidden
        />
        <img
          src={imageFileUrl}
          alt="Avatar"
          className="avatar avatar-form"
          onClick={() => fileRef.current.click()}
        />
        {imageFileUploading && imageFileUploadProgress < 100 && (
          <div>Uploading image: {imageFileUploadProgress.toFixed(0)}%</div>
        )}
        {imageFileUploadProgress === 100 && (
          <div>
            Uploading image: <span style={{ color: 'green' }}>successful</span>
          </div>
        )}
        <button
          className="btn btn-dark text-nowrap mt-2"
          type="submit"
          disabled={
            formData.email === '' ||
            formData.password === '' ||
            formData.confirmPassword === '' ||
            formData.name === '' ||
            !passwordMatch ||
            imageFileUploading
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
