const { SlashCommandBuilder, ChannelType, EmbedBuilder, MessageFlags} = require('discord.js');
const { joinandplay, badreply } = require(`${process.cwd()}/music.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play some url')
		.addStringOption(option => option.setName('url')
					.setDescription('url to radio')
					.setRequired(true))
		.addStringOption(option => option.setName('volume')
					.setDescription('Volume for you, can be from 0 to 200, default for everyone is 40'))
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
			var url = interaction.options.getString('url');
			var volume = interaction.options.getString('volume') ?? "40";

			joinandplay(channel, url, volume);

			exampleEmbed.setColor(0x28813E).setDescription(`I have joined ${channel.name} voice channel`);
			await interaction.reply({embeds: [exampleEmbed], flags: MessageFlags.Ephemeral});
		} catch (err) {
			await badreply(interaction, "play.js", err);
		}
	},
};