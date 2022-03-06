import { ApplyOptions } from '@sapphire/decorators';
import { Args, Argument, ArgumentContext, ArgumentOptions } from '@sapphire/framework';
import { parseURL } from '@sapphire/utilities';
import type { LavalinkSource, ShoukakuTrackList } from 'shoukaku';

@ApplyOptions<ArgumentOptions>({})
export class UserArgument extends Argument<ShoukakuTrackList> {
	public async run(parameter: string, context: ArgumentContext) {
		const node = this.container.shoukaku.getNode();

		let trackList: ShoukakuTrackList;

		const url = parseURL(parameter.replace(/^<(.+)>$/g, '$1'));
		if (url === null) {
			trackList = await node.rest.resolve(parameter, this.searchSource(context.args));
		} else {
			trackList = await node.rest.resolve(url.toString());
		}

		return this.ok(trackList);
	}

	private searchSource(args: Args): LavalinkSource {
		if (args.getFlags('sc', 'soundcloud')) return 'soundcloud';
		if (args.getFlags('ytm', 'youtubemusic')) return 'youtubemusic';
		return 'youtube';
	}
}

declare module '@sapphire/framework' {
	interface ArgType {
		song: string;
	}
}
