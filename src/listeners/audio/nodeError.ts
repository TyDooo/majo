import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { Node } from 'erela.js';

@ApplyOptions<ListenerOptions>({
	emitter: 'audio',
	event: 'nodeError'
})
export class UserEvent extends Listener {
	public run(node: Node, error: Error) {
		this.container.logger.info(`Lavalink node error: ${node.options.identifier} => ${error.message}`);
	}
}
