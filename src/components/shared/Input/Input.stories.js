import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import Input from './index.js';

export default {
	title: 'Input',
	component: Input,
};

export const Primary = () => (
	<Input
		placeholder="Input"
		value="Input"
		text="Input"
		onInput={() => {}}
	></Input>
);

export const Icon = () => (
	<Input
		placeholder="Input"
		value="Input"
		text="Input"
		icon={faFireFlameCurved}
		onInput={() => {}}
	></Input>
);

Primary.args = {
	primary: true,
	label: 'Input',
};

Icon.args = {
	primary: false,
	label: 'Input',
};
