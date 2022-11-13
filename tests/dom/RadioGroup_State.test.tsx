import React from 'react';
import { describe, test } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { render, screen, CHILD_ID_3, CHILD_ID_4, CHILD_ID_5, useOnChange } from './testUtils';
import { Rating } from '../../src/Rating';

describe('User-managed state is updated correctly by click and hover events', () => {
	test('Initial value is set correctly', () => {
		const { result } = renderHook(() => useOnChange(3));

		render(
			<Rating value={result.current.ratingValue} onChange={result.current.setRatingValue} />
		);

		expect(result.current.ratingValue).toBe(3);
	});

	test('Rating value is updated correctly', async () => {
		const { result } = renderHook(() => useOnChange(1));
		const user = userEvent.setup();

		render(
			<Rating value={result.current.ratingValue} onChange={result.current.setRatingValue} />
		);

		await user.click(screen.getByTestId(CHILD_ID_4));
		expect(result.current.ratingValue).toBe(4);

		await user.click(screen.getByTestId(CHILD_ID_5));
		expect(result.current.ratingValue).toBe(5);

		await user.click(screen.getByTestId(CHILD_ID_3));
		expect(result.current.ratingValue).toBe(3);
	});

	test('Rating value is reset correctly if clicking again on the current rating', async () => {
		const user = userEvent.setup();
		const { result } = renderHook(() => useOnChange(3));

		render(
			<Rating value={result.current.ratingValue} onChange={result.current.setRatingValue} />
		);

		await user.click(screen.getByTestId(CHILD_ID_3));
		expect(result.current.ratingValue).toBe(0);
	});

	test('Rating value is reset correctly if clicking on button', async () => {
		const { result } = renderHook(() => useOnChange(1));
		const user = userEvent.setup();

		render(
			<div style={{ maxWidth: 350, width: '100%' }}>
				<Rating value={result.current.ratingValue} onChange={result.current.setRatingValue} />
				<button data-testid="reset-btn" onClick={() => result.current.setRatingValue(0)}>
					Reset
				</button>
			</div>
		);

		await user.click(screen.getByTestId('reset-btn'));
		expect(result.current.ratingValue).toBe(0);
	});

	test('Hovered rating value is updated correctly and does not interfere with selected value', async () => {
		const { result } = renderHook(() => useOnChange(1));

		const useOnHoverChange = useOnChange;
		const { result: hoveredResult } = renderHook(() => useOnHoverChange(0));

		const user = userEvent.setup();

		render(
			<Rating
				value={result.current.ratingValue}
				onChange={result.current.setRatingValue}
				onHoverChange={hoveredResult.current.setRatingValue}
			/>
		);

		await user.hover(screen.getByTestId(CHILD_ID_5));
		expect(hoveredResult.current.ratingValue).toBe(5);

		await user.hover(screen.getByTestId(CHILD_ID_3));
		expect(hoveredResult.current.ratingValue).toBe(3);

		expect(result.current.ratingValue).toBe(1);
	});
});
