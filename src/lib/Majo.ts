import { container, LogLevel, SapphireClient } from '@sapphire/framework';
import { Libraries, Shoukaku } from 'shoukaku';
import { QueueStore } from './music/QueueStore';

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
		container.queueStore = new QueueStore();
	}

	public override login(token?: string) {
		container.shoukaku = new Shoukaku(
			new Libraries.DiscordJS(this),
			[{ name: process.env.LAVALINK_NAME as string, url: process.env.LAVALINK_URL as string, auth: process.env.LAVALINK_AUTH as string }],
			{
				moveOnDisconnect: false,
				resumable: true,
				resumableTimeout: 30,
				reconnectTries: 2,
				restTimeout: 10000
			}
		);
		return super.login(token);
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		shoukaku: Shoukaku;
		queueStore: QueueStore;
	}
}
