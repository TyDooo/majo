import { container, SapphireClient } from '@sapphire/framework';
import { Manager, Payload } from 'erela.js';
import type { Config } from './Config';
import { Logger } from './Logger';

export class MajoClient extends SapphireClient {
	public readonly audio: Manager = new Manager({
		nodes: container.config.lavalinkNodes,
		autoPlay: true,
		send: (id: string, payload: Payload) => {
			const guild = this.guilds.cache.get(id);
			if (guild) guild.shard.send(payload);
		}
	});

	public constructor() {
		super({
			defaultPrefix: container.config.defaultPrefix,
			regexPrefix: /^(hey +)?majo[,! ]/i,
			caseInsensitiveCommands: true,
			logger: {
				level: container.config.logLevel,
				instance: new Logger(container.config.logLevel)
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

	public login(): Promise<string> {
		const { token } = container.config;
		return super.login(token);
	}
}

declare module 'discord.js' {
	interface Client {
		readonly audio: Manager;
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		config: Config;
	}
}
