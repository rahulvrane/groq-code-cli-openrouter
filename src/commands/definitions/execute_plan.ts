import {CommandDefinition, CommandContext} from '../base.js';

const executePlanCommandHandler = (context: CommandContext) => {
	const {agent, addMessage} = context;

	if (!agent) {
		addMessage({
			role: 'system',
			content: 'Agent not available for the /execute_plan command.',
		});
		return;
	}

	addMessage({
		role: 'system',
		content: 'Executing the plan...',
	});

	agent.executePlan();
};

export const executePlanCommand: CommandDefinition = {
	command: 'execute_plan',
	description: 'Executes the finalized plan.',
	handler: executePlanCommandHandler,
};
