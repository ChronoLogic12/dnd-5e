import React, { useEffect, useRef } from 'react';
import materialize from 'materialize-css';

interface CollapsibleListProps {
	children: React.ReactNode;
}

export default function CollapsibleList({ children }: CollapsibleListProps) {
	const listRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const instance = materialize.Collapsible.init(listRef.current as HTMLUListElement);
		return () => instance.destroy();
	}, []);

	return (
		<ul className="collapsible no-autoinit" ref={listRef}>
			{children}
		</ul>
	);
}
