import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
	description: 'Makes Majo join a voice channel'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		return message.channel.send('Hello world!');
	}
}
