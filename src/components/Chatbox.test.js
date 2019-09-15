import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Chatbox from './Chatbox';

afterEach(cleanup);

test('Chatbox renders the chat room name', () => {
  const { container, debug } = render(<Chatbox />);
  debug();
});
