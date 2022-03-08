import { ApplyOptions } from '@sapphire/decorators';
import { MusicCommand } from '../../lib/commands/MusicCommand';
import { RequireSameVoiceChannel, RequireSongPresent } from '../../lib/music/decorators';
import type { GuildMessage } from '../../lib/types/Discord';
import { getPlayer } from '../../lib/utils/guild';

@ApplyOptions<MusicCommand.Options>({
	aliases: ['next'],
	description: 'Skip the current track'
})
export class UserCommand extends MusicCommand {
	@RequireSongPresent()
	@RequireSameVoiceChannel()
	public messageRun(message: GuildMessage) {
		getPlayer(message.guild)!.stop();
		return message.channel.send('Skipped track!');
	}
}
