const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const welcomeChannel = member.guild.channels.cache.get(process.env.BOT_WELCOME_CHANNEL_ID)

        if (!welcomeChannel)
            return;

        const avatar = await member.user.displayAvatarURL();

        const embedMessage = new MessageEmbed()
            .setDescription(`<@${member.user.id}> (${member.user.tag}) sunucuya katıldı.`)
            .setColor(process.env.BOT_MAIN_COLOR)
            .setAuthor('Katılım', avatar)
            .setTimestamp()

        await welcomeChannel.send({ embeds: [embedMessage] });
    }
}
