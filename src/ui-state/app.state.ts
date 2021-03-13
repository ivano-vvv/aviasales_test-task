import { makeObservable, observable } from 'mobx';

class AppState {
	@observable temp = 'string';

	constructor() {
		makeObservable(this);
	}
}

export const appState = new AppState();
