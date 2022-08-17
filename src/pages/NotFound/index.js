import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

export default () => {
	return (
		<>
			<main className={styles.main}>
				<h1>Error - Page not found!</h1>
				<Link to="/">Return home</Link>
			</main>
		</>
	);
};
