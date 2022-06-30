import React from 'react';

import {
  render,
  screen,
  beforeEach,
  afterEach,
  ID,
  CHILD_ID_1,
  CHILD_ID_2,
  CHILD_ID_3,
  CHILD_ID_4,
} from './testUtils';

import { Rating } from '../../src/Rating';

beforeEach();
afterEach();

/* A11y - Parent */

test('Should have readOnly attributes', () => {
  render(<Rating readOnly value={2} />);
  const item = screen.getByTestId(ID);
  expect(item).toBeInTheDocument();
  expect(item).toHaveAttribute('role', 'img');
  expect(item).toHaveAccessibleName('Rated 2 on 5');
  expect(item).toHaveClass('rar--group');
});

test('Should not be focusable and have radio-group specific attributes and classes', () => {
  render(<Rating readOnly value={2} />);
  const item = screen.getByTestId(ID);
  expect(item).not.toHaveFocus();
  expect(item).not.toHaveAttribute('aria-required');
  expect(item).not.toHaveAttribute('aria-invalid');
  expect(item).not.toHaveClass('rar--cursor');
  expect(item).not.toHaveClass('rar--fx-colors');
});

test('User should be able to customize aria-label', () => {
  const CUSTOM_LABEL = 'Rated two';

  render(<Rating readOnly value={2} invisibleLabel={CUSTOM_LABEL} />);
  const item = screen.getByTestId(ID);
  expect(item).toHaveAccessibleName(CUSTOM_LABEL);
});

/* A11y - Child */

test('Should contain only n child as per ', () => {
  render(<Rating readOnly value={2} items={3} />);
  const item = screen.getByTestId(ID);

  const child1 = screen.getByTestId(CHILD_ID_1);
  expect(item).toContainElement(child1);

  const child2 = screen.getByTestId(CHILD_ID_2);
  expect(item).toContainElement(child2);

  const child3 = screen.getByTestId(CHILD_ID_3);
  expect(item).toContainElement(child3);

  const child4 = screen.queryByTestId(CHILD_ID_4);
  expect(item).not.toContainElement(child4);
});

test('No child should contain accessible attributes', () => {
  render(<Rating readOnly value={2} items={3} />);

  const expectToNotHaveAccesibleAttributes = (child: HTMLElement) => {
    expect(child).not.toHaveAttribute('tabindex');
    expect(child).not.toHaveAttribute('aria-labelledby');
    expect(child).not.toHaveAttribute('role', 'radio');
  };

  const child1 = screen.getByTestId(CHILD_ID_1);
  expectToNotHaveAccesibleAttributes(child1);

  const child2 = screen.getByTestId(CHILD_ID_2);
  expectToNotHaveAccesibleAttributes(child2);

  const child3 = screen.getByTestId(CHILD_ID_3);
  expectToNotHaveAccesibleAttributes(child3);
});
