import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

import { IoHomeSharp } from 'react-icons/io5';

import { Banner } from '../../components';

export default () => {
	return (
		<>
			<Banner page="Error" />
			<main className={styles.main}>
				<h1>Page not found!</h1>
				<Link to="/" className="hover">
					<h4 className="custombtn valign-wrapper">
						<IoHomeSharp />
						<span>Return home</span>
					</h4>
				</Link>
			</main>
		</>
	);
};
