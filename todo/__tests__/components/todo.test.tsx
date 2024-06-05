import {expect, jest, test} from '@jest/globals';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Todo from './../../src/components/todo';

test('renders Todo component and allows adding and deleting todos', () => {
  render(<Todo />);

  expect(screen.getByText('Todo List')).toBeInTheDocument();

  const input = screen.getByPlaceholderText('Enter todo description');
  const addButton = screen.getByText('Add Item');
  
  fireEvent.change(input, { target: { value: 'test description' } });
  fireEvent.click(addButton);

  expect(screen.getByText('test description')).toBeInTheDocument();

	const checkbox = screen.getByTestId('checkbox-0');
  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();

  const deleteButton = screen.getByTestId('delete-btn-0');
  fireEvent.click(deleteButton);

  expect(screen.queryByText('test description')).not.toBeInTheDocument();
});
