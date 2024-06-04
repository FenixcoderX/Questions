import { connect } from 'react-redux';
import { useEffect } from 'react';
import { rewriteQuestion } from '../actions/questions';
import { rewriteUser } from '../actions/users';
const SSE = ({ dispatch }) => {
  // useEffect hook to listen for SSE events for questions and users
  useEffect(() => {
    // Use EventSource to listen for server-sent events
    const sourceQuestion = new EventSource(
      `${process.env.REACT_APP_API_URL}/questions/updates`,
      { withCredentials: true }
    );
    // Handle the message event, which will be called when the server sends a message
    sourceQuestion.onmessage = function (event) {
      setTimeout(() => {
        dispatch(rewriteQuestion(JSON.parse(event.data)));
      }, 1000);
    };

    const sourceUser = new EventSource(`${process.env.REACT_APP_API_URL}/users/updates`, {
      withCredentials: true,
    });
    sourceUser.onmessage = function (event) {
      setTimeout(() => {
        dispatch(rewriteUser(JSON.parse(event.data)));
      }, 1000);
    };

    return () => {
      sourceQuestion.close();
      sourceUser.close();
    };
    // eslint-disable-next-line
  }, []);

  return null;
};

export default connect()(SSE);
