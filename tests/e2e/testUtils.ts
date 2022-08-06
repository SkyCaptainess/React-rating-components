import { expect, Page } from '@playwright/test';

export const childTestIds = [
	'data-testid=rating-child-1',
	'data-testid=rating-child-2',
	'data-testid=rating-child-3',
	'data-testid=rating-child-4',
	'data-testid=rating-child-5',
];

export const pressTab = async (page: Page, browserName: string) => {
	if (browserName === 'webkit') {
		await page.keyboard.press('Alt+Tab');
	} else {
		await page.keyboard.press('Tab');
	}
};

export const pressShiftTab = async (page: Page, browserName: string) => {
	if (browserName === 'webkit') {
		await page.keyboard.press('Alt+Shift+Tab');
	} else {
		await page.keyboard.press('Shift+Tab');
	}
};

export const expectToBeTheOnlyFocusable = async (page: Page, locatorId: string) => {
	await expect(page.locator(locatorId)).toHaveAttribute('tabindex', '0');

	const notFocusedChild = childTestIds.filter((childName) => childName !== locatorId);
	for await (const childName of notFocusedChild) {
		await expect(page.locator(childName)).toHaveAttribute('tabindex', '-1');
	}
};

export const expectToBeTheOnlyChecked = async (page: Page, locatorId: string) => {
	await expect(page.locator(locatorId)).toBeChecked();

	const notFocusedChild = childTestIds.filter((childName) => childName !== locatorId);
	for await (const childName of notFocusedChild) {
		await expect(page.locator(childName)).not.toBeChecked();
	}
};

export const expectNoneToBeChecked = async (page: Page) => {
	for await (const childName of childTestIds) {
		await expect(page.locator(childName)).not.toBeChecked();
	}
};

export const beforeAny = async (page: Page, browserName: string) => {
	await page.goto('/');
	if (browserName === 'webkit') {
		await new Promise((resolve) => setTimeout(resolve, 100));
	}
};
