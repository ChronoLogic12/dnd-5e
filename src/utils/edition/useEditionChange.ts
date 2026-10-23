import { useEffect, useRef } from 'react';

import type { Edition } from '../../data/sources';

export const useEditionChange = (edition: Edition, onChange: () => void) => {
	const previousEdition = useRef(edition);

	useEffect(() => {
		if (previousEdition.current !== edition) {
			previousEdition.current = edition;
			onChange();
		}
	});
};
