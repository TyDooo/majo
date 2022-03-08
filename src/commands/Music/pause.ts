import { ApplyOptions } from '@sapphire/decorators';
import { MusicCommand } from '../../lib/commands/MusicCommand';
import { RequireMajoInVoiceChannel, RequireMusicPlaying, RequireSameVoiceChannel } from '../../lib/music/decorators';
import type { GuildMessage } from '../../lib/types/Discord';
import { getPlayer } from '../../lib/utils/guild';

@ApplyOptions<MusicCommand.Options>({
	description: 'Pause the audio playback'
})
export class UserCommand extends MusicCommand {
	@RequireMajoInVoiceChannel()
	@RequireSameVoiceChannel()
	@RequireMusicPlaying()
	public messageRun(message: GuildMessage) {
		getPlayer(message.guild)!.pause(true);
		return message.channel.send('Playback paused!');
	}
}
