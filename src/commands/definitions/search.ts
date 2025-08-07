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

	const query = args.join(' ');

	if (!query) {
		addMessage({
			role: 'system',
			content: 'Usage: /search <query>',
		});
		return;
	}

	// We will implement agent.search in the next step.
	// For now, we are just confirming to the user.
	addMessage({
		role: 'system',
		content: `Searching for: "${query}"...`,
	});

	agent.search(query);
};

export const searchCommand: CommandDefinition = {
	command: 'search',
	description: 'Performs a web search with the given query',
	handler: searchCommandHandler,
};
