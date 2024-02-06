import { ChatInputCommandInteraction } from 'discord.js';
import type { MyClient } from '../../client';
import { Command, CommandContext } from '../../command';
import { CommandCategory, CommandName } from '../../types';

export default class extends Command {
	public constructor(client: MyClient) {
		super(client, {
			name: CommandName.Help,
			description: 'Displays a list of available commands.',
			category: CommandCategory.General,
		});
	}

	public async execute(
		interaction: ChatInputCommandInteraction,
		ctx: CommandContext
	): Promise<void> {
		const embed = ctx.messaging.infoEmbed(
			'This is a list of commands you can use.'
		);

		const commands = ctx.commands.commands.sort((a, b) =>
			a.name.localeCompare(b.name)
		);

		// Group the commands by category and add them to the embed fields
		const commandCategories = Object.values(CommandCategory);
		commandCategories.forEach((commandCategory) => {
			const categoryCommands = commands.filter(
				(c) => c.category === commandCategory
			);
			if (categoryCommands.length > 0) {
				const commandList = categoryCommands.map((c) => c.name).join(', ');
				embed.addFields({ name: commandCategory, value: commandList });
			}
		});

		await interaction.reply({ embeds: [embed] });
	}
}
