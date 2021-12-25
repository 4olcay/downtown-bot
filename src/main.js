const { Client, Collection, Intents } = require('discord.js');

const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

// Commands section
client.commands = new Collection();

const commandFiles = fs.readdirSync('./src/commandService').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commandService/${file}`);
    client.commands.set(command.data.name, command);
}

// Event section
const eventFiles = fs.readdirSync('./src/eventService').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./eventService/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Login section
client.login(process.env.BOT_TOKEN);