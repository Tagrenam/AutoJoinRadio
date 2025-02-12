const { Events, MessageFlags } = require('discord.js');

module.exports = {
	name: Events.ChannelCreate,
	async execute(channel) {
		//console.log(`Hello ${channel.type}`);
	},
};
