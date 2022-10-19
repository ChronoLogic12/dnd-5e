import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Banner, Nav } from '../../components';

export default () => {
	return (
		<>
			<Banner page="About" />
			<main className="container">
				<div className="container-fluid row">
					<div className="col s12">
						<div className="card-panel">
							<h5>
								<b>Intro</b>
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
								<b>Credits</b>
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
								<b>The API</b>
							</h6>
							<p>
								Most of the info on the site comes from the{' '}
								<a href="https://open5e.com/" target="_blank">
									Open5e
								</a>{' '}
								API. For full details visit their website. Please consider supporting their work.
							</p>
							<h6>
								<b>Tech Stack</b>
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
							<h5>
								<b>Legal Information</b>
							</h5>
							<p>
								Permission to copy, modify and distribute the files collectively known as open5e.com
								is granted solely through the use of the Open Gaming License, Version 1.0a. <br />
							</p>
							<p>
								This material is being released using the Open Gaming License Version 1.0a and you
								should read and understand the terms of that license before using this material.
							</p>
							<p>
								The text of the Open Gaming License itself is not Open Game Content. Instructions on
								using the License are provided within the License itself.
							</p>
							<p>
								All of the rest of open5e.com is Open Game Content as described in Section 1(d) of
								the License.
							</p>
							<p>The terms of the Open Gaming License Version 1.0a are as follows:</p>
							<h6>
								<b>OPEN GAME LICENSE Version 1.0a</b>
							</h6>
							<p>
								The following text is the property of Wizards of the Coast, Inc. and is Copyright
								2000 Wizards of the Coast, Inc ("Wizards"). All Rights Reserved.
							</p>
							<ol>
								<li>
									<b>Definitions:</b>
									<ol className="subList">
										<li>
											<b>"Contributors" </b>means the copyright and/or trademark owners who have
											contributed Open Game Content.
										</li>
										<li>
											<b>"Derivative Material" </b>means copyrighted material including derivative
											works and translations (including into other computer languages), potation,
											modification, correction, addition, extension, upgrade, improvement,
											compilation, abridgment or other form in which an existing work may be recast,
											transformed or adapted.
										</li>
										<li>
											<b>"Distribute" </b>means to reproduce, license, rent, lease, sell, broadcast,
											publicly display, transmit or otherwise distribute.
										</li>
										<li>
											<b>"Open Game Content" </b>means the game mechanic and includes the methods,
											procedures, processes and routines to the extent such content does not embody
											the Product Identity and is an enhancement over the prior art and any
											additional content clearly identified as Open Game Content by the Contributor,
											and means any work covered by this License, including translations and
											derivative works under copyright law, but specifically excludes Product
											Identity.
										</li>
										<li>
											<b>"Product Identity" </b>means product and product line names, logos and
											identifying marks including trade dress; artifacts; creatures characters;
											stories, storylines, plots, thematic elements, dialogue, incidents, language,
											artwork, symbols, designs, depictions, likenesses, formats, poses, concepts,
											themes and graphic, photographic and other visual or audio representations;
											names and descriptions of characters, spells, enchantments, personalities,
											teams, personas, likenesses and special abilities; places, locations,
											environments, creatures, equipment, magical or supernatural abilities or
											effects, logos, symbols, or graphic designs; and any other trademark or
											registered trademark clearly identified as Product identity by the owner of
											the Product Identity, and which specifically excludes the Open Game Content.
										</li>
										<li>
											<b>"Trademark" </b>means the logos, names, mark, sign, motto, designs that are
											used by a Contributor to identify itself or its products or the associated
											products contributed to the Open Game License by the Contributor.
										</li>
										<li>
											<b>"Use", "Used" or "Using" </b>means to use, Distribute, copy, edit, format,
											modify, translate and otherwise create Derivative Material of Open Game
											Content.
										</li>
										<li>
											<b>"You" or "Your" </b>means the licensee in terms of this agreement.
										</li>
									</ol>
								</li>
								<li>
									<b>The License: </b>This License applies to any Open Game Content that contains a
									notice indicating that the Open Game Content may only be Used under and in terms
									of this License. You must affix such a notice to any Open Game Content that you
									Use. No terms may be added to or subtracted from this License except as described
									by the License itself. No other terms or conditions may be applied to any Open
									Game Content distributed using this License.
								</li>
								<li>
									<b>Offer and Acceptance: </b>By Using the Open Game Content You indicate Your
									acceptance of the terms of this License.
								</li>
								<li>
									<b>Grant and Consideration: </b>In consideration for agreeing to use this License,
									the Contributors grant You a perpetual, worldwide, royalty-free, non-exclusive
									license with the exact terms of this License to Use, the Open Game Content.
								</li>
								<li>
									<b>Representation of Authority to Contribute: </b>If You are contributing original
									material as Open Game Content, You represent that Your Contributions are Your
									original creation and/or You have sufficient rights to grant the rights conveyed
									by this License.
								</li>
								<li>
									<b>Notice of License Copyright: </b>You must update the COPYRIGHT NOTICE portion
									of this License to include the exact text of the COPYRIGHT NOTICE of any Open Game
									Content You are copying, modifying or distributing, and You must add the title,
									the copyright date, and the copyright holder's name to the COPYRIGHT NOTICE of any
									original Open Game Content you Distribute.
								</li>
								<li>
									<b>Use of Product Identity: </b>You agree not to Use any Product Identity,
									including as an indication as to compatibility, except as expressly licensed in
									another, independent Agreement with the owner of each element of that Product
									Identity. You agree not to indicate compatibility or co-adaptability with any
									Trademark or Registered Trademark in conjunction with a work containing Open Game
									Content except as expressly licensed in another, independent Agreement with the
									owner of such Trademark or Registered Trademark. The use of any Product Identity
									in Open Game Content does not constitute a challenge to the ownership of that
									Product Identity. The owner of any Product Identity used in Open Game Content
									shall retain all rights, title and interest in and to that Product Identity.
								</li>
								<li>
									<b>Identification: </b>If you distribute Open Game Content You must clearly
									indicate which portions of the work that you are distributing are Open Game
									Content.
								</li>
								<li>
									<b>Updating the License: </b>Wizards or its designated Agents may publish updated
									versions of this License. You may use any authorized version of this License to
									copy, modify and distribute any Open Game Content originally distributed under any
									version of this License.
								</li>
								<li>
									<b>Copy of this License: </b>You MUST include a copy of this License with every
									copy of the Open Game Content You Distribute.
								</li>
								<li>
									<b>Use of Contributor Credits: </b>You may not market or advertise the Open Game
									Content using the name of any Contributor unless You have written permission from
									the Contributor to do so.
								</li>
								<li>
									<b>Inability to Comply: </b>If it is impossible for You to comply with any of the
									terms of this License with respect to some or all of the Open Game Content due to
									statute, judicial order, or governmental regulation then You may not Use any Open
									Game Material so affected.
								</li>
								<li>
									<b>Termination: </b>This License will terminate automatically if You fail to
									comply with all terms herein and fail to cure such breach within 30 days of
									becoming aware of the breach. All sublicenses shall survive the termination of
									this License.
								</li>
								<li>
									<b>Reformation: </b>If any provision of this License is held to be unenforceable,
									such provision shall be reformed only to the extent necessary to make it
									enforceable.
								</li>
								<br />
								<li>
									<p>
										<b>COPYRIGHT NOTICE </b>Open Game License v 1.0a Copyright 2000, Wizards of the
										Coast, LLC.
									</p>
									<p>
										System Reference Document 5.1 Copyright 2016, Wizards of the Coast, Inc.;
										Authors Mike Mearls, Jeremy Crawford, Chris Perkins, Rodney Thompson, Peter Lee,
										James Wyatt, Robert J. Schwalb, Bruce R. Cordell, Chris Sims, and Steve
										Townshend, based on original material by E. Gary Gygax and Dave Arneson.
									</p>
									<p>
										Creature Codex. © 2018 Open Design LLC; Authors Wolfgang Baur, Dan Dillon,
										Richard Green, James Haeck, Chris Harris, Jeremy Hochhalter, James Introcaso,
										Chris Lockey, Shawn Merwin, and Jon Sawatsky.
									</p>
									<p>
										Tome of Beasts. Copyright 2016, Open Design; Authors Chris Harris, Dan Dillon,
										Rodrigo Garcia Carmona, and Wolfgang Baur.
									</p>
									<p>ope5e.com v2.0, copyright 2019.</p>
									<p>Yggdramor. copyright 2022.</p>
								</li>
							</ol>
							<p>END OF LICENSE</p>
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
			<Nav />
		</>
	);
};
