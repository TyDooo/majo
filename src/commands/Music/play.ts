import { ApplyOptions } from '@sapphire/decorators';
import type { Args, CommandContext, CommandOptions } from '@sapphire/framework';
import { MusicCommand } from '../../lib/commands/MusicCommand';
import type { GuildMessage } from '../../lib/types/Discord';

@ApplyOptions<CommandOptions>({
	description: 'A basic command'
})
export class UserCommand extends MusicCommand {
	private get add(): MusicCommand {
		return this.store.get('add') as MusicCommand;
	}

	private get join(): MusicCommand {
		return this.store.get('join') as MusicCommand;
	}

	public async messageRun(message: GuildMessage, args: Args, context: CommandContext) {
		const channel = message.member?.voice.channel;
		if (!channel) return message.reply('You need to be in a voice channel to use this command!');

		if (!this.container.queueStore.has(message.guild.id)) {
			await this.join.messageRun(message, args, context);
		}

		const queue = this.container.queueStore.get(message.guild.id)!;

		if (!args.finished) {
			await this.add.messageRun(message, args, context);
			if (queue.nowPlaying) return;
		}

		if (!queue.nowPlaying) {
			queue.start();
		}

		return null;
	}
}
