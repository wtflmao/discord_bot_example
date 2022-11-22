const { ActionRowBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modal')
        .setDescription('Replies with a pop-up form!'),
    async execute(interaction) {

        const modal = new ModalBuilder()
            .setCustomId('myModal')
            .setTitle('My Modal');

        // Add components to modal...
        // Create the text input components
        const favoriteColorInput = new TextInputBuilder()
            .setCustomId('favoriteColorInput')
            // The label is the prompt the user sees for this input
            .setLabel("What's your favorite color?")
            // Short means only a single line of text
            // TextInputStyle only have two members: .Short and .Paragraph
            .setStyle(TextInputStyle.Short)
            // Set required
            .setRequired(true)
            // Set a placeholder for the text input
            .setPlaceholder("Blurple");

        const hobbiesInput = new TextInputBuilder()
            .setCustomId('hobbiesInput')
            .setLabel("What's some of your favorite hobbies?")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Paragraph)
            // Set required
            .setRequired(false)
            // Set a pre-filled text in the text input
            .setValue("Touching grass outside occasionally.")

        const numberInput = new TextInputBuilder()
            .setCustomId('numberInput')
            .setLabel ("Which year did you first use Discord?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setPlaceholder("2022")
            .setMinLength(4)
            .setMaxLength(4);

        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
        const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(numberInput);

        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

        // Show the modal to the user
        // Showing a modal must be the first response to an interaction.
        // You cannot defer() or deferUpdate() then show a modal later.
        await interaction.showModal(modal);


        // Get the ModalSubmitInteraction that is emitted once the User submits the Modal
        const submitted = await interaction.awaitModalSubmit({
            // Timeout after a minute of not receiving any valid Modals
            time: 60000,
            // Make sure we only accept Modals from the User who sent the original Interaction we're responding to
            filter: i => {
                if (i.user.id === interaction.user.id && i.customId === 'myModal') {
                    return true;
                }},
        }).catch(error => {
            // Catch any Errors that are thrown (e.g. if the awaitModalSubmit times out after 60000 ms)
            console.error(error)
            return null
        })

        // If we got our Modal, we can do whatever we want with it down here.
        // Remember that the Modal can have multiple Action Rows, but each Action Row can have only one TextInputComponent.
        // You can use the ModalSubmitInteraction.fields helper property to get the value of an input field from its Custom ID.
        if (submitted) {
            // Get the data entered by the user
            const favoriteColor = submitted.fields.getTextInputValue('favoriteColorInput');
            const hobbies = submitted.fields.getTextInputValue('hobbiesInput');
            const number = submitted.fields.getTextInputValue('numberInput');
            console.log({ favoriteColor, hobbies, number });
            await submitted.reply({
                content: `Your fav color is ${favoriteColor}, you like ${hobbies}, you claimed that you registered Discord in ${number}.`
            })
        }
    },
};