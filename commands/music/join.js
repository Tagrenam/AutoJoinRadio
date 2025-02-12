const { SlashCommandBuilder, ChannelType, EmbedBuilder, MessageFlags } = require('discord.js');
const { join, badreply } = require(`${process.cwd()}/music.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Join a channel')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('Specify or be in a voice channel')
				.addChannelTypes(ChannelType.GuildVoice)),
	async execute(interaction) {
		try {
			const exampleEmbed = new EmbedBuilder();

			if (!(interaction.options.getChannel('channel') || interaction.member.voice.channel)) {
				exampleEmbed.setColor(0xB32113).setDescription(`You should specify or be in a voice channel`);
				await interaction.reply({embeds: [exampleEmbed], flags: MessageFlags.Ephemeral});
			}
	
			var channel = interaction.options.getChannel('channel') ?? interaction.member.voice.channel;
	
			join(channel);
	
			exampleEmbed.setColor(0x28813E).setDescription(`I have joined ${channel.name} voice channel`);
			await interaction.reply({embeds: [exampleEmbed], flags: MessageFlags.Ephemeral});
		} catch (err) {
			await badreply(interaction, "join.js", err);
		}
	},
};