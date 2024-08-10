import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { createUser } from '../actions/users';

const OAuth = ({ dispatch }) => {
  const auth = getAuth(app);

  const hadleGoogleSignIn = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' }); // force Google to always ask for account selection

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log('resultsFromGoogle', resultsFromGoogle);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/google`, {
        method: 'POST',
        credentials: 'include', // include cookies in request
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: resultsFromGoogle.user.email,
          //email: resultsFromGoogle.user.email,
          avatarURL: resultsFromGoogle.user.photoURL,
          name: resultsFromGoogle.user.displayName,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        console.warn('Something went wrong');
      }
      const cookies = res.headers['set-cookie'];
      console.log('cookies', cookies);
      
      if (res.ok) {
        const AUTHED_ID = data.id;
        dispatch(createUser(data));
        dispatch(setAuthedUser(AUTHED_ID));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      style={{ borderRadius: '35px' }}
      className="btn btn-dark text-nowrap"
      onClick={hadleGoogleSignIn}
    >
      Log In with <span style={{ color: '#4285F4' }}>G</span>
      <span style={{ color: '#DB4437' }}>o</span>
      <span style={{ color: '#F4B400' }}>o</span>
      <span style={{ color: '#4285F4' }}>g</span>
      <span style={{ color: '#0F9D58' }}>l</span>
      <span style={{ color: '#DB4437' }}>e</span>
    </button>
  );
};

export default connect()(OAuth);
