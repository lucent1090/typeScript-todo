import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect'
import FancyInput from '../FancyInput';

afterEach(cleanup)

test('it should render a add button', () => {
  const { getByText } = render(<FancyInput />);
  expect(getByText('Add')).toBeInTheDocument();
});

// test('it should')