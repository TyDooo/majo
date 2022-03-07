import { Command, CommandContext, CommandOptions, CommandOptionsRunTypeEnum, PieceContext } from '@sapphire/framework';

export abstract class MusicCommand extends Command {
	protected constructor(context: PieceContext, options: MusicCommand.Options) {
		super(context, {
			...options,
			runIn: [CommandOptionsRunTypeEnum.GuildAny],
			preconditions: ['RequireUserInVoiceChannel']
		});
	}
}

export namespace MusicCommand {
	export type Options = CommandOptions;
	export type Context = CommandContext;
}
