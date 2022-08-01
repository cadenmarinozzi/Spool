import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import RangeSlider from './index.js';

export default {
	title: 'Range Slider',
	component: RangeSlider,
};

export const Primary = () => (
	<RangeSlider min={0} max={100} text="Range Slider" onChange={() => {}} />
);

export const Icon = () => (
	<RangeSlider
		min={0}
		max={100}
		text="Range Slider"
		icon={faFireFlameCurved}
		onChange={() => {}}
	/>
);

Primary.args = {
	primary: true,
	label: 'Range Slider',
};

Icon.args = {
	primary: false,
	label: 'Range Slider',
};
