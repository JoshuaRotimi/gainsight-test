import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


test('renders input field correctly', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Enter Token/i);
  expect(inputElement.value).toBe('');
});

test('changes input field as user types', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Enter Token/i);
  expect(inputElement.value).toBe('');

  fireEvent.change(inputElement, {target : {
      value: '12345'
    }});

  expect(inputElement.value).toBe('12345');
});

test('renders Submit Button correctly', () => {
  render(<App />);
  const buttonElement = screen.getAllByRole('button');
  expect(buttonElement[0]).toBeInTheDocument();
  expect(buttonElement[1]).toBeInTheDocument();
});

test('removes button and input field when user enters token', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', {name : /Submit/i });
  const inputElement = screen.getByPlaceholderText(/Enter Token/i);
  expect(buttonElement).toBeInTheDocument();

  fireEvent.change(inputElement, {target : {
      value: '12345'
    }});

  fireEvent.click(buttonElement);

  expect(buttonElement).not.toBeInTheDocument();
  expect(inputElement).not.toBeInTheDocument();

});
