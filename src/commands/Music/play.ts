import { ApplyOptions } from '@sapphire/decorators';
import type { Args, CommandOptions } from '@sapphire/framework';
import type { ShoukakuTrack, ShoukakuTrackList } from 'shoukaku';
import { MusicCommand } from '../../lib/MusicCommand';
import type { GuildMessage } from '../../lib/types/Discord';

@ApplyOptions<CommandOptions>({
	description: 'A basic command'
})
export class UserCommand extends MusicCommand {
	public async messageRun(message: GuildMessage, args: Args) {
		const channel = message.member?.voice.channel;

		if (!channel) return message.reply('You need to be in a voice channel to use this command!');

		const searchResult = (await args.rest('song')) as unknown as ShoukakuTrackList;

		let track: ShoukakuTrack;
		switch (searchResult.type) {
			case 'SEARCH':
			case 'TRACK':
				track = searchResult.tracks[0];
				break;
			case 'PLAYLIST':
				return message.reply('Your query points to a playlist which is currently not supported!');
			default:
				return message.reply('I could not find any tracks on the query you provided!');
		}

		const node = this.container.shoukaku.getNode();
		const player = await node.joinChannel({
			guildId: message.guild.id,
			channelId: channel.id,
			shardId: message.guild.shardId,
			deaf: true
		});
		player.playTrack(track);
		return message.channel.send(`Now playing ${track.info.title || 'Unknown Track'}`);
	}
}
