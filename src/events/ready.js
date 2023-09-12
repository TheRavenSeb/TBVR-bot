const chalk = require("chalk");
const ActivityType = require("discord.js");
module.exports = {
	name: "ready",
	once: true,
	async execute(client) {
		client.channels.cache.get("1082664918882467920").send("```Bot is online!```");
		console.info(chalk.green(`[Discord bot]:Ready! Logged in as ${client.user.tag} on Node ${process.version}`));
		
		console.info(chalk.green(`[Discord bot]:Handling ${client.guilds.cache.reduce((acc, g) => acc + g.memberCount,0)} users`));

		const activities = [
			`/faq for help!`,
			"and watching the Devs update me!",
            "we don't talk about the femboys"
		];
    
		setInterval(() => {
			const status = activities[Math.floor(Math.random() * activities.length)];
			client.user.setActivity(status, { type: ActivityType.watching });
		}, 5000);
        
		
	},
};