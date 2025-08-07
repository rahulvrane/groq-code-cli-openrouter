import {CommandDefinition, CommandContext} from '../base.js';

const searchCommandHandler = (context: CommandContext) => {
	const {agent, args, addMessage} = context;

	if (!agent) {
		addMessage({
			role: 'system',
			content: 'Agent not available for the /search command.',
		});
		return;
	}

	const [subcommand, ...options] = args;

	const webSearchOptions: any = {
		enabled: false,
		provider: '',
		settings: {},
	};

	if (subcommand === 'on') {
		webSearchOptions.enabled = true;
		options.forEach(option => {
			const [key, value] = option.split('=');
			if (key && value) {
				if (key === 'provider') {
					webSearchOptions.provider = value;
				} else {
					webSearchOptions.settings[key] = value;
				}
			}
		});
		agent.setWebSearch(webSearchOptions);
		addMessage({
			role: 'system',
			content: `Web search has been enabled. Your next message will use it. Options: ${JSON.stringify(
				webSearchOptions,
			)}`,
		});
	} else if (subcommand === 'off') {
		agent.setWebSearch({enabled: false});
		addMessage({
			role: 'system',
			content: 'Web search has been disabled.',
		});
	} else {
		addMessage({
			role: 'system',
			content:
				'Usage: /search [on|off] provider=[groq|openrouter] [key=value...]',
		});
	}
};

export const searchCommand: CommandDefinition = {
	command: 'search',
	description: 'Enable or disable web search for the next message',
	handler: searchCommandHandler,
};
