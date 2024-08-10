import './App.sass';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import NavBar from './NavBar';
import QuestionList from './QuestionList';
import QuestionView from './QuestionView';
import QuestionNew from './QuestionNew';
import Leaderboard from './Leaderboard';
import ErrorPage from './ErrorPage';
import LogIn from './LogIn';
import SignUp from './SignUp';
import SSE from '../utils/SSE';
import LoadingBar from 'react-redux-loading-bar';

// Main component for the application
const App = (props) => {
  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [errorLoadingData, setErrorLoadingData] = useState(false);

  // useEffect hook to dispatch the handleInitialData action creator when the component mounts to get the initial data from the store
  useEffect(() => {
    setLoadingInitialData(true);
    const fetchInitialData = async () => {
      try {
        await props.dispatch(handleInitialData());
      } catch (error) {
        setErrorLoadingData(true);
        console.error('FRONT END Error:', error);
      }
      setLoadingInitialData(false);
    };
    fetchInitialData();

    // eslint-disable-next-line
  }, []);

  const { UserNotSingedIn } = props;

  return (
    <>
      {/* external component that shows a loading bar until app has finished all initial dispatches */}
      <LoadingBar />
      <div className="app-main-container">
        {/* If the user is signed in and the loading data finished, and no errors, the NavBar and all other components are rendered */}
        {!UserNotSingedIn && !loadingInitialData && !errorLoadingData && (
          <NavBar />
        )}
         {!UserNotSingedIn && !loadingInitialData && !errorLoadingData && (
          <SSE />
        )}
        {!UserNotSingedIn && !loadingInitialData && !errorLoadingData && (
          <Routes>
            <Route
              path="*"
              element={
                <ErrorPage errorType="404" errorMessage="Page not found" />
              }
            />
            <Route path="/" exact element={<QuestionList />} />

            <Route path="/question/:id" element={<QuestionView />} />

            <Route path="/new" element={<QuestionNew />} />

            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        )}
        {/* If the user is not signed in and the loading data finished, and no errors, the LogIn component is rendered in any route except signup*/}
        {UserNotSingedIn && !loadingInitialData && !errorLoadingData && (
          <Routes>
            <Route path="*" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        )}
        {/* if there is an error loading data, the ErrorPage component is rendered */}
        {errorLoadingData && (
          <ErrorPage errorType="503" errorMessage="Service Unavailable" />
        )}
      </div>
    </>
  );
};

// Use mapStateToProps to get necessary data from the store and return props
const mapStateToProps = ({ authedUser }) => {
  return {
    UserNotSingedIn: authedUser === null, //if there is no authedUser, UserNotSingedIn is true
  };
};

//connects component to the store
export default connect(mapStateToProps)(App);
