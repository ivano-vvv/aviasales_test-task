import React, { ReactElement } from 'react';
import { WrapperProps } from '../typings/interfaces';
import { appState } from '../ui-state';

export const StateContext = React.createContext({} as typeof appState);

export function StateProvider({ children }: WrapperProps): ReactElement {
	return (
		<StateContext.Provider value={appState}>
			{children}
		</StateContext.Provider>
	);
}
