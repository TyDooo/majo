import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import type { SearchResult } from 'erela.js';
import { MusicCommand } from '../../lib/commands/MusicCommand';
import type { GuildMessage } from '../../lib/types/Discord';

@ApplyOptions<MusicCommand.Options>({
	description: 'Add a track to the queue',
	flags: ['sc', 'soundcloud']
})
export class UserCommand extends MusicCommand {
	public async messageRun(message: GuildMessage, args: Args) {
		const player = this.container.client.audio.players.get(message.guild.id);

		if (!player) return message.channel.send("I'm not in a voice channel yet! Please ask me to join first!");

		const searchResult = (await args.rest('song')) as unknown as SearchResult;
		switch (searchResult.loadType) {
			case 'SEARCH_RESULT':
			case 'TRACK_LOADED':
				player.queue.add(searchResult.tracks[0]);
				return message.channel.send(`I added \`${searchResult.tracks[0].title}\` to the queue!`);
			case 'PLAYLIST_LOADED':
				return message.channel.send('Your query points to a playlist which is currently not supported!');
			case 'NO_MATCHES':
				return message.channel.send('There were no results matching your query, try another query!');
			default:
				return message.channel.send('I could not find any tracks on the query you provided!');
		}
	}
}
