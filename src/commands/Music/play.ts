import { ApplyOptions } from '@sapphire/decorators';
import type { Args, CommandContext } from '@sapphire/framework';
import { MusicCommand } from '../../lib/commands/MusicCommand';
import type { GuildMessage } from '../../lib/types/Discord';
import { getPlayer } from '../../lib/utils/guild';

@ApplyOptions<MusicCommand.Options>({
	aliases: ['p'],
	description: 'Joins the server, adds a track and plays the track.',
	flags: ['sc', 'soundcloud']
})
export class UserCommand extends MusicCommand {
	private get add(): MusicCommand {
		return this.store.get('add') as MusicCommand;
	}

	private get join(): MusicCommand {
		return this.store.get('join') as MusicCommand;
	}

	public async messageRun(message: GuildMessage, args: Args, context: CommandContext) {
		let player = getPlayer(message.guild);

		if (!player || player.state !== 'CONNECTED') {
			await this.join.messageRun(message, args, context);
			player = this.container.client.audio.players.get(message.guild.id)!;
		}

		if (!args.finished) {
			await this.add.messageRun(message, args, context);
			if (player.playing) return;
		}

		if (!player.queue.current && !player.queue.length) {
			return message.channel.send('The queue is empty, add some tracks first!');
		}

		if (!player.playing) {
			await player.play();
		}

		return null;
	}
}
