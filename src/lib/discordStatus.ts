import { discordToken } from '$env/static/private';
import { ShardClient } from 'detritus-client'

const token = discordToken;

const client = new ShardClient(token, {
    gateway: {
        intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_PRESENCES']
    }
});

await client.run()

export { client }