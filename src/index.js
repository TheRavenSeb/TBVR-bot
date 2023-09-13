// init for file
const { GatewayIntentBits, EmbedBuilder, Collection, ActivityType, ConnectionVisibility, Embed, GuildEmojiRoleManager } = require("discord.js");


const fs = require("fs");
const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

const Discord = require("discord.js");
const client = new Discord.Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();
module.exports.client = client;
for ( var file of functions) {
	require(`./functions/${file}`)(client); // Runs the files
}
client.handleEvents(eventFiles, "./src/events");
client.handleCommands(commandFolders, "./src/commands");



require("dotenv").config();

// Note: This is a very basic example of a command handler, it is not the best way to do it, but it is the easiest way to do it.






client.on("debug",  (st) => {
	console.log("debug", st);
});

client.on("warn", (st) => {
	console.log("warn", st);
});
client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isModalSubmit()) return;
	console.log(interaction);
});


client.login(process.env.token);