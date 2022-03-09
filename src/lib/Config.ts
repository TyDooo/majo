process.env.NODE_ENV ??= 'development';

import { LogLevel } from '@sapphire/framework';
import type { ColorResolvable } from 'discord.js';
import type { NodeOptions } from 'erela.js';
import fs from 'fs';
import { merge } from 'lodash';
import path from 'path';

interface ConfigItems {
	token?: string;
	default_prefix?: string;
	audio_enabled: boolean;
	color: ColorResolvable;
	lavalink: {
		nodes: NodeOptions[];
	};
}

const CONFIG_PATH = process.env.CONFIG_DIRECTORY ? `${process.env.CONFIG_DIRECTORY}/config.json` : path.join(__dirname, '../../config/config.json');

export class Config {
	private data: ConfigItems;

	public constructor(initialConfig?: ConfigItems) {
		this.data = {
			token: process.env.DISCORD_TOKEN,
			default_prefix: process.env.DEFAULT_PREFIX,
			audio_enabled: false,
			color: '#65546e',
			lavalink: {
				nodes: []
			}
		};
		if (initialConfig) {
			this.data = merge(this.data, initialConfig);
		}
	}

	public get token(): string | undefined {
		return this.data.token;
	}

	public get defaultPrefix(): string | undefined {
		return this.data.default_prefix;
	}

	public get logLevel(): LogLevel {
		return process.env.NODE_ENV === 'development' ? LogLevel.Debug : LogLevel.Info;
	}

	public get color(): ColorResolvable {
		return this.data.color;
	}

	public get audioEnabled(): boolean {
		return this.data.lavalink.nodes.length > 0 && this.data.audio_enabled;
	}

	public get lavalinkNodes(): NodeOptions[] {
		return this.data.lavalink.nodes;
	}

	public load(overrideConfig?: ConfigItems): Config {
		if (overrideConfig) {
			this.data = overrideConfig;
			return this;
		}

		if (!fs.existsSync(CONFIG_PATH)) {
			this.save();
		}
		const data = fs.readFileSync(CONFIG_PATH, 'utf-8');

		if (data) {
			this.data = merge(this.data, JSON.parse(data));
			this.save();
		}
		return this;
	}

	public save(): void {
		fs.writeFileSync(CONFIG_PATH, JSON.stringify(this.data, undefined, ' '));
	}
}
