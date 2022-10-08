import { NonNullProp, TabIndex } from './internalTypes';

export function getTabIndex(
	items: NonNullProp<'items'>,
	currentSelectedIndex: number
): TabIndex[] {
	return new Array(items).fill(undefined).map((_, index) => {
		if (currentSelectedIndex === -1 || currentSelectedIndex === 0) {
			if (index === 0) {
				return 0;
			}
			return -1;
		}
		if (currentSelectedIndex > 0) {
			if (index === currentSelectedIndex) {
				return 0;
			}
			return -1;
		}
	}) as TabIndex[];
}
