import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import type { SearchResult } from 'erela.js';
import { MusicCommand } from '../../lib/commands/MusicCommand';
import { RequireMajoInVoiceChannel, RequireSameVoiceChannel } from '../../lib/music/decorators';
import type { GuildMessage } from '../../lib/types/Discord';
import { getPlayer } from '../../lib/utils/guild';

@ApplyOptions<MusicCommand.Options>({
	description: 'Add a track to the queue',
	flags: ['sc', 'soundcloud']
})
export class UserCommand extends MusicCommand {
	@RequireMajoInVoiceChannel()
	@RequireSameVoiceChannel()
	public async messageRun(message: GuildMessage, args: Args) {
		const player = getPlayer(message.guild)!;

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
