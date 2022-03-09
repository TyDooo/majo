import { ApplyOptions } from '@sapphire/decorators';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import { DurationFormatter } from '@sapphire/time-utilities';
import { chunk } from '@sapphire/utilities';
import { MessageEmbed, User } from 'discord.js';
import { Track, TrackUtils, UnresolvedTrack } from 'erela.js';
import { MusicCommand } from '../../lib/commands/MusicCommand';
import { RequireMajoInVoiceChannel, RequireQueueNotEmpty } from '../../lib/music/decorators';
import type { GuildMessage } from '../../lib/types/Discord';
import { getPlayer } from '../../lib/utils/guild';

@ApplyOptions<MusicCommand.Options>({
	description: 'Show a list of tracks in the queue.'
})
export class UserCommand extends MusicCommand {
	@RequireMajoInVoiceChannel()
	@RequireQueueNotEmpty()
	public async messageRun(message: GuildMessage) {
		const response = await message.channel.send('Thinking...');

		const player = getPlayer(message.guild)!;
		const tracks = player.queue;
		const { current } = player.queue;

		const template = new MessageEmbed().setTitle('Queue').setColor(this.container.config.color);
		const queueDisplay = new PaginatedMessage({ template });

		if (current) {
			const nowPlayingDescription = [
				`\`${current.title}\``,
				`\`${current.isStream ? 'live' : new DurationFormatter().format(current.duration!)}\``,
				`Requester: \`${(current.requester as User).username}\``
			];

			template.addField('Now playing', nowPlayingDescription.join(' | '));
		}

		template.addField('Total duration', `\`${new DurationFormatter().format(player.queue.duration)}\``);

		if (tracks.length) {
			const songFields = await Promise.all(tracks.map((track, pos) => this.generateTrackField(track, pos)));

			for (const page of chunk(songFields, 5)) {
				queueDisplay.addPageEmbed((embed) => embed.setDescription(page.join('\n\n')));
			}
		}

		if (queueDisplay.pages.length) {
			// Run the display
			await queueDisplay.run(response, message.author);
			return response;
		}

		return response.edit(queueDisplay.template);
	}

	private async generateTrackField(track: Track | UnresolvedTrack, position: number): Promise<string> {
		if (TrackUtils.isUnresolvedTrack(track)) {
			track = await TrackUtils.getClosestTrack(track as UnresolvedTrack);
		}
		track = track as Track;
		const duration = new DurationFormatter().format(track.duration);
		const requester = (track.requester as User).username;
		const header = `**#${position + 1}** - duration: \`${duration}\` | requested by: \`${requester}\`\n`;
		const title = `\`${track.title}\``;
		return header + title;
	}
}
