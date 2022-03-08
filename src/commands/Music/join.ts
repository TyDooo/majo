import { ApplyOptions } from '@sapphire/decorators';
import { MusicCommand } from '../../lib/commands/MusicCommand';
import type { GuildMessage } from '../../lib/types/Discord';
import { getPlayer } from '../../lib/utils/guild';

@ApplyOptions<MusicCommand.Options>({
	description: 'Makes Majo join a voice channel',
	requiredClientPermissions: ['CONNECT', 'SPEAK']
})
export class UserCommand extends MusicCommand {
	public messageRun(message: GuildMessage) {
		const player = getPlayer(message.guild);

		if (player && player.state === 'CONNECTED') return message.channel.send("I'm already in a voice channel!");

		this.container.client.audio
			.create({
				guild: message.guild.id,
				textChannel: message.channel.id,
				voiceChannel: message.member.voice.channel!.id,
				selfDeafen: true
			})
			.connect();

		return message.channel.send('I joined you voice channel!');
	}
}
