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

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  return (
    <Fragment>
      <LoadingBar />
      <div className="main-container">
        {!props.UserNotSingedIn && <NavBar />}
        {!props.UserNotSingedIn && (
          <Routes>
            {/* {props.loading === true ? null : (
          <Route path="*" element={<NotFound />} />
          )} */}
            <Route path="*" element={<NotFound />} />
            <Route
              path="/"
              exact
              element={
                //https://ui.dev/react-router-protected-routes-authentication
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

            {/* <Route path="/login" element={<LogIn />} /> */}
          </Routes>
        )}
        {props.UserNotSingedIn && !props.loading && (
          <Routes>
            <Route path="*" element={<LogIn />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, loadingBar }) => ({
  UserNotSingedIn: authedUser === null,
  loading: loadingBar.default === 1 ? true : false,
});
// const mapStateToProps = ({ loadingBar }) => ({
//   loading: (loadingBar.default===1) ? true:false,
// });
export default connect(mapStateToProps)(App);
