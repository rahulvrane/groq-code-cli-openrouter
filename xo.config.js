import xo from 'eslint-config-xo';
import xoReact from 'eslint-config-xo-react';

export default [
	...xo,
	...xoReact,
	{
		rules: {
			'react/prop-types': 'off',
		},
	},
];
