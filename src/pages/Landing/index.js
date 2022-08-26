import React from 'react';
import { Link } from 'react-router-dom';

import { IoChevronForwardSharp } from 'react-icons/io5';

import css from './style.module.css';

export default () => {
	return (
		<>
			<main>
				<div className="container">
					<h1>
						<span className="red-text">5e:</span> Home
					</h1>
				</div>
				<section className="container">
					<Link to="/spells" className={`${css.hover}`}>
						<h4 className="black-text valign-wrapper">
							<IoChevronForwardSharp />
							Spells
						</h4>
					</Link>
					<Link to="/conditions" className={`${css.hover}`}>
						<h4 className="black-text valign-wrapper">
							<IoChevronForwardSharp />
							Conditions
						</h4>
					</Link>
					<Link to="/" className={`${css.hover}`}>
						<h4 className="grey-text valign-wrapper">
							<IoChevronForwardSharp />
							About
						</h4>
					</Link>
				</section>
			</main>
		</>
	);
};
