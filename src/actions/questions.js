import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export const CREATE_QUESTION = 'CREATE_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

//this action uses in users and questions reducers (because we need to update parts of state for users and questions)
export function saveQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleSaveQuestionAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    })
      .then(() =>
        dispatch(
          saveQuestionAnswer({
            authedUser,
            qid,
            answer,
          })
        )
      )
      .catch((e) => {
        console.warn('Error in handleSaveQuestionAnswer: ', e);
        alert('The was an error answering the question. Try again.');
      });
  };
}

export function createQuestion(question) {
  return {
    type: CREATE_QUESTION,
    question,
  };
}

export function handleСreateQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    // console.log ("handleСreateQuestion optionTwoText", optionTwoText)
    // console.log ("handleСreateQuestion optionOneText", optionOneText)
    // console.log ("handleСreateQuestion authedUser", authedUser)

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author:authedUser,
    })
      .then((question) =>
        dispatch(
          createQuestion(question)
        )
      )
      .catch((e) => {
        console.warn('Error in handleСreateQuestion: ', e);
        alert('The was an error creating new question. Try again.');
      });
  };
}
