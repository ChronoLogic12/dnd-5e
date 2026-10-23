import { parseAsInteger, parseAsString } from 'nuqs';

export const listParams = {
	search: parseAsString.withDefault(''),
	page: parseAsInteger.withDefault(1),
	open: parseAsString,
};

export const listUrlKeys = { search: 'q' };
