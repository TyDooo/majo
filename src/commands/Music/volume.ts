import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { MusicCommand } from '../../lib/commands/MusicCommand';
import { RequireMajoInVoiceChannel, RequireMusicPlaying, RequireSameVoiceChannel } from '../../lib/music/decorators';
import type { GuildMessage } from '../../lib/types/Discord';
import { getPlayer } from '../../lib/utils/guild';

@ApplyOptions<MusicCommand.Options>({
	aliases: ['v', 'vol'],
	description: 'Adjust the playback volume.'
})
export class UserCommand extends MusicCommand {
	@RequireMajoInVoiceChannel()
	@RequireSameVoiceChannel()
	@RequireMusicPlaying()
	public async messageRun(message: GuildMessage, args: Args) {
		const player = getPlayer(message.guild)!;
		const newVolume = args.finished ? null : await args.pick('integer', { minimum: 0, maximum: 300 });
		const oldVolume = player.volume;

		if (newVolume === null || newVolume === oldVolume) {
			return message.channel.send(`The current volume level is \`${oldVolume}\``);
		}

		player.setVolume(newVolume);
		return message.channel.send(`Set playback volume to \`${newVolume}\`!`);
	}
}
