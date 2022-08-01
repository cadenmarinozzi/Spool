import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './index.js';

export default {
	title: 'Button',
	component: Button,
};

const Template = (args) => <Button {...args}>Button</Button>;
export const Primary = Template.bind({});
export const Icon = Template.bind({});
export const RightIcon = Template.bind({});
export const CustomIcon = Template.bind({});
export const Small = Template.bind({});
export const SmallIcon = Template.bind({});
export const SmallRightIcon = Template.bind({});
export const SmallCustomIcon = Template.bind({});

Primary.args = {};

Icon.args = {
	primary: false,
	label: 'Button',
	icon: faFireFlameCurved,
};

RightIcon.args = {
	rightIcon: faFireFlameCurved,
};

CustomIcon.args = {
	customIcon: (
		<FontAwesomeIcon
			style={{
				fontSize: '25pt',
			}}
			icon={faFireFlameCurved}
		/>
	),
};

Small.args = {
	small: true,
};

SmallIcon.args = {
	small: true,
	icon: faFireFlameCurved,
};

SmallRightIcon.args = {
	small: true,
	rightIcon: faFireFlameCurved,
};

SmallCustomIcon.args = {
	small: true,
	customIcon: (
		<FontAwesomeIcon
			style={{
				fontSize: '25pt',
			}}
			icon={faFireFlameCurved}
		/>
	),
};
