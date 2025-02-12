const { Events } = require('discord.js');
const { stopandleave, playusermusic, badreply } = require(`${process.cwd()}/music.js`);

module.exports = {
	name: Events.VoiceStateUpdate,
	async execute(oldState, newState) {
		try {
			if (oldState.channel) {
				if (oldState.member.user.bot) {
					console.debug(`bot leaved channel ${oldState.channel.name}`);
					return;
				}
	
				stopandleave(oldState.channel.guild);
	
			}
			if (newState.channel) {
				if (newState.member.user.bot) {
					console.debug(`bot joined channel ${newState.channel.name}`);
					return;
				}
	
				playusermusic(newState.channel, newState.member);
			}
		} catch (err) {
			await badreply(interaction, "voiceStateUpdate.js", err);
		}
	},
};



