import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { TextChannel } from 'discord.js';
import type { Player, Track } from 'erela.js';

@ApplyOptions<ListenerOptions>({
	emitter: 'audio',
	event: 'trackStuck'
})
export class UserEvent extends Listener {
	public async run(player: Player, track: Track) {
		if (!player.textChannel) return;
		const channel = this.container.client.channels.cache.get(player.textChannel) as TextChannel;
		if (!channel) return;

		this.container.logger.warn(`The track ${track.title} got stuck during playback @ guild ${player.guild}`);
		await channel.send(`The track \`${track.title}\` requested by \`${track.requester}\` got stuck, skipping!`);

		player.stop();
	}
}
