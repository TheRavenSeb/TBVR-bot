const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const discordbutton = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setLabel("Discord Link")
			.setURL("https://www.devatle.xyz/")
			.setStyle(ButtonStyle.Link),
	);

var WhitelistedUsers = ["679507957612019742", "341398850667282432", "743185137000513627", "943447436741992469", "839669752343166996", "582279365912559631", "572043819533598735"];
var BlacklistedUsers = ["1655851844", "1771881386", "1570748826", "854867009509916682"];

module.exports = {
	name: "interactionCreate",
	async execute(interaction, client) {
		if (!interaction.isCommand() || BlacklistedUsers.includes(interaction.user.id)) return;
        
		const command = client.commands.get(interaction.commandName);
		
		if (!command) return;

		const embed = new EmbedBuilder()
			.setTitle(`\`\`\` ${interaction.user.username} ran /${interaction.commandName} in ${interaction.guild.name}\`\`\``)
			.setColor("DarkButNotBlack");

		try {
		

			const devOn = new EmbedBuilder()
				.setTitle("```This is a developer only command!```")
				.setColor("DarkButNotBlack");
            
			if (command.devOnly && !WhitelistedUsers.includes(interaction.user.id)){
				return interaction.reply({ embeds: [devOn] });
			}

			const noPerms = new EmbedBuilder()
				.setTitle("```You do not have permission to run this command!```")
				.setColor("DarkButNotBlack");
			
			if (command.PermsNeeded && !interaction.member.roles.cache.some(r => r.name == "Spirits")) {
				return interaction.reply({ embeds: [noPerms] });
			}
            
			await command.execute(interaction, client);
		} catch (error) {
			const alrLinked = new EmbedBuilder().setDescription(`\`\`\`An error within the bot has stopped this command from running, if this issue persists open a ticket in the discord below.\n ${error}\`\`\``).setColor("DarkButNotBlack");
			console.log(error);
			return interaction.followUp({ embeds: [alrLinked], components: [discordbutton] });
		} 
	}
};
