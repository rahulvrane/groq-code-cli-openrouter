import React, {useState, useEffect} from 'react';
import {Box, Text, useInput} from 'ink';

interface Model {
	id: string;
	name: string;
	description: string;
	provider: 'groq' | 'openrouter';
}

interface ModelSelectorProps {
	onSubmit: (model: string) => void;
	onCancel: () => void;
	currentModel?: string;
}

const GROQ_MODELS: Model[] = [
	{
		id: 'moonshotai/kimi-k2-instruct',
		name: 'Kimi K2 Instruct',
		description: 'Most capable model',
		provider: 'groq',
	},
	{
		id: 'openai/gpt-oss-120b',
		name: 'GPT OSS 120B',
		description: 'Fast, capable, and cheap model',
		provider: 'groq',
	},
	{
		id: 'openai/gpt-oss-20b',
		name: 'GPT OSS 20B',
		description: 'Fastest and cheapest model',
		provider: 'groq',
	},
	{id: 'qwen/qwen3-32b', name: 'Qwen 3 32B', description: '', provider: 'groq'},
	{
		id: 'meta-llama/llama-4-maverick-17b-128e-instruct',
		name: 'Llama 4 Maverick',
		description: '',
		provider: 'groq',
	},
	{
		id: 'meta-llama/llama-4-scout-17b-16e-instruct',
		name: 'Llama 4 Scout',
		description: '',
		provider: 'groq',
	},
];

export default function ModelSelector({
	onSubmit,
	onCancel,
	currentModel,
}: ModelSelectorProps) {
	const [allModels, setAllModels] = useState<Model[]>(GROQ_MODELS);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedIndex, setSelectedIndex] = useState(0);

	useEffect(() => {
		const fetchOpenRouterModels = async () => {
			try {
				const response = await fetch('https://openrouter.ai/api/v1/models');
				if (!response.ok) {
					throw new Error(`Failed to fetch models: ${response.statusText}`);
				}
				const data = await response.json();
				const openRouterModels: Model[] = data.data.map((model: any) => ({
					id: model.id,
					name: model.name,
					description: model.description,
					provider: 'openrouter',
				}));
				setAllModels([...GROQ_MODELS, ...openRouterModels]);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'An unknown error occurred',
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchOpenRouterModels();
	}, []);

	useEffect(() => {
		if (allModels.length > 0) {
			const currentIndex = allModels.findIndex(
				model => model.id === currentModel,
			);
			setSelectedIndex(currentIndex >= 0 ? currentIndex : 0);
		}
	}, [allModels, currentModel]);

	useInput((input, key) => {
		if (key.return) {
			if (allModels.length > 0) {
				onSubmit(allModels[selectedIndex].id);
			}
			return;
		}

		if (key.escape) {
			onCancel();
			return;
		}

		if (key.upArrow) {
			setSelectedIndex(prev => Math.max(0, prev - 1));
			return;
		}

		if (key.downArrow) {
			setSelectedIndex(prev => Math.min(allModels.length - 1, prev + 1));
			return;
		}

		if (key.ctrl && input === 'c') {
			onCancel();
			return;
		}
	});

	return (
		<Box flexDirection="column">
			<Box marginBottom={1}>
				<Text color="cyan" bold>
					Select Model
				</Text>
			</Box>

			<Box marginBottom={1}>
				<Text color="gray" dimColor>
					Choose a model for your conversation. The chat will be cleared when
					you switch models.
				</Text>
			</Box>

			<Box flexDirection="column" marginBottom={1}>
				{isLoading ? (
					<Text color="yellow">Loading models...</Text>
				) : error ? (
					<Text color="red">Error: {error}</Text>
				) : (
					<>
						{Object.entries(
							allModels.reduce((acc, model) => {
								if (!acc[model.provider]) {
									acc[model.provider] = [];
								}
								acc[model.provider].push(model);
								return acc;
							}, {} as Record<string, Model[]>),
						).map(([provider, models]) => (
							<Box key={provider} flexDirection="column" marginBottom={1}>
								<Text color="cyan" bold>
									{provider.toUpperCase()} Models
								</Text>
								{models.map(model => {
									const index = allModels.findIndex(m => m.id === model.id);
									const isSelected = index === selectedIndex;
									return (
										<Box key={model.id}>
											<Text
												color={isSelected ? 'black' : 'white'}
												backgroundColor={isSelected ? 'cyan' : undefined}
												bold={isSelected}
											>
												{isSelected ? '> ' : '  '}
												{model.name}
												{model.id === currentModel ? ' (current)' : ''}
											</Text>
											{isSelected && model.description && (
												<Box marginLeft={2}>
													<Text color="gray" dimColor>
														{' '}
														- {model.description}
													</Text>
												</Box>
											)}
										</Box>
									);
								})}
							</Box>
						))}
					</>
				)}
			</Box>
		</Box>
	);
}
