import { ApplyOptions } from '@sapphire/decorators';
import { Args, Argument, ArgumentContext, ArgumentOptions } from '@sapphire/framework';
import { parseURL } from '@sapphire/utilities';
import type { SearchQuery, SearchResult } from 'erela.js';

@ApplyOptions<ArgumentOptions>({})
export class UserArgument extends Argument<SearchResult> {
	public async run(parameter: string, context: ArgumentContext) {
		let query: string | SearchQuery;

		const url = parseURL(parameter.replace(/^<(.+)>$/g, '$1'));
		if (url === null) {
			query = this.buildSearchQuery(parameter, context.args);
		} else {
			query = url.toString();
		}

		const searchResult = await this.container.client.audio.search(query, context.message.author);

		return this.ok(searchResult);
	}

	private buildSearchQuery(query: string, args: Args): SearchQuery {
		let source: 'youtube' | 'soundcloud' | undefined = 'youtube';
		if (args.getFlags('sc', 'soundcloud')) source = 'soundcloud';
		return { query, source };
	}
}

declare module '@sapphire/framework' {
	interface ArgType {
		song: string;
	}
}
