import React from 'react';
import { Link } from 'react-router-dom';

import { BsStars } from 'react-icons/bs';
import { GiBackPain, GiStrong, GiIceCube, GiBookmark } from 'react-icons/gi';

import { Banner } from '../../components';
import css from './style.module.css';

export default () => {
	return (
		<>
			<Banner page="Home" />
			<main>
				<section className="container">
					<Link to="/spells" className="hover">
						<h4 className="custombtn valign-wrapper">
							<BsStars className={`${css.icon} purple-text`} />
							<span>Spells</span>
						</h4>
					</Link>
					<Link to="/conditions" className="hover">
						<h4 className="custombtn valign-wrapper">
							<GiBackPain className={`${css.icon} red-text`} />
							<span>Conditions</span>
						</h4>
					</Link>
					<Link to="/feats" className="hover">
						<h4 className="custombtn valign-wrapper">
							<GiStrong className={`${css.icon} indigo-text`} />
							<span>Feats</span>
						</h4>
					</Link>
					<Link to="/monsters" className="hover">
						<h4 className="custombtn valign-wrapper">
							<GiIceCube className={`${css.icon} green-text`} />
							<span>Monsters</span>
						</h4>
					</Link>
					<Link to="/about" className="hover">
						<h4 className="custombtn valign-wrapper">
							<GiBookmark className={`${css.icon} brown-text`} />
							<span>About</span>
						</h4>
					</Link>
				</section>
			</main>
		</>
	);
};
