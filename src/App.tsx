import React, { ReactElement } from 'react';
import { AppContext } from './context';

export default function App(): ReactElement {
	return (
		<AppContext>
			<AppContent />
		</AppContext>
	);
}

function AppContent(): ReactElement {
	return <div className="App">hello world</div>;
}
