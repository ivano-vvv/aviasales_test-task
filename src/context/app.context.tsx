import React from 'react';
import { StateProvider } from './state.context';
import { WrapperProps } from '../typings/interfaces';

export function AppContext({ children: App }: WrapperProps) {
	return <StateProvider>{App}</StateProvider>;
}
