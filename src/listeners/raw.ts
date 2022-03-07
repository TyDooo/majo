import { Events, Listener } from '@sapphire/framework';
import type { VoicePacket } from 'erela.js';

export class UserEvent extends Listener<typeof Events.Raw> {
	public run(d: VoicePacket) {
		this.container.client.audio.updateVoiceState(d);
	}
}
