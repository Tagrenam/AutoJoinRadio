const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { stopusermusic, removejson, badreply } = require(`${process.cwd()}/music.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unsetup')
		.setDescription('Remove my configuration for AutoJoinRadio'),		
	async execute(interaction) {
		try {
			stopusermusic(interaction.guild, interaction.member);
			removejson(interaction.guild.id, interaction.member.id);
	
			const exampleEmbed = new EmbedBuilder()
				.setColor(0xFFD361)
				.setDescription(`Your configuration removed`);
	
			await interaction.reply({embeds: [exampleEmbed], flags: MessageFlags.Ephemeral});
		} catch (err) {
			await badreply(interaction, "unsetup.js", err);
		}
	},
};