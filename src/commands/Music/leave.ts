import { ApplyOptions } from '@sapphire/decorators';
import { MusicCommand } from '../../lib/commands/MusicCommand';
import { RequireMajoInVoiceChannel, RequireSameVoiceChannel } from '../../lib/music/decorators';
import type { GuildMessage } from '../../lib/types/Discord';
import { getPlayer } from '../../lib/utils/guild';

@ApplyOptions<MusicCommand.Options>({
	aliases: ['stfu', 'l', 'quit', 'q'],
	description: 'Make Majo leave the channel and destroy the queue.'
})
export class UserCommand extends MusicCommand {
	@RequireMajoInVoiceChannel()
	@RequireSameVoiceChannel()
	public async messageRun(message: GuildMessage) {
		getPlayer(message.guild)!.destroy();
		return message.channel.send('I left your voice channel and destroyed the queue!');
	}
}
