import {CommandDefinition, CommandContext} from './base.js';
import {helpCommand} from './definitions/help.js';
import {loginCommand} from './definitions/login.js';
import {modelCommand} from './definitions/model.js';
import {clearCommand} from './definitions/clear.js';
import {reasoningCommand} from './definitions/reasoning.js';
import {executePlanCommand} from './definitions/execute_plan.js';

const availableCommands: CommandDefinition[] = [
	helpCommand,
	loginCommand,
	modelCommand,
	clearCommand,
	reasoningCommand,
	executePlanCommand,
];

export function getAvailableCommands(): CommandDefinition[] {
	return [...availableCommands];
}

export function getCommandNames(): string[] {
	return getAvailableCommands().map(cmd => cmd.command);
}

export function handleSlashCommand(command: string, context: CommandContext) {
	const commandDef = getAvailableCommands().find(c => c.command === command);

	// Add user message for the command
	context.addMessage({
		role: 'user',
		content: `/${command} ${context.args.join(' ')}`,
	});

	if (commandDef) {
		commandDef.handler(context);
	} else {
		context.addMessage({
			role: 'system',
			content: `Unknown command: /${command}`,
		});
	}
}

export {CommandDefinition, CommandContext} from './base.js';
