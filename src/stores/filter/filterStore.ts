import { action, observable } from 'mobx';
import { filter as messages } from '../../constants/messages';
import { showError } from '../../utils/showError';

class Filter {
	@observable filter = [true, true, true, true];

	@action tick(stopsAmount: number): void {
		const isStopsAmountValid = this.checkStopsAmount(stopsAmount);

		if (!isStopsAmountValid) {
			this.showError(messages.stopsAmountError, stopsAmount);
			return;
		}

		this.filter[stopsAmount] = !this.filter[stopsAmount];
	}

	private checkStopsAmount(stopsAmount: number): boolean {
		return stopsAmount > 0 && stopsAmount < this.filter.length - 1;
	}

	private showError(message: string, additionalInfo?: unknown): void {
		showError('filter store', message, additionalInfo);
	}
}

export const filterStore = new Filter();
