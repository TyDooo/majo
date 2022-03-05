import { container } from '@sapphire/framework';
import type { TextBasedChannel } from 'discord.js';
import type { ShoukakuPlayer, ShoukakuTrack } from 'shoukaku';
import type { QueueStore } from './QueueStore';

export class Queue extends Array<ShoukakuTrack> {
	private _nowPlaying: ShoukakuTrack | null = null;

	public constructor(
		public readonly store: QueueStore,
		public readonly player: ShoukakuPlayer,
		public readonly guildId: string,
		public readonly textChannelId: string
	) {
		super();

		this.player.on('start', () => {
			if (!this._nowPlaying) return;
			this.textChannel.send(`Now playing \`${this._nowPlaying.info.title}\`!`);
		});
		this.player.on('end', () => {
			this.next();
		});
		for (const event of ['closed', 'error']) {
			// @ts-ignore
			this.player.on(event, (data: any) => {
				if (data instanceof Error || data instanceof Object) container.client.logger.error(data);
				this.length = 0;
				this.player.connection.disconnect();
				container.logger.debug(this.player.constructor.name, `Destroyed the player & connection @ guild "${this.guildId}"`);
				this.store.delete(this.guildId);
			});
		}
	}

	public start(): boolean {
		if (!this._nowPlaying) return this.next();
		this.player.playTrack(this._nowPlaying);
		container.logger.debug(`Now playing ${this._nowPlaying.info.title} @ guild ${this.guildId}`);
		return true;
	}

	public next(): boolean {
		const entry = this.shift();
		if (entry) {
			this._nowPlaying = entry;
			return this.start();
		}

		container.logger.debug('Queue empty');
		return false;
	}

	public get playing(): boolean {
		return !this.player.paused;
	}

	public get nowPlaying(): ShoukakuTrack | null {
		return this._nowPlaying;
	}

	public get textChannel(): TextBasedChannel {
		return container.client.channels.cache.get(this.textChannelId)! as TextBasedChannel;
	}
}
