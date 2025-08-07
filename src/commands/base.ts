import {Agent} from '../core/agent.js';

export type LoginProvider = 'groq' | 'openrouter';

export interface CommandContext {
	agent?: Agent;
	args: string[];
	addMessage: (message: any) => void;
	clearHistory: () => void;
	setShowLogin: (show: boolean) => void;
	setLoginProvider?: (provider: LoginProvider) => void;
	setShowModelSelector?: (show: boolean) => void;
	toggleReasoning?: () => void;
	showReasoning?: boolean;
}

export interface CommandDefinition {
	command: string;
	description: string;
	handler: (context: CommandContext) => void;
}

export abstract class BaseCommand implements CommandDefinition {
	abstract command: string;
	abstract description: string;
	abstract handler(context: CommandContext): void;
}
