import { ApplyOptions } from '@sapphire/decorators';
import { container, Listener, ListenerOptions } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({
	emitter: container.shoukaku,
	event: 'debug'
})
export class UserEvent extends Listener {
	public run(name: string, reason: string) {
		this.container.logger.debug(`Lavalink Node: ${name}`, reason || 'No reason');
	}
}
