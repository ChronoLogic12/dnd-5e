import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import App from './App';
import { EditionProvider } from './utils/edition';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Router>
			<NuqsAdapter>
				<EditionProvider>
					<App />
				</EditionProvider>
			</NuqsAdapter>
		</Router>
	</React.StrictMode>
);
