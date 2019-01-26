import React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import App from '../App';

test('it should render weather component and input line for todo list', () => {
  const { getByText } = render(<App />);
  expect(getByText('Taipei')).toBeInTheDocument();
  expect(getByText('Add')).toBeInTheDocument();
});
