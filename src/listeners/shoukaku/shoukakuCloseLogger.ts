import { ApplyOptions } from '@sapphire/decorators';
import { container, Listener, ListenerOptions } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({
	emitter: container.shoukaku,
	event: 'close'
})
export class UserEvent extends Listener {
	public run(name: string, code: number, reason: string) {
		this.container.logger.info(`Lavalink Node: ${name} closed with code ${code}`, reason || 'No reason');
	}
}
