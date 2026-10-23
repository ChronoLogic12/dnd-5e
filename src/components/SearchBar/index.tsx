import React from 'react';
import { IoSearch } from 'react-icons/io5';

import css from './style.module.css';

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
	return (
		<form className={css.search} role="search" onSubmit={(event) => event.preventDefault()}>
			<IoSearch className={css.icon} aria-hidden />
			<label htmlFor="search" className={css.label}>
				Search
			</label>
			<input
				className={css.input}
				type="search"
				id="search"
				name="search"
				placeholder="Search"
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</form>
	);
}
