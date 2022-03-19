import { ArgumentError, CommandErrorPayload, Events, Listener, UserError } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class UserEvent extends Listener<typeof Events.CommandError> {
	public run(error: Error, { message }: CommandErrorPayload) {
		if (typeof error === 'string') return this.send(message, error);
		if (error instanceof ArgumentError) return this.argumentError(message, error);
		if (error instanceof UserError) return this.userError(message, error);
		return this.send(message, 'An unknown error occurred!');
	}

	private argumentError(message: Message, error: ArgumentError<unknown>) {
		return this.send(message, `Invalid argument: ${error.message}`);
	}

	private userError(message: Message, error: UserError) {
		// `context: { silent: true }` should make UserError silent:
		// Use cases for this are for example permissions error when running the `eval` command.
		if (Reflect.get(Object(error.context), 'silent')) return;
		return this.send(message, error.message);
	}

	private send(message: Message, content: string) {
		return message.channel.send({ content, allowedMentions: { users: [message.author.id] } });
	}
}
