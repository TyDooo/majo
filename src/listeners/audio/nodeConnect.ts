import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { Node } from 'erela.js';

@ApplyOptions<ListenerOptions>({
	emitter: 'audio',
	event: 'nodeConnect'
})
export class UserEvent extends Listener {
	public run(node: Node) {
		this.container.logger.info(`Lavalink node "${node.options.identifier}" connected!`);
	}
}
