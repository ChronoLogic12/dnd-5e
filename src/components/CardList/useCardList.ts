import { useEffect, useRef } from 'react';

export const getCardId = (value: string) => `card-${value}`;

export interface UseCardListProps {
	open?: string | null;
	onOpenChange?: (value: string | null) => void;
}

export const useCardList = ({ open, onOpenChange }: UseCardListProps) => {
	const linkedCard = useRef(open);

	useEffect(() => {
		const card = linkedCard.current ? document.getElementById(getCardId(linkedCard.current)) : null;
		if (card) {
			linkedCard.current = null;
			card.scrollIntoView?.({ block: 'start' });
		}
	});

	if (!onOpenChange) {
		return {};
	}
	return {
		value: open ? [open] : [],
		onValueChange: (value: string[]) => onOpenChange(value[0] ?? null),
	};
};
