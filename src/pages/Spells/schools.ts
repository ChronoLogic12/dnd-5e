import type { IconType } from 'react-icons';
import { FaEye } from 'react-icons/fa';
import { BsMoonStarsFill } from 'react-icons/bs';
import { GiDoubleFaceMask, GiSnake, GiChessKnight } from 'react-icons/gi';
import { IoShieldSharp, IoSkullSharp } from 'react-icons/io5';
import { SiMediafire } from 'react-icons/si';

export interface School {
	icon: IconType;
	colour: string;
}

export const schools: Record<string, School> = {
	abjuration: { icon: IoShieldSharp, colour: '#00e5ff' },
	conjuration: { icon: GiChessKnight, colour: '#ba68c8' },
	divination: { icon: FaEye, colour: '#ffc107' },
	enchantment: { icon: BsMoonStarsFill, colour: '#e91e63' },
	evocation: { icon: SiMediafire, colour: '#f44336' },
	illusion: { icon: GiDoubleFaceMask, colour: '#2196f3' },
	necromancy: { icon: IoSkullSharp, colour: '#424242' },
	transmutation: { icon: GiSnake, colour: '#4caf50' },
};

export const getSchool = (name: string): School | undefined => schools[name.toLowerCase()];
