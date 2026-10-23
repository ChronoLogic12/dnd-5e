import React from 'react';
import { Link } from 'react-router-dom';

import { BsStars } from 'react-icons/bs';
import { GiBackPain, GiStrong, GiIceCube, GiBookmark } from 'react-icons/gi';

import { Banner } from '../../components';
import css from './style.module.css';

export default function Landing() {
	return (
		<>
			<Banner page="Home" />
			<main>
				<section className="container">
					<Link to="/spells" className="hover">
						<h4 className="custombtn">
							<BsStars className={`${css.icon} ${css.purple}`} />
							<span>Spells</span>
						</h4>
					</Link>
					<Link to="/conditions" className="hover">
						<h4 className="custombtn">
							<GiBackPain className={`${css.icon} ${css.red}`} />
							<span>Conditions</span>
						</h4>
					</Link>
					<Link to="/feats" className="hover">
						<h4 className="custombtn">
							<GiStrong className={`${css.icon} ${css.indigo}`} />
							<span>Feats</span>
						</h4>
					</Link>
					<Link to="/monsters" className="hover">
						<h4 className="custombtn">
							<GiIceCube className={`${css.icon} ${css.green}`} />
							<span>Monsters</span>
						</h4>
					</Link>
					<Link to="/about" className="hover">
						<h4 className="custombtn">
							<GiBookmark className={`${css.icon} ${css.brown}`} />
							<span>About</span>
						</h4>
					</Link>
				</section>
			</main>
		</>
	);
}
