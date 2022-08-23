import React from 'react';

import css from './style.module.css';

import { FaEye } from 'react-icons/fa';
import { BsMoonStarsFill } from 'react-icons/bs';
import { GiWhiteTower, GiDoubleFaceMask, GiSnake, GiChessKnight } from 'react-icons/gi';
import { IoShieldSharp, IoSkullSharp } from 'react-icons/io5';
import { SiMediafire } from 'react-icons/si';

export const iconPicker = (school) => {
	let colour = '';
	switch (school.toLowerCase()) {
		case 'abjuration':
			colour = <IoShieldSharp className={`${css.spellIcon} cyan-text text-accent-3`} />;
			break;
		case 'enchantment':
			colour = <BsMoonStarsFill className={`${css.spellIcon} pink-text`} />;
			break;
		case 'conjuration':
			colour = <GiChessKnight className={`${css.spellIcon} purple-text text-lighten-2`} />;
			break;
		case 'divination':
			colour = <FaEye className={`${css.spellIcon} amber-text `} />;
			break;
		case 'evocation':
			colour = <SiMediafire className={`${css.spellIcon} red-text`} />;
			break;
		case 'illusion':
			colour = <GiDoubleFaceMask className={`${css.spellIcon} blue-text`} />;
			break;
		case 'necromancy':
			colour = <IoSkullSharp className={`${css.spellIcon} grey-text text-darken-3`} />;
			break;
		case 'transmutation':
			colour = <GiSnake className={`${css.spellIcon} green-text`} />;
			break;
		default:
			colour = null;
	}
	return colour;
};
