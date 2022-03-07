import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import type { GuildMessage } from '../../lib/types/Discord';

@ApplyOptions<CommandOptions>({
	description: 'Joins the server, adds a track and plays the track.'
})
export class UserCommand extends Command {
	public async messageRun(message: GuildMessage) {
		return message.channel.send('Hello world!');
	}
}
