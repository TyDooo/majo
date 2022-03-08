import { container } from '@sapphire/framework';
import type { GuildResolvable } from 'discord.js';
import type { Player } from 'erela.js';

export function getPlayer(resolvable: GuildResolvable): Player | undefined {
	return container.client.audio.players.get(container.client.guilds.resolveId(resolvable)!);
}
