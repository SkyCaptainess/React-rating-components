// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Rating } from '../../src/Rating';
import {
	render,
	screen,
	GROUP_ID,
	itemStyles,
	CHILD_ID_1,
	CHILD_ID_2,
	CHILD_ID_3,
	CHILD_ID_4,
} from './testUtils';

const activeClassNames = 'rr--box rr--on';
const inactiveClassNames = 'rr--box rr--off';

const toHaveClassNames = (childId: string, classNames: string) => {
	const child = screen.getByTestId(childId);
	expect(child).toHaveClass(classNames, { exact: true });
};

describe('Read Only - Classes and variables', () => {
	test('If styles are deactivated/unset, no classNames should be added', () => {
		const defaultClasses = 'rr--group rr--dir-x';

		render(
			<Rating
				readOnly
				value={2}
				itemStyles={itemStyles}
				spaceBetween="none"
				spaceInside="none"
			/>
		);
		const group = screen.getByTestId(GROUP_ID);
		expect(group).toHaveClass(defaultClasses, { exact: true });
	});

	test('If only one color is defined, should have exactly one CSS var defined in style', () => {
		render(
			<Rating
				readOnly
				value={2}
				itemStyles={{ ...itemStyles, activeFillColor: 'red' }}
				spaceBetween="none"
				spaceInside="none"
			/>
		);
		const group = screen.getByTestId(GROUP_ID);
		expect(group).toHaveAttribute('style', '--rr--fill-on-color: red;');
	});

	test('If no colors are defined, the style attribute should not be defined', () => {
		render(
			<Rating
				readOnly
				value={2}
				itemStyles={itemStyles}
				spaceBetween="none"
				spaceInside="none"
			/>
		);
		const group = screen.getByTestId(GROUP_ID);
		expect(group).not.toHaveAttribute('style');
	});

	test('Should have active classNames added properly', () => {
		render(<Rating readOnly value={2} items={3} />);

		toHaveClassNames(CHILD_ID_1, activeClassNames);
		toHaveClassNames(CHILD_ID_2, activeClassNames);
		toHaveClassNames(CHILD_ID_3, inactiveClassNames);
	});

	/* New in v1.1.0 */
	test('readOnly should always take precedence over isDisabled', async () => {
		render(<Rating readOnly isDisabled value={2} />);

		const group = screen.queryByTestId(GROUP_ID);
		expect(group).not.toHaveClass('rr--disabled');
	});
});

describe('Half-fill classnames injection', () => {
	test("If user passes a float but doesn't deserve half-fill, should have classes added as usual", () => {
		render(<Rating readOnly value={2.12} items={3} />);

		toHaveClassNames(CHILD_ID_1, activeClassNames);
		toHaveClassNames(CHILD_ID_2, activeClassNames);
		toHaveClassNames(CHILD_ID_3, inactiveClassNames);
	});

	test('Whether or not deserves half-fill, aria-label value should display the original value in any case', () => {
		const floatValue = 2.12;
		const items = 3;
		const { rerender } = render(<Rating readOnly value={floatValue} items={items} />);
		const group = screen.getByTestId(GROUP_ID);
		expect(group).toHaveAccessibleName(`Rated ${floatValue} on ${items}`);

		const floatValueHF = 2.44;
		rerender(<Rating readOnly value={floatValueHF} items={items} />);
		expect(group).toHaveAccessibleName(`Rated ${floatValueHF} on ${items}`);
	});

	test('If user passes a float, deserves half-fill but highlightOnlySelected is enabled, should have default on/off classNames', () => {
		render(
			<Rating readOnly value={2.42} items={4} halfFillMode="box" highlightOnlySelected />
		);

		toHaveClassNames(CHILD_ID_1, inactiveClassNames);
		toHaveClassNames(CHILD_ID_2, activeClassNames);
		toHaveClassNames(CHILD_ID_3, inactiveClassNames);
		toHaveClassNames(CHILD_ID_4, inactiveClassNames);
	});

	test('If user passes a float and deserves half-fill, should have proper classes if halfFillMode is set to "box"', () => {
		render(<Rating readOnly value={2.42} items={4} halfFillMode="box" />);

		const boxOnClassNames = 'rr--box rr--hf-box-on';

		toHaveClassNames(CHILD_ID_1, boxOnClassNames);
		toHaveClassNames(CHILD_ID_2, boxOnClassNames);
		toHaveClassNames(CHILD_ID_3, 'rr--box rr--hf-box-int');
		toHaveClassNames(CHILD_ID_4, 'rr--box rr--hf-box-off');
	});

	test('If user passes a float and deserves half-fill, should have proper classes if halfFillMode is set to "svg"', () => {
		render(<Rating readOnly value={2.42} items={4} />);

		const svgOnClassNames = 'rr--box rr--hf-svg-on';

		toHaveClassNames(CHILD_ID_1, svgOnClassNames);
		toHaveClassNames(CHILD_ID_2, svgOnClassNames);
		toHaveClassNames(CHILD_ID_3, svgOnClassNames);
		toHaveClassNames(CHILD_ID_4, 'rr--box rr--hf-svg-off');
	});
});
