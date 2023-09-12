const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const os = require('os');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot-information')
        .setDescription('Returns info about the bot'),
    async execute(interaction, client){
        const spirits = new EmbedBuilder()
        .setTitle('Game Info')
        .setDescription(' Virtual Reality Tactical Shooter centered around CQB (close-quarters battles).')
        .setFields(
            { name: "Links", value: '[Steam](https://store.steampowered.com/app/2314160/Tactical_Assault_VR/)\n[Meta Quest](https://www.oculus.com/experiences/quest/5190911237633299/)'},
        )
        .setColor('DarkButNotBlack')

        const info = new EmbedBuilder()
        .setTitle('General Info (page 2)')
        .setFields(
            { name: 'Developers', value: '<@!582279365912559631>'},
            { name: 'Version', value: '1.0.0'},
            { name: 'Prefix', value: '/'},
            
        )
        .setColor('DarkButNotBlack')

        const computerstats = new EmbedBuilder()
        .setTitle('Computer Stats')
        .addFields(
          { name: 'Total RAM', value: `${(os.totalmem() / (1024 ** 3)).toFixed(2).toString()} GB`, inline: true },
          { name: 'Free RAM', value: `${(os.freemem() / (1024 ** 3)).toFixed(2).toString()} GB`, inline: true },
          { name: 'Used RAM', value: `${((os.totalmem() - os.freemem()) / (1024 ** 3)).toFixed(2).toString()} GB`, inline: true },
          { name: 'CPU Model', value: os.cpus()[0].model.toString() },
          { name: 'CPU Speed', value: `${os.cpus()[0].speed.toString()} MHz`, inline: true },
          { name: 'CPU Cores', value: os.cpus().length.toString(), inline: true },
          { name: 'CPU Load', value: `${os.loadavg()[0].toFixed(2).toString()}%`, inline: true }
        )   
        .setColor('DarkButNotBlack')   

        const uptimeInMinutes = Math.floor(process.uptime() / 60);
        const BotStats = new EmbedBuilder()
            .addFields(
              { name: 'Username', value: `${client.user.username}` },
              { name: 'Guilds', value: `${client.guilds.cache.size}` },
              { name: 'Uptime', value: `${uptimeInMinutes} min` },
              { name: 'Heap Total', value: `${(process.memoryUsage().heapTotal / (1024 ** 2)).toFixed(2).toString()} MB` }
            )
        .setColor('DarkButNotBlack')

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`page1`)
            .setLabel(`Game Info`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page2`)
            .setLabel(`Computer Stats`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page3`)
            .setLabel(`General info`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page4`)
            .setLabel(`Bot stats`)
            .setStyle(ButtonStyle.Success),
        )

        const message = await interaction.reply({ embeds: [info], components: [button] });
        const collector = await message.createMessageComponentCollector();

        collector.on('collect', async (i) => {
             
            if (i.customId === 'page1') {
                
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [spirits], components: [button] })
            }

            if (i.customId === 'page2') {
                
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [computerstats], components: [button] })
            }

            if (i.customId === 'page3') {
                
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [info], components: [button] })
            }

            if (i.customId === 'page4') {
                
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [BotStats], components: [button] })
            }
        })
    }
}
