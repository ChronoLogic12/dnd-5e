import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default () => {
	return (
		<>
			<main className="container">
				<h1>
					<Link to="/">
						<span className="red-text home">5e:</span>
					</Link>{' '}
					About
				</h1>
				<div className="container-fluid row">
					<div className="col s12">
						<div className="card-panel">
							<hr className="rule" />
							<p>
								I am a very simple card. I am good at containing small bits of information. I am
								convenient because I require little markup to use effectively. I am similar to what
								is called a panel in other frameworks.
							</p>
						</div>
					</div>
				</div>
				<div className="spacing"></div>
			</main>
		</>
	);
};
