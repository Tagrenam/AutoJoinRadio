const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { leave, badreply } = require(`${process.cwd()}/music.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Stop the music and leave the channel'),
	async execute(interaction) {
		try {
			leave(interaction.guild);

			const exampleEmbed = new EmbedBuilder()
				.setColor(0xFFD361)
				.setDescription(`I have left ${interaction.channel.name} voice channel`);
	
			await interaction.reply({embeds: [exampleEmbed], flags: MessageFlags.Ephemeral});
		} catch (err) {
			await badreply(interaction, "leave.js", err);
		}
	},
};