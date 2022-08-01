import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import Input from './index.js';

export default {
	title: 'Input',
	component: Input,
	parameters: {
		backgrounds: { default: 'dark' },
	},
};

const Template = (args) => (
	<Input
		placeholder="Input"
		text="Input"
		value="Input"
		onInput={() => {}}
		{...args}
	></Input>
);
export const Primary = Template.bind({});
export const Icon = Template.bind({});

Primary.args = {};

Icon.args = {
	icon: faFireFlameCurved,
};
