import React, {useState, useEffect} from 'react';
import {Box, Text, useInput} from 'ink';

import {LoginProvider} from '../../../commands/base.js';

interface LoginProps {
	provider: LoginProvider;
	onSubmit: (apiKey: string) => void;
	onCancel: () => void;
}

export default function Login({provider, onSubmit, onCancel}: LoginProps) {
	const [apiKey, setApiKey] = useState('');

	useInput((input, key) => {
		if (key.return) {
			if (apiKey.trim()) {
				onSubmit(apiKey.trim());
			}
			return;
		}

		if (key.escape) {
			onCancel();
			return;
		}

		if (key.backspace || key.delete) {
			setApiKey(prev => prev.slice(0, -1));
			return;
		}

		if (key.ctrl && input === 'c') {
			onCancel();
			return;
		}

		// Regular character input
		if (input && !key.meta && !key.ctrl) {
			setApiKey(prev => prev + input);
		}
	});

	const isGroq = provider === 'groq';
	const title = isGroq
		? 'Login with Groq API Key'
		: 'Login with OpenRouter API Key';
	const url = isGroq
		? 'https://console.groq.com/keys'
		: 'https://openrouter.ai/keys';

	return (
		<Box flexDirection="column" marginBottom={1}>
			<Box marginBottom={1}>
				<Text color="cyan" bold>
					{title}
				</Text>
			</Box>

			<Box marginBottom={1}>
				<Text color="gray">
					Enter your {isGroq ? 'Groq' : 'OpenRouter'} API key to continue. You
					can get one from <Text underline>{url}</Text>
				</Text>
			</Box>

			<Box>
				<Text color="cyan">API Key: </Text>
				<Text>
					{'*'.repeat(Math.min(apiKey.length, 20))}
					{apiKey.length > 20 && '...'}
				</Text>
				<Text backgroundColor="cyan" color="cyan">
					▌
				</Text>
			</Box>
		</Box>
	);
}
