import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Banner } from '../../components';

export default () => {
	return (
		<>
			<Banner page="About" />
			<main className="container">
				<div className="container-fluid row">
					<div className="col s12">
						<div className="card-panel">
							<h5>
								<strong>Intro</strong>
							</h5>
							<hr className="rule" />
							<p>
								First of all, thanks for checking out the app! This little project started off as an
								excuse to practice coding in React and to address some of the problems my D&D group
								and I have had with other spell-searching apps; Namely that they often fall short
								when it comes to more complex filtering. If you're just looking for all of the
								wizard spells then you're probably fine, but if you've ever played a spell thief
								rouge and needed to find all the wizard spells that are from either the enchantment
								or illusion schools AND between levels 1 and 4 then you probably know it's a bit of
								a pain. Even just figuring out if there are any good ritual spells for your class at
								your new level can sometimes be a challenge.
								<br />
								<br /> This is the problem I have attempted to solve with the spells page of this
								app. There you can search by any term and filter the results by any combination of
								level, class, school and casting time as well as whether you're looking for
								concentration or ritual spells.
								<br />
								<br />
								The other pages are something of an add-on to this functionality. By adding tools to
								allow you to clarify rules for specific conditions and feats or to check a monster's
								stats (Unless you're currently a player in combat with it! You wouldn't cheat now
								would you?) I've attempted to bring more of what you need together in one place so
								you can focus on the fun part, playing the game.
							</p>
							<h5>
								<strong>Credits</strong>
							</h5>
							<hr className="rule" />
							<p>
								Dungeons and Dragons 5th Edition (D&D5e) is the property of{' '}
								<a href="https://dnd.wizards.com/" target="_blank">
									Wizards of the Coast LLC.
								</a>{' '}
								Please visit their website and support the official release.
							</p>
							<h6>
								<strong>The API</strong>
							</h6>
							<p>
								Most of the info on the site comes from the{' '}
								<a href="https://open5e.com/" target="_blank">
									Open5e
								</a>{' '}
								API. For full details visit their website. Please consider supporting their work.
							</p>
							<h6>
								<strong>Tech Stack</strong>
							</h6>
							<p>
								For those of you who may be interested, this site was created using the following
								technologies.
							</p>
							<ul>
								<li>
									<a href="https://reactjs.org/" target="_blank">
										React
									</a>
								</li>
								<li>
									<a href="https://react-icons.github.io/react-icons/" target="_blank">
										React Icons
									</a>
								</li>
								<li>
									<a href="https://materializecss.com/" target="_blank">
										Materialize
									</a>
								</li>
								<li>
									<a href="https://axios-http.com/" target="_blank">
										Axios
									</a>
								</li>
								<li>
									<a href="https://www.netlify.com/" target="_blank">
										Netlify
									</a>
								</li>
								<li>(HTML, CSS, Javascript)</li>
							</ul>
							<hr className="rule" />
							<div className="center-align">
								<em className="grey-text">
									Site created by Matthew Suttie (ChronoLogic){' '}
									<a href="https://github.com/ChronoLogic12" target="_blank">
										GitHub.
									</a>
								</em>
							</div>
						</div>
					</div>
				</div>
				<div className="spacing"></div>
			</main>
		</>
	);
};
