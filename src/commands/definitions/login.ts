import {CommandDefinition, CommandContext} from '../base.js';

export const loginCommand: CommandDefinition = {
	command: 'login [provider]',
	description: 'Login with your Groq or OpenRouter API key. Defaults to Groq.',
	handler: ({args, setShowLogin, setLoginProvider}: CommandContext) => {
		const provider = (args[0] || 'groq').toLowerCase();

		if (setLoginProvider) {
			setLoginProvider(provider as any);
		}

		if (setShowLogin) {
			setShowLogin(true);
		}
	},
};
