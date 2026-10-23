import { useEffect } from 'react';

interface UseCloseMissingOpenProps {
	results: { id: string }[];
	open: string | null;
	setOpen: (open: string | null) => void;
	isLoading?: boolean;
}

export const useCloseMissingOpen = ({ results, open, setOpen, isLoading = false }: UseCloseMissingOpenProps) => {
	const isMissing = !isLoading && open !== null && !results.some((result) => result.id === open);

	useEffect(() => {
		if (isMissing) {
			setOpen(null);
		}
	}, [isMissing, setOpen]);
};
