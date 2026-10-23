import React from 'react';

import EditionSwitchPresentational from './EditionSwitchPresentational';
import { useEdition } from '../../utils/edition';

export default function EditionSwitch() {
	return <EditionSwitchPresentational {...useEdition()} />;
}
