import { Command, CommandContext, CommandOptions, CommandOptionsRunTypeEnum, container, PieceContext } from '@sapphire/framework';

export abstract class MusicCommand extends Command {
	protected constructor(context: PieceContext, options: MusicCommand.Options) {
		super(context, {
			...options,
			runIn: [CommandOptionsRunTypeEnum.GuildAny],
			preconditions: ['RequireUserInVoiceChannel'],
			enabled: container.config.audioEnabled
		});
	}
}

export namespace MusicCommand {
	export type Options = CommandOptions;
	export type Context = CommandContext;
}
