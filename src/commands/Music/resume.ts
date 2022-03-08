import { ApplyOptions } from '@sapphire/decorators';
import { MusicCommand } from '../../lib/commands/MusicCommand';
import { RequireMajoInVoiceChannel, RequireMusicPaused, RequireSameVoiceChannel } from '../../lib/music/decorators';
import type { GuildMessage } from '../../lib/types/Discord';
import { getPlayer } from '../../lib/utils/guild';

@ApplyOptions<MusicCommand.Options>({
	aliases: ['res'],
	description: 'Resume the audio playback'
})
export class UserCommand extends MusicCommand {
	@RequireMajoInVoiceChannel()
	@RequireSameVoiceChannel()
	@RequireMusicPaused()
	public messageRun(message: GuildMessage) {
		getPlayer(message.guild)!.pause(false);
		return message.channel.send('Playback resumed!');
	}
}
