import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { Player } from 'erela.js';

@ApplyOptions<ListenerOptions>({
	emitter: 'audio',
	event: 'playerMove'
})
export class UserEvent extends Listener {
	public run(player: Player, _oldChannel: string, newChannel: string) {
		if (!newChannel) {
			player.destroy();
		}
	}
}
