const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
//const { Logtail } = require("@logtail/node");
//const logtail = new Logtail("XiL5Vq7qxdBP3pYTnLzqkMCX");
const fs = require("fs");

const chalk = require("chalk");
const clientId = "1133048057735413770";  

module.exports = (client) => {
	client.handleCommands = async (commandFolders, path) => {
		client.commandArray = [];
		for (folder of commandFolders) {
			const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith(".js"));
			for (const file of commandFiles) {
				const command = require(`../commands/${folder}/${file}`);
				console.log(chalk.green(`[Discord bot]: Loaded [${file}] successfully.`));
				client.commands.set(command.data.name, command);
				client.commandArray.push(command.data.toJSON());
			}
		}

		const rest = new REST({ version: "9" }).setToken(process.env.token);
		(async () => {
			try {
				console.log(chalk.green("[Discord bot]:starting command refresh"));
				//console.info(chalk.green("[Discord bot]:starting command refresh"));
				//logtail.flush();

				await rest.put(Routes.applicationCommands(clientId), { body: client.commandArray });

				console.log(chalk.green("[Discord bot]:command refresh Finished"));
				//console.info(chalk.green("[Discord bot]:command refresh Finished"));
			} catch (error) {
				console.error(error);

				client.channels.cache.get("1082664918882467920").send(error);
				//logtail.flush();
			}
		})();
	};
};