import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import { MessageEmbed, TextChannel, User } from 'discord.js';
import type { Player, Track } from 'erela.js';

@ApplyOptions<ListenerOptions>({ emitter: 'audio', event: 'trackStart' })
export class UserEvent extends Listener {
	public run(player: Player, track: Track) {
		if (!player.textChannel) return;
		const channel = this.container.client.channels.cache.get(player.textChannel) as TextChannel;
		if (!channel) return;

		const user = track.requester as User;
		const embed = new MessageEmbed()
			.setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ dynamic: true }) })
			.setTitle('Now playing')
			.setColor(this.container.config.color)
			.setDescription(`:musical_note: ${track.title} :musical_note:`);
		if (track.thumbnail) embed.setThumbnail(track.thumbnail);
		return channel.send({ embeds: [embed] });
	}
}
