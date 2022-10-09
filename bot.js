const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fs = require('fs');

// daryaft data az .env file
require("dotenv").config();
let token = process.env.TOKEN



client.commands = new Collection();
// join-voice

const { joinVoiceChannel } = require('@discordjs/voice');
client.once('ready', async () => {

  const voiceChannel = client.channels.cache.get("1012661248023863336");
  joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
	selfDeaf: false
  })
})
// Animated-Act 
client.once("ready" , () => {
	setInterval(() => {
		setTimeout(() => {
			client.user.setActivity("𝐁𝐋𝐀𝐂𝐊 𝐒𝐊𝐘" ,{type: "WATCHING"})
		}, 1000)
		setTimeout(() => {
			client.user.setActivity("DΣV= ONIX" ,{type: "LISTENING"})
		}, 2000)
		setTimeout(() => {
			client.user.setActivity("DΣVTΣAM= 𝐁𝐋𝐀𝐂𝐊 𝐒𝐊𝐘" ,{type: "PLAYING"})
		}, 3000)
	}, 3000);
  })
// Animated-status

client.once("ready" , () => {
	setInterval(() => {
		setTimeout(() => {
			client.user.setStatus('online')
		}, 1000)
		setTimeout(() => {
			client.user.setStatus('dnd')
		}, 2000)
		setTimeout(() => {
			client.user.setStatus('idle')
		}, 3000)
	}, 3000);
  })

// commands

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (!client.commands.has(commandName)) return;

	try {
		await client.commands.get(commandName).execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// events

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
};


client.login(token);