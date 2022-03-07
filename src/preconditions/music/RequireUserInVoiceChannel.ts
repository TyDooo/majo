import { Precondition } from '@sapphire/framework';
import type { GuildMessage } from '../../lib/types/Discord';

export class UserPrecondition extends Precondition {
	public run(message: GuildMessage) {
		if (message.member.voice.channel !== null) return this.ok();
		return this.error({ message: 'You must be in a voice channel to use this command!' });
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		RequireUserInVoiceChannel: never;
	}
}
