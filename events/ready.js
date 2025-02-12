const { Events } = require('discord.js');
const { setclient, badreply } = require(`${process.cwd()}/music.js`);

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		try {
			console.log(`Ready! Logged in as ${client.user.tag}`);

			client.user.setStatus("visible");
			setclient(client.user);
		} catch (err) {
			console.error(`ready.js, exception: ${err}`);
		}
	},
};