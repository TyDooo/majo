import { CommandOptionsRunTypeEnum, PieceContext } from '@sapphire/framework';
import { MajoCommand } from './MajoCommand';

export abstract class MusicCommand extends MajoCommand {
	public constructor(context: PieceContext, options: MusicCommand.Options) {
		super(context, {
			...options,
			runIn: [CommandOptionsRunTypeEnum.GuildAny]
		});
	}
}

export namespace MusicCommand {
	export type Options = MajoCommand.Options;
	export type Args = MajoCommand.Args;
	export type Context = MajoCommand.Context;
}
