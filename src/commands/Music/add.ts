import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import type { Message } from 'discord.js';
import type { ShoukakuTrackList } from 'shoukaku';
import { MusicCommand } from '../../lib/commands/MusicCommand';

@ApplyOptions<MusicCommand.Options>({
	description: 'A basic command'
})
export class UserCommand extends MusicCommand {
	public async messageRun(message: Message, args: Args) {
		const channel = message.member?.voice.channel;
		if (!channel) return message.reply('You must be in a voice channel to use this command!');

		const queue = this.container.queueStore.get(message.guild!.id);
		if (!queue) return message.reply('There is no queue yet, please ask me to join a voice channel first!');

		const searchResult = (await args.rest('song')) as unknown as ShoukakuTrackList;

		switch (searchResult.type) {
			case 'SEARCH':
			case 'TRACK':
				queue.push(searchResult.tracks[0]);
				break;
			case 'PLAYLIST':
				return message.reply('Your query points to a playlist which is currently not supported!');
			default:
				return message.reply('I could not find any tracks on the query you provided!');
		}

		return message.channel.send(`I added the track(s) to the queue!`);
	}
}
