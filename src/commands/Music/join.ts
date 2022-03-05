import { ApplyOptions } from '@sapphire/decorators';
import { CommandOptionsRunTypeEnum } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { MusicCommand } from '../../lib/commands/MusicCommand';

@ApplyOptions<MusicCommand.Options>({
	description: 'Makes Majo join a voice channel',
	runIn: [CommandOptionsRunTypeEnum.GuildAny]
})
export class UserCommand extends MusicCommand {
	public async messageRun(message: Message) {
		const channel = message.member?.voice.channel;
		if (!channel) return message.reply('You must be in a voice channel to use this command!');

		const queue = this.container.queueStore.get(message.guild!.id);
		if (queue) {
			return message.reply("I'm already in a voice channel!");
		}

		await this.container.queueStore.connect(channel, message.channel);
		return message.channel.send('I joined your voice channel!');
	}
}
