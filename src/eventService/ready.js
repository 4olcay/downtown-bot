module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`);

        const commands = await client.guilds.cache.get(process.env.BOT_GUILD_ID).commands.fetch();

        commands.each(async command => {
            await command.permissions.add({
                permissions: [
                    {
                        id: process.env.BOT_AUTHORIZED_ROLE_ID,
                        type: 'ROLE',
                        permission: true
                    }
                ]
            })
        })

        const guild = client.guilds.cache.get(process.env.BOT_GUILD_ID);
    }
}