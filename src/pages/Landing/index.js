import React from 'react';
import { Link } from 'react-router-dom';

import { IoChevronForwardSharp } from 'react-icons/io5';
import { BsStars } from 'react-icons/bs';
import { GiBackPain, GiStrong, GiIceCube, GiBookmark } from 'react-icons/gi';

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
							<span>Spells</span>
							<BsStars className={`${css.icon} purple-text`} />
						</h4>
					</Link>
					<Link to="/conditions" className={`${css.hover}`}>
						<h4 className="black-text valign-wrapper">
							<IoChevronForwardSharp />
							<span>Conditions</span>
							<GiBackPain className={`${css.icon} red-text`} />
						</h4>
					</Link>
					<Link to="/feats" className={`${css.hover}`}>
						<h4 className="black-text valign-wrapper">
							<IoChevronForwardSharp />
							<span>Feats</span>
							<GiStrong className={`${css.icon} indigo-text`} />
						</h4>
					</Link>
					<Link to="/monsters" className={`${css.hover}`}>
						<h4 className="black-text valign-wrapper">
							<IoChevronForwardSharp />
							<span>Monsters</span>
							<GiIceCube className={`${css.icon} green-text`} />
						</h4>
					</Link>
					<Link to="/about" className={`${css.hover}`}>
						<h4 className="black-text valign-wrapper">
							<IoChevronForwardSharp />
							About
							<GiBookmark className={`${css.icon} brown-text`} />
						</h4>
					</Link>
				</section>
			</main>
		</>
	);
};
