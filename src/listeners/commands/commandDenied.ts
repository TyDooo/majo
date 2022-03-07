import { CommandDeniedPayload, Events, Listener, UserError } from '@sapphire/framework';

export class UserEvent extends Listener<typeof Events.CommandDenied> {
	public run(error: UserError, { message }: CommandDeniedPayload) {
		return message.channel.send(error.message);
	}
}
