import { ApplyOptions } from '@sapphire/decorators';
import { container, Listener, ListenerOptions } from '@sapphire/framework';
import type { ShoukakuPlayer } from 'shoukaku';

@ApplyOptions<ListenerOptions>({
	emitter: container.shoukaku,
	event: 'disconnect'
})
export class UserEvent extends Listener {
	public run(name: string, _players: ShoukakuPlayer[], moved: boolean) {
		this.container.logger.warn(`Lavalink Node: ${name} disconnected`, moved ? 'players have been moved' : 'players have been disconnected');
	}
}
