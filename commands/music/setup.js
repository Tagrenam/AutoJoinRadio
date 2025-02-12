const { SlashCommandBuilder, ChannelType, EmbedBuilder, MessageFlags } = require('discord.js');
const { joinandplay, savejson, badreply } = require(`${process.cwd()}/music.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Create your personal configuration for AutoJoinRadio')
		.addStringOption(option => option.setName('url')
					.setDescription('url to radio')
					.setRequired(true))
		.addStringOption(option => option.setName('volume')
					.setDescription('Volume for you, can be from 0 to 200, default for everyone is 40'))
		.addChannelOption(option =>option.setName('channel')
					.setDescription('Specify or be in a voice channel or it will follow you')
					.addChannelTypes(ChannelType.GuildVoice)),
	async execute(interaction) {
		// try {
			var channel = interaction.options.getChannel('channel') ?? interaction.member.voice.channel ?? {"id": 0};
			var url = interaction.options.getString('url');
			var volume = interaction.options.getString('volume') ?? "40";
	
			if (channel.id === interaction.member.voice.channel.id) {
				joinandplay(channel, url, volume);
			}
	
			savejson(interaction.guild.id, interaction.member.id, channel.id, url, volume);
	
			const exampleEmbed = new EmbedBuilder()
				.setColor(0x28813E)
				.setDescription(`I have created configuration for auto join`);
	
			await interaction.reply({embeds: [exampleEmbed], flags: MessageFlags.Ephemeral});
		// } catch (err) {
		// 	await badreply(interaction, "setup.js", err);
		// }
	},
};