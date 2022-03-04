import { ApplyOptions } from '@sapphire/decorators';
import { container, Listener, ListenerOptions } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({
	emitter: container.shoukaku,
	event: 'ready',
	once: true
})
export class UserEvent extends Listener {
	public run(name: string, resumed: boolean) {
		this.container.logger.info(`Lavalink Node: ${name} is now connected`, `This connection is ${resumed ? 'resumed' : 'a new connection'}`);
	}
}
