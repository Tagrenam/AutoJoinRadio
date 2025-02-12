const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { getclient, badreply } = require(`${process.cwd()}/music.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('visible')
		.setDescription('Set visibility status of AutoJoinRadio bot')
		.addBooleanOption(option => option.setName('visible')
					.setDescription('visible or invisible')
					.setRequired(true)),
	async execute(interaction, client) {
		try {
			var visible = interaction.options.getBoolean('visible');

			var msg = visible ? "visible" : "invisible";
	
			getclient().setStatus(msg);
	
			const exampleEmbed = new EmbedBuilder()
				.setColor(0x28813E)
				.setDescription(`I have set bot ${msg}, it will be changed soon`);
	
			await interaction.reply({embeds: [exampleEmbed], flags: MessageFlags.Ephemeral});
		} catch (err) {
			await badreply(interaction, "visible.js", err);
		}
	},
};