import { ApplyOptions } from '@sapphire/decorators';
import { container, Listener, ListenerOptions } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({
	emitter: container.shoukaku,
	event: 'error'
})
export class UserEvent extends Listener {
	public run(_name: string, error: Error) {
		this.container.logger.error(error);
	}
}
