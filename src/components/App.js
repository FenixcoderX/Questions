import { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import NavBar from './NavBar';
import QuestionList from './QuestionList';
import QuestionView from './QuestionView';
import QuestionNew from './QuestionNew';
import Leaderboard from './Leaderboard';
import NotFound from './NotFound';
import RequireAuth from './RequireAuth';
import LogIn from './LogIn';
import LoadingBar from 'react-redux-loading-bar';


// Main component for the application
const App = (props) => {
  // useEffect hook to dispatch the handleInitialData action creator when the component mounts to get the initial data from the store
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    // React Fragment is a container that doesn’t render any extra element to the DOM.
    <Fragment>
      {/* external component that shows a loading bar until app has finished all initial dispatches */}
      <LoadingBar /> 
      <div className="main-container">
        {/* If the user is signed in and the loading data finished, the NavBar and all other components are rendered */}
        {!props.UserNotSingedIn && !props.loading && <NavBar />}
        {!props.UserNotSingedIn && !props.loading && (
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route
              path="/"
              exact
              element={
                // https://ui.dev/react-router-protected-routes-authentication
                // Component that checks if the user is authenticated before rendering the QuestionList component
                <RequireAuth>
                  <QuestionList />
                </RequireAuth>
              }
            />

            <Route
              path="/question/:id"
              element={
                <RequireAuth>
                  <QuestionView />
                </RequireAuth>
              }
            />

            <Route
              path="/new"
              element={
                <RequireAuth>
                  <QuestionNew />
                </RequireAuth>
              }
            />

            <Route
              path="/leaderboard"
              element={
                <RequireAuth>
                  <Leaderboard />
                </RequireAuth>
              }
            />
          </Routes>
        )}
        {/* If the user is not signed in and the loading data finished, the LogIn component is rendered in any route */}
        {props.UserNotSingedIn && !props.loading && (
          <Routes>
            <Route path="*" element={<LogIn />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
};

// Use mapStateToProps to get necessary data from the store and return props
const mapStateToProps = ({ authedUser, loadingBar }) => {
  return {
  UserNotSingedIn: authedUser === null, //if there is no authedUser, UserNotSingedIn is true
  loading: loadingBar.default === 1, //while loadingBar is active, loading is true
}};

//connects component to the store
export default connect(mapStateToProps)(App);
