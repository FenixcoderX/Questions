import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from '../../utils/_DATA.js';

describe('_getUsers function', () => {
  it('should return users', async () => {
    const users = await _getUsers();
    expect(users).not.toEqual(null);
  });
});

describe('_getQuestions function', () => {
  it('should return questions', async () => {
    const questions = await _getQuestions();
    expect(questions).not.toEqual(null);
  });
});

describe('_saveQuestion function', () => {
  it('should return saved question and all expected fields are populated', async () => {
    const question = {
      optionOneText: 'fist option',
      optionTwoText: 'second option',
      author: 'annako',
    };

    const resQuestion = await _saveQuestion(question);
    expect(resQuestion).toHaveProperty('id');
    expect(resQuestion.timestamp).not.toBeNull();
    expect(resQuestion.author).toEqual(question.author);
    expect(resQuestion.optionOne.text).toEqual(question.optionOneText);
    expect(resQuestion.optionOne.votes).toEqual([]);
    expect(resQuestion.optionTwo.text).toEqual(question.optionTwoText);
    expect(resQuestion.optionTwo.votes).toEqual([]);
  });

  it('should return an error if incorrect data is passed', async () => {
    const question = {
      optionTwoText: 'second option',
      author: 'annako',
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author'
    );
  });
});

describe('_saveQuestionAnswer function', () => {
  it('should return true when correctly formatted data is passed', async () => {
    const answer = {
      authedUser: 'annako',
      qid: 'am8ehyc8byjqgar0jgpub9',
      answer: 'optionOne',
    };
    await expect(_saveQuestionAnswer(answer)).resolves.toBeTruthy();
  });

  it('should return false when incorrect data is passed', async () => {
    const answer = {
      qid: 'am8ehyc8byjqgar0jgpub9',
      answer: 'optionOne',
    };
    await expect(_saveQuestionAnswer(answer)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
});
