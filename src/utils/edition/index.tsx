import React, { createContext, useContext } from 'react';

import { useEditionState } from './useEditionState';
import type { EditionState } from './useEditionState';

const EditionContext = createContext<EditionState | null>(null);

export function EditionProvider({ children }: { children: React.ReactNode }) {
	return <EditionContext.Provider value={useEditionState()}>{children}</EditionContext.Provider>;
}

export const useEdition = () => {
	const context = useContext(EditionContext);
	if (!context) {
		throw new Error('useEdition must be used inside an EditionProvider');
	}
	return context;
};
