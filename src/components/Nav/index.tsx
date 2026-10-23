import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { BsStars } from 'react-icons/bs';
import { GiBackPain, GiStrong, GiIceCube, GiBookmark } from 'react-icons/gi';
import { HiHome } from 'react-icons/hi';

import css from './style.module.css';

export default function Nav() {
	const handleClick = () => {
		const elements = document.getElementById('iconContainer')?.children;
		if (!elements) {
			return;
		}

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
		document.getElementById('navMenu')?.classList.toggle('close');
	};

	return (
		<nav className={css.nav}>
			<div className={`${css.iconContainer}`} id="iconContainer">
				{useLocation().pathname == '/' ? null : (
					<Link to="/" className={`${css.icon} ${css.white} hidden`}>
						<HiHome />
					</Link>
				)}
				{useLocation().pathname == '/spells' ? null : (
					<Link to="/spells" className={`${css.icon} ${css.purple} hidden`}>
						<BsStars />
					</Link>
				)}
				{useLocation().pathname == '/conditions' ? null : (
					<Link to="/conditions" className={`${css.icon} ${css.red} hidden`}>
						<GiBackPain />
					</Link>
				)}
				{useLocation().pathname == '/feats' ? null : (
					<Link to="/feats" className={`${css.icon} ${css.indigo} hidden`}>
						<GiStrong />
					</Link>
				)}
				{useLocation().pathname == '/monsters' ? null : (
					<Link to="/monsters" className={`${css.icon} ${css.green} hidden`}>
						<GiIceCube />
					</Link>
				)}
				{useLocation().pathname == '/about' ? null : (
					<Link to="/about" className={`${css.icon} ${css.brown} hidden`}>
						<GiBookmark />
					</Link>
				)}
			</div>
			<button onClick={handleClick} className={css.burger} id="navMenu">
				<span className={css.one}></span>
				<span className={css.two}></span>
				<span className={css.three}></span>
			</button>
		</nav>
	);
}
