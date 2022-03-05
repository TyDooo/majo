import { container } from '@sapphire/framework';
import { Collection, TextBasedChannel, VoiceBasedChannel } from 'discord.js';
import { Queue } from './Queue';

export class QueueStore extends Collection<String, Queue> {
	public async connect(channel: VoiceBasedChannel, textChannel: TextBasedChannel): Promise<Queue> {
		if (this.has(channel.guild.id)) throw new Error('Already in a channel');
		const node = container.shoukaku.getNode();
		const guildId = channel.guild.id;
		const player = await node.joinChannel({
			guildId,
			shardId: channel.guild.shardId,
			channelId: channel.id,
			deaf: true
		});
		const queue = new Queue(this, player, guildId, textChannel.id);
		this.set(guildId, queue);
		return queue;
	}
}
