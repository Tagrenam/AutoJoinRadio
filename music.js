const { joinVoiceChannel, getVoiceConnection, createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const { EmbedBuilder, MessageFlags } = require('discord.js');

var player = createAudioPlayer();
var activechannelid = 0;
var client;


async function badreply(interaction, func, err)
{
	console.error(`${func}, exception: ${err}`);

	const exampleEmbed = new EmbedBuilder()
		.setColor(0xF0EBE4)
		.setDescription(`${func}, exception`);

	await interaction.reply({embeds: [exampleEmbed], flags: MessageFlags.Ephemeral});
}

function setclient(_client)
{
	client = _client;
}

function getclient()
{
	return client;
}

function isjoined(guild)
{
	var connection = getVoiceConnection(guild.id);
	if (connection === undefined) {
		return null;
	}

	return connection;
}

function playmusic(connection, url, volume)
{
	console.debug(`play url ${url}, volume ${volume}`);
	// var resource = createAudioResource(url, { inlineVolume: true });
	// resource.volume.setVolume(volume / 100);
	var resource = createAudioResource(url);
	player.play(resource);
	connection.subscribe(player);
}

function join(channel)
{
	// if already here, skip
	if (activechannelid === channel.id) {
		console.debug(`skip`);
		return getVoiceConnection(channel.guild.id);
	}

	// if there is other connection, destroy it
	var connection = isjoined(channel.guild);
	if (connection) {
		console.debug(`leave and join`);
		leave(channel.guild);
	}

	// join to a new one
	console.debug(`join`);
	var connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
		adapterCreator: channel.guild.voiceAdapterCreator,
	});

	activechannelid = channel.id;

	return connection;
}

function stopmusic()
{
	console.debug(`stop`);
	player.stop();
}

function leave(guild)
{
	var connection = isjoined(guild);

	if (connection) {
		console.debug(`disconnect`);
		activechannelid = 0;
		connection.destroy();
	}
}

function removejson(guildid, memberid)
{
	var fs = require('fs');
	var path = `${process.cwd()}/user-configs/music-config-${guildid}-${memberid}.json`;
	try {
		fs.unlinkSync(path)
	} catch(err) {
		console.log(`already removed`);
	}
}

function savejson(guildid, memberid, channelid, url, volume)
{
	var data = {
		"channelid": channelid,
		"url": url,
		"volume": volume
	};
	var dictstring = JSON.stringify(data);

	var fs = require('fs');
	fs.writeFile(
		`${process.cwd()}/user-configs/music-config-${guildid}-${memberid}.json`,
		dictstring, function(err, result) {
		if(err) console.log('error', err);
	});
}

function openjson(guildid, memberid)
{
	var path = `${process.cwd()}/user-configs/music-config-${guildid}-${memberid}.json`;
	try {
		var fs=require('fs');
		var file = fs.readFileSync(path, 'utf8');
		var data = JSON.parse(file);
		console.log(`found`);
		return data;
	} catch (err) {
//		console.log(`not found ${path}`);
		console.log(`not found`);
		return null;
	}
}

function stopandleave(guild)
{
	stopmusic();
	leave(guild);
}

function joinandplay(channel, url, volume)
{
	var connection = join(channel);
	if (connection) {
		playmusic(connection, url, volume);
	}
}

function stopusermusic(guild, member)
{
	var data = openjson(guild.id, member.id);
	if (data) {
		stopandleave(guild)
	}
}

function playusermusic(channel, member)
{
	var data = openjson(channel.guild.id, member.id);
	if (data) {
		if (data.channelid !== 0 && data.channelid !== channel.id) {
			return;
		}

		joinandplay(channel, data.url, data.volume);
	}
}

module.exports = {
	setclient,
	getclient,
	stopmusic,
	playmusic,
	stopusermusic,
	playusermusic,
	stopandleave,
	joinandplay,
	isjoined,
	savejson,
	removejson,
	join,
	leave,
	badreply
};
