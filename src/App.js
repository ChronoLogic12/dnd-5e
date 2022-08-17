import * as Pages from './pages';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/styles.css';

function App() {
	return (
		<Routes>
			<Route exact path="/" element={<Pages.Landing />} />
			<Route path="*" element={<Pages.NotFound />} />
			<Route path="/spells" element={<Pages.Spells />} />
		</Routes>
	);
}

export default App;
