import { connect } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleСreateQuestion } from '../actions/questions';
// import { handleSaveQuestionAnswer } from '../actions/questions';

const QuestionNew = ({ dispatch }) => {
  const [firstOption, setFirstOption] = useState('');
  const [secondOption, setSecondOption] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleСreateQuestion(firstOption, secondOption));
    setFirstOption('');
    setSecondOption('');
    navigate(`/`);
  };

  const handleChangeFirstOption = (e) => {
    const firstOption = e.target.value;
    setFirstOption(firstOption);
  };
  const handleChangeSecondOption = (e) => {
    const secondOption = e.target.value;
    setSecondOption(secondOption);
  };

  return (
    <div className="question-new-container">
      <h3 className="question-new-header">Create new question</h3>
      <div className="question-new-header">Help Me Choose</div>
      <form className="textarea-form mb-3" onSubmit={handleSubmit}>
        <label className="form-label">First option</label>
        <textarea
          itemID=""
          data-testid="first-option-input"
          placeholder="maximum 100 characters"
          value={firstOption}
          onChange={handleChangeFirstOption}
          className="form-control"
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
      </form>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(QuestionNew);
