import type { VoiceBasedChannelTypes } from '@sapphire/discord.js-utilities';
import { Events, Listener } from '@sapphire/framework';
import { isNullish, Nullish } from '@sapphire/utilities';
import type { VoiceBasedChannel, VoiceState } from 'discord.js';
import { getPlayer } from '../lib/utils/guild';

export class UserEvent extends Listener<typeof Events.VoiceStateUpdate> {
	public run(_oldState: VoiceState, newState: VoiceState) {
		const player = getPlayer(newState.guild);

		if (player && player.voiceChannel) {
			const voiceChannel = this.container.client.channels.cache.get(player.voiceChannel)! as VoiceBasedChannel;
			if (this.getListenerCount(voiceChannel) === 0) {
				player.destroy();
				this.container.logger.debug('Left the channel because there were no more listeners');
			}
		}
	}

	private getListenerCount(channel: VoiceBasedChannelTypes | Nullish): number {
		if (isNullish(channel)) return 0;

		let count = 0;
		for (const member of channel.members.values()) {
			if (!member.user.bot && !member.voice.deaf) ++count;
		}

		return count;
	}
}
