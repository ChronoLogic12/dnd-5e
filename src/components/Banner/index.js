import React from 'react';
import M from 'materialize-css';
import { Link, useLocation } from 'react-router-dom';

import css from './style.module.css';

import { IoChevronForwardSharp } from 'react-icons/io5';

export default (props) => {
	return (
		<div className={css.banner}>
			<div className="container-fluid">
				{useLocation().pathname == '/' ? (
					<span>
						<h2>Yggdramor:</h2>
					</span>
				) : (
					<Link className="home" to="/">
						<h2>Yggdramor:</h2>
					</Link>
				)}
				<div className={css.slide}>
					<span className={css.page}>
						<h2> {props.page}</h2>
					</span>
				</div>
			</div>
		</div>
	);
};
