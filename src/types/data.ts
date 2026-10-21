export interface Condition {
	slug: string;
	name: string;
	desc: string;
	document__title: string;
}

export interface Feat {
	name: string;
	prerequisite: string;
	desc: string;
	document__title: string;
}
