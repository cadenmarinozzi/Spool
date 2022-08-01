import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './index.js';

export default {
	title: 'Button',
	component: Button,
};

export const Primary = () => <Button>Button</Button>;
export const Icon = () => <Button icon={faFireFlameCurved}>Button</Button>;
export const IconRight = () => (
	<Button rightIcon={faFireFlameCurved}>Button</Button>
);
export const CustomIcon = () => (
	<Button
		customIcon={
			<FontAwesomeIcon
				style={{
					fontSize: '25pt',
				}}
				icon={faFireFlameCurved}
			/>
		}
	>
		Button
	</Button>
);

Primary.args = {
	primary: true,
	label: 'Button',
};

Icon.args = {
	primary: false,
	label: 'Button',
};

IconRight.args = {
	primary: false,
	label: 'Button',
};

CustomIcon.args = {
	primary: false,
	label: 'Button',
};
