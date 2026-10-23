export interface SelectOption {
	value: string;
	label: string;
}

export interface UseMultiSelectProps {
	options: SelectOption[];
	value: string[];
	onChange: (value: string[]) => void;
	placeholder?: string;
}

export const getSummary = (options: SelectOption[], value: string[], placeholder: string) => {
	const labels = options.filter((option) => value.includes(option.value)).map((option) => option.label);
	if (labels.length === 0) {
		return placeholder;
	}
	return labels.length <= 2 ? labels.join(', ') : `${labels[0]} +${labels.length - 1}`;
};

export const useMultiSelect = ({ options, value, onChange, placeholder = 'Any' }: UseMultiSelectProps) => ({
	options,
	value,
	onChange,
	summary: getSummary(options, value, placeholder),
});

export type MultiSelectState = ReturnType<typeof useMultiSelect>;
