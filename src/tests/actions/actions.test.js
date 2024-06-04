import { getUsers, getQuestions } from '../../actions/shared';
import { handleSaveQuestionAnswer } from '../../actions/questions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

global.fetch = jest.fn();

describe('getUsers', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches users successfully', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ success: true, data: ['user1', 'user2'] }),
      })
    );
    const users = await getUsers();
    expect(users).toEqual({ success: true, data: ['user1', 'user2'] });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/users/allusers`);
  });

  it('throws an error when success is false', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ success: false, message: 'Error message' }),
      })
    );

    await expect(getUsers()).rejects.toThrow('Problem with fetching users');
  });

  it('throws an error when fetch fails', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('API is down'))
    );

    await expect(getUsers()).rejects.toThrow('Problem with fetching users');
  });
});

describe('getQuestions', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches questions successfully', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ success: true, data: ['question1', 'question2'] }),
      })
    );
    const questions = await getQuestions();
    expect(questions).toEqual({
      success: true,
      data: ['question1', 'question2'],
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/questions/allquestions`
    );
  });

  it('throws an error when success is false', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ success: false, message: 'Error message' }),
      })
    );
    await expect(getQuestions()).rejects.toThrow(
      'Problem with fetching questions'
    );
  });

  it('throws an error when fetch fails', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('API is down'))
    );

    await expect(getQuestions()).rejects.toThrow(
      'Problem with fetching questions'
    );
  });
});

describe('handleSaveQuestionAnswer', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('dispatches saveQuestionAnswer after a successful fetch request', () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    );

    const expectedActions = [
      {
        type: 'SAVE_QUESTION_ANSWER',
        payload: { authedUser: 'user1', qid: 'q1', answer: 'optionOne' },
      },
    ];
    const store = mockStore({ authedUser: 'user1' });

    store.dispatch(handleSaveQuestionAnswer('q1', 'optionOne'));

    setTimeout(() => {
      expect(store.getActions()).toEqual(expectedActions);
    }, 1000);
  });

  it('throws an error when success is false', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ success: false, message: 'Error message' }),
      })
    );

    const store = mockStore({ authedUser: 'user1' });

    await expect(
      store.dispatch(handleSaveQuestionAnswer('q1', 'optionOne'))
    ).rejects.toThrow('There is an error answering the question. Try again.');
  });
});
