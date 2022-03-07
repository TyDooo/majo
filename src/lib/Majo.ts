import { LogLevel, SapphireClient } from '@sapphire/framework';

export class MajoClient extends SapphireClient {
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
