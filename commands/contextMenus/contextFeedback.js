const { ContextMenuCommandBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Bot Feedback')
        // There are two available options for the .type of ContextMenuCommandsBuilder
        // ApplicationCommandType.Message and ApplicationCommandType.User
        .setType(ApplicationCommandType.User),
    async execute(interaction) {

        const botInstance = interaction.client.users.cache.find(user => user.id === interaction.applicationId);
        const modal = new ModalBuilder()
            .setCustomId('feedbackModal')
            .setTitle(`Bot Feedback for ${botInstance.username}#${botInstance.discriminator}`);

        // Add components to modal...
        // Create the text input components
        const starsInput = new TextInputBuilder()
            .setCustomId('starsInput')
            // The label is the prompt the user sees for this input
            .setLabel("Please rate us from 1 star to 5 stars!")
            // Short means only a single line of text
            // TextInputStyle only have two members: .Short and .Paragraph
            .setStyle(TextInputStyle.Short)
            // Set required
            .setRequired(true)
            .setMinLength(1)
            .setMaxLength(1);

        const feedbackInput = new TextInputBuilder()
            .setCustomId('feedbackInput')
            .setLabel("What's your feedback?")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Paragraph)
            // Set required
            .setRequired(false);

        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(starsInput);
        const secondActionRow = new ActionRowBuilder().addComponents(feedbackInput);

        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow);

        // Show the modal to the user
        // Showing a modal must be the first response to an interaction.
        // You cannot defer() or deferUpdate() then show a modal later.
        await interaction.showModal(modal);


        // Get the ModalSubmitInteraction that is emitted once the User submits the Modal
        const submitted = await interaction.awaitModalSubmit({
            // Timeout after a minute of not receiving any valid Modals
            time: 600 * 1000,
            // Make sure we only accept Modals from the User who sent the original Interaction we're responding to
            filter: i => {
                if (i.user.id === interaction.user.id && i.customId === 'feedbackModal') {
                    return true;
                }},
        }).catch(error => {
            // Catch any Errors that are thrown (e.g. if the awaitModalSubmit times out)
            console.error(error)
            return null
        })

        // If we got our Modal, we can do whatever we want with it down here.
        // Remember that the Modal can have multiple Action Rows, but each Action Row can have only one TextInputComponent.
        // You can use the ModalSubmitInteraction.fields helper property to get the value of an input field from its Custom ID.
        if (submitted) {
            // Get the data entered by the user
            const stars = submitted.fields.getTextInputValue('starsInput');
            const feedback = submitted.fields.getTextInputValue('feedbackInput');
            console.log(`FeedBack {@${interaction.user.id}, ${stars}, ${feedback}}`);
            await submitted.reply({
                content: `We've  got your feedback. Thanks for your time and honesty.`,
                ephemeral: true
            })
        }
    },
};