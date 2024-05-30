import './QuestionNew.css';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleСreateQuestion } from '../actions/questions';

const QuestionNew = ({ dispatch }) => {
  // Create state variables for question, first and second options for the question
  const [questionText, setQuestionText] = useState('');
  const [firstOption, setFirstOption] = useState('');
  const [secondOption, setSecondOption] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Create a navigate function using the useNavigate hook to redirect to required page
  const navigate = useNavigate();

  /**
   * Handles the form submission for creating a new question, saves it to the store, clears the form and redirects to the home page
   *
   * @param {Event} e - The form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(handleСreateQuestion(questionText,firstOption, secondOption));
      setQuestionText('');
      setFirstOption('');
      setSecondOption('');
      navigate(`/`);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

/**
   * Saves input value to the questionText state variable
   * @param {Event} e - The change event object
   */
  const handleChangeQuestionText = (e) => {
    const questionText = e.target.value;
    setQuestionText(questionText);
  };
  /**
   * Saves input value to the first option state variable
   * @param {Event} e - The change event object
   */
  const handleChangeFirstOption = (e) => {
    const firstOption = e.target.value;
    setFirstOption(firstOption);
  };

  /**
   * Saves input value to the second option state variable
   * @param {Event} e - The change event object
   */
  const handleChangeSecondOption = (e) => {
    const secondOption = e.target.value;
    setSecondOption(secondOption);
  };

 

  return (
    <div className="question-new-container">
      <h3 className="question-new-header">Create new question</h3>
      <div className="question-new-subheader">Write a question with two possible answers</div>
      <form className="textarea-form mb-3" onSubmit={handleSubmit}>
      <label className="form-label">Question</label>
        <textarea
          itemID=""
          data-testid="questionText-option-input"
          placeholder="maximum 400 characters"
          value={questionText}
          onChange={handleChangeQuestionText}
          className="form-control"
          style={{ textAlign: "left" }}
          rows="6"
          maxLength={400}
        ></textarea>
        <label className="form-label">First option</label>
        <textarea
          itemID=""
          data-testid="first-option-input"
          placeholder="maximum 100 characters"
          value={firstOption}
          onChange={handleChangeFirstOption}
          className="form-control"
          style={{ textAlign: "left" }}
          rows="3"
          maxLength={100}
        ></textarea>
        <label className="form-label">Second option</label>
        <textarea
          data-testid="second-option-input"
          placeholder="maximum 100 characters"
          value={secondOption}
          onChange={handleChangeSecondOption}
          className="form-control"
          style={{ textAlign: "left" }}
          rows="3"
          maxLength={100}
        ></textarea>
        <button
          data-testid="create-button"
          className="btn btn-dark text-nowrap"
          type="submit"
          disabled={firstOption === '' || secondOption === ''}
        >
          Send
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default connect()(QuestionNew);
