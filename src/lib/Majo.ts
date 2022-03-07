import { LogLevel, SapphireClient } from '@sapphire/framework';
import { Manager, Payload } from 'erela.js';

export class MajoClient extends SapphireClient {
	public readonly audio: Manager = new Manager({
		nodes: [
			{
				identifier: process.env.LAVALINK_IDENTIFIER,
				host: process.env.LAVALINK_HOST as string,
				port: Number(process.env.LAVALINK_PORT),
				password: process.env.LAVALINK_PASSWORD as string
			}
		],
		autoPlay: true,
		send: (id: string, payload: Payload) => {
			const guild = this.guilds.cache.get(id);
			if (guild) guild.shard.send(payload);
		}
	});

	public constructor() {
		super({
			defaultPrefix: process.env.DEFAULT_PREFIX,
			regexPrefix: /^(hey +)?majo[,! ]/i,
			caseInsensitiveCommands: true,
			logger: {
				level: LogLevel.Debug
			},
			shards: 'auto',
			intents: [
				'GUILDS',
				'GUILD_MEMBERS',
				'GUILD_BANS',
				'GUILD_EMOJIS_AND_STICKERS',
				'GUILD_VOICE_STATES',
				'GUILD_MESSAGES',
				'GUILD_MESSAGE_REACTIONS',
				'DIRECT_MESSAGES',
				'DIRECT_MESSAGE_REACTIONS'
			]
		});
	}
}

declare module 'discord.js' {
	interface Client {
		readonly audio: Manager;
	}
}
