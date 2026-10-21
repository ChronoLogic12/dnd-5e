import React, { useEffect, useRef } from 'react';
import materialize from 'materialize-css';

export default ({ children }) => {
	const listRef = useRef(null);

	useEffect(() => {
		const instance = materialize.Collapsible.init(listRef.current);
		return () => instance.destroy();
	}, []);

	return (
		<ul className="collapsible no-autoinit" ref={listRef}>
			{children}
		</ul>
	);
};
