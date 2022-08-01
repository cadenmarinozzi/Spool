import { themes } from '@storybook/theming';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	darkMode: {
		dark: {
			appBg: 'black',
		},
		light: { ...themes.normal, appBg: 'white' },
		current: 'dark',
	},
};
