const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yaz')
        .setDescription('Belirtilen kanala, bot sizin adınıza mesaj gönderir.')
        .setDefaultPermission(false)
        .addChannelOption(option => option.setName('channel').setDescription('Mesaj gönderilecek kanalı giriniz.').setRequired(true))
        .addStringOption(option => option.setName('title').setDescription('Gönderilecek mesajın başlığını giriniz.').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('Gönderilecek mesajı giriniz.').setRequired(true))
        .addStringOption(option => option.setName('image').setDescription('Fotoğraf olarak eklenecek fotoğrafın urlsini giriniz.').setRequired(false))
        .addStringOption(option => option.setName('thumbnail').setDescription('Thumbnail olarak eklenecek fotoğrafın urlsini giriniz.').setRequired(false)),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');

        if (!channel)
            return interaction.reply({ content: 'Girdiğiniz kanal seçilirken bir sorun meydana geldi.', ephemeral: true });

        const title = interaction.options.getString('title');
        const message = interaction.options.getString('message');
        const thumbnail = interaction.options.getString('thumbnail');
        const image = interaction.options.getString('image');

        const embedMessage = new MessageEmbed()
            .setDescription(message)
            .setTitle(title)
            .setColor(process.env.BOT_MAIN_COLOR)
            .setThumbnail(thumbnail)
            .setImage(image)
            .setTimestamp()
            .setFooter(interaction.user.username, interaction.user.displayAvatarURL())

        try {
            await channel.send({ embeds: [embedMessage] });
        } catch (error) {
            await interaction.reply({ content: 'Mesaj gönderilirken bir sorun meydana geldi. Doğru kanalı seçtiğinize emin misiniz?', ephemeral: true });
        }

        return;
    }
};