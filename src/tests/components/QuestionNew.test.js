import React from 'react';
import QuestionNew from '../../components/QuestionNew';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers';
import middleware from '../../middleware';
import { render, fireEvent } from '@testing-library/react';

const store = createStore(reducer, middleware);

describe('QuestionNew component', () => {
  let questionNewComponent;
  let firstOptionInput;
  let secondOptionInput;
  let createButton;

  beforeEach(() => {
    questionNewComponent = render(
      <Provider store={store}>
        <Router>
          <QuestionNew />
        </Router>
      </Provider>
    );

    firstOptionInput = questionNewComponent.getByTestId('first-option-input');
    secondOptionInput = questionNewComponent.getByTestId('second-option-input');
    createButton = questionNewComponent.getByTestId('create-button');
  });

  it('should show First option input, Second option input, disabled Create button in the document', () => {
    expect(firstOptionInput).toBeInTheDocument();
    expect(secondOptionInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
    expect(createButton).toBeDisabled();
  });

  it('should match snapshot', () => {
    expect(questionNewComponent).toMatchSnapshot();
  });

  it('should enable the Create button if input fields are filled', async () => {
    fireEvent.change(firstOptionInput, {
      target: { value: 'first' },
    });
    fireEvent.change(secondOptionInput, {
      target: { value: 'second' },
    });

    expect(createButton).toBeEnabled();
  });
  it('should disable the Create button if not all input fields are filled', () => {
    fireEvent.change(firstOptionInput, {
      target: { value: 'first' },
    });
    fireEvent.change(secondOptionInput, { target: { value: '' } });

    expect(createButton).toBeDisabled();
  });
});
