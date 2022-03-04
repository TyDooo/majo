import { Args as MajoArgs, Command, CommandContext, CommandOptions } from '@sapphire/framework';

export abstract class MajoCommand extends Command {}

export namespace MajoCommand {
	export type Options = CommandOptions;
	export type Args = MajoArgs;
	export type Context = CommandContext;
}
