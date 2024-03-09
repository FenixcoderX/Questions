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
      <h3 className="question-new-header">HELP ME CHOOSE</h3>
      <div className="question-new-header">Create your own question</div>
      <br />
      <form className="input-form" onSubmit={handleSubmit}>
        <label>First option</label>
        <div/>
        <input
          itemID=""
          data-testid="first-option-input"
          placeholder="first option"
          value={firstOption}
          onChange={handleChangeFirstOption}
          className="TODO"
          maxLength={100}
        />
        <label>Second option</label>
        <div/>
        <input
          data-testid="second-option-input"
          placeholder="second option"
          value={secondOption}
          onChange={handleChangeSecondOption}
          className="TODO"
          maxLength={100}
        />
        <br />
        <button
          data-testid="create-button"
          className="btn btn-outline-secondary"
          type="submit"
          disabled={firstOption === '' || secondOption === ''}
        >
          Create
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(QuestionNew);
