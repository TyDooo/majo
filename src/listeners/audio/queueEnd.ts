import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { TextChannel } from 'discord.js';
import type { Player } from 'erela.js';

@ApplyOptions<ListenerOptions>({
	emitter: 'audio',
	event: 'queueEnd'
})
export class UserEvent extends Listener {
	public run(player: Player) {
		if (!player.textChannel) return;
		const channel = this.container.client.channels.cache.get(player.textChannel) as TextChannel;
		if (!channel) return;

		player.destroy();
		this.container.logger.debug('Left the channel because there were no more tracks in the queue');
		return channel.send("I've ran fresh out of tracks, add some more to keep the party going!");
	}
}
