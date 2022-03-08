/**
 * Credits: https://github.com/skyra-project/skyra/blob/main/src/audio/lib/queue/Decorators.ts
 */

import { createFunctionPrecondition } from '@sapphire/decorators';
import { isNullish } from '@sapphire/utilities';
import type { GuildMessage } from '../types/Discord';
import { getPlayer } from '../utils/guild';

export function RequireMusicPlaying(): MethodDecorator {
	return createFunctionPrecondition(
		(message: GuildMessage) => getPlayer(message.guild)?.playing ?? false,
		(message: GuildMessage) => message.channel.send('The playback must be playing to use this command!')
	);
}

export function RequireMusicPaused(): MethodDecorator {
	return createFunctionPrecondition(
		(message: GuildMessage) => getPlayer(message.guild)?.paused ?? false,
		(message: GuildMessage) => message.channel.send('The playback must be paused to use this command!')
	);
}

export function RequireSongPresent(): MethodDecorator {
	return createFunctionPrecondition(
		async (message: GuildMessage) => {
			const track = await getPlayer(message.guild)?.queue.current;
			return !isNullish(track);
		},
		(message: GuildMessage) => message.channel.send('There is nothing playing right now, add a track to use this command!')
	);
}

export function RequireMajoInVoiceChannel(): MethodDecorator {
	return createFunctionPrecondition(
		(message: GuildMessage) => getPlayer(message.guild)?.voiceChannel !== null && getPlayer(message.guild)?.state === 'CONNECTED',
		(message: GuildMessage) => message.channel.send('I must be in a voice channel before you can use this command!')
	);
}

export function RequireSameVoiceChannel(): MethodDecorator {
	return createFunctionPrecondition(
		(message: GuildMessage) => message.member.voice.channelId === getPlayer(message.guild)?.voiceChannel,
		(message: GuildMessage) => message.channel.send('We must be in the same voice channel before you can use this command!')
	);
}
