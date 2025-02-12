const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { stopmusic, badreply } = require(`${process.cwd()}/music.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop the music'),
	async execute(interaction) {
		try {
			stopmusic();

			const exampleEmbed = new EmbedBuilder()
				.setColor(0xFFD361)
				.setDescription(`I have stopped music`);
	
			await interaction.reply({embeds: [exampleEmbed], flags: MessageFlags.Ephemeral});
		} catch (err) {
			await badreply(interaction, "stop.js", err);
		}
	},
};