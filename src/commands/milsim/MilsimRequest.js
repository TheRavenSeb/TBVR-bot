const { SlashCommandBuilder,TextInputBuilder,TextInputStyle, ModalBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('milsim-request')
        .setDescription('Returns info about the bot'),
    async execute(interaction, client){



const modal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle('My Modal');

		// Add components to modal

		// Create the text input components
		const favoriteColorInput = new TextInputBuilder()
			.setCustomId('favoriteColorInput')
		    // The label is the prompt the user sees for this input
			.setLabel("What's your favorite color?")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);

		const hobbiesInput = new TextInputBuilder()
			.setCustomId('hobbiesInput')
			.setLabel("What's some of your favorite hobbies?")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
		const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow);

		// Show the modal to the user
		await interaction.showModal(modal);
        const modalResponse = await interaction.awaitModalSubmit({
            filter: (i) =>
              i.user.id === interaction.user.id,
            time: 60000,
          });
        
          if (modalResponse.isModalSubmit()) {
            
        
            const embed = new EmbedBuilder()
              .setTitle('milsim request sent')
              .setDescription(
                `Your request has been sent to the staff team please wait for a dm/response from a staff member. \n\n ${modalResponse.values}`
              );
        
            await modalResponse.update({ embeds: [embed] });
            console.log(modalResponse.values);
          }


	}
};