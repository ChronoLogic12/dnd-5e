import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { BsStars } from 'react-icons/bs';
import { GiBackPain, GiStrong, GiIceCube, GiBookmark } from 'react-icons/gi';
import { HiHome } from 'react-icons/hi';

import css from './style.module.css';

export default (props) => {
	const handleClick = () => {
		const elements = document.getElementById('iconContainer').childNodes;

		let i = 4;
		const toggleVisibility = () => {
			setTimeout(function () {
				elements[i].classList.toggle('hidden');
				i--;
				if (i > -1) {
					toggleVisibility();
				}
			}, 100);
		};
		toggleVisibility();
		document.getElementById('navMenu').classList.toggle('close');
	};

	return (
		<nav className={css.nav}>
			<div className={`${css.iconContainer}`} id="iconContainer">
				{useLocation().pathname == '/' ? null : (
					<Link to="/" className={`${css.icon} hidden white-text`}>
						<HiHome />
					</Link>
				)}
				{useLocation().pathname == '/spells' ? null : (
					<Link to="/spells" className={`${css.icon} hidden purple-text`}>
						<BsStars />
					</Link>
				)}
				{useLocation().pathname == '/conditions' ? null : (
					<Link to="/conditions" className={`${css.icon} hidden red-text`}>
						<GiBackPain />
					</Link>
				)}
				{useLocation().pathname == '/feats' ? null : (
					<Link to="/feats" className={`${css.icon} hidden indigo-text`}>
						<GiStrong />
					</Link>
				)}
				{useLocation().pathname == '/monsters' ? null : (
					<Link to="/monsters" className={`${css.icon} hidden green-text`}>
						<GiIceCube />
					</Link>
				)}
				{useLocation().pathname == '/about' ? null : (
					<Link to="/about" className={`${css.icon} hidden brown-text`}>
						<GiBookmark />
					</Link>
				)}
			</div>
			<button href="#" onClick={handleClick} className={css.burger} id="navMenu">
				<span className={css.one}></span>
				<span className={css.two}></span>
				<span className={css.three}></span>
			</button>
		</nav>
	);
};
