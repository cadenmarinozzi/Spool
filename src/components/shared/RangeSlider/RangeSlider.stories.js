import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import RangeSlider from './index.js';

export default {
	title: 'Range Slider',
	component: RangeSlider,
};

const Template = (args) => (
	<RangeSlider
		min={0}
		max={100}
		{...args}
		text="Range Slider"
		onChange={() => {}}
	></RangeSlider>
);
export const Primary = Template.bind({});
export const Icon = Template.bind({});

Primary.args = {};

Icon.args = {
	icon: faFireFlameCurved,
};
